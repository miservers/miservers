#ifndef FSTREAM_UTILS_H
#define FSTREAM_UTILS_H

#include <fstream>

#include "Types.h"
#include "JvmEndian.h"

inline void read_u1 (u1& buf, std::ifstream& inf)
{
  inf.read((char*)&buf, sizeof(u1));
}

inline void read_u2 (u2& buf, std::ifstream& inf)
{
  inf.read((char *)&buf, sizeof(u2));
  endian_swap16(buf);
}

inline void read_u4 (u4& buf, std::ifstream& inf)
{
  inf.read((char *)&buf, sizeof(u4));
  endian_swap32(buf);
}

#endif