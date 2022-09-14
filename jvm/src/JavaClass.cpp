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

#include "JavaClass.h"
#include "JvmEndian.h"
#include "ConstantTag.h"
#include "FStreamUtils.h"
#include "Disassembler.h"
#include "AccessFlags.h"
#include "Logger.h"

#define DEBUG 1

JavaClass::JavaClass() 
{
  this->header = new HeaderInfo();
} 

JavaClass::~JavaClass() 
{
  delete header;
  delete &constantPool;
  delete &interfaces;
  delete &fields;
  delete &methods;
  delete &attributes;
} 

void
JavaClass::load(ifstream& inf)
{
  int i;
  ConstantPoolInfo* constantInfo;
  u1 tag;
  
  this->header->load(inf);
  
  if (header->magic != JAVA_CLASS_MAGIC) 
    fatal("Expected header magic: %X, found %X!", JAVA_CLASS_MAGIC, header->magic);
  
  if (header->major != JAVA_SE_14) 
    fatal("JSE not suppoted , found %s, expected  JAVA SE 14!", header->majorStr().c_str());
  
  read_u2(constantPoolCount, inf); 

  debug("CP count %d", constantPoolCount);
  
  //load constants pool
  constantPool.reserve(constantPoolCount);
  constantPool.push_back(NULL);
  for (i=1; i<constantPoolCount; i++) {
    read_u1(tag, inf);
    switch (tag) {
    case CONSTANT_Class :
      constantInfo = new ConstantClassInfo();
      break;
    case CONSTANT_Methodref :
      constantInfo = new MethodRefInfo();
      break;
    case CONSTANT_Fieldref :
      constantInfo = new FieldRefInfo();
      break;
    case CONSTANT_InterfaceMethodref:
      break;
    case CONSTANT_String :
      constantInfo = new ConstantStringInfo ();
      break;
    case CONSTANT_Integer :
      constantInfo = new ConstantIntegerInfo ();
      break;
    case CONSTANT_Float :
      fatal("CONSTANT_Float NOT yet implemeted ");
    case CONSTANT_Long :
      fatal("CONSTANT_Long NOT yet implemeted ");
    case CONSTANT_Double :
      fatal("CONSTANT_Double NOT yet implemeted ");
    case CONSTANT_NameAndType :
      constantInfo = new ConstantNameAndTypeInfo();
      break;
    case CONSTANT_Utf8 :
      constantInfo = new ConstantUtf8Info ();
      break;
    case CONSTANT_MethodHandle :
      constantInfo = new  ConstantMethodHandleInfo();
      break;
    case CONSTANT_MethodType :
      fatal("CONSTANT_MethodType NOT yet implemeted ");
    case CONSTANT_InvokeDynamic :
      constantInfo = new ConstantInvokeDynamicInfo();
      break;
    default :
      fatal("Unknown constant tag=%d", tag);
    };
    constantInfo->tag = tag;
    constantInfo->load(inf);
    constantPool.push_back(constantInfo);
    //cout<<dec<<i<<". ";
    //constantInfo->dump();
  }
  
  read_u2(accessFlags, inf);
  read_u2(thisClass, inf);
  read_u2(superClass, inf);
 
  //Interfaces 
  read_u2(interfaceCount, inf); 
  interfaces.reserve(interfaceCount);
  for (i=0; i<interfaceCount; i++)
    read_u2(interfaces[i], inf);
    
  //Fields 
  read_u2(fieldCount, inf); 
  fields.reserve(fieldCount);
  for (i=0; i<fieldCount; i++) {
    FieldInfo* field = new FieldInfo (this);
    field->load(inf);
    fields.push_back (field);
  }
    
  //Methods
  read_u2(methodCount, inf); 
  methods.reserve(methodCount);
  for (i=0; i<methodCount; i++) {
    MethodInfo* method = new MethodInfo (this);
    method->load(inf);
    methods.push_back(method);
  }
}

