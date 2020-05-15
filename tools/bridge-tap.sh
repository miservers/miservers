# Ubuntu 18.04
# Package Install:
#  sudo apt install bridge-utils uml-utilities
# Bridge-Tap creation for Qemu. Add Qemu Options:
#  -netdev tap,id=tap0 -device e1000,netdev=tap0


br_tap_setup() {
  #Create Bridge and Tap 
  brctl addbr br0
  ip a flush dev enp0s25
  brctl addif br0 enp0s25
  tunctl -t tap0 -u `whoami`
  brctl addif br0 tap0

  # Assign IP to br0
  ip a add 192.168.56.2 dev enp0s25
  ip a add 192.168.56.17 dev br0

  # Start 
  ip link set  br0 up
  ip link set  tap0 up
 
  # Show
  brctl show

  
}

br_tap_cleanup() {
  brctl delif br0 tap0
  tunctl -d tap0
  brctl delif br0 enp0s25
  ip link set  br0 down
  brctl delbr br0
  ip link set  enp0s25 up
  #dhclient -v enp0s25

  # release DHCP address
  #dhclient -v -r br0

  # show
  brctl show 
}

if [ $# = 0 ]; then
  echo "Usage:"
  echo "   sudo $0 [add|del]" 
fi 

if [ ""$1 = "add" ]; then
  echo "Creating br0 and tap0"
  br_tap_setup

elif [ ""$1 = "del" ]; then
  echo "Deleting br0 and tap0"
  br_tap_cleanup

fi




