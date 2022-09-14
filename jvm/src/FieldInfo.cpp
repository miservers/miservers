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

#include "FieldInfo.h"
#include "JavaClass.h"
#include "JvmEndian.h"
#include "ConstantTag.h"
#include "FStreamUtils.h"
#include "Disassembler.h"
#include "AccessFlags.h"
#include "Logger.h"

void
FieldInfo::load(ifstream& inf)
{
  int i;
  read_u2(accessFlags, inf);
  read_u2(nameIndex, inf);
  read_u2(descriptorIndex, inf);
  read_u2(attributesCount, inf);
  attributes.reserve(attributesCount);
  for (i=0; i<attributesCount; i++) {
    AttributeInfo* attribute = new AttributeInfo();
    attribute->load(inf);
    attributes.push_back (attribute);
  }
}

void
FieldInfo::dump()
{
  string desc = this->getDescription();
  console("Field : nameIndex=%d descriptorIndex=%d //%s", nameIndex, descriptorIndex ,desc.c_str());
  console("  access flags: %s", access_flag_lebel(accessFlags).c_str());
  console("  attributesCount: %d", attributesCount);

  for (AttributeInfo* attribute : this->attributes)
     attribute->dump();
}

string 
FieldInfo::getDescription()
{
  string name = clazz->constantPool[nameIndex]->getValue(clazz->constantPool);
  string descriptor = clazz->constantPool[descriptorIndex]->getValue(clazz->constantPool);
  return name+":"+descriptor;

}


