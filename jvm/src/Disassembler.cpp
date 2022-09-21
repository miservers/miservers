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
    opCode = code[pc];
    mnemonic = instructionSet->getMnemonic(opCode);
    operandSize = instructionSet->getOperandSize(opCode);
    
    if (operandSize == 1) {
      index = code[pc+1];
    }
    else if (operandSize == 2) {
      indexByte1 = code[pc+1];
      indexByte2 = code[pc+2];
      index = (indexByte1<<8) + indexByte2;  
    }
    
      
    string operandValue = "";
    if (operandSize >= 1 && !InstructionSet::Instance()->isImmOprand (opCode))
          operandValue = "//"+codeAttribute->clazz->getConstantPoolValue(index);
          
    if (operandSize == 0){
      console("  %d: %s ", pc, mnemonic.c_str());
    }
    else
      console("  %d: %s #%d \t%s", pc, mnemonic.c_str(), index, operandValue.c_str());

    pc += operandSize;
  }
};



