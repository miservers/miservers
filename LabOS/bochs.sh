#!/bin/sh
# 
# -q : silent mode
#
# We use command line options instead of .bochsrc 
# A problem to emulate E1000 device 
#
#bochs -q -rc ./bochs_cmd.txt 

set -x


bochs \
    -qf /dev/null \
    'boot: disk , cdrom' \
    'ata0-master: type=disk, path="/home/jadmin/magOS/LabOS/bin/vmlabos.iso", mode=flat' \
    'display_library: sdl' \
    'e1000: enabled=1, mac=62:64:11:12:34:56' \
    'megs: 128'
