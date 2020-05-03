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
#define STATUS_REG     0x64     // read only. status register 
#define CMD_REG        0x64     // write. command register. 
#define DATA_PORT      0x60     //r/w data port

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

char kbgetc()
{
  unsigned char code;
  char c;
  int cap;

  code = inb_p(DATA_PORT);
  
  if (prev_code == 0xE0) { /*Complexe codes: E0,1D*/
    switch (code) { 
    case 0x1D: right_ctrl = 1;  break;    
    case 0x38: right_alt = 1;   break;    
    case 0x48: up_arrow = 1;    break;
    case 0x49: page_up = 1;     break;
    case 0x4B: left_arrow = 1;  break;   
    case 0x4D: right_arrow = 1; break;     
    case 0x50: down_arrow = 1;  break;    
    case 0x51: page_down = 1;   break;    
    default:    break;
    }
    switch (code - 0x80) { /* Make Code */
    case 0x1D: right_ctrl = 0;  break;    
    case 0x38: right_alt = 0;   break;    
    case 0x48: up_arrow = 0;    break;
    case 0x49: page_up = 0;     break;
    case 0x4B: left_arrow = 0;  break;   
    case 0x4D: right_arrow = 0; break;     
    case 0x50: down_arrow = 0;  break;    
    case 0x51: page_down = 0;   break;    
    default:    break;
    }
    prev_code = 0;
  }
  else if (code <= 0x80)  /* code imprimable, key pressed*/
    switch (code) {
    case 0x0E: backspace = 1;   break;
    case 0x3A: caps = !caps;    break;    
    case 0x2A: left_shift = 1;  break;    
    case 0x36: right_shift = 1; break;    
    case 0x1D: left_ctrl = 1;   break;    
    case 0x38: left_alt = 1;    break;    
    case 0x1C: enter = 1;       break;
    default:   cap = (caps|left_shift|right_shift);
               if (!cap)
                 c = keymap[code];
               else
                 c = sh_keymap[code];
               return c;  
    }
  else if (code < 0xE0)  /* Break Code, key released */
    switch (code - 0x80) {
    case 0x0E: backspace = 0;   break;
    case 0x2A: left_shift = 0;  break;    
    case 0x36: right_shift = 0; break;    
    case 0x1D: left_ctrl = 0;   break;    
    case 0x38: left_alt = 0;    break;    
    case 0x1C: enter = 0;       break;  
    default:    break;    
    }
  else if (code == 0xE0)
    prev_code = 0xE0;
  return -NOPRINT;
}

u8 _i8042_read_status () {
  return inb_p(STATUS_REG);
}

u8 _i8042_command(u16 cmd, int with_response) {
  outb_p(cmd, CMD_REG);
  if (with_response)
    return inb_p(DATA_PORT);
  return 0;
}


u8 _i8042_read_data () {
  return inb_p(DATA_PORT);
}


void _i8042_write_data (u8 cmd, u8 data) {
  outb_p(cmd, CMD_REG);
  outb_p(data, DATA_PORT);
}


/*
* read 8042 data until emptying buffer. throw data into the trash. be happy.
*
*/  
void _i8042_out_buf_flush () {
  while ( _i8042_read_status() & OUT_BUF_FULL )
    _i8042_read_data ();
}


/*
* Keyboard controler 8042 initialization.
*
* Ref: https://wiki.osdev.org/%228042%22_PS/2_Controller
*
*/
void kbc_i8042_init() {
  u8 data;
  u8 confbyte;

  // Step 3: Disable Devices 
  _i8042_command(0xAD,FALSE);
  _i8042_command(0xA7,FALSE);
  
  // Step 4: Flush The Output Buffer 
  _i8042_out_buf_flush ();

  // Step 5: Set the Controller Configuration Byte 
  confbyte = _i8042_command(0x20,TRUE);
  confbyte |= 0x55; 
  _i8042_write_data (0x60, confbyte);
  // Step 6: Perform Controller Self Test  
  data = _i8042_command(0xAA,TRUE);
  if (data == 0x55) 
    cons_write("Test PS/2 Controller........[OK]\n");
  else if (data == 0xFC)
    cons_write("Test PS/2 Controller........[KO]\n");   
  
  // Step 7: Determine If There Are 2 Channels 
  
  // Step 8: Perform Interface Tests 
  data = _i8042_command(0xAB,TRUE);
  if (data == 0x00) 
    cons_write("Test first PS/2 port........[OK]\n");
  else if (data == 0x01 || data == 0x03)
    cons_write("Test first PS/2 port........[KO]\n");   
 
  // Step 9: Enable kbd
  _i8042_command(0xAE,FALSE); //for the first port
  confbyte |= 0x55; 
  _i8042_write_data (0x60, confbyte);
  
  //  Step 10: Reset kbd
  data = _i8042_command(0xFF,FALSE);
  if (data == 0xFA || data == 0xAA) 
    cons_write("Reset first PS/2 device........[Success]\n");
  else if (data == 0xFC)
    cons_write("Reset first PS/2 device........[Failure]\n");   
}  

   
void keyboard_handler()
{
  info ("keyboard_handler");   
  cons_handler(kbgetc);
}

