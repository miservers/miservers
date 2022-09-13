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
    void loadTag (ifstream&);
    void load (ifstream&); // load CP info data without reloading the TAG!
    string getValue (vector<ConstantPoolInfo*>  const& constantPool);
};

class ConstantClassInfo : public ConstantPoolInfo 
{
  public:
    u2 nameIndex;
    
    void dump();
    void load(ifstream&);
    string getValue (vector<ConstantPoolInfo*>  const& constantPool);
};

/* fieldref-info, methodref-info, interfaceref-info*/
class ConstantRefInfo : public ConstantPoolInfo 
{
  public:
    u2 classIndex;
    u2 nameAndTypeIndex;

    void dump();
    void load(ifstream&);
    string getValue (vector<ConstantPoolInfo*>  const& constantPool);
};

class FieldRefInfo : public ConstantRefInfo {};

class MethodRefInfo : public ConstantRefInfo {};

class InterfaceMethodRefInfo : public ConstantRefInfo {};

class ConstantStringInfo : public ConstantPoolInfo 
{
  public :
    u2 stringIndex;

    void dump();
    void load(ifstream&);
    string getValue (vector<ConstantPoolInfo*>  const& constantPool);
};

class ConstantUtf8Info : public ConstantPoolInfo 
{
  public:
    u2 length;
    vector<u1> bytes;

    void dump();
    void load(ifstream&);
    string getValue (vector<ConstantPoolInfo*>  const& constantPool);

};

class ConstantIntegerInfo : public ConstantPoolInfo 
{
  public:
    u4 bytes;

    void dump();
    void load(ifstream&);
    string getValue (vector<ConstantPoolInfo*>  const& constantPool);
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

    void dump();
    void load(ifstream&);  
    string getValue (vector<ConstantPoolInfo*>  const& constantPool);
};

class ConstantMethodHandleInfo : public ConstantPoolInfo 
{
  public:
    u1 referenceKind;
    u2 referenceIndex;

    void dump();
    void load(ifstream&);  

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

    void dump();
    void load(ifstream&);  
      
};

#endif
