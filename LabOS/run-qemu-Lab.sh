#!/bin/bash
# Qemu 4.2
# Usage :
#        ./start-qemu-Lab.sh [-g]
#			    -g : run in debug mode (GDB)
#	       
# Block device options (Qemu 4):
#    -fda file      :floppy disk 0 image
#	 -hda file
# 	 -hdb file      hard disk 0, 1, 2 or 3 image
#	 -cdrom file
# All standard options:
#	 https://www.qemu.org/docs/master/qemu-doc.html#Standard-options		
#
#
# NOTE: Kernel Image must mounted on drive 0, Qemu option -hda. Because it is hard-coded in bootsect.S 
#          
#
set -x


IMG=$HOME/magOS/LabOS/bin/vmlabos.iso
ARCH=i386
#ARCH=x86_64
OPTS='-vga std ' 
#QEMU_OPTS+=' -netdev user,id=qnet0,net=192.168.43.5/24,dhcpstart=192.168.43.9,restrict=no -device e1000,netdev=qnet0,mac=92:ca:fe:f0:7d:a1 -object filter-dump,id=f1,netdev=qnet0,file=/tmp/qemu-net.dat'
NETOPTS='-netdev tap,id=net0,ifname=tap0,script=no,downscript=no -device e1000,netdev=net0,mac=b2:ca:fe:f0:7d:a1'
NETDUMP='-object filter-dump,id=f1,netdev=net0,file=/tmp/qemu-net.dat'
QEMU_BIN=/opt/qemu/bin/qemu-system-$ARCH


if [ ""$1 == "-g" ] ; then
  DEBUG="-s  -S"
fi

$QEMU_BIN -m 64 $DEBUG  $OPTS -drive file=$IMG,format=raw,index=0,media=disk $NETOPTS $NETDUMP

