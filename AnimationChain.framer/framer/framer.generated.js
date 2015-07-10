// This is autogenerated by Framer Studio


if (typeof(DeviceComponent) !== "undefined") {DeviceComponent.Devices["iphone-6-silver"].deviceImageJP2 = false};
window.Framer.Defaults.DeviceView = {"deviceScale":-1,"deviceType":"iphone-6-silver","contentScale":1,"orientation":0};

window.Framer.Defaults.DeviceComponent = {"deviceScale":-1,"deviceType":"iphone-6-silver","contentScale":1,"orientation":0};

window.FramerStudioInfo = {"deviceImagesUrl":"\/_server\/resources\/DeviceImages","documentTitle":"AnimationChain.framer"};

Framer.Device = new Framer.DeviceView();
Framer.Device.setupContext();
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * Representation of a single EventEmitter function.
 *
 * @param {Function} fn Event handler to be called.
 * @param {Mixed} context Context for function execution.
 * @param {Boolean} once Only emit once
 * @api private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Minimal EventEmitter interface that is molded against the Node.js
 * EventEmitter interface.
 *
 * @constructor
 * @api public
 */
function EventEmitter() { /* Nothing to set */ }

/**
 * Holds the assigned EventEmitters by name.
 *
 * @type {Object}
 * @private
 */
EventEmitter.prototype._events = undefined;

