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
# Bridge and Tap creation
#    tools/bridge-tap.sh add|del
#
# NOTE: Kernel Image must mounted on drive 0, Qemu option -hda. 
#       Because it is hard-coded in bootsect.S 
#          
#
set -x


KERNEL=~/magOS/LabOS/bin/vmlabos.iso
#QEMU_OPTS+=' -netdev user,id=qnet0,net=192.168.43.5/24,dhcpstart=192.168.43.9,restrict=no 
#-device e1000,netdev=qnet0,mac=92:ca:fe:f0:7d:a1 -object 
#filter-dump,id=f1,netdev=qnet0,file=/tmp/qemu-net.dat'


if [ ""$1 == "-g" ] ; then
  DEBUG="-s  -S"
fi

sudo qemu-system-i386 \
                -drive file=$KERNEL,format=raw,index=0,media=disk  \
                -m 64 -vga std  $DEBUG  \
                -netdev tap,id=net0,ifname=tap0 -device e1000,netdev=net0,mac=b2:ca:fe:f0:7d:a1 \
                -object filter-dump,id=f1,netdev=net0,file=/tmp/qemu-net.dat










