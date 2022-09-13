/* Copyright 2016 @AR
 *
 * Description of .class jse6
 * https://docs.oracle.com/javase/specs/index.html
 */
#include <iostream> //cout, hex, dec
#include <fstream>
#include <cstdlib>
#include <iomanip> //setw
#include <typeinfo> //typeid get classname
#include <memory> //unique_ptr
using namespace std;

#include "MethodInfo.h"
#include "JavaClass.h"
#include "JvmEndian.h"
#include "ConstantTag.h"
#include "FStreamUtils.h"
#include "Disassembler.h"
#include "AccessFlags.h"
#include "Logger.h"

void
MethodInfo::load (ifstream& inf)
{
  int i;
  
  read_u2(accessFlags, inf);
  read_u2(nameIndex, inf);
  read_u2(descriptorIndex, inf);
  read_u2(attributesCount, inf);
  this->codeAttribute = NULL;
  attributes.reserve(attributesCount);
  for (i=0; i<attributesCount; i++) {
    streampos pos = inf.tellg();
    AttributeInfo* attribute = new AttributeInfo();
    attribute->loadHead(inf);
    u2 idx = attribute->attributeNameIndex;
    ConstantPoolInfo* cpInfo = clazz->constantPool.at(idx);
    cpInfo->dump();
    string attrName = cpInfo->getValue(clazz->constantPool);
    if (cpInfo->tag == CONSTANT_Utf8 && attrName == "Code") {
      delete attribute;
      inf.seekg(pos);
      this->codeAttribute = new CodeAttribute(this->clazz);
      attribute = this->codeAttribute;
      attribute->load(inf);
      attributes.push_back (attribute);
	  }
    else {
      attribute->loadInfo(inf);
      attributes.push_back (attribute);
    }
  }
 // dump();
}

void
MethodInfo::dump()
{
  console("Method : nameIndex=%d descriptorIndex=%d {", nameIndex, descriptorIndex);
  console("  access flags: %s", access_flag_lebel(accessFlags).c_str());
  console("  attributesCount: %d", attributesCount);
  if (codeAttribute) {
    console("  maxStack: %d", codeAttribute->maxStack);
    console("  maxLocals: %d", codeAttribute->maxLocals);
  }

  for (AttributeInfo* attribute : this->attributes)
    attribute->dump();
    
  console("}");
}

string
MethodInfo::getDescription ()
{
  string name = clazz->constantPool[nameIndex]->getValue(clazz->constantPool);
  string descriptor = clazz->constantPool[descriptorIndex]->getValue(clazz->constantPool);
  return name+descriptor;
}

// count the number of this method parameters
int
MethodInfo::countParameters ()
{
  int param_nr = 0;
  string descriptor = clazz->constantPool[descriptorIndex]->getValue(clazz->constantPool);
  for(string::iterator it = descriptor.begin(); *it != ')'; ++it) {
    if (*it == 'B' || *it == 'C' || *it == 'D' || *it == 'F' || *it == 'I' || *it == 'J' || *it == 'S' || *it == 'Z') // base type
       param_nr++;
    else if (*it == 'L') { //ObjectType
      param_nr++;
      do it++;
      while (*it != ';');
    }
    else if (*it == '[') { // ArrayType
     //todo
    }
  }
  return param_nr;
}
