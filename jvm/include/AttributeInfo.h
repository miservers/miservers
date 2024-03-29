#ifndef ATTRIBUTE_INFO_H
#define ATTRIBUTE_INFO_H
/* Copyright 2016 @AR
 * Description of .class jse6
 * https://docs.oracle.com/javase/specs/index.html
 */
#include <vector>
#include <fstream>
#include <string>
#include <memory> //unique_ptr
using namespace std;
#include "Types.h"
#include "Serializable.h"
#include "ExceptionInfo.h"

class JavaClass;


class AttributeInfo : public Serializable
{
  public:
    u2 attributeNameIndex;
    u4 attributeLength;
    vector<u1> info;
    
    void dump();
    void load (ifstream&);
    void loadHead (ifstream&);
    void loadInfo (ifstream&);
};

class CodeAttribute : public AttributeInfo 
{
  public:
    u2 maxStack;
    u2 maxLocals;
    u4 codeLength;
    vector<u1> code;
    u2 exceptionTableLength;
    vector<ExceptionInfo*> exceptionTable;
    u2 attributesCount;
    vector<AttributeInfo*> attributes;
    
    JavaClass* clazz; // class to wich this object belong
    
    CodeAttribute (JavaClass* clazz) { this->clazz = clazz;}
    
    void dump();
    void load(ifstream&);
};






#endif
