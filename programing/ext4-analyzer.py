#
# This a simple program to dump ext4 file system infos. Octobre 2021. @AR
# Base reference:
#       https://ext4.wiki.kernel.org/index.php/Ext4_Disk_Layout
#   
# Python :
#       Structs : https://docs.python.org/3/library/struct.html
# 
import struct

block_size = 4096   # between 1KiB and 64KiB

f = open ("disk.img", "rb")

#
#------- Super Block ---------------
#
print ("Super block infos:")
sb_offset = 1024
f.seek (sb_offset)   # go to 1024th byte, this is the super block position 

super_block = f.read (block_size)

s_inodes_count, s_blocks_count_lo, s_r_blocks_count_lo, s_free_blocks_count_lo , s_free_inodes_count, \
s_first_data_block, s_log_block_size, s_log_cluster_size, s_blocks_per_group ,   \
s_clusters_per_group, s_inodes_per_group, s_mtime ,s_wtime, s_mnt_count, s_max_mnt_count,  \
magic, rest        \
= struct.unpack ('<13I2HH4038s', super_block)

print(f"{  s_inodes_count=}")
print(f"{  s_blocks_count_lo=}")
print(f"{  s_free_blocks_count_lo=}")
print(f"{  s_free_inodes_count=}")
print(f"{  s_first_data_block=}")
print(f"{  s_log_block_size=}")
print(f"{  s_blocks_per_group=}")
print(f"{  s_inodes_per_group=}")
print(f"{  s_mtime=}")
print(f"{  s_wtime=}")
print(f"{  s_mnt_count=}")
print(f"{  s_max_mnt_count=}")
print("  magic=", hex(magic))

#
#---------- Group Descriptors --------------
#
print ("Group Descriptors:")



f.close()
