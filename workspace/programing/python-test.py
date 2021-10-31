# This a test of python

print ("Hello world, I am Python!")

#-------------------
x = 10
y = 20
msg = "Spring concatination x={} and y={}"
if x != y :
    print (msg.format(x, y))

#---- Class ------
#
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def myFunc (self):
        print ("Class: My name is " + self.name)

# using class
p = Person("Ali", 42)
p.myFunc()

p.name = "Omar"
p.age = 49
p.myFunc()

#---- Inheritennce ------
#
class Emplyee (Person):
    def __init__(self, name, age, pay):
        Person.__init__(self, name, age)
        self.pay = pay

    def getSalary (self):
        msg = "Inheritence: {} is payed {}$"
        print (msg.format(self.name, self.pay))
    
    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, 
            sort_keys=True, indent=4)


employee = Emplyee ("Said", 34, 50000)
employee.getSalary()

#---- JSON ------
#
import json

#Parse JSON string
str = '{"name":"Ahmed", "age": 33, "pay": 20000}'

emp = json.loads (str)

print ("JSON parsing String: " + emp["name"])

print("JSON dumps Object : " + employee.toJSON())

#---- Files ------
#
with open ("employee.json", "w") as out: 
    out.write(employee.toJSON())
    print ("File created!")















