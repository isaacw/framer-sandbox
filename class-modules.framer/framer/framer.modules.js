require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"ObjClass":[function(require,module,exports){
exports.Obj = (function() {
  var _secret;

  _secret = "Shhh";

  function Obj() {
    print("new Obj created");
  }

  Obj.prototype.getSecret = function() {
    return _secret;
  };

  Obj.prototype.setSecret = function(str) {
    return _secret = str;
  };

  return Obj;

})();



},{}]},{},[])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvaXNhYWN3L3NyYy9mcmFtZXItc2FuZGJveC9jbGFzcy1tb2R1bGVzLmZyYW1lci9tb2R1bGVzL09iakNsYXNzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0lBLE9BQWEsQ0FBQztBQUNiLE1BQUEsT0FBQTs7QUFBQSxFQUFBLE9BQUEsR0FBVSxNQUFWLENBQUE7O0FBQ2EsRUFBQSxhQUFBLEdBQUE7QUFDWixJQUFBLEtBQUEsQ0FBTSxpQkFBTixDQUFBLENBRFk7RUFBQSxDQURiOztBQUFBLGdCQUdBLFNBQUEsR0FBVyxTQUFBLEdBQUE7V0FBRyxRQUFIO0VBQUEsQ0FIWCxDQUFBOztBQUFBLGdCQUlBLFNBQUEsR0FBVyxTQUFDLEdBQUQsR0FBQTtXQUFTLE9BQUEsR0FBVSxJQUFuQjtFQUFBLENBSlgsQ0FBQTs7YUFBQTs7SUFERCxDQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIiMgQWRkIHRoZSBmb2xsb3dpbmcgbGluZSB0byB5b3VyIHByb2plY3QgaW4gRnJhbWVyIFN0dWRpby4gXG4jIG15TW9kdWxlID0gcmVxdWlyZSBcIm15TW9kdWxlXCJcbiMgUmVmZXJlbmNlIHRoZSBjb250ZW50cyBieSBuYW1lLCBsaWtlIG15TW9kdWxlLm15RnVuY3Rpb24oKSBvciBteU1vZHVsZS5teVZhclxuXG5jbGFzcyBleHBvcnRzLk9ialxuXHRfc2VjcmV0ID0gXCJTaGhoXCJcblx0Y29uc3RydWN0b3I6IC0+XG5cdFx0cHJpbnQgXCJuZXcgT2JqIGNyZWF0ZWRcIlxuXHRnZXRTZWNyZXQ6IC0+IF9zZWNyZXRcblx0c2V0U2VjcmV0OiAoc3RyKSAtPiBfc2VjcmV0ID0gc3RyXG5cdCJdfQ==
