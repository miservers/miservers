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
#include <iostream>
#include <cstring>
using namespace std;

#include "ConstantPoolInfo.h"
#include "JavaClass.h"
#include "JvmEndian.h"
#include "ConstantTag.h"
#include "FStreamUtils.h"
#include "Disassembler.h"
#include "AccessFlags.h"
#include "Logger.h"


void
ConstantPoolInfo::loadTag(ifstream& inf)
{
  read_u1(tag, inf);
}

void
ConstantPoolInfo::load(ifstream& inf)
{
  fatal ("Load method not implemented for ConstantPool Info TAG=%d", tag);
}


string
ConstantPoolInfo::getValue(vector<ConstantPoolInfo*>  const& constantPool)
{
  fatal ("This method Must be implemented by the derivied class!");
  return "ERROR";
}

void
ConstantPoolInfo::dump()
{
  console("Constant Info: tag=%d", tag);
}

void
ConstantClassInfo::load(ifstream& inf)
{
  read_u2(nameIndex, inf);
} 

void
ConstantClassInfo::dump()
{
  console("Class: nameIndex=%d", nameIndex)
}

string
ConstantClassInfo::getValue(vector<ConstantPoolInfo*>  const& constantPool)
{
  return constantPool[nameIndex]->getValue(constantPool);
}

void
ConstantRefInfo::load(ifstream& inf)
{
  read_u2(classIndex, inf);
  read_u2(nameAndTypeIndex, inf); 
}

void
ConstantRefInfo::dump()
{
  string tmp;
  if (static_cast<int>(tag) == CONSTANT_Fieldref)
    tmp = "FieldRef";
  else if (static_cast<int>(tag) == CONSTANT_Methodref)
    tmp = "MethodRef";
  else if (static_cast<int>(tag) == CONSTANT_InterfaceMethodref)
    tmp = "InterfaceMethodRe";
  else
    tmp = "UnknownRef";
    
  console("%s: classIndex=%d nameAndTypeIndex=%d", tmp.c_str() , classIndex, nameAndTypeIndex);
}

string
ConstantRefInfo::getValue(vector<ConstantPoolInfo*>  const& constantPool)
{
  string sNameAndType = constantPool[nameAndTypeIndex]->getValue(constantPool);
  string sClass = constantPool[classIndex]->getValue(constantPool);
  return sClass + "." + sNameAndType;
}

void
ConstantStringInfo::load(ifstream& inf)
{
  read_u2(stringIndex, inf);
}

void
ConstantStringInfo::dump()
{
  console("String: stringIndex=%d", stringIndex);
}

string
ConstantStringInfo::getValue(vector<ConstantPoolInfo*>  const& constantPool)
{
  return constantPool[stringIndex]->getValue(constantPool);
}

void
ConstantUtf8Info::load(ifstream& inf)
{
  read_u2(length, inf);
  bytes.reserve(length+1);
  inf.read(reinterpret_cast<char*>(&bytes[0]), length); 
  bytes[length] = '\0';
}

void
ConstantUtf8Info::dump()
{
  console("Utf8: %s",(char*)bytes.data());
}

string
ConstantUtf8Info::getValue(vector<ConstantPoolInfo*>  const& constantPool)
{
  string s((char*)bytes.data());
  return s;
}

void
ConstantIntegerInfo::load(ifstream& inf)
{
  read_u4(bytes, inf);
}

void
ConstantIntegerInfo::dump()
{
  console("Integer: %d",bytes)
}

string
ConstantIntegerInfo::getValue(vector<ConstantPoolInfo*>  const& constantPool)
{
  string s(to_string(bytes));
  return s;
}

void
ConstantNameAndTypeInfo::load(ifstream& inf)
{
  read_u2(nameIndex, inf);
  read_u2(descriptorIndex, inf);
}

void
ConstantNameAndTypeInfo::dump()
{
  console("Name And Type: nameIndex=%d descriptorIndex=%d", nameIndex, descriptorIndex);
}

string
ConstantNameAndTypeInfo::getValue(std::vector<ConstantPoolInfo*> const& constantPool)
{
  string name = constantPool[nameIndex]->getValue(constantPool);
  string descriptor = constantPool[descriptorIndex]->getValue(constantPool);
  return name + ":" + descriptor;
}


void
ConstantMethodHandleInfo::load(ifstream& inf)
{
  read_u1(referenceKind, inf);
  read_u2(referenceIndex, inf);
}

void
ConstantMethodHandleInfo::dump()
{
  console("Method Handle: referenceKind=%d referenceIndex=%d", referenceKind, referenceIndex);
}


void
ConstantInvokeDynamicInfo::load(ifstream& inf)
{
  read_u2(bootstrapMethodAttrIndex, inf);
  read_u2(nameAndTypeIndex, inf);
}

void
ConstantInvokeDynamicInfo::dump()
{
  console("ConstantInvokeDynamicInfo, bootstrapMethodAttrIndex=%d, nameAndTypeIndex=%d",
            bootstrapMethodAttrIndex, nameAndTypeIndex );
}

