require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"AnimationChainClass":[function(require,module,exports){
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.AnimationChain = (function(superClass) {
  extend(AnimationChain, superClass);

  function AnimationChain(options) {
    var animation, k, ref, ref1;
    if (options == null) {
      options = {};
    }
    this.stop = bind(this.stop, this);
    this.start = bind(this.start, this);
    this._next = bind(this._next, this);
    this._isEndofChain = bind(this._isEndofChain, this);
    this.add = bind(this.add, this);
    this._animationEndHandler = bind(this._animationEndHandler, this);
    this._animationsArray = [];
    this._currentAnimation = null;
    ref = options.animations;
    for (k in ref) {
      animation = ref[k];
      this.add(animation);
    }
    this.repeat = (ref1 = options.repeat) != null ? ref1 : false;
  }

  AnimationChain.prototype._animationEndHandler = function() {
    if (this._isEndofChain() && this.repeat === false) {
      this.emit(Events.AnimationEnd);
    } else {
      this._next().start();
    }
    return this._currentAnimation = this._next();
  };

  AnimationChain.prototype.add = function(animation) {
    animation.stop();
    animation.index = this._animationsArray.length;
    animation.on(Events.AnimationEnd, this._animationEndHandler);
    this._animationsArray.push(animation);
    if (this._animationsArray.length === 1) {
      return this._currentAnimation = this._animationsArray[0];
    }
  };

  AnimationChain.prototype._isEndofChain = function(animation) {
    if (animation == null) {
      animation = this._currentAnimation;
    }
    return animation.index === this._animationsArray.length - 1;
  };

  AnimationChain.prototype._next = function(animation) {
    var ref;
    if (animation == null) {
      animation = this._currentAnimation;
    }
    return (ref = this._animationsArray[animation.index + 1]) != null ? ref : this._animationsArray[0];
  };

  AnimationChain.prototype.start = function() {
    if (this._currentAnimation != null) {
      this._currentAnimation.start();
      return this.emit(Events.AnimationStart);
    }
  };

  AnimationChain.prototype.stop = function() {
    this._currentAnimation.stop();
    return this.emit(Events.AnimationStop);
  };

  return AnimationChain;

})(Framer.EventEmitter);



},{}],"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];



},{}]},{},[])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvaXNhYWN3L3NyYy9mcmFtZXItc2FuZGJveC9BbmltYXRpb25DaGFpbi5mcmFtZXIvbW9kdWxlcy9BbmltYXRpb25DaGFpbkNsYXNzLmNvZmZlZSIsIi9Vc2Vycy9pc2FhY3cvc3JjL2ZyYW1lci1zYW5kYm94L0FuaW1hdGlvbkNoYWluLmZyYW1lci9tb2R1bGVzL215TW9kdWxlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ09BLElBQUE7OzZCQUFBOztBQUFBLE9BQWEsQ0FBQztBQUViLG9DQUFBLENBQUE7O0FBQWEsRUFBQSx3QkFBQyxPQUFELEdBQUE7QUFDWixRQUFBLHVCQUFBOztNQURhLFVBQVU7S0FDdkI7QUFBQSxxQ0FBQSxDQUFBO0FBQUEsdUNBQUEsQ0FBQTtBQUFBLHVDQUFBLENBQUE7QUFBQSx1REFBQSxDQUFBO0FBQUEsbUNBQUEsQ0FBQTtBQUFBLHFFQUFBLENBQUE7QUFBQSxJQUFBLElBQUMsQ0FBQSxnQkFBRCxHQUFvQixFQUFwQixDQUFBO0FBQUEsSUFDQSxJQUFDLENBQUEsaUJBQUQsR0FBcUIsSUFEckIsQ0FBQTtBQUVBO0FBQUEsU0FBQSxRQUFBO3lCQUFBO0FBQUEsTUFBQSxJQUFDLENBQUEsR0FBRCxDQUFLLFNBQUwsQ0FBQSxDQUFBO0FBQUEsS0FGQTtBQUFBLElBR0EsSUFBQyxDQUFBLE1BQUQsNENBQTJCLEtBSDNCLENBRFk7RUFBQSxDQUFiOztBQUFBLDJCQU1BLG9CQUFBLEdBQXNCLFNBQUEsR0FBQTtBQUNyQixJQUFBLElBQUcsSUFBQyxDQUFBLGFBQUQsQ0FBQSxDQUFBLElBQXFCLElBQUMsQ0FBQSxNQUFELEtBQVcsS0FBbkM7QUFFQyxNQUFBLElBQUMsQ0FBQSxJQUFELENBQU0sTUFBTSxDQUFDLFlBQWIsQ0FBQSxDQUZEO0tBQUEsTUFBQTtBQUtDLE1BQUEsSUFBQyxDQUFBLEtBQUQsQ0FBQSxDQUFRLENBQUMsS0FBVCxDQUFBLENBQUEsQ0FMRDtLQUFBO1dBTUEsSUFBQyxDQUFBLGlCQUFELEdBQXFCLElBQUMsQ0FBQSxLQUFELENBQUEsRUFQQTtFQUFBLENBTnRCLENBQUE7O0FBQUEsMkJBZ0JBLEdBQUEsR0FBSyxTQUFDLFNBQUQsR0FBQTtBQUVKLElBQUEsU0FBUyxDQUFDLElBQVYsQ0FBQSxDQUFBLENBQUE7QUFBQSxJQUVBLFNBQVMsQ0FBQyxLQUFWLEdBQWtCLElBQUMsQ0FBQSxnQkFBZ0IsQ0FBQyxNQUZwQyxDQUFBO0FBQUEsSUFJQSxTQUFTLENBQUMsRUFBVixDQUFhLE1BQU0sQ0FBQyxZQUFwQixFQUFrQyxJQUFDLENBQUEsb0JBQW5DLENBSkEsQ0FBQTtBQUFBLElBTUEsSUFBQyxDQUFBLGdCQUFnQixDQUFDLElBQWxCLENBQXVCLFNBQXZCLENBTkEsQ0FBQTtBQVFBLElBQUEsSUFBRyxJQUFDLENBQUEsZ0JBQWdCLENBQUMsTUFBbEIsS0FBNEIsQ0FBL0I7YUFDQyxJQUFDLENBQUEsaUJBQUQsR0FBcUIsSUFBQyxDQUFBLGdCQUFpQixDQUFBLENBQUEsRUFEeEM7S0FWSTtFQUFBLENBaEJMLENBQUE7O0FBQUEsMkJBNkJBLGFBQUEsR0FBZSxTQUFDLFNBQUQsR0FBQTs7TUFBQyxZQUFZLElBQUMsQ0FBQTtLQUM1QjtXQUFBLFNBQVMsQ0FBQyxLQUFWLEtBQW1CLElBQUMsQ0FBQSxnQkFBZ0IsQ0FBQyxNQUFsQixHQUEyQixFQURoQztFQUFBLENBN0JmLENBQUE7O0FBQUEsMkJBZ0NBLEtBQUEsR0FBTyxTQUFDLFNBQUQsR0FBQTtBQUNOLFFBQUEsR0FBQTs7TUFETyxZQUFZLElBQUMsQ0FBQTtLQUNwQjs4RUFBeUMsSUFBQyxDQUFBLGdCQUFpQixDQUFBLENBQUEsRUFEckQ7RUFBQSxDQWhDUCxDQUFBOztBQUFBLDJCQW1DQSxLQUFBLEdBQU8sU0FBQSxHQUFBO0FBQ04sSUFBQSxJQUFHLDhCQUFIO0FBQ0MsTUFBQSxJQUFDLENBQUEsaUJBQWlCLENBQUMsS0FBbkIsQ0FBQSxDQUFBLENBQUE7YUFDQSxJQUFDLENBQUEsSUFBRCxDQUFNLE1BQU0sQ0FBQyxjQUFiLEVBRkQ7S0FETTtFQUFBLENBbkNQLENBQUE7O0FBQUEsMkJBd0NBLElBQUEsR0FBTSxTQUFBLEdBQUE7QUFDTCxJQUFBLElBQUMsQ0FBQSxpQkFBaUIsQ0FBQyxJQUFuQixDQUFBLENBQUEsQ0FBQTtXQUNBLElBQUMsQ0FBQSxJQUFELENBQU0sTUFBTSxDQUFDLGFBQWIsRUFGSztFQUFBLENBeENOLENBQUE7O3dCQUFBOztHQUZvQyxNQUFNLENBQUMsYUFBNUMsQ0FBQTs7Ozs7QUNIQSxPQUFPLENBQUMsS0FBUixHQUFnQixZQUFoQixDQUFBOztBQUFBLE9BRU8sQ0FBQyxVQUFSLEdBQXFCLFNBQUEsR0FBQTtTQUNwQixLQUFBLENBQU0sdUJBQU4sRUFEb0I7QUFBQSxDQUZyQixDQUFBOztBQUFBLE9BS08sQ0FBQyxPQUFSLEdBQWtCLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLENBTGxCLENBQUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiIyBBbmltYXRpb24gQ2hhaW5cbiMgTWFuYWdlcyBhIHNlcXVlbmNlIG9mIEFuaW1hdGlvbnNcbiMgXG4jIGJ5IElzYWFjIFdlaW5oYXVzZW5cbiMgaHR0cDovL2lzYWFjdy5jb21cblxuXG5jbGFzcyBleHBvcnRzLkFuaW1hdGlvbkNoYWluIGV4dGVuZHMgRnJhbWVyLkV2ZW50RW1pdHRlclxuXHRcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0QF9hbmltYXRpb25zQXJyYXkgPSBbXVxuXHRcdEBfY3VycmVudEFuaW1hdGlvbiA9IG51bGxcblx0XHRAYWRkKGFuaW1hdGlvbikgZm9yIGssIGFuaW1hdGlvbiBvZiBvcHRpb25zLmFuaW1hdGlvbnNcblx0XHRAcmVwZWF0ID0gb3B0aW9ucy5yZXBlYXQgPyBmYWxzZVxuXHRcdFx0XG5cdF9hbmltYXRpb25FbmRIYW5kbGVyOiA9PlxuXHRcdGlmIEBfaXNFbmRvZkNoYWluKCkgYW5kIEByZXBlYXQgaXMgZmFsc2Vcblx0XHRcdCMgRW5kIGFuaW1hdGlvbiBjaGFpblxuXHRcdFx0QGVtaXQgRXZlbnRzLkFuaW1hdGlvbkVuZFxuXHRcdGVsc2Vcblx0XHRcdCMgUmVzdGFydCBhbmltYXRpb24gY2hhaW5cblx0XHRcdEBfbmV4dCgpLnN0YXJ0KClcblx0XHRAX2N1cnJlbnRBbmltYXRpb24gPSBAX25leHQoKVxuXG5cdFxuXHRhZGQ6IChhbmltYXRpb24pID0+XG5cdFx0IyBFbnN1cmUgdGhlIGFuaW1hdGlvbiBpcyBzdG9wcGVkIChuZWVkZWQgZm9yIHdoZW4gcGFzc2VkIHZpYSB0aGUgbGF5ZXIuYW5pbWF0ZSBtZXRob2QpXG5cdFx0YW5pbWF0aW9uLnN0b3AoKVxuXHRcdCMgSGF2ZSB0aGUgYW5pbWF0aW9uIHRyYWNrIGl0J3Mgb3duIHBvc2l0aW9uIGluIHRoZSBjaGFpblxuXHRcdGFuaW1hdGlvbi5pbmRleCA9IEBfYW5pbWF0aW9uc0FycmF5Lmxlbmd0aFxuXHRcdCMgU2V0IGV2ZW50IGhhbmRsZXJcdFx0XG5cdFx0YW5pbWF0aW9uLm9uIEV2ZW50cy5BbmltYXRpb25FbmQsIEBfYW5pbWF0aW9uRW5kSGFuZGxlclxuXHRcdCMgQWRkIGl0IHRvIHRoZSBhcnJheVx0XG5cdFx0QF9hbmltYXRpb25zQXJyYXkucHVzaCBhbmltYXRpb25cblx0XHQjIFNldCBfY3VycmVudEFuaW1hdGlvbiBpZiB0aGlzIGlzIHRoZSBmaXJzdCBhbmltYXRpb24gdG8gZ2V0IGFkZGVkXG5cdFx0aWYgQF9hbmltYXRpb25zQXJyYXkubGVuZ3RoIGlzIDFcblx0XHRcdEBfY3VycmVudEFuaW1hdGlvbiA9IEBfYW5pbWF0aW9uc0FycmF5WzBdXG5cdFx0XG5cdF9pc0VuZG9mQ2hhaW46IChhbmltYXRpb24gPSBAX2N1cnJlbnRBbmltYXRpb24pID0+XG5cdFx0YW5pbWF0aW9uLmluZGV4IGlzIEBfYW5pbWF0aW9uc0FycmF5Lmxlbmd0aCAtIDFcblx0XHRcblx0X25leHQ6IChhbmltYXRpb24gPSBAX2N1cnJlbnRBbmltYXRpb24pID0+XG5cdFx0QF9hbmltYXRpb25zQXJyYXlbYW5pbWF0aW9uLmluZGV4ICsgMV0gPyBAX2FuaW1hdGlvbnNBcnJheVswXVxuXHRcblx0c3RhcnQ6ID0+XG5cdFx0aWYgQF9jdXJyZW50QW5pbWF0aW9uP1xuXHRcdFx0QF9jdXJyZW50QW5pbWF0aW9uLnN0YXJ0KClcblx0XHRcdEBlbWl0IEV2ZW50cy5BbmltYXRpb25TdGFydFxuXHRcdFxuXHRzdG9wOiA9PlxuXHRcdEBfY3VycmVudEFuaW1hdGlvbi5zdG9wKClcblx0XHRAZW1pdCBFdmVudHMuQW5pbWF0aW9uU3RvcFxuXG5cblxuIiwiIyBBZGQgdGhlIGZvbGxvd2luZyBsaW5lIHRvIHlvdXIgcHJvamVjdCBpbiBGcmFtZXIgU3R1ZGlvLiBcbiMgbXlNb2R1bGUgPSByZXF1aXJlIFwibXlNb2R1bGVcIlxuIyBSZWZlcmVuY2UgdGhlIGNvbnRlbnRzIGJ5IG5hbWUsIGxpa2UgbXlNb2R1bGUubXlGdW5jdGlvbigpIG9yIG15TW9kdWxlLm15VmFyXG5cbmV4cG9ydHMubXlWYXIgPSBcIm15VmFyaWFibGVcIlxuXG5leHBvcnRzLm15RnVuY3Rpb24gPSAtPlxuXHRwcmludCBcIm15RnVuY3Rpb24gaXMgcnVubmluZ1wiXG5cbmV4cG9ydHMubXlBcnJheSA9IFsxLCAyLCAzXSJdfQ==
