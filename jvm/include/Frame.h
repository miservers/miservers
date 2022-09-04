#ifndef FRAME_H
#define FRAME_H
/* a Frame is used to store local variables, operand stacks, dynamic linking, return values for methods. 
*  a frame is created each time a method is invoked. and it is destroyed when the its method completes.
*  Frames are allocated from the Java Virtual Machine stack. 
*/

#include <vector>
#include <stack>
#include <cstdint>

#include "Types.h"
#include "JavaClass.h"
#include "OperandValue.h"
#include <vector>

#define fill_space2(n) setw((n)*2)<<"" 

using namespace std;

class Frame {
  public:
    intptr_t returnAddress;
    vector<j_int_t> locals;    //local variables
    vector<j_int_t>  operandStack; //operand Stack
    MethodInfo* method;  // method associated with this frame
    
    Frame (MethodInfo* method) 
    { 
      this->method = method;
      locals.resize(this->method->codeAttribute->maxLocals);
      operandStack.reserve(this->method->codeAttribute->maxStack);
    };
    ~Frame () {};
    void dump(int depth); //dump the frame
};

#endif



