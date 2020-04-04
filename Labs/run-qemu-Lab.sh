#!/bin/bash
# Qemu 4.2
# Usage :
#        ./start-qemu-Lab.sh [-g]
# 			       
# Block device options (Qemu 4):
#    -fda file      :floppy disk 0 image
#	 -hda file
# 	 -hdb file      hard disk 0, 1, 2 or 3 image
#	 -cdrom file
# All standard options:
#	 https://www.qemu.org/docs/master/qemu-doc.html#Standard-options		
#
set -x

KERN_ISO=$HOME/magOS/bin/Lab1.iso
ARCH=i386
QEMU_HOME=/opt/qemu
#QEMU_OPTS='-vga std -curses -show-cursor -full-screen -no-fd-bootchk'
QEMU_OPTS=' -nographic '
LOGFILE=/tmp/qemu.log
LOGOPT="-d cpu_reset,mmu,guest_errors"
#export PATH=$PATH:$QEMU_HOME/bin

if [ ""$1 == "-g" ] ; then
  DEBUG="-s  -S"
fi

$QEMU_HOME/bin/qemu-system-$ARCH -m 64  $DEBUG  $QEMU_OPTS -boot order=d -hda $KERN_ISO -D $LOGFILE $LOGOPT


