#ifndef LOGGER_H
#define LOGGER_H

#include <string>
#include <stdio.h>

#define info(msg)   cout<<msg<<endl
#define fatal(...)  {   printf("FATAL: "); printf(__VA_ARGS__); printf("\n");    \
                        exit(EXIT_FAILURE);  \
                    }
#endif