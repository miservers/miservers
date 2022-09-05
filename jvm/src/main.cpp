#include <string>
#include <iostream>
#include <iomanip>
using namespace std;

#include "Jvm.h"
#include "BootstrapClassLoader.h"
#include "JavaClass.h"
#include "Interpreter.h"
#include "Disassembler.h"


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
