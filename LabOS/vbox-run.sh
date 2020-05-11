# CR 2020 @AR
# 
# ./vbox-run.sh [-g]
#    @ -g : to enable VBOX debugging
# 
#  This Script convert kernel from iso to vdi format, attact it to SCSI device, and
#  start de the VM.
#  Be sure that a VM named "LabOS" is created, with:
#      1. SCSI storage  controller
#      2. Host-Only adapter of type Intel PRO/1000 (82540EM)
#  

img=~/magOS/LabOS/bin/vmlabos.iso

DEBUG=
if [ ""$1 == "-g" ] ; then
  DEBUG="--dbg"
fi

vboxmanage controlvm LabOS poweroff
sleep 1

echo "# Convert iso to vdi format" 
rm -f $img.vdi                             
vboxmanage convertfromraw $img $img.vdi --format vdi

echo "# detach/attach the medium"
vboxmanage storageattach LabOS --storagectl "SCSI" --port 0 --device 0 --medium none
vboxmanage closemedium disk $img.vdi
vboxmanage storageattach LabOS --storagectl "SCSI" --port 0 --device 0 --type hdd --medium $img.vdi


echo "# Start the VM"
virtualbox  $DEBUG  --startvm  LabOS   
#vboxmanage  startvm LabOS --type headless





