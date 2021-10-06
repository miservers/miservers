###p Disk & FS

List all block devices:
 
    # lsblk

List Partitions Under Linux (case android)

    # fdisk -l /dev/block/mmcblk0 
    # fdisk -l -u=cylinders /sdcard1/qemu/qemu1.img

Formate using ext2 FS
 
    # mkfs.ext2 -b 1024 qemu1.img
 
Dump info of disk
 
    # dumpe2fs qemu1.img


Mount a virtual disk(Android) : use terminalEmulator/root

    # mount -o rw,remount /
    # mkdir /mnt/tmp
    # busybox losetup /dev/block/loop0 /extSdCard/qemu/qemu1.img
    # busybox  mount -o loop -t auto /dev/block/loop0  /mnt/tmp
      then you can access the virtual img via /mnt/tmp dir.

Formating an USB or a disk partition

    # fdisk -l              ; identify the partition to formate
    # umount /dev/sdb1
    # mkfs.ntfs /dev/sdb1   ; we always formate a partition not the hole disk.
 
Online Resizing an FS

    # lvresize -L +4G /dev/VolPrddb/db1
    # lvresize -L +4G /dev/VolPrddb/db1
    # resize2fs -p /dev/VolPrddb/db1 +8G
    # resize2fs  /dev/VolPrddb/db1


#### RAID
RAID 5 : https://www.dataretrieval.com/raid-data-recovery/raid-5-internals-data-storage-performance-and-recovery.html

### Create a ISO 9660 image
1. From a devide or cdrom  
dd if=/dev/sda1 of=~/disk1_image.iso

1. from a directory  
mkisofs -o /tmp/cd.iso /tmp/directory/  