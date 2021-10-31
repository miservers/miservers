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
f.seek (1024)   # go to 1024th byte, this is the super block position 

super_block = f.read (block_size)

s_inodes_count, s_blocks_count_lo, s_r_blocks_count_lo, s_free_blocks_count_lo , s_free_inodes_count, \
s_first_data_block, s_log_block_size, s_log_cluster_size, s_blocks_per_group ,   \
s_clusters_per_group, s_inodes_per_group, s_mtime ,s_wtime, s_mnt_count, s_max_mnt_count,  \
magic, rest        \
= struct.unpack ('<13I2HH4038s', super_block)

print("  Inodes count: ", s_inodes_count)
print("  Blocks count: " , s_blocks_count_lo)
print("  Free blocks count: ", s_free_blocks_count_lo)
print("  Free inodes count: ", s_free_inodes_count)
print("  First data block: ", s_first_data_block)
print("  Log block size: ", s_log_block_size)
print("  Blocks per group: ", s_blocks_per_group)
print("  Inodes per group: ", s_inodes_per_group)
print("  Mtime: ", s_mtime)
print("  Wtime: ", s_wtime)
print("  Mounts count: ", s_mnt_count)
print("  Max mounts count : ", s_max_mnt_count)
print("  Magic number=", hex(magic))

#
#---------- Group Descriptors --------------
#
print ("Group Descriptors:")



f.close()
