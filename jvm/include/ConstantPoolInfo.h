#ifndef CONSTANT_INFO_H
#define CONSTANT_INFO_H
/* Copyright 2016 @AR
 * Description of .class jse6
 * https://docs.oracle.com/javase/specs/index.html
 */
#include <vector>
#include <fstream>
#include <string>
#include <memory> //unique_ptr

#include "Types.h"
#include "Serializable.h"
using namespace std;

class ConstantPoolInfo : public Serializable
{
  public:
    u1 tag;
    
    void dump();
    virtual void load(ifstream&) = 0;
    
    unique_ptr<string> getValue (vector<ConstantPoolInfo*>  const& constantPool);
};

class ConstantClassInfo : public ConstantPoolInfo 
{
  public:
    u2 nameIndex;
};

/* fieldref-info, methodref-info, interfaceref-info*/
class ConstantRefInfo : public ConstantPoolInfo 
{
  public:
    u2 classIndex;
    u2 nameAndTypeIndex;
};

class FieldRefInfo : public ConstantRefInfo {};

class MethodRefInfo : public ConstantRefInfo {};

class InterfaceMethodRefInfo : public ConstantRefInfo {};

class ConstantStringInfo : public ConstantPoolInfo 
{
  public :
    u2 stringIndex;
};

class ConstantUtf8Info : public ConstantPoolInfo 
{
  public:
    u2 length;
    vector<u1> bytes;
};

class ConstantIntegerInfo : public ConstantPoolInfo 
{
  public:
    u4 bytes;
};

class ConstantFloatInfo : public ConstantPoolInfo 
{
   u4 bytes;
};

class ConstantLongInfo : public ConstantPoolInfo 
{
   u4 highBytes;
   u4 lowBytes;
};

class ConstantDoubleInfo : public ConstantPoolInfo 
{
   u4 highBytes;
   u4 lowBytes;
};

class ConstantNameAndTypeInfo: public ConstantPoolInfo 
{
  public:
    u2 nameIndex;
    u2 descriptorIndex;       
};

class ConstantMethodHandleInfo : public ConstantPoolInfo 
{
  public:
    u1 referenceKind;
    u2 referenceIndex;
   
};

class ConstantMethodTypeInfo : public ConstantPoolInfo 
{
  public:
    u2 descriptorIndex;
    
};

class ConstantInvokeDynamicInfo : public ConstantPoolInfo
{
 public:
   u2 bootstrapMethodAttrIndex;
   u2 nameAndTypeIndex;
};

#endif
