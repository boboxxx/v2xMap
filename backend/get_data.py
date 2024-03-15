import mmap
import os

shm_name = 'gps_data'
shm_size = 4096

shm_fd = os.open(shm_name, os.O_RDWR, 0o666)

# 创建内存映射
shm = mmap.mmap(shm_fd, shm_size, access=mmap.ACCESS_READ)

gps_data = shm.read().decode()
print(f'GPS data from shared memory: {gps_data}')

shm.close()
os.close(shm_fd)
