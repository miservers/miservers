#! /bin/bash
# this build grub2 from sources
# see http://pete.akeo.ie/2014/05/compiling-and-installing-grub2-for.html?m=1
#     http://wiki.osdev.org/GRUB
# Pre-requisities:
#	   apt install bison flex autoconf xorriso 
#	
set +x
set -e
trap 'previous_command=$this_command; this_command=$BASH_COMMAND' DEBUG
trap 'echo FAILED COMMAND: $previous_command' EXIT

export PATH=$PATH:/opt/cross/bin:/opt/qemu/bin

INSTALL_PATH=/opt/grub
SRC_DIR=/opt/sources
GRUB_VERSION=grub-2.04
PARALELL=-j1
TARGET=i386-elf
TARGET_CC='TARGET_CC=i386-elf-gcc TARGET_OBJCOPY=i386-elf-objcopy TARGET_STRIP=i386-elf-strip TARGET_NM=i386-elf-nm TARGET_RANLIB=i386-elf-ranlib'

install_prereq () {
  sudo apt install bison gettext  flex autoconf xorriso -y
}


download_grub() {
  echo "Downloading grub sources..."
  cd $SRC_DIR
  wget ftp://ftp.gnu.org/gnu/grub/$GRUB_VERSION.tar.gz
  #git clone --depth 1 http://git.savannah.gnu.org/git/grub.git grub-$GRUB_VERSION
}

extract () {
  echo "Extracting Grub sources..."
  cd $SRC_DIR
  tar xfz $GRUB_VERSION.tar.gz
}

build_grub () {
  echo "Building Grub..."
  cd $SRC_DIR
  cd $GRUB_VERSION
  ./configure  --prefix=$INSTALL_PATH --target=$TARGET $TARGET_CC --disable-nls  --disable-efiemu
  make $PARALELL
  make install
}

# MAIN
mkdir -p $SRC_DIR
#install_prereq
#download_grub
extract
build_grub

trap - EXIT
echo 'Success!'
