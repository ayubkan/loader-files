// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"upload.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upload = upload;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// Списал в интернете , это сколько kb занимает 
function bytesToSize(bytes) {
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  if (!bytes) {
    return '0 Byte';
  }

  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
}

var element = function element(tag) {
  var classes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var content = arguments.length > 2 ? arguments[2] : undefined;
  var node = document.createElement(tag);

  if (classes.length) {
    var _node$classList;

    (_node$classList = node.classList).add.apply(_node$classList, _toConsumableArray(classes));
  }

  if (content) {
    node.textContent = content;
  }

  return node;
};

function noop() {}

function upload(selector) {
  var _options$onUpload;

  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var files = []; //удаление картинка через крестик

  var onUpload = (_options$onUpload = options.onUpload) !== null && _options$onUpload !== void 0 ? _options$onUpload : noop;
  var input = document.querySelector(selector);
  var preview = element('div', ['preview']); //Создаю div для список картинков
  // preview.classList.add('preview')

  var open = element('button', ['btn'], 'Открыть');
  var upload = element('button', ['btn', 'primary'], 'Загрузить');
  upload.style.display = 'none'; // Что бы выбрать несколько картинок

  if (options.multi) {
    input.setAttribute('multiple', true);
  } // Тип картинка


  if (options.accept && Array.isArray(options.accept)) {
    input.setAttribute('accept', options.accept.join(','));
  }

  input.insertAdjacentElement('afterend', preview);
  input.insertAdjacentElement('afterend', upload);
  input.insertAdjacentElement('afterend', open); // Функция выбров картинка

  var triggerInput = function triggerInput() {
    return input.click();
  }; // Входящие картинки которое мы выбираем


  var changeHandler = function changeHandler(event) {
    if (!event.target.files.length) {
      return;
    } // Изменяю files на массив


    files = Array.from(event.target.files); //Итарация по файл

    preview.innerHTML = '';
    upload.style.display = 'inline';
    files.forEach(function (file) {
      if (!file.type.match('image')) {
        return;
      } // превью картинка


      var reader = new FileReader();

      reader.onload = function (ev) {
        var src = ev.target.result; //создание картинки

        preview.insertAdjacentHTML('afterbegin', "\n              <div class=\"preview-image\">\n                <div class=\"preview-remove\" data-name=\"".concat(file.name, "\">&times;</div>\n                <img src=\"").concat(src, "\" alt=\"").concat(file.name, "\" />\n                <div class=\"preview-info\">\n                  <span>").concat(file.name, "</span>\n                  ").concat(bytesToSize(file.size), "\n                </div>\n              </div>\n            "));
      }; //  куда мы передаём файл


      reader.readAsDataURL(file);
    });
  }; //Удаление картинка


  var removeHandler = function removeHandler(event) {
    if (!event.target.dataset.name) {
      return;
    }

    var name = event.target.dataset.name;
    files = files.filter(function (file) {
      return file.name !== name;
    });

    if (!files.length) {
      upload.style.display = 'none';
    }

    var block = preview.querySelector("[data-name=\"".concat(name, "\"]")).closest('.preview-image');
    block.classList.add('removing');
    setTimeout(function () {
      return block.remove();
    }, 300);
  };

  var clearPreview = function clearPreview(el) {
    el.style.bottom = '4px';
    el.innerHTML = '<div class="preview-info-progress"></div>';
  }; // Кнопка Загрузить


  var uploadHandler = function uploadHandler() {
    preview.querySelectorAll('.preview-remove').forEach(function (e) {
      return e.remove();
    }); // Удаляю крестики в загрузке
    // Удаление информации картинок

    var previewInfo = preview.querySelectorAll('.preview-info');
    previewInfo.forEach(clearPreview);
    onUpload(files, previewInfo); // Загрузка картинок
  };

  open.addEventListener('click', triggerInput);
  input.addEventListener('change', changeHandler);
  preview.addEventListener('click', removeHandler);
  upload.addEventListener('click', uploadHandler);
}
},{}],"app.js":[function(require,module,exports) {
"use strict";

var _upload = require("./upload.js");

// import firebase from 'firebase/app'
// import 'firebase/storage'
// const firebaseConfig = {
//   apiKey: "AIzaSyA-dBPS93gZGOP_m2qSVmE0ecxwxZWjOjg",
//   authDomain: "fir-e9fcb.firebaseapp.com",
//   projectId: "fir-e9fcb",
//   storageBucket: "fir-e9fcb.appspot.com",
//   messagingSenderId: "650992243835",
//   appId: "1:650992243835:web:4530309027e86c834f7ede"
// };
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
(0, _upload.upload)('#file', {
  multi: true,
  //Что бы выбрать несколько картинок
  accept: ['.png', '.jpg', '.jpeg', '.gif'],
  // Тип картинка
  onUpload: function onUpload(files, blocks) {
    //Загрузка картинка
    files.forEach(function (file, index) {
      // Сохранить картинку
      var ref = storage.ref("images/".concat(file.name));
      var task = ref.put(file); // Для прогресса

      task.on('state_changed', function (snapshot) {
        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes * 100).toFixed(0) + '%';
        var block = blocks[index].querySelector('.preview-info-progress');
        block.textContent = percentage;
        block.style.width = percentage;
      }, function (error) {
        console.log(error);
      }, function () {
        // Взять URL картинка
        task.snapshot.ref.getDownloadURL().then(function (url) {
          console.log('Download URL', url);
        });
      });
    });
  }
});
},{"./upload.js":"upload.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "1030" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.c328ef1a.js.map