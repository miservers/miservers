/* Copyright 2016 @AR
 * 
 * this a simple driver for i8042 PS/2 controller.
 * the controller is connected to the cpu via the irq 1.
 * 
 *https://web.fe.up.pt/~pfs/aulas/lcom2010/index.html
   https://web.fe.up.pt/~pfs/aulas/lcom2010/at/4kbrd.pdf
 * see: http://wiki.osdev.org/"8042"_PS/2_Controller
 *    http://www.computer-engineering.org
 *    
*/
#define _KEY_MAP_
#include <keyboard.h>
#include <io.h>
#include <console.h>
#include <kernel.h>

#define C(c)  (char)(c)

/*keybaord registers*/
#define KB_STATUS_REG     0x64     // read only. status register 
#define KB_CMD_REG        0x64     // write. command register. 
#define KB_DATA_PORT      0x60     //r/w data port

/*keybaord commands*/
#define KB_ECHO  0xFE
#define KB_RESET 0xFF
#define KB_LED   0xED

/*status register bits*/
#define OUT_BUF_FULL 0x01
#define IN_BUF_FULL  0x02
#define SYS_FLAG     0x04

int left_shift = 0, right_shift = 0;
int caps = 0;
int left_ctrl = 0, right_ctrl = 0;
int fn = 0;
int left_alt = 0, right_alt = 0;
int alt_gr = 0;
int up_arrow = 0, down_arrow = 0, left_arrow = 0, right_arrow = 0;
int backspace = 0;
int enter = 0;
int page_up = 0, page_down = 0;
unsigned char prev_code = 0; /*treat E0 keys*/

void kb_delay ()
{
  for (int i = 0; i< 255; i++);
}

//-------------------------------------------
// Read/write functions 
//
//-------------------------------------------
u8 _i8042_read_status () {
  return inb_p(KB_STATUS_REG);
}

u8 _i8042_read_data () {
  return inb_p(KB_DATA_PORT);
}


void _i8042_write_data (u8 cmd, u8 data) {
  outb_p(cmd, KB_CMD_REG)   ; kb_delay ();
  outb_p(data, KB_DATA_PORT); kb_delay ();
}

void _i8042_command(u16 cmd) {
  outb_p(cmd, KB_CMD_REG);
  kb_delay ();
}


/*
* read 8042 data until emptying buffer. throw data into the trash. be happy.
*
*/  
void _i8042_out_buf_flush () {
  while ( _i8042_read_status() & OUT_BUF_FULL )
  {
    _i8042_read_data ();
    info ("PS/2 flush done");
  }
}

void _i8042_read_polling ()
{
    //while (!(_i8042_read_status () & 0x01)); // polling

    while ( _i8042_read_status() & OUT_BUF_FULL )
    {
       u8 data = _i8042_read_data ();
       info ("KB pooling %x", data);
       kb_delay ();
    }
}

//---------------------------------------------
//  Keyboard handler
//
//---------------------------------------------
char kbgetc()
{
  unsigned char code;
  char c;
  int cap;

  code = _i8042_read_data();
  
  
  if (code == 0xE0)
  {
    prev_code   = 0xE0;
    
    right_ctrl  = 0;    
    right_alt   = 0;    
    up_arrow    = 0;
    page_up     = 0;
    left_arrow  = 0;   
    right_arrow = 0;     
    down_arrow  = 0;    
    page_down   = 0;   

    goto out;
  }

  if (prev_code == 0xE0)  /*Complexe codes: E0,1D*/
  {
    switch (code) { 
    case 0x1D: right_ctrl  = 1;     
    case 0x38: right_alt   = 1;      
    case 0x48: up_arrow    = 1;  
    case 0x49: page_up     = 1;  
    case 0x4B: left_arrow  = 1;     
    case 0x4D: right_arrow = 1;       
    case 0x50: down_arrow  = 1;      
    case 0x51: page_down   = 1;      
    }
  
    switch (code - 0x80) { /* Make Code */
    case 0x1D: right_ctrl   = 0;     
    case 0x38: right_alt    = 0;       
    case 0x48: up_arrow     = 0;   
    case 0x49: page_up      = 0;   
    case 0x4B: left_arrow   = 0;     
    case 0x4D: right_arrow  = 0;      
    case 0x50: down_arrow   = 0;     
    case 0x51: page_down    = 0;     
    }
  
    prev_code = 0;
  }

  else if (code <= 0x80)  /* code imprimable, key pressed*/
  {
    switch (code) {
    case 0x0E: backspace    = 1;   break;
    case 0x3A: caps     = !caps;   break; 
    case 0x2A: left_shift   = 1;   break; 
    case 0x36: right_shift  = 1;   break; 
    case 0x1D: left_ctrl    = 1;   break; 
    case 0x38: left_alt     = 1;   break; 
    case 0x1C: enter        = 1;   break;
    default:   cap = (caps|left_shift|right_shift);
               if (!cap)
                 c = keymap[code];
               else
                 c = sh_keymap[code];
               return c;  
    }
  }

  else if (code < 0xE0)  /* Break Code, key released */
  {  
    switch (code - 0x80) {
    case 0x0E: backspace   = 0;   
    case 0x2A: left_shift  = 0;      
    case 0x36: right_shift = 0;     
    case 0x1D: left_ctrl   = 0;       
    case 0x38: left_alt    = 0;        
    case 0x1C: enter       = 0;         
    }
  }
  
  out:
  return -NOPRINT;

}



void keyboard_handler()
{
  cons_handler(kbgetc);
}


/* --------------------------------------------------------------
* Keyboard controler 8042 initialization.
*
* Ref: https://wiki.osdev.org/%228042%22_PS/2_Controller
*
*----------------------------------------------------------------*/
void kbc_i8042_init() // BAD. THIS CODE DISABLE KEYBOARD INTR //
{
  u8 data;
  u8 confbyte;

  // Step 3: Disable Devices 
  _i8042_command(0xAD);
  _i8042_command(0xA7);
  
  // Step 4: Flush The Output Buffer 
  _i8042_out_buf_flush ();

  // Step 5: Set the Controller Configuration Byte 
  _i8042_command (0x20);
  confbyte = _i8042_read_data();
  confbyte |= 0x55; 
  _i8042_write_data (0x60, confbyte);
  
  // Step 6: Perform Controller Self Test  
  _i8042_command (0xAA);
  data = _i8042_read_data();
  if (data == 0x55) 
    cons_write("Test PS/2 Controller........[OK]\n");
  else if (data == 0xFC)
    cons_write("Test PS/2 Controller........[KO]\n");   
  
  // Step 7: Determine If There Are 2 Channels 
  
  // Step 8: Perform Interface Tests 
  _i8042_command(0xAB);
  data = _i8042_read_data();
  if (data == 0x00) 
    cons_write("Test first PS/2 port........[OK]\n");
  else if (data == 0x01 || data == 0x03)
    cons_write("Test first PS/2 port........[KO]\n");   
 
  // Step 9: Enable kbd
  _i8042_command(0xAE); //for the first port
  confbyte |= 0x55; 
  _i8042_write_data (0x60, confbyte);
  
  //  Step 10: Reset kbd
  _i8042_command(0xFF);
  data = _i8042_read_data();
  if (data == 0xFA || data == 0xAA) 
    cons_write("Reset first PS/2 device........[Success]\n");
  else if (data == 0xFC)
    cons_write("Reset first PS/2 device........[Failure]\n");   

}  

