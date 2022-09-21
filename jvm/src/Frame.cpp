
#include <vector>
#include <stack>
#include <string>
#include <cstdlib>
#include <iomanip> //setw
#include <iostream>
#include "Logger.h"
using namespace std;

#include "Frame.h"
#include "Types.h"

void
Frame::dump (int depth)
{
  unsigned int i; 
  cout<<hex<<showbase;
  
  cout<<fill_space2(depth)<<setw(3)<<"|"<<"Operand Stack:"<<endl;
  stack<j_int_t>  copy_operandStack(operandStack);
  while (!copy_operandStack.empty()) {
    cout<<fill_space2(depth)<<setw(6)<<"|"<<copy_operandStack.top()<<endl;
    copy_operandStack.pop();
  }
  
  cout<<fill_space2(depth)<<setw(3)<<"|"<<"Local vars:"<<endl;
  for (i=0; i<locals.size(); i++)
    cout<<fill_space2(depth)<<setw(6)<<"|"<<locals[i]<<endl;
}