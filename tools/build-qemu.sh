#! /bin/bash
set +x
set -e
trap 'previous_command=$this_command; this_command=$BASH_COMMAND' DEBUG
trap 'echo FAILED COMMAND: $previous_command' EXIT

#-------------------------------------------------------------------------------------------
# This script will download packages for, configure, build and install a QEMU.
# https://wiki.qemu.org/Hosts/Linux
# Dependencies:
#   - Install packages : https://wiki.qemu.org/Hosts/Linux
#     
#-------------------------------------------------------------------------------------------
INSTALL_PATH=/opt/qemu
SRC_PATH=/opt/sources
QEMU_VERSION=qemu-4.2.0
TARGET=i386-softmmu,x86_64-softmmu
PARALLEL_MAKE=-j4
export PATH=$INSTALL_PATH/bin:$PATH

mkdir -p $INSTALL_PATH
mkdir -p $SRC_PATH


# Download packages
download_qemu () {
  echo "Downloading qemu sources ..."
  cd $SRC_PATH
  wget https://download.qemu.org/$QEMU_VERSION.tar.xz
}

extract_qemu () {
  tar xvfJ $QEMU_VERSION.tar.xz	
}

build_qemu () {
  echo "Building qemu ..."
  cd $SRC_PATH
  mkdir -p build-qemu
  cd build-qemu

  ../$QEMU_VERSION/configure  --prefix=$INSTALL_PATH --target-list=$TARGET \
    --enable-debug --enable-sdl 
  make $PARALLEL_MAKE
  make install
  cd ..
}


## MAIN ##
#download_qemu
#extract_qemu
build_qemu

trap - EXIT
echo 'Success!'

