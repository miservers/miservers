/* Demo for :
 *   - static_cast is compile time conversion from a data type to another.
 *   - reinterpret_cast is used to convert a pointer of some data type into a pointer 
 *     of another data type, even if types are different. 
 * Compiling:
 *   g++ -o ./bin/cast.o  -c cast.cpp
 *   g++ -o ./bin/cast  ./bin/cast.o 
 * 
*/
#include <iostream>

using namespace std;

int main () {

    // static cast test
    float f = 9.5;

    int a = f;
    int b = static_cast<int>(f);

    cout<<"f="<<f << endl;
    cout<<"a="<<a << endl;  // a=7
    cout<<"b="<<b << endl;  // b=7

    // reinterpret cast : cast integer pointer to  char pointer.
    int *p = new int(69);
    char *c = reinterpret_cast<char*>(p);
    cout<<"*p="<<*p<<endl;
    cout<<"*c="<<*c<<endl;
}

