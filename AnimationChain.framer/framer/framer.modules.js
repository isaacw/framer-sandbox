require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"AnimationSequence":[function(require,module,exports){
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.AnimationSequence = (function(superClass) {
  extend(AnimationSequence, superClass);

  function AnimationSequence(options) {
    var animation, k, ref, ref1;
    if (options == null) {
      options = {};
    }
    this.stop = bind(this.stop, this);
    this.start = bind(this.start, this);
    this._next = bind(this._next, this);
    this._isEndOfSequence = bind(this._isEndOfSequence, this);
    this._update = bind(this._update, this);
    this.add = bind(this.add, this);
    this._animationsArray = [];
    this._currentAnimation = null;
    ref = options.animations;
    for (k in ref) {
      animation = ref[k];
      this.add(animation);
    }
    this.repeat = (ref1 = options.repeat) != null ? ref1 : false;
  }

  AnimationSequence.prototype.add = function(animation) {
    animation.stop();
    animation.index = this._animationsArray.length;
    animation.on(Events.AnimationEnd, (function(_this) {
      return function() {
        return _this._update();
      };
    })(this));
    this._animationsArray.push(animation);
    if (this._animationsArray.length === 1) {
      return this._currentAnimation = this._animationsArray[0];
    }
  };

  AnimationSequence.prototype._update = function() {
    if (this._isEndOfSequence() && this.repeat === false) {
      this.emit(Events.AnimationEnd);
    } else {
      this._next().start();
    }
    return this._currentAnimation = this._next();
  };

  AnimationSequence.prototype._isEndOfSequence = function(animation) {
    if (animation == null) {
      animation = this._currentAnimation;
    }
    return animation.index === this._animationsArray.length - 1;
  };

  AnimationSequence.prototype._next = function() {
    var ref;
    return (ref = this._animationsArray[this._currentAnimation.index + 1]) != null ? ref : this._animationsArray[0];
  };

  AnimationSequence.prototype.start = function() {
    if (this._currentAnimation != null) {
      this._currentAnimation.start();
      return this.emit(Events.AnimationStart);
    }
  };

  AnimationSequence.prototype.stop = function() {
    this._currentAnimation.stop();
    return this.emit(Events.AnimationStop);
  };

  return AnimationSequence;

})(Framer.EventEmitter);



},{}],"AnimationSet":[function(require,module,exports){
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.AnimationSet = (function(superClass) {
  extend(AnimationSet, superClass);

  function AnimationSet(options) {
    var animation, k, ref, ref1;
    if (options == null) {
      options = {};
    }
    this.stop = bind(this.stop, this);
    this.start = bind(this.start, this);
    this.isAnimating = bind(this.isAnimating, this);
    this._update = bind(this._update, this);
    this.add = bind(this.add, this);
    this._animationsArray = [];
    ref = options.animations;
    for (k in ref) {
      animation = ref[k];
      this.add(animation);
    }
    this.repeat = (ref1 = options.repeat) != null ? ref1 : false;
  }

  AnimationSet.prototype.add = function(animation) {
    animation.stop();
    animation.isAnimating = false;
    animation.on(Events.AnimationEnd, (function(_this) {
      return function() {
        animation.isAnimating = false;
        return _this._update();
      };
    })(this));
    return this._animationsArray.push(animation);
  };

  AnimationSet.prototype._update = function() {
    if (!this.isAnimating()) {
      if (this.repeat) {
        return this.start();
      } else {
        return this.emit(Events.AnimationEnd);
      }
    }
  };

  AnimationSet.prototype.isAnimating = function() {
    return _.any(this._animationsArray, "isAnimating", true);
  };

  AnimationSet.prototype.start = function() {
    var animation, i, len, ref;
    ref = this._animationsArray;
    for (i = 0, len = ref.length; i < len; i++) {
      animation = ref[i];
      animation.start();
      animation.isAnimating = true;
    }
    return this.emit(Events.AnimationStart);
  };

  AnimationSet.prototype.stop = function() {
    var animation, i, len, ref;
    ref = this._animationsArray;
    for (i = 0, len = ref.length; i < len; i++) {
      animation = ref[i];
      animation.stop();
      animation.isAnimating = false;
    }
    return this.emit(Events.AnimationStop);
  };

  return AnimationSet;

})(Framer.EventEmitter);



},{}]},{},[])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvaXNhYWN3L3NyYy9mcmFtZXItc2FuZGJveC9BbmltYXRpb25DaGFpbi5mcmFtZXIvbW9kdWxlcy9BbmltYXRpb25TZXF1ZW5jZS5jb2ZmZWUiLCIvVXNlcnMvaXNhYWN3L3NyYy9mcmFtZXItc2FuZGJveC9BbmltYXRpb25DaGFpbi5mcmFtZXIvbW9kdWxlcy9BbmltYXRpb25TZXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDT0EsSUFBQTs7NkJBQUE7O0FBQUEsT0FBYSxDQUFDO0FBRWIsdUNBQUEsQ0FBQTs7QUFBYSxFQUFBLDJCQUFDLE9BQUQsR0FBQTtBQUNaLFFBQUEsdUJBQUE7O01BRGEsVUFBVTtLQUN2QjtBQUFBLHFDQUFBLENBQUE7QUFBQSx1Q0FBQSxDQUFBO0FBQUEsdUNBQUEsQ0FBQTtBQUFBLDZEQUFBLENBQUE7QUFBQSwyQ0FBQSxDQUFBO0FBQUEsbUNBQUEsQ0FBQTtBQUFBLElBQUEsSUFBQyxDQUFBLGdCQUFELEdBQW9CLEVBQXBCLENBQUE7QUFBQSxJQUNBLElBQUMsQ0FBQSxpQkFBRCxHQUFxQixJQURyQixDQUFBO0FBRUE7QUFBQSxTQUFBLFFBQUE7eUJBQUE7QUFBQSxNQUFBLElBQUMsQ0FBQSxHQUFELENBQUssU0FBTCxDQUFBLENBQUE7QUFBQSxLQUZBO0FBQUEsSUFHQSxJQUFDLENBQUEsTUFBRCw0Q0FBMkIsS0FIM0IsQ0FEWTtFQUFBLENBQWI7O0FBQUEsOEJBTUEsR0FBQSxHQUFLLFNBQUMsU0FBRCxHQUFBO0FBR0osSUFBQSxTQUFTLENBQUMsSUFBVixDQUFBLENBQUEsQ0FBQTtBQUFBLElBR0EsU0FBUyxDQUFDLEtBQVYsR0FBa0IsSUFBQyxDQUFBLGdCQUFnQixDQUFDLE1BSHBDLENBQUE7QUFBQSxJQUtBLFNBQVMsQ0FBQyxFQUFWLENBQWEsTUFBTSxDQUFDLFlB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Q0FBQyxXQUFWLEdBQXdCLEtBRHhCLENBREQ7QUFBQSxLQUFBO1dBR0EsSUFBQyxDQUFBLElBQUQsQ0FBTSxNQUFNLENBQUMsYUFBYixFQUpLO0VBQUEsQ0FyQ04sQ0FBQTs7c0JBQUE7O0dBRmtDLE1BQU0sQ0FBQyxhQUExQyxDQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIiMgQW5pbWF0aW9uIFNlcXVlbmNlXG4jIE1hbmFnZXMgYSBzZXF1ZW5jZSBvZiBBbmltYXRpb25zXG4jIFxuIyBieSBJc2FhYyBXZWluaGF1c2VuXG4jIGh0dHA6Ly9pc2FhY3cuY29tXG5cblxuY2xhc3MgZXhwb3J0cy5BbmltYXRpb25TZXF1ZW5jZSBleHRlbmRzIEZyYW1lci5FdmVudEVtaXR0ZXJcblx0XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdEBfYW5pbWF0aW9uc0FycmF5ID0gW11cblx0XHRAX2N1cnJlbnRBbmltYXRpb24gPSBudWxsXG5cdFx0QGFkZChhbmltYXRpb24pIGZvciBrLCBhbmltYXRpb24gb2Ygb3B0aW9ucy5hbmltYXRpb25zXG5cdFx0QHJlcGVhdCA9IG9wdGlvbnMucmVwZWF0ID8gZmFsc2Vcblx0XHRcdFxuXHRhZGQ6IChhbmltYXRpb24pID0+XG5cdFx0XG5cdFx0IyBFbnN1cmUgdGhlIGFuaW1hdGlvbiBpcyBzdG9wcGVkIChuZWVkZWQgZm9yIHdoZW4gcGFzc2VkIHZpYSB0aGUgbGF5ZXIuYW5pbWF0ZSBtZXRob2QpXG5cdFx0YW5pbWF0aW9uLnN0b3AoKVxuXHRcdFxuXHRcdCMgSGF2ZSB0aGUgYW5pbWF0aW9uIHRyYWNrIGl0J3Mgb3duIHBvc2l0aW9uIGluIHRoZSBjaGFpblxuXHRcdGFuaW1hdGlvbi5pbmRleCA9IEBfYW5pbWF0aW9uc0FycmF5Lmxlbmd0aFxuXHRcdFxuXHRcdGFuaW1hdGlvbi5vbiBFdmVudHMuQW5pbWF0aW9uRW5kLCA9PlxuXHRcdFx0QF91cGRhdGUoKVxuXHRcdFx0XG5cdFx0QF9hbmltYXRpb25zQXJyYXkucHVzaCBhbmltYXRpb25cblx0XHRcblx0XHQjIFNldCBfY3VycmVudEFuaW1hdGlvbiBpZiB0aGlzIGlzIHRoZSBmaXJzdCBhbmltYXRpb24gYWRkZWRcblx0XHRpZiBAX2FuaW1hdGlvbnNBcnJheS5sZW5ndGggaXMgMVxuXHRcdFx0QF9jdXJyZW50QW5pbWF0aW9uID0gQF9hbmltYXRpb25zQXJyYXlbMF1cblx0XHRcblx0XHRcblx0X3VwZGF0ZTogPT5cblx0XHRcblx0XHQjIEVuZCBvZiBzZXF1ZW5jZT8gRG8gbm90IHJlc3RhcnQ/XG5cdFx0aWYgQF9pc0VuZE9mU2VxdWVuY2UoKSBhbmQgQHJlcGVhdCBpcyBmYWxzZVxuXHRcdFx0QGVtaXQgRXZlbnRzLkFuaW1hdGlvbkVuZFxuXHRcdFx0XG5cdFx0IyBOZXZlcm1pbmQsIG1vdmUgYWxvbmcuLi5cblx0XHRlbHNlXG5cdFx0XHQjIFN0YXJ0IG5leHQgYW5pbWF0aW9uIChvciByZXN0YXJ0IHNlcXVlbmNlKVxuXHRcdFx0QF9uZXh0KCkuc3RhcnQoKVxuXHRcdFx0XG5cdFx0IyAoUmUpU2V0IGN1cnJlbnQgQW5pbWF0aW9uXG5cdFx0QF9jdXJyZW50QW5pbWF0aW9uID0gQF9uZXh0KClcblxuXG5cdF9pc0VuZE9mU2VxdWVuY2U6IChhbmltYXRpb24gPSBAX2N1cnJlbnRBbmltYXRpb24pID0+XG5cdFx0YW5pbWF0aW9uLmluZGV4IGlzIEBfYW5pbWF0aW9uc0FycmF5Lmxlbmd0aCAtIDFcblx0XHRcblx0X25leHQ6ID0+XG5cdFx0QF9hbmltYXRpb25zQXJyYXlbQF9jdXJyZW50QW5pbWF0aW9uLmluZGV4ICsgMV0gPyBAX2FuaW1hdGlvbnNBcnJheVswXVxuXHRcblx0c3RhcnQ6ID0+XG5cdFx0aWYgQF9jdXJyZW50QW5pbWF0aW9uP1xuXHRcdFx0QF9jdXJyZW50QW5pbWF0aW9uLnN0YXJ0KClcblx0XHRcdEBlbWl0IEV2ZW50cy5BbmltYXRpb25TdGFydFxuXHRcdFxuXHRzdG9wOiA9PlxuXHRcdEBfY3VycmVudEFuaW1hdGlvbi5zdG9wKClcblx0XHRAZW1pdCBFdmVudHMuQW5pbWF0aW9uU3RvcFxuXG5cblxuIiwiIyBBbmltYXRpb24gU2V0XG4jIE1hbmFnZXMgYSBzZXQgb2YgQW5pbWF0aW9uc1xuIyBcbiMgYnkgSXNhYWMgV2VpbmhhdXNlblxuIyBodHRwOi8vaXNhYWN3LmNvbVxuXG5cbmNsYXNzIGV4cG9ydHMuQW5pbWF0aW9uU2V0IGV4dGVuZHMgRnJhbWVyLkV2ZW50RW1pdHRlclxuXHRcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0QF9hbmltYXRpb25zQXJyYXkgPSBbXVxuXHRcdEBhZGQoYW5pbWF0aW9uKSBmb3IgaywgYW5pbWF0aW9uIG9mIG9wdGlvbnMuYW5pbWF0aW9uc1xuXHRcdEByZXBlYXQgPSBvcHRpb25zLnJlcGVhdCA/IGZhbHNlXG5cdFx0XHRcblx0YWRkOiAoYW5pbWF0aW9uKSA9PlxuXHRcdFxuXHRcdCMgRW5zdXJlIHRoZSBhbmltYXRpb24gaXMgc3RvcHBlZCAobmVlZGVkIHdoZW4gcGFzc2VkIHZpYSB0aGUgbGF5ZXIuYW5pbWF0ZSBtZXRob2QpXG5cdFx0YW5pbWF0aW9uLnN0b3AoKVxuXHRcdFxuXHRcdCMgSGF2ZSB0aGUgYW5pbWF0aW9uIHRyYWNrIGl0cyBhbmltYXRpbmcgc3RhdGVcblx0XHRhbmltYXRpb24uaXNBbmltYXRpbmcgPSBmYWxzZVxuXHRcdFxuXHRcdGFuaW1hdGlvbi5vbiBFdmVudHMuQW5pbWF0aW9uRW5kLCA9PlxuXHRcdFx0YW5pbWF0aW9uLmlzQW5pbWF0aW5nID0gZmFsc2Vcblx0XHRcdEBfdXBkYXRlKClcblx0XHRcdFxuXHRcdEBfYW5pbWF0aW9uc0FycmF5LnB1c2ggYW5pbWF0aW9uXG5cdFxuXHRcblx0X3VwZGF0ZTogKCkgPT5cblx0XHQjIEhhdmUgYWxsIGFuaW1hdGlvbnMgc3RvcHBlZD9cblx0XHRpZiBub3QgQGlzQW5pbWF0aW5nKClcblx0XHRcdGlmIEByZXBlYXRcblx0XHRcdFx0QHN0YXJ0KClcblx0XHRcdGVsc2Vcblx0XHRcdFx0QGVtaXQgRXZlbnRzLkFuaW1hdGlvbkVuZFxuXHRcdFxuXHRpc0FuaW1hdGluZzogPT5cblx0XHRfLmFueShAX2FuaW1hdGlvbnNBcnJheSwgXCJpc0FuaW1hdGluZ1wiLCB0cnVlKVxuXHRcblx0c3RhcnQ6ID0+XG5cdFx0Zm9yIGFuaW1hdGlvbiBpbiBAX2FuaW1hdGlvbnNBcnJheVxuXHRcdFx0YW5pbWF0aW9uLnN0YXJ0KClcblx0XHRcdGFuaW1hdGlvbi5pc0FuaW1hdGluZyA9IHRydWVcblx0XHRAZW1pdCBFdmVudHMuQW5pbWF0aW9uU3RhcnRcblx0XHRcblx0c3RvcDogPT5cblx0XHRmb3IgYW5pbWF0aW9uIGluIEBfYW5pbWF0aW9uc0FycmF5XG5cdFx0XHRhbmltYXRpb24uc3RvcCgpXG5cdFx0XHRhbmltYXRpb24uaXNBbmltYXRpbmcgPSBmYWxzZVxuXHRcdEBlbWl0IEV2ZW50cy5BbmltYXRpb25TdG9wIl19