void
JavaClass::dump()
{
  int i;
  
  this->header->dump();
  
  console("access Flags: %s", access_flag_lebel(accessFlags).c_str());
  console("thisClass: %d", thisClass);
  console("superClass: %d", superClass);
  
  //constants pool
  console("Counstant Count: %d", constantPoolCount);
  console("Constant Pool table:");
  for (i=1; i<constantPoolCount; i++) {
    cout<<"  "<<dec<<i<<". ";
    constantPool.at(i)->dump();
  }
    
  //Interfaces
  console("Interfaces Count: %d", interfaceCount);
  for (i=0; i<interfaceCount; i++)
    cout<<"Interface: "<<interfaces[i]<<endl;
    
  //Fields 
  console("Fields Count: %d", fieldCount);
  for (FieldInfo* field : this->fields) 
    field->dump();
    
  //Methods 
  console("Methods Count: %d", methodCount);
  for (MethodInfo* method : this->methods) 
    method->dump();
}

void
HeaderInfo::load(ifstream& inf)
{
  read_u4(magic, inf);
  read_u2(minor, inf);
  read_u2(major, inf);
}

void
HeaderInfo::dump()
{
  console("Header Info:");
  console("  magic: %X",magic);
  console("  major: %d", major);
  console("  minor: %d",minor);
}

string
HeaderInfo::majorStr()
{
  switch(this->major)
  {
    case JAVA_SE_1_2: return "Java SE 1.2";
    case JAVA_SE_5  : return "Java SE 5";
    case JAVA_SE_8  : return "Java SE 8";
    case JAVA_SE_14 : return "Java SE 14";
    case JAVA_SE_18 : return "Java SE 18";
    case JAVA_SE_21 : return "Java SE 21";
    default: return "Unknown version " + this->major;
  }
}

string 
JavaClass::getName ()
{
  return this->getConstantPoolValue (thisClass);
}

size_t
JavaClass::size ()
{
  size_t siz = sizeof (this);
  siz += constantPoolCount * sizeof (constantPool);
  siz += fieldCount * sizeof (fields);
  siz += methodCount * sizeof (methods);
  siz += attributesCount * sizeof (attributes);
  return siz;
}

ConstantPoolInfo* 
JavaClass::getConstantPoolInfo(int index)
{
  return this->constantPool[index];
}

string
JavaClass::getConstantPoolValue(int index)
{
  return this->constantPool[index]->getValue(this->constantPool);
}

MethodInfo* 
JavaClass::findMethod (MethodRefInfo* methodRef)
{
  if (methodRef->classIndex != this->thisClass) {
     cout <<"Error : cannot yet search in class #"<<dec<<methodRef->classIndex<<endl;
     return nullptr;
  }
  
  ConstantNameAndTypeInfo* nameAndType = dynamic_cast<ConstantNameAndTypeInfo*>(this->constantPool[methodRef->nameAndTypeIndex]);
  for (MethodInfo* method : this->methods)
    if (method->nameIndex == nameAndType->nameIndex &&
        method->descriptorIndex == nameAndType->descriptorIndex)
       return method;
  
  string msg_error = "Error : No method found for index #" + to_string(methodRef->nameAndTypeIndex);
  perror (msg_error.c_str());
  exit (EXIT_FAILURE); 
}

FieldInfo*
JavaClass::resolveField (u4 index)
{
  FieldRefInfo* fieldRef = dynamic_cast<FieldRefInfo*>(getConstantPoolInfo (index));
  ConstantNameAndTypeInfo* nameAndType = dynamic_cast<ConstantNameAndTypeInfo*>(getConstantPoolInfo (fieldRef->nameAndTypeIndex));
  for (FieldInfo* fieldInfo : this->fields)
    if (fieldInfo->nameIndex == nameAndType->nameIndex && fieldInfo->descriptorIndex == nameAndType->descriptorIndex)
      return fieldInfo;
  return nullptr;
}

