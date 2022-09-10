
#include "Logger.h"
#include <string>
#include <iostream>
#include <iomanip>
using namespace std;


Logger* Logger::instance = nullptr;

Logger::Logger() {}

Logger::~Logger() {}
 

static Logger*
Logger::getInstance()
{
    if (!this->instance)
        instance = new Logger();

    return instance; 
}

void
Logger::info(string msg)
{
    cout<<msg<<endl;
}