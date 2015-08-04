# Class basics

# Import module and make Obj available
# myModule = require "myModule"
# @Obj = myModule.Obj

# Shorthand
{Obj} = require "ObjClass"

a = new Obj
b = new Obj
print a.getSecret()
print a.setSecret("Don't tell!")
print b._secret
print b.getSecret()



