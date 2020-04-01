#! /bin/bash
# this build genext2fs from sources
# download from: https://sourceforge.net/projects/genext2fs/files/genext2fs/1.4.1/
#     
#  Prerequisities: 
#
#    
set +x
set -e
trap 'previous_command=$this_command; this_command=$BASH_COMMAND' DEBUG
trap 'echo FAILED COMMAND: $previous_command' EXIT

export PATH=$PATH:/opt/cross/bin

GENEXT2FS_VERSION=genext2fs
INSTALL_PATH=/opt/genext2fs
SRC_DIR=/opt/sources

download () {
	mkdir -p $SRC_DIR
	cd $SRC_DIR
	git clone --depth 1 https://github.com/bestouff/$GENEXT2FS_VERSION
}


build () {
	cd $SRC_DIR
  cd $GENEXT2FS_VERSION
  ./autogen.sh
  ./configure -q --prefix=$INSTALL_PATH 
  make
  make install
}

#MAIN
download
build

echo Install Success


