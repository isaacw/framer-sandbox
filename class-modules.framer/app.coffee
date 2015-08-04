# Class basics


class Foo

	# Private static vars
	
	_str = "bar"


	# Private constructor:
	
	constructor: ->
		
		# Public vars
		@bar = "fubar"
	
	
	# Language helpers:
		
	get = (props) =>
		@::__defineGetter__ name, getter for name, getter of props
	set = (props) =>
		@::__defineSetter__ name, setter for name, setter of props
	
	
	# Public properties:
	
	get test: -> @_test
	set test: (val="") ->
		@_test = val.toUpperCase()
	
	
	# Private static methods
	
	_privMeth = -> _str
	
	
	# Publig methods
	
	pubMeth: -> _privMeth()


class Kung extends Foo


myFoo = new Kung
# print "pub:      " + myFoo.pubMeth()
# print "priv:     " + myFoo._privMeth
# print "priv var: " + myFoo._str
# print "pub var:  " + myFoo.bar


class Obj
	_secret = "Shhh"
	getSecret: -> _secret
	setSecret: (str) -> _secret = str
	
a = new Obj
b = new Obj
print a.getSecret()
print a.setSecret("Don't tell!")
print b._secret
print b.getSecret()



