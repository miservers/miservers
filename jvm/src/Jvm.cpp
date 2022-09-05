/* Copyright 2016 @AR
 *
 * JVM core : i'am developping this jvm to deeply understand java
 *
 */
#include <string>
#include <iostream>
#include <iomanip>
using namespace std;

#include "Jvm.h"
#include "BootstrapClassLoader.h"
#include "JavaClass.h"
#include "Interpreter.h"
#include "Disassembler.h"

Jvm* Jvm::instance_ = nullptr;

void
Jvm::usage()
{
  cout<<"Usage: "<<endl;
  cout<<"\t"<<"jadi [-p] class_file"<<endl;
  cout<<"\t"<<"-p: to disassemble the class file"<<endl;
  cout<<"\t"<<"file: Java Class file to be interpreted or disassembled"<<endl;
}

Jvm*
Jvm:: Runtime ()
{
 if (!instance_)
   instance_ = new Jvm();
 return instance_;
}

Jvm::Jvm ()
{
  this->edenSpace = new MemSpace ();
  this->survivorSpace = new MemSpace ();
  this->tenuredSpace = new MemSpace ();
  this->methodArea = new MethodArea ();
  this->classLoader = new BootstrapClassLoader();
  this->interpreter = new Interpreter();
}

Jvm::~Jvm ()
{
  delete this->edenSpace;
  delete this->survivorSpace;
  delete this->tenuredSpace;
  delete this->methodArea;
  delete this->classLoader;
  delete this->interpreter;
}

void
Jvm::shutdown ()
{
  cout<<"Eden Space :"<<endl;
  instance_->edenSpace->dump ();
  cout<<"Method Area :"<<endl;
  instance_->methodArea->dump ();
  
  delete instance_;
  exit(EXIT_SUCCESS);
}

int main(int nargs, char** argv)
{
  int i;
  JavaClass* clazz;
  string class_file = "./test/Hello.class";
  int opt_p = 0;
  
  if (nargs <= 1) {
    Jvm::Runtime()->usage();
    return 0;
  }

  //parsing options
  for (i=1; i<nargs; i++) {
     if (string(argv[i]) == "-p")
       opt_p = 1;
     else
       class_file = string(argv[i]);
  }

  cout<<"Class file: "<<class_file<<endl;

  clazz = Jvm::Runtime()->classLoader->load (class_file);
  
  Jvm::Runtime()->methodArea->add (clazz);
  Disassembler::instance()->disassemble (clazz);
  
  if (opt_p)
    goto end;
      
  cout<<"Interpreting the Class"<<endl;
  Jvm::Runtime()->interpreter->run(clazz);  

end:
  Jvm::Runtime()->shutdown ();
  //delete clazz;
  return 0;
}

















