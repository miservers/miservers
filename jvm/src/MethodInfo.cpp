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
    string attrName = clazz->constantPool[idx]->getValue(clazz->constantPool);
    if (clazz->constantPool[idx]->tag == CONSTANT_Utf8 && attrName == "Code") {
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
}

void
MethodInfo::dump()
{
  cout<<dec<<setw(3)<<""
      <<clazz->getConstantPoolValue(nameIndex)<<" "
      <<clazz->getConstantPoolValue(descriptorIndex)
      <<" {"<<endl;
  cout<<"\t"<<"access flags: "<<access_flag_lebel(accessFlags)<<endl;
  cout<<"\t"<<"maxStack: "<<codeAttribute->maxStack<<endl;
  cout<<"\t"<<"maxLocals: "<<codeAttribute->maxLocals<<endl;
  cout<<"\t"<<"attributesCount: "<<attributesCount<<endl;
  
  for (AttributeInfo* attribute : this->attributes)
    attribute->dump();
    
  cout<<dec<<setw(3)<<""<<"}"<<endl;
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
