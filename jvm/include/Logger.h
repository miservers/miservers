#ifndef LOGGER_H
#define LOGGER_H

#include <string>
#include <stdio.h>


#define info(...)   {printf("INFO: "); printf(__VA_ARGS__); printf("\n");}

#define fatal(...)  {   printf("FATAL: "); printf(__VA_ARGS__); printf("\n");    \
                        exit(EXIT_FAILURE);  \
                    }

#define debug(...)  { if (DEBUG) { \
                        printf ("DEBUG: ");\
                        printf(__VA_ARGS__);\
                        printf("\n");}}

#define console(...) { printf(__VA_ARGS__); printf("\n");}

                     
#endif