/**
 * Return a list of assigned event listeners.
 *
 * @param {String} event The events that should be listed.
 * @returns {Array}
 * @api public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  if (!this._events || !this._events[event]) return [];
  if (this._events[event].fn) return [this._events[event].fn];

  for (var i = 0, l = this._events[event].length, ee = new Array(l); i < l; i++) {
    ee[i] = this._events[event][i].fn;
  }

  return ee;
};

/**
 * Emit an event to all registered event listeners.
 *
 * @param {String} event The name of the event.
 * @returns {Boolean} Indication if we've emitted an event.
 * @api public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  if (!this._events || !this._events[event]) return false;

  var listeners = this._events[event]
    , len = arguments.length
    , args
    , i;

  if ('function' === typeof listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Register a new EventListener for the given event.
 *
 * @param {String} event Name of the event.
 * @param {Functon} fn Callback function.
 * @param {Mixed} context The context of the function.
 * @api public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  var listener = new EE(fn, context || this);

  if (!this._events) this._events = {};
  if (!this._events[event]) this._events[event] = listener;
  else {
    if (!this._events[event].fn) this._events[event].push(listener);
    else this._events[event] = [
      this._events[event], listener
    ];
  }

  return this;
};

/**
 * Add an EventListener that's only called once.
 *
 * @param {String} event Name of the event.
 * @param {Function} fn Callback function.
 * @param {Mixed} context The context of the function.
 * @api public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  var listener = new EE(fn, context || this, true);

  if (!this._events) this._events = {};
  if (!this._events[event]) this._events[event] = listener;
  else {
    if (!this._events[event].fn) this._events[event].push(listener);
    else this._events[event] = [
      this._events[event], listener
    ];
  }

  return this;
};

/**
 * Remove event listeners.
 *
 * @param {String} event The event we want to remove.
 * @param {Function} fn The listener that we need to find.
 * @param {Boolean} once Only remove once listeners.
 * @api public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, once) {
  if (!this._events || !this._events[event]) return this;

  var listeners = this._events[event]
    , events = [];

  if (fn) {
    if (listeners.fn && (listeners.fn !== fn || (once && !listeners.once))) {
      events.push(listeners);
    }
    if (!listeners.fn) for (var i = 0, length = listeners.length; i < length; i++) {
      if (listeners[i].fn !== fn || (once && !listeners[i].once)) {
        events.push(listeners[i]);
      }
    }
  }

  //
  // Reset the array, or remove it completely if we have no more listeners.
  //
  if (events.length) {
    this._events[event] = events.length === 1 ? events[0] : events;
  } else {
    delete this._events[event];
  }

  return this;
};

/**
 * Remove all listeners or only the listeners for the specified event.
 *
 * @param {String} event The event want to remove all listeners for.
 * @api public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  if (!this._events) return this;

  if (event) delete this._events[event];
  else this._events = {};

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// This function doesn't apply anymore.
//
EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
  return this;
};

//
// Expose the module.
//
EventEmitter.EventEmitter = EventEmitter;
EventEmitter.EventEmitter2 = EventEmitter;
EventEmitter.EventEmitter3 = EventEmitter;

//
// Expose the module.
//
module.exports = EventEmitter;

},{}],2:[function(require,module,exports){
var Bridge, EventEmitter,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

EventEmitter = require("eventemitter3");

Bridge = (function(superClass) {
  extend(Bridge, superClass);

  function Bridge() {
    this.receive = bind(this.receive, this);
    if (typeof window !== "undefined" && window !== null) {
      window._receive = this.receive;
    }
    this.count = 0;
  }

  Bridge.prototype.receive = function(command, info) {
    if (this.debug) {
      console.log((this.count++) + " bridge.receive", command, info);
    }
    return this.emit(command, info);
  };

  Bridge.prototype.send = function(command, info) {
    if (this.debug) {
      console.log((this.count++) + " bridge.send", command, info);
    }
    return typeof window !== "undefined" && window !== null ? typeof window._bridge === "function" ? window._bridge(command, info) : void 0 : void 0;
  };

  Bridge.prototype.sendError = function(error) {
    return this.send("runtime.error", {
      message: error.message,
      lineNumber: error.lineNumber,
      errorType: error.constructor.name
    });
  };

  return Bridge;

})(EventEmitter);

exports.bridge = new Bridge();



},{"eventemitter3":1}],3:[function(require,module,exports){
var ContextListener, ContextListenerPropertyUpdateKeys, bridge, getLayerProperties, traverseUp,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

bridge = require("./Bridge").bridge;

traverseUp = function(layer) {
  var layers;
  layers = [layer];
  while (layer.superLayer) {
    layers.push(layer.superLayer);
    layer = layer.superLayer;
  }
  return layers;
};

getLayerProperties = function(layer) {
  var properties, ref;
  properties = {
    id: layer.id,
    name: layer.name || ((ref = layer.__framerInstanceInfo) != null ? ref.name : void 0) || (layer.constructor.name + " " + layer.id),
    superLayer: null
  };
  _.extend(properties, _.pick(layer, ["x", "y", "z", "index", "width", "height", "scale", "opacity", "rotationX", "rotationY", "rotationZ", "blur"]));
  if (properties.visible === false) {
    properties.visibleResult = false;
  } else {
    properties.visibleResult = indexOf.call(_.pluck(traverseUp(layer), "visible"), false) < 0;
  }
  if (layer._states) {
    properties.states = layer._states._states;
  }
  if (layer.superLayer != null) {
    properties.superLayer = layer.superLayer.id;
  }
  return properties;
};

ContextListenerPropertyUpdateKeys = ["name", "superLayer", "index", "visible"];

ContextListener = (function() {
  function ContextListener(context) {
    this.onLayerDestroy = bind(this.onLayerDestroy, this);
    this.onLayerCreate = bind(this.onLayerCreate, this);
    this.onContextReset = bind(this.onContextReset, this);
    this._update = bind(this._update, this);
    this._context = context;
    this.update = _.debounce(this._update, 10);
    this._context.on("reset", this.onContextReset);
    this._context.on("layer:create", this.onLayerCreate);
    this._context.on("layer:destroy", this.onLayerDestroy);
  }

  ContextListener.prototype._update = function() {
    return bridge.send("ui:layers", _.map(this._context._layerList, getLayerProperties));
  };

  ContextListener.prototype.send = function(eventName, info) {
    return window._bridge("ui:" + eventName, info);
  };

  ContextListener.prototype.onContextReset = function() {
    return this.update();
  };

  ContextListener.prototype.onLayerCreate = function(layer) {
    var i, key, len, results;
    this.update();
    results = [];
    for (i = 0, len = ContextListenerPropertyUpdateKeys.length; i < len; i++) {
      key = ContextListenerPropertyUpdateKeys[i];
      results.push(layer.on("change:" + key, this.update));
    }
    return results;
  };

  ContextListener.prototype.onLayerDestroy = function(layer) {
    var i, key, len, results;
    this.update();
    results = [];
    for (i = 0, len = ContextListenerPropertyUpdateKeys.length; i < len; i++) {
      key = ContextListenerPropertyUpdateKeys[i];
      results.push(layer.on("change:" + key, this.update));
    }
    return results;
  };

  return ContextListener;

})();

exports.ContextListener = ContextListener;



},{"./Bridge":2}],4:[function(require,module,exports){
var ANIMATING_KEYS, CONFIG, canvasScaleX, canvasScaleY, highlightColor, scaledFrame, screenScaledFrame,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

highlightColor = "#28AFFA";

ANIMATING_KEYS = ["x", "y", "width", "height", "scaleX", "scaleY", "scaleZ", "scale"];

CONFIG = {
  borderWidth: 2
};

canvasScaleX = function(layer) {
  var context, i, len, ref, scale, superLayer;
  scale = layer.scale * layer.scaleX;
  ref = layer.superLayers(context = true);
  for (i = 0, len = ref.length; i < len; i++) {
    superLayer = ref[i];
    scale = scale * superLayer.scale * superLayer.scaleX;
  }
  return scale;
};

canvasScaleY = function(layer) {
  var context, i, len, ref, scale, superLayer;
  scale = layer.scale * layer.scaleY;
  ref = layer.superLayers(context = true);
  for (i = 0, len = ref.length; i < len; i++) {
    superLayer = ref[i];
    scale = scale * superLayer.scale * superLayer.scaleY;
  }
  return scale;
};

screenScaledFrame = function(layer) {
  var context, factorX, factorY, frame, i, layerScaledFrame, layers, len, superLayer;
  frame = {
    x: 0,
    y: 0,
    width: layer.width * canvasScaleX(layer),
    height: layer.height * canvasScaleY(layer)
  };
  layers = layer.superLayers(context = true);
  layers.push(layer);
  layers.reverse();
  for (i = 0, len = layers.length; i < len; i++) {
    superLayer = layers[i];
    factorX = superLayer._superOrParentLayer() ? canvasScaleX(superLayer._superOrParentLayer()) : 1;
    factorY = superLayer._superOrParentLayer() ? canvasScaleY(superLayer._superOrParentLayer()) : 1;
    layerScaledFrame = scaledFrame(superLayer);
    frame.x += layerScaledFrame.x * factorX;
    frame.y += layerScaledFrame.y * factorY;
  }
  return frame;
};

scaledFrame = function(layer) {
  var frame, scaleX, scaleY;
  frame = layer.frame;
  scaleX = layer.scale * layer.scaleX;
  scaleY = layer.scale * layer.scaleY;
  frame.width *= scaleX;
  frame.height *= scaleY;
  frame.x += (1 - scaleX) * layer.originX * layer.width;
  frame.y += (1 - scaleY) * layer.originY * layer.height;
  return frame;
};

exports.HighlightComponent = (function() {
  function HighlightComponent() {
    this.update = bind(this.update, this);
    this.highlight = bind(this.highlight, this);
    var ctx;
    ctx = new Framer.Context({
      name: "Highlight"
    });
    ctx.run((function(_this) {
      return function() {
        _this.layer = new Layer;
        return _this.info = new Layer;
      };
    })(this));
    this.layer.style = {
      border: CONFIG.borderWidth + "px solid " + highlightColor,
      zIndex: 10000
    };
    this.layer.backgroundColor = "rgba(40,175,250,0.2)";
    this.info.style = {
      font: "bold 11px HelveticaNeue",
      zIndex: 10000,
      textAlign: "center",
      letterSpacing: ".4px"
    };
    this.info.color = "white";
    this.info.backgroundColor = "transparent";
    this.info.textElement = document.createElement("div");
    _.extend(this.info.textElement.style, {
      color: "#FFFFFF",
      display: "inline-block",
      backgroundColor: "rgba(40,175,250,1)",
      borderRadius: "3px",
      padding: "5px 8px 5px 8px",
      textShadow: "0px 1px 0px rgba(0,0,0,0.1)"
    });
    this.info._element.appendChild(this.info.textElement);
    this.layer.visible = false;
    this.info.visible = false;
    this.unhighlight();
  }

  HighlightComponent.prototype.highlight = function(layer) {
    var i, len, p, results;
    if (this.current === layer) {
      return;
    }
    this.current = layer;
    this.update();
    results = [];
    for (i = 0, len = ANIMATING_KEYS.length; i < len; i++) {
      p = ANIMATING_KEYS[i];
      results.push(this.current.on("change:" + p, this.update));
    }
    return results;
  };

  HighlightComponent.prototype.unhighlight = function() {
    var i, len, p;
    if (!this.current) {
      return;
    }
    for (i = 0, len = ANIMATING_KEYS.length; i < len; i++) {
      p = ANIMATING_KEYS[i];
      this.current.off("change:" + p, this.update);
    }
    this.current = null;
    this.layer.visible = false;
    return this.info.visible = false;
  };

  HighlightComponent.prototype.update = function() {
    var canvasFrame, currentFrame, infoOnTopOrBottom, margin, midXPos, midYPos, ref, yPos;
    if (!this.layer) {
      return;
    }
    if (!this.current) {
      return;
    }
    currentFrame = screenScaledFrame(this.current);
    currentFrame.x -= CONFIG.borderWidth;
    currentFrame.y -= CONFIG.borderWidth;
    currentFrame.width += 2 * CONFIG.borderWidth;
    currentFrame.height += 2 * CONFIG.borderWidth;
    this.layer.visible = true;
    this.layer.frame = currentFrame;
    this.layer.rotation = this.current.rotation;
    this.info.textElement.textContent = "x: " + (this.current.x.toFixed(1)) + ", y: " + (this.current.y.toFixed(1)) + ", width: " + (this.current.width.toFixed(1)) + ", height: " + (this.current.height.toFixed(1));
    canvasFrame = (ref = Framer.Canvas) != null ? ref.frame : void 0;
    if (!canvasFrame) {
      canvasFrame = {
        width: Screen.width,
        height: Screen.height
      };
    }
    margin = 12;
    this.info.visible = true;
    this.info.frame = currentFrame;
    this.info.width = 320;
    this.info.height = 24;
    this.info.style.textAlign = "center";
    midYPos = this.layer.midY;
    midXPos = this.layer.midX;
    infoOnTopOrBottom = true;
    if (this.layer.y < canvasFrame.height - (this.info.height + margin) && this.layer.maxY > (this.info.height + margin)) {
      if (midXPos > canvasFrame.width - ((this.info.width / 2) + margin)) {
        this.info.style.textAlign = "right";
        this.info.maxX = Math.min(this.layer.x - margin, canvasFrame.width - margin);
        infoOnTopOrBottom = false;
      } else if (midXPos < ((this.info.width / 2) + margin)) {
        this.info.style.textAlign = "left";
        this.info.x = Math.max(this.layer.maxX + margin, margin);
        infoOnTopOrBottom = false;
      }
      if (!infoOnTopOrBottom) {
        this.info.midY = Math.max(Math.min(midYPos, canvasFrame.height - ((this.info.height + margin) - margin)), (this.info.height + margin) - margin);
      }
    }
    if (infoOnTopOrBottom) {
      yPos = this.layer.maxY + margin;
      if (yPos > canvasFrame.height - (this.info.height + margin)) {
        yPos = this.layer.y - (this.info.height + margin);
        if (yPos > canvasFrame.height - (this.info.height + margin)) {
          yPos = canvasFrame.height - (this.info.height + margin);
        }
      } else if (yPos < margin) {
        yPos = margin;
      }
      if (midXPos > canvasFrame.width - ((this.info.width / 2) + margin)) {
        midXPos = canvasFrame.width - ((this.info.width / 2) + margin);
        this.info.style.textAlign = "right";
      } else if (midXPos < ((this.info.width / 2) + margin)) {
        midXPos = (this.info.width / 2) + margin;
        this.info.style.textAlign = "left";
      }
      this.info.midX = midXPos;
      this.info.y = yPos;
    }
    this.info.x = Math.max(margin, this.info.x);
    this.info.maxX = Math.min(canvasFrame.width - margin, this.info.maxX);
    this.info.y = Math.max(margin, this.info.y);
    this.info.maxY = Math.min(canvasFrame.height - margin, this.info.maxY);
    return this.info.pixelAlign();
  };

  return HighlightComponent;

})();



},{}],5:[function(require,module,exports){
var BUILDS, EventEmitter, Runtime, bridge, parseUrl,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

EventEmitter = require("eventemitter3");

bridge = require("./Bridge").bridge;

BUILDS = 0;

parseUrl = function(url) {
  var parser;
  parser = document.createElement("a");
  parser.href = url;
  return parser;
};

Runtime = (function(superClass) {
  extend(Runtime, superClass);

  function Runtime() {
    this._errorHandler = bind(this._errorHandler, this);
    this.setup();
  }

  Runtime.prototype.setup = function() {
    var properties;
    if (typeof Framer !== "undefined" && Framer !== null ? Framer.Device : void 0) {
      properties = ["deviceScale", "contentScale", "deviceType", "keyboard", "orientation", "fullScreen"];
      properties.map(function(propertyName) {
        return Framer.Device.on("change:" + propertyName, function() {
          return bridge.send("device:change");
        });
      });
    }
    return bridge.send("runtime.init");
  };

  Runtime.prototype.compile = function(coffeescript) {
    var result;
    if (this.coffeescript === coffeescript) {
      return;
    }
    console.log("» Framer build " + (BUILDS++));
    this._errorHandlerRemove();
    this.coffeescript = coffeescript;
    result = this.uncoffee(this.coffeescript);
    this.sourceMap = result.sourceMap;
    this.javascript = result.js;
    this._errorHandlerSetup();
    return JSON.stringify({
      js: this.javascript
    });
  };

  Runtime.prototype.reset = function() {
    return Utils.reset();
  };

  Runtime.prototype.uncoffee = function(code) {
    var compile, error, options, optionsEx, ref, result;
    options = {
      sourceMap: true,
      filename: "app.coffee"
    };
    optionsEx = {
      returnAST: false,
      returnScope: false,
      returnGlobals: false,
      returnInfo: false,
      framerInstanceInfo: true
    };
    if (Inferencer.cs2js) {
      compile = Inferencer.cs2js;
    } else {
      compile = CoffeeScript.compile;
    }
    result = compile(code, options, optionsEx);
    if (result.error != null) {
      error = new SyntaxError(result.error.message);
      error.lineNumber = -1;
      if (result.error.location != null) {
        error.lineNumber = ((ref = result.error.location) != null ? ref.first_line : void 0) + 1;
      }
      bridge.sendError(error);
      throw new Error("Framer syntax error line " + error.lineNumber + ": " + e.message);
    }
    return result;
  };

  Runtime.prototype._errorHandler = function(runtimeError) {
    var error, errorFromCompiledCoffeeScript, fileName;
    errorFromCompiledCoffeeScript = runtimeError.filename === window.location.href;
    if (errorFromCompiledCoffeeScript) {
      error = new Error(runtimeError.message);
      error.lineNumber = this._lookupLine(runtimeError.lineno);
    } else {
      fileName = _.last(parseUrl(runtimeError.filename).pathname.split("/"));
      error = new Error("[" + fileName + "] " + runtimeError.message);
      error.lineNumber = -1;
    }
    console.log("_errorHandler", runtimeError, error);
    return bridge.sendError(error);
  };

  Runtime.prototype._errorHandlerSetup = function() {
    return window.addEventListener("error", this._errorHandler);
  };

  Runtime.prototype._errorHandlerRemove = function() {
    return window.removeEventListener("error", this._errorHandler);
  };

  Runtime.prototype._lookupLine = function(lineNumber) {
    var char, charIndex, errorColNumber, errorLine, errorLineIndex, errorLineNumber, i, len, loc, sourceLines;
    sourceLines = this.javascript.split("\n");
    errorLineIndex = lineNumber - 1;
    errorLine = sourceLines[errorLineIndex];
    if (!errorLine) {
      return lineNumber;
    }
    errorLineNumber = 1;
    errorColNumber = 0;
    for (charIndex = i = 0, len = errorLine.length; i < len; charIndex = ++i) {
      char = errorLine[charIndex];
      loc = this.sourceMap.sourceLocation([errorLineIndex, charIndex]);
      if (loc && loc[0] > errorLineNumber) {
        errorLineNumber = loc[0] + 1;
        errorColNumber = loc[1];
      }
    }
    return errorLineNumber;
  };

  return Runtime;

})(EventEmitter);

exports.runtime = new Runtime();



},{"./Bridge":2,"eventemitter3":1}],6:[function(require,module,exports){
var HighlightComponent, getLayerById, setupContext;

exports.bridge = (require("./Bridge.coffee")).bridge;

exports.runtime = (require("./Runtime.coffee")).runtime;

exports.context = require("./Context.coffee");

HighlightComponent = require("./HighlightComponent.coffee").HighlightComponent;

if (window.require == null) {
  window.require = function(module) {
    throw Error("Module " + module + " can't be found");
  };
}

getLayerById = function(id) {
  var i, layer, len, ref;
  ref = Framer.CurrentContext._layerList;
  for (i = 0, len = ref.length; i < len; i++) {
    layer = ref[i];
    if (layer.id === id) {
      return layer;
    }
  }
};

setupContext = function() {
  var context, highlighter, savedProperties;
  context = new exports.context.ContextListener(Framer.CurrentContext);
  highlighter = new HighlightComponent();
  exports.bridge.on("ui:highlight", function(info) {
    return highlighter.highlight(getLayerById(info.id));
  });
  exports.bridge.on("ui:unhighlight", function() {
    return highlighter.unhighlight();
  });
  savedProperties = null;
  exports.bridge.on("ui:setstate", function(info) {
    var layer;
    layer = getLayerById(info.id);
    if (info.state === "Current") {
      return layer.properties = savedProperties;
    } else {
      savedProperties = layer.properties;
      return layer.states.switchInstant(info.state);
    }
  });
  return exports.bridge.on("ui:updateState", function(info) {
    var layer;
    layer = getLayerById(info.layerId);
    layer[info.propertyName] = info.value;
    return layer.states._states[info.stateName][info.propertyName] = info.value;
  });
};

if (typeof window !== "undefined" && window !== null) {
  window.FramerStudio = exports;
  setupContext();
}



},{"./Bridge.coffee":2,"./Context.coffee":3,"./HighlightComponent.coffee":4,"./Runtime.coffee":5}]},{},[6])