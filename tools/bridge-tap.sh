# Ubuntu 18.04
# Package Install:
#  sudo apt install bridge-utils uml-utilities
# Bridge-Tap creation for Qemu. Add Qemu Options:
#  -netdev tap,id=mynet0,ifname=tap0,script=no,downscript=no -device e1000,netdev=mynet0,mac=23:12:00:ae:f3:54

br_tap_setup() {
  #Create Bridge and Tap 
  brctl addbr br0
  ip a flush dev enp0s25
  brctl addif br0 enp0s25
  tunctl -t tap0 -u `whoami`
  brctl addif br0 tap0

  # Start 
  ip link set  enp0s25 up
  ip link set  tap0 up
  ip link set  br0 up

  # Show
  brctl show

  # Assign IP to br0
  dhclient -v br0

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
  dhclient -v -r br0

  # show
  brctl show 
}

br_tap_cleanup
br_tap_setup


