#ifndef JAVA_CLASS_H
#define JAVA_CLASS_H
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
#include "ConstantPoolInfo.h"
#include "FieldInfo.h"
#include "MethodInfo.h"
#include "AttributeInfo.h"
#include "ClassLoader.h"

#define JAVA_CLASS_MAGIC  0xCAFEBABE

using namespace std;

class HeaderInfo;
class ClassLoader;

class JavaClass : public Serializable
{
  public:
    HeaderInfo* header;
    u2 constantPoolCount;
    vector<ConstantPoolInfo*> constantPool;
    u2 accessFlags;
    u2 thisClass;
    u2 superClass;
    u2 interfaceCount;
    vector<u2> interfaces;
    u2 fieldCount;
    vector<FieldInfo*> fields;
    u2 methodCount;
    vector<MethodInfo*> methods;
    u2 attributesCount;
    vector<AttributeInfo*> attributes;

    ClassLoader* classLoader; //classLoader that loaded this class
    
    JavaClass();
    ~JavaClass();
    void dump();
    void load(ifstream&);
    string getName ();
    size_t size ();
    ConstantPoolInfo* getConstantPoolInfo(int index);
    string getConstantPoolValue(int index); //final value in constant pool
    MethodInfo* findMethod (MethodRefInfo*);
    FieldInfo* resolveField (u4 index);
   
};


enum Major { JAVA_SE_1_2=46, JAVA_SE_5=49, JAVA_SE_8=52, JAVA_SE_14=58, JAVA_SE_18=62, JAVA_SE_21=65};

class HeaderInfo : public Serializable
{
  public:
    u4 magic; /*=0xCAFEBABE*/
    u2 minor;
    u2 major;
    
    HeaderInfo() {};
    ~HeaderInfo() {};
    void dump();
    void load(ifstream&);
    
    string majorStr(); // major to string
};


#endif
