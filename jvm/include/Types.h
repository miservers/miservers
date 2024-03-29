#ifndef TYPES_H
#define TYPES_H
#include <cstdint>

typedef uint8_t   u1;
typedef uint16_t  u2 ;
typedef uint32_t  u4 ;

//--- Java types
// Integral Types 
typedef uint8_t    j_char_t;
typedef int8_t     j_byte_t;
typedef int16_t    j_short_t;
typedef int32_t    j_int_t;
typedef int64_t    j_long_t;

// Floating-Point Types, Value Sets, and Values
//todo

// the returnAddress Type and Values

// The boolean Type

#define j_cast static_cast<j_int_t>

//--- end Java types


//typedef int* intptr_t;


#endif