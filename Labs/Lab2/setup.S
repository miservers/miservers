/* Copyright 2020 @AR
 *
 * This the kernel code, but it do nothing.  
 *
 */

.att_syntax noprefix
.code16
.global setup_start

setup_start:
   call halt

halt:
   jmp halt
   
setup_end:
.end
