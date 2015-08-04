# Class basics

myModule = require "myModule"
@Obj = myModule.Obj

a = new Obj
b = new Obj
print a.getSecret()
print a.setSecret("Don't tell!")
print b._secret
print b.getSecret()



