#ifndef LOGGER_H
#define LOGGER_H

#include <string>

using namespace std;

class Logger
{
    private:
        static Logger *instance;
        Logger();
        ~Logger();

    public:
        Logger* getInstance();
        void info(string msg);
        void debug (string msg);
        void error (string msg);
        void fatal (string msg);
};

#endif