/* Copyright 2016 @AR
 *
 * Class Loader helper
 */
#include <cstdlib> //exit
#include <iostream> //cout, hex, dec
#include <fstream> 
#include <string>
#include <unordered_set>
using namespace std;
 
#include "ClassLoader.h"
#include "JavaClass.h"

ClassLoader::ClassLoader() {}
ClassLoader::~ClassLoader() {}

JavaClass*
ClassLoader::load(const string classFile) 
{
  JavaClass* clazz;
  clazz = new JavaClass();
  ifstream inf;
  inf.open(classFile.c_str(), ios::binary | ios::in);
  if (!inf.good()) {
    perror("Error opening file");
    cout<<classFile<<endl ;
    exit(EXIT_FAILURE);
  }

  clazz->load(inf);
  
  this->classes.insert (clazz); 
  clazz->classLoader = this;    
  
  return clazz;
}
