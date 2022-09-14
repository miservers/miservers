/* Copyrith 2016 @AR
 *
 * JVM instruction decoder
 */
#include <iostream>
#include <string>
#include <iomanip> //setw
using namespace std;

#include "Disassembler.h"
#include "InstructionSet.h"
#include "Types.h"
#include "JavaClass.h"
#include "Logger.h"

Disassembler* Disassembler::instance_ = nullptr;

Disassembler*
Disassembler::instance () 
{
  if (!instance_)
    instance_ = new Disassembler ();
  return instance_;
}

// disassemle the hole clas
void 
Disassembler::disassemble (JavaClass* clazz)
{
  clazz->dump ();
}

// disassemle jvm instructions
void
Disassembler::disassembleCode (const CodeAttribute* codeAttribute)
{
  u4 pc = 0;
  int opCode;
  string mnemonic;
  int  operandSize;
  u4 index, indexByte1, indexByte2;
  InstructionSet* instructionSet = InstructionSet::Instance();

  const vector<u1>& code = codeAttribute->code;
  for (pc = 0; pc < code.size(); pc++) {
    opCode = static_cast<int>(code[pc]);
    mnemonic = instructionSet->getMnemonic(opCode);
    operandSize = instructionSet->getOperandSize(opCode);
   // cout<<"\t"<<left<<setw(5)<<hex<<opCode<<setw(15)<<mnemonic;
    
    if (operandSize == 1) {
      index = static_cast<u4>(code[++pc]);
//      cout<<"#"<<setw(4)<<dec<<index;
    }
    else if (operandSize == 2) {
      indexByte1 = static_cast<u4>(code[++pc]);
      indexByte2 = static_cast<u4>(code[++pc]);
      index = (indexByte1<<8) + indexByte2;  
  //    cout<<"#"<<setw(4)<<dec<<index;
    }
    else
      pc += operandSize;
      
    string operandValue = "";
    if (operandSize >= 1 && !InstructionSet::Instance()->isImmOprand (opCode))
          operandValue = "//"+codeAttribute->clazz->getConstantPoolValue(index);
    console("\t%s #%d %s", mnemonic.c_str(), index, operandValue.c_str());
  }
};



