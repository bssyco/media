/*!
    * Bssyco Media 1.0.1 (https://bssyco.github.io/media/)
    * Copyright 2026 Parviz Taghavi
    * Licensed under MIT (https://github.com/bssyco/media/LICENSE)
    */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery')) :
  typeof define === 'function' && define.amd ? define(['exports', 'jquery'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.media = {}, global.jQuery));
})(this, (function (exports, $$1) { 'use strict';

  function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
  }
  function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
      var o = r[t];
      o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
  }
  function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
      writable: false
    }), e;
  }
  function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: true,
      configurable: true,
      writable: true
    }) : e[r] = t, e;
  }
  function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread2(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys(Object(t), true).forEach(function (r) {
        _defineProperty(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r);
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (String )(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }

  var MEDIA_NAME = "media";
  var MEDIA_VERSION = "1.0.1";
  var MEDIA_DATA_KEY = "bs.media";
  var MEDIA_EVENT_KEY = ".".concat(MEDIA_DATA_KEY);
  var MEDIA_DEFAULTS = {
    mediaPreviewer: true,
    name: "media",
    apiUrl: "/api/media-list",
    // Your backend endpoint
    perPage: 48,
    // Files per page
    title: "Media Library",
    // Modal title
    selectText: "Select",
    // Select button text
    cancelText: "Cancel",
    // Cancel button text
    allText: "All",
    // "All folders" tab text
    searchPlaceholder: "Search files...",
    // Search input placeholder
    emptyText: "No files found",
    // Empty this.state text
    errorText: "Error loading files",
    // Error this.state text
    fileInfoText: "{count} files",
    // Footer info (supports {count} and {selected})
    selectedInfoText: "{selected} selected — {count} files",
    uploaderButtonText: "Media Library",
    // Button text on uploader
    uploaderButtonIcon: "bi bi-images",
    // Bootstrap icon class
    ajaxHeaders: {},
    // Extra headers for API call (e.g. Authorization)
    ajaxData: {},
    // Extra params for API call (e.g. csrf token)
    multiple: false,
    addTitle: "",
    clearTitle: ""
  };
  var MEDIA_DEFAULT_TYPE = {
    mediaPreviewer: "(function|string|boolean)"
  };
  var MEDIA_EVENTS = {
    ADD: "add".concat(MEDIA_EVENT_KEY),
    ADDED: "added".concat(MEDIA_EVENT_KEY),
    CHANGE: "change".concat(MEDIA_EVENT_KEY),
    CLEAR: "clear".concat(MEDIA_EVENT_KEY),
    CLEARED: "cleared".concat(MEDIA_EVENT_KEY),
    DELETE: "delete".concat(MEDIA_EVENT_KEY),
    DELETED: "deleted".concat(MEDIA_EVENT_KEY),
    CHANGE_DATA_API: "change".concat(MEDIA_EVENT_KEY),
    CLICK_DATA_API: "click".concat(MEDIA_EVENT_KEY),
    CLICK_SELECT_BTN: "click".concat(MEDIA_EVENT_KEY),
    CLICK_FOLDER_BTN: "click".concat(MEDIA_EVENT_KEY),
    CLICK_PAGE_BTN: "click".concat(MEDIA_EVENT_KEY),
    CLICK_ITEM: "click".concat(MEDIA_EVENT_KEY),
    CLICK_INPUT_SEARCH: "click".concat(MEDIA_EVENT_KEY)
  };
  var MEDIA_ELEMENTS = {
    ADD: ".media-add",
    REMOVE: ".media-remove",
    CLEAR: ".media-clear",
    LIST_ITEM: ".media-item",
    SELECT: ".media-new-select",
    ITEM: ".media-new-item",
    FOLDER: ".media-new-folder-btn",
    PAGE: ".media-new-page-btn",
    SEARCH: ".media-new-search"};
  var FILE_ICONS = {
    pdf: "fa-file-pdf text-danger",
    doc: "fa-file-word text-primary",
    docx: "fa-file-word text-primary",
    xls: "fa-file-excel text-success",
    xlsx: "fa-file-excel text-success",
    csv: "fa-file-csv text-success",
    ppt: "fa-file-powerpoint text-warning",
    pptx: "fa-file-powerpoint text-warning",
    txt: "fa-file-text text-secondary",
    zip: "fa-file-zipper text-info",
    rar: "fa-file-zipper text-info",
    mp4: "fa-file-video text-info",
    mp3: "fa-file-audio text-info",
    svg: "fa-file-image text-warning",
    jpg: "fa-file-image text-primary",
    png: "fa-file-image text-primary",
    jpeg: "fa-file-image text-primary"
  };

  var TRANSITION_END = 'transitionend';
  var MAX_UID = 1000000;
  var MILLISECONDS_MULTIPLIER = 1000;

  // Shoutout AngusCroll (https://goo.gl/pxwQGp)
  function toType(obj) {
    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
  }
  function getSpecialTransitionEndEvent() {
    return {
      bindType: TRANSITION_END,
      delegateType: TRANSITION_END,
      handle: function handle(event) {
        if ($$1(event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
        }
        return undefined; // eslint-disable-line no-undefined
      }
    };
  }
  function transitionEndEmulator(duration) {
    var _this = this;
    var called = false;
    $$1(this).one(Util.TRANSITION_END, function () {
      called = true;
    });
    setTimeout(function () {
      if (!called) {
        Util.triggerTransitionEnd(_this);
      }
    }, duration);
    return this;
  }
  function setTransitionEndSupport() {
    $$1.fn.emulateTransitionEnd = transitionEndEmulator;
    $$1.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
  }

  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */

  var Util = {
    TRANSITION_END: 'bsTransitionEnd',
    getUID: function getUID(prefix) {
      do {
        // eslint-disable-next-line no-bitwise
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(prefix));
      return prefix;
    },
    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');
      if (!selector || selector === '#') {
        var hrefAttr = element.getAttribute('href');
        selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : '';
      }
      try {
        return document.querySelector(selector) ? selector : null;
      } catch (err) {
        return null;
      }
    },
    getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
      if (!element) {
        return 0;
      }

      // Get transition-duration of the element
      var transitionDuration = $$1(element).css('transition-duration');
      var transitionDelay = $$1(element).css('transition-delay');
      var floatTransitionDuration = parseFloat(transitionDuration);
      var floatTransitionDelay = parseFloat(transitionDelay);

      // Return 0 if element or transition duration is not found
      if (!floatTransitionDuration && !floatTransitionDelay) {
        return 0;
      }

      // If multiple durations are defined, take the first
      transitionDuration = transitionDuration.split(',')[0];
      transitionDelay = transitionDelay.split(',')[0];
      return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
    },
    reflow: function reflow(element) {
      return element.offsetHeight;
    },
    triggerTransitionEnd: function triggerTransitionEnd(element) {
      $$1(element).trigger(TRANSITION_END);
    },
    // TODO: Remove in v5
    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(TRANSITION_END);
    },
    isElement: function isElement(obj) {
      return (obj[0] || obj).nodeType;
    },
    typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
      for (var property in configTypes) {
        if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = value && Util.isElement(value) ? 'element' : toType(value);
          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error("".concat(componentName.toUpperCase(), ": ") + "Option \"".concat(property, "\" provided type \"").concat(valueType, "\" ") + "but expected type \"".concat(expectedTypes, "\"."));
          }
        }
      }
    },
    findShadowRoot: function findShadowRoot(element) {
      if (!document.documentElement.attachShadow) {
        return null;
      }

      // Can find the shadow root otherwise it'll return the document
      if (typeof element.getRootNode === 'function') {
        var root = element.getRootNode();
        return root instanceof ShadowRoot ? root : null;
      }
      if (element instanceof ShadowRoot) {
        return element;
      }

      // when we don't find a shadow root
      if (!element.parentNode) {
        return null;
      }
      return Util.findShadowRoot(element.parentNode);
    },
    escHtml: function escHtml(s) {
      return $$1("<span>").text(s).html();
    },
    fileIcon: function fileIcon(name) {
      var ext = (name || "").split(".").pop().toLowerCase();
      return FILE_ICONS[ext] || "fa-file text-secondary";
    },
    formatSize: function formatSize(bytes) {
      if (bytes < 1024) return bytes + " B";
      if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
      return (bytes / 1048576).toFixed(1) + " MB";
    }
  };
  setTransitionEndSupport();

  function getDefaultExportFromCjs (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  var stringTemplate;
  var hasRequiredStringTemplate;

  function requireStringTemplate () {
  	if (hasRequiredStringTemplate) return stringTemplate;
  	hasRequiredStringTemplate = 1;
  	var nargs = /\{([0-9a-zA-Z_]+)\}/g;

  	stringTemplate = template;

  	function template(string) {
  	    var args;

  	    if (arguments.length === 2 && typeof arguments[1] === "object") {
  	        args = arguments[1];
  	    } else {
  	        args = new Array(arguments.length - 1);
  	        for (var i = 1; i < arguments.length; ++i) {
  	            args[i - 1] = arguments[i];
  	        }
  	    }

  	    if (!args || !args.hasOwnProperty) {
  	        args = {};
  	    }

  	    return string.replace(nargs, function replaceArg(match, i, index) {
  	        var result;

  	        if (string[index - 1] === "{" &&
  	            string[index + match.length] === "}") {
  	            return i
  	        } else {
  	            result = args.hasOwnProperty(i) ? args[i] : null;
  	            if (result === null || result === undefined) {
  	                return ""
  	            }

  	            return result
  	        }
  	    })
  	}
  	return stringTemplate;
  }

  var stringTemplateExports = requireStringTemplate();
  var format = /*@__PURE__*/getDefaultExportFromCjs(stringTemplateExports);

  var mediaNewTemplate = "<div class=\"modal fade\" tabindex=\"-1\">\r\n    <div class=\"modal-dialog modal-xl modal-dialog-scrollable\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header py-2\">\r\n                <h6 class=\"modal-title\">\r\n                    <i class=\"fa fa-images me-1\">\r\n                    </i> {Title}\r\n                </h6>\r\n                <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\"></button>\r\n            </div>\r\n            <div class=\"row px-3 pt-2\">\r\n                <div class=\"col-sm-8 media-new-folders d-flex flex-wrap gap-1 pb-1\"></div>\r\n                <div class=\"col-sm-4 pb-1\">\r\n                    <input type=\"text\" class=\"form-control form-control-sm media-new-search\" placeholder=\"{SearchPlaceholder}\" />\r\n                </div>\r\n            </div>\r\n            <div class=\"modal-body\" style=\"min-height:340px;\">\r\n                <div class=\"media-new-grid\"></div>\r\n                <div class=\"media-new-empty\" style=\"display:none;\">\r\n                    <i class=\"fa fa-folder2-open\"></i>\r\n                    {EmptyText}\r\n                </div>\r\n                <div class=\"media-new-loading\" style=\"display:none;\">\r\n                    <i class=\"fa fa-arrows\"></i>\r\n                </div>\r\n            </div>\r\n            <div class=\"modal-footer py-2 d-flex justify-content-between\">\r\n                <div class=\"media-new-footer-info\"></div>\r\n                <div class=\"d-flex flex-wrap align-items-center gap-1\">\r\n                    <nav class=\" pb-1\">\r\n                        <ul class=\"pagination pagination-sm mb-0 media-new-pagination\"></ul>\r\n                    </nav>\r\n                    <button type=\"button\" class=\"btn btn-sm btn-primary media-new-select pb-1\" disabled> {SelectText}\r\n                    </button>\r\n                    <button type=\"button\" class=\"btn btn-sm btn-secondary pb-1\" data-bs-dismiss=\"modal\"> {CancelText}\r\n                    </button>\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n</div>";
  var mediaNewGridTemplate = "<div class=\"media-new-item {selClass}\" data-url=\"{url}\" data-name=\"{name}\" data-type=\"{type}\" title=\"{name} ({size})\">\r\n    {preview}\r\n    <div class=\" media-new-check\">\r\n        <i class=\"fa fa-check\"></i>\r\n    </div>\r\n    <div class=\"media-new-item-name\">\r\n        {name}\r\n    </div>\r\n</div>";
  var MediaNew = /*#__PURE__*/function () {
    function MediaNew(config, context, onSuccess) {
      _classCallCheck(this, MediaNew);
      _defineProperty(this, "defaults", $$1.extend({}, MEDIA_DEFAULTS));
      this._config = config;
      this.searchTimer = null;
      this.$modal = null;
      this.state = {
        files: [],
        folders: [],
        selected: [],
        folder: "",
        search: "",
        page: 1,
        pages: 1,
        total: 0,
        multiple: false,
        loading: false,
        context: context,
        onSuccess: onSuccess,
        config: {}
      };
      $$1(document).on("uploader-init", "input", this, function (event) {
        setTimeout(function (context) {
          var $el = $$1(context);
          var uploader = $el.data("jqueryUploader");
          if (!uploader || uploader._mlPatched) return;
          uploader._mlPatched = true;
          uploader.refreshPreviewFileList = function (context, uploader) {
            var origRefresh = uploader.refreshPreviewFileList.bind(uploader);
            origRefresh();
            context.injectBrowseButton(uploader);
          };
          context.injectBrowseButton(uploader);
        }, 0, event.data);
      });
    }
    return _createClass(MediaNew, [{
      key: "open",
      value:
      /**
       * @param {Object} opts
       * @param {boolean}  opts.multiple  - Allow multiple file selection (default: false)
       * @param {string}   opts.folder    - Pre-select a folder tab
       * @param {Function} opts.onSelect  - Callback: function(files) where files = [{url, name}]
       * @param {string}   opts.apiUrl    - Override API endpoint for this call
       * @param {Object}   opts.ajaxData  - Extra AJAX params for this call
       */
      function open() {
        //open(opts) {
        // opts = opts || {};
        this.state.config = $$1.extend({}, MEDIA_DEFAULTS, MediaNew.defaults, this._config
        //opts,
        );
        this.state.multiple = !!this._config.multiple;
        this.buildModal();
        this.$modal.find(".media-new-search").val("");
        bootstrap.Modal.getOrCreateInstance(this.$modal[0]).show();
        this.loadFiles();
      }
    }, {
      key: "template",
      value: function template(str, data) {
        return str.replace(/\{(\w+)\}/g, function (m, key) {
          return data[key] !== undefined ? data[key] : m;
        });
      }
    }, {
      key: "buildModal",
      value: function buildModal() {
        if (this.$modal) return;
        var cfg = this.state.config;
        var html = format(mediaNewTemplate, {
          Title: Util.escHtml(cfg.title),
          EmptyText: Util.escHtml(cfg.emptyText),
          SearchPlaceholder: Util.escHtml(cfg.searchPlaceholder),
          CancelText: Util.escHtml(cfg.cancelText),
          SelectText: Util.escHtml(cfg.selectText)
        });
        this.$modal = $$1(html);
        $$1("body").append(this.$modal);
        this.$modal.on(MEDIA_EVENTS.CLICK_SELECT_BTN, MEDIA_ELEMENTS.SELECT, this, function (event) {
          return event.data.onConfirm();
        });
        this.$modal.on(MEDIA_EVENTS.CLICK_ITEM, MEDIA_ELEMENTS.ITEM, this, function (event) {
          return event.data.onItemClick(event);
        });
        this.$modal.on(MEDIA_EVENTS.CLICK_FOLDER_BTN, MEDIA_ELEMENTS.FOLDER, this, function (event) {
          return event.data.onFolderClick(event);
        });
        this.$modal.on(MEDIA_EVENTS.CLICK_PAGE_BTN, MEDIA_ELEMENTS.PAGE, this, function (event) {
          return event.data.onPageClick(event);
        });
        this.$modal.on(MEDIA_EVENTS.CLICK_INPUT_SEARCH, MEDIA_ELEMENTS.SEARCH, this, function (event) {
          return event.data.onSearchInput(event);
        });
        this.$modal.on(MEDIA_EVENTS.HIDDEN_BS_MODAL, this, function (event) {
          event.data.state.selected = [];
          //event.data.state.onSelect = null;
          event.data.state.onSuccess = null;
        });
      }
    }, {
      key: "renderFolders",
      value: function renderFolders() {
        var cfg = this.state.config;
        var $folders = this.$modal.find(".media-new-folders").empty();
        $folders.append("<button type=\"button\" class=\"btn btn-outline-secondary btn-sm media-new-folder-btn ".concat(this.state.folder === "" ? " active" : "", "\" data-folder=\"\">\n            ").concat(Util.escHtml(cfg.allText), "\n       </button>"));
        for (var i = 0; i < this.state.folders.length; i++) {
          var folder = this.state.folders[i];
          var active = this.state.folder === folder ? " active" : "";
          $folders.append("<button type=\"button\" class=\"btn btn-outline-secondary btn-sm media-new-folder-btn ".concat(active, "\" data-folder=\"").concat(Util.escHtml(folder), "\">\n          ").concat(Util.escHtml(folder), "\n        </button>"));
        }
      }
    }, {
      key: "renderGrid",
      value: function renderGrid() {
        var $grid = this.$modal.find(".media-new-grid").empty();
        var $empty = this.$modal.find(".media-new-empty");
        this.$modal.find(".media-new-loading").hide();
        if (this.state.files.length === 0) {
          $grid.hide();
          $empty.show();
          return;
        }
        $empty.hide();
        $grid.show();
        for (var i = 0; i < this.state.files.length; i++) {
          var f = this.state.files[i];
          var isSelected = this.state.selected.some(function (s) {
            return s.url === f.url;
          });
          var selClass = isSelected ? " selected" : "";
          var preview;
          if (f.type === "image") {
            preview = document.createElement("img");
            preview.loading = "lazy";
            preview.src = f.url;
            preview.alt = Util.escHtml(f.name);
            preview.classList.add("media-new-item-img");
          } else {
            preview = document.createElement("div");
            preview.classList.add("media-new-item-icon");
            preview.innerHTML = "<i class=\"fa ".concat(Util.fileIcon(f.name), "\">");
          }
          $grid.append(format(mediaNewGridTemplate, {
            selClass: selClass,
            url: f.url,
            type: f.type,
            name: Util.escHtml(f.name),
            size: Util.formatSize(f.size),
            preview: preview.outerHTML
          }));
        }
      }
    }, {
      key: "renderPagination",
      value: function renderPagination() {
        var $pg = this.$modal.find(".media-new-pagination").empty();
        if (this.state.pages <= 1) return;
        $pg.append("<li class=\"page-item ".concat(this.state.page <= 1 ? "disabled" : "", "\">\n        <a class=\"page-link media-new-page-btn\" data-page=\"").concat(this.state.page - 1, "\" href=\"#\">&laquo;</a>\n      </li>"));
        var start = Math.max(1, this.state.page - 3);
        var end = Math.min(this.state.pages, start + 6);
        if (end - start < 6) start = Math.max(1, end - 6);
        for (var p = start; p <= end; p++) {
          $pg.append("<li class=\"page-item ".concat(p === this.state.page ? "active" : "", "\">\n            <a class=\"page-link media-new-page-btn\" data-page=\"").concat(p, "\" href=\"#\">\n              ").concat(p, "\n            </a>\n          </li>"));
        }
        $pg.append("<li class=\"page-item ".concat(this.state.page >= this.state.pages ? " disabled" : "", "\">\n        <a class=\"page-link media-new-page-btn\" data-page=\"").concat(this.state.page + 1, "\" href=\"#\">&raquo;</a>\n      </li>"));
      }
    }, {
      key: "renderInfo",
      value: function renderInfo() {
        var cfg = this.state.config;
        var selCount = this.state.selected.length;
        var text = selCount > 0 ? this.template(cfg.selectedInfoText, {
          selected: selCount,
          count: this.state.total
        }) : this.template(cfg.fileInfoText, {
          count: this.state.total
        });
        this.$modal.find(".media-new-footer-info").html(text);
        this.$modal.find(".media-new-select").prop("disabled", selCount === 0);
      }
    }, {
      key: "render",
      value: function render() {
        this.renderFolders();
        this.renderGrid();
        this.renderPagination();
        this.renderInfo();
      }
    }, {
      key: "loadFiles",
      value: function loadFiles() {
        if (this.state.loading) return;
        this.state.loading = true;
        this.$modal.find(".media-new-grid").hide();
        this.$modal.find(".media-new-empty").hide();
        this.$modal.find(".media-new-loading").show();
        var cfg = this.state.config;
        var params = $$1.extend({}, cfg.ajaxData, {
          folder: this.state.folder,
          search: this.state.search,
          page: this.state.page
        });
        var context = {
          url: cfg.apiUrl,
          data: params,
          dataType: "json",
          headers: cfg.ajaxHeaders,
          instance: this
        };
        $$1.ajax({
          url: cfg.apiUrl,
          data: params,
          dataType: "json",
          headers: cfg.ajaxHeaders,
          context: context,
          success: function success(res) {
            this.instance.state.files = res.files || [];
            this.instance.state.folders = res.folders || [];
            this.instance.state.total = res.total || 0;
            this.instance.state.page = res.page || 1;
            this.instance.state.pages = res.pages || 1;
            this.instance.render();
          },
          error: function error() {
            this.instance.$modal.find(".media-new-grid").empty().hide();
            this.instance.$modal.find(".media-new-loading").hide();
            this.instance.$modal.find(".media-new-empty").show().html('<i class="fa fa-exclamation-triangle"></i>' + "<span>" + this.instance.state.config.errorText + "</span>");
          },
          complete: function complete() {
            this.instance.state.loading = false;
            this.instance.$modal.find(".media-new-loading").hide();
          }
        });
      }
    }, {
      key: "onItemClick",
      value: function onItemClick(target) {
        var $item = $$1(target.currentTarget);
        var url = $item.data("url");
        var name = $item.data("name");
        var type = $item.data("type");
        if (this.state.multiple) {
          var idx = -1;
          for (var i = 0; i < this.state.selected.length; i++) {
            if (this.state.selected[i].url === url) {
              idx = i;
              break;
            }
          }
          if (idx >= 0) {
            this.state.selected.splice(idx, 1);
            $item.removeClass("selected");
          } else {
            this.state.selected.push({
              url: url,
              name: name,
              type: type
            });
            $item.addClass("selected");
          }
        } else {
          this.state.selected = [{
            url: url,
            name: name,
            type: type
          }];
          this.$modal.find(".media-new-item").removeClass("selected");
          $item.addClass("selected");
        }
        this.renderInfo();
      }
    }, {
      key: "onFolderClick",
      value: function onFolderClick(e) {
        e.preventDefault();
        this.state.folder = $$1(e.currentTarget).data("folder");
        this.state.page = 1;
        this.loadFiles();
      }
    }, {
      key: "onSearchInput",
      value: function onSearchInput() {
        clearTimeout(this.searchTimer);
        this.searchTimer = setTimeout(function (context) {
          context.state.search = context.$modal.find(".media-new-search").val().trim();
          context.state.page = 1;
          context.loadFiles();
        }, 300, this);
      }
    }, {
      key: "onPageClick",
      value: function onPageClick(e) {
        e.preventDefault();
        var p = parseInt($$1(e.currentTarget).data("page"), 10);
        if (p < 1 || p > this.state.pages || p === this.state.page) return;
        this.state.page = p;
        this.loadFiles();
      }
    }, {
      key: "onConfirm",
      value: function onConfirm() {
        if (this.state.selected.length === 0) return;
        var cb = this.state.onSuccess;
        var files = this.state.selected.slice();
        bootstrap.Modal.getInstance(this.$modal[0]).hide();
        if (typeof cb === "function") cb(files, this.state.context);
      }
    }, {
      key: "mlUuid",
      value: function mlUuid() {
        var s = [],
          hex = "0123456789abcdef";
        for (var i = 0; i < 36; i++) s[i] = hex.substr(Math.floor(Math.random() * 16), 1);
        s[14] = "4";
        s[19] = hex.substr(parseInt(s[19], 16) & 3 | 8, 1);
        s[8] = s[13] = s[18] = s[23] = "-";
        return s.join("");
      }
    }, {
      key: "mlGetFileType",
      value: function mlGetFileType(url) {
        var imageExts = ["jpg", "jpeg", "png", "gif", "webp", "svg", "ico", "bmp"];
        var ext = (url || "").split(".").pop().toLowerCase();
        return imageExts.indexOf(ext) >= 0 ? "image" : "other";
      }
    }, {
      key: "injectBrowseButton",
      value: function injectBrowseButton(uploader) {
        var $container = uploader.$uploaderContainer;
        if (!$container) return;
        if ($container.find(".media-new-browse-card").length) return;
        var isMultiple = uploader.config.multiple;
        var cfg = $$1.extend({}, MEDIA_DEFAULTS);
        var $btn = $$1('<div class="jquery-uploader-select-card media-new-browse-card">' + '<div class="jquery-uploader-select">' + '<div class="media-new-browse-btn">' + '<i class="' + Util.escHtml(cfg.uploaderButtonIcon) + '"></i>' + "<span>" + Util.escHtml(cfg.uploaderButtonText) + "</span>" + "</div>" + "</div>" + "</div>");
        $btn.on("click", function () {
          MediaLibrary.open({
            multiple: isMultiple,
            onSelect: function onSelect(files) {
              for (var i = 0; i < files.length; i++) {
                var f = files[i];
                var id = this.mlUuid();
                var type = this.mlGetFileType(f.url);
                var $card = uploader.createFileCardEle(id, f.url, type);
                uploader.files.push({
                  id: id,
                  type: type,
                  name: f.name,
                  url: f.url,
                  status: " initial",
                  file: null,
                  $ele: $card
                });
              }
              uploader.refreshPreviewFileList(this, uploader);
              uploader.refreshValue();
            }
          });
        });
        var $selectCard = $container.find(".jquery-uploader-select-card").not(".media-new-browse-card");
        if ($selectCard.length) {
          $selectCard.before($btn);
        } else {
          $container.append($btn);
        }
      }
    }]);
  }();

  function openNewMedia(config, context, onSuccess) {
    if (config.search) {
      setTimeout(function ($mediaNewSearch, config) {
        $mediaNewSearch.val(config.search).trigger("input");
      }, 80, $(".media-new-Search"), config);
    }
    var mediaNew = new MediaNew(config, context, onSuccess);
    mediaNew.open();
    return this;
  }

  var mediaTemplate = "<div class=\"media\">\r\n    <textarea class=\"media-model\" name=\"{ControlName}\">\r\n      []\r\n      </textarea>\r\n    <div class=\"media-list\">\r\n    </div>\r\n    <div class=\"media-toolbox\">\r\n        <div>\r\n            <button class=\"btn btn-light media-add\">\r\n                <i class=\"fa fa-add\"></i>\r\n                {AddTitle}\r\n            </button>\r\n            <button class=\"btn btn-light media-clear\">\r\n                <i class=\"fa fa-trash\"></i>\r\n                {ClearTitle}\r\n            </button>\r\n        </div>\r\n    </div>\r\n</div>";
  var mediaImageItemTemplate = "<div class=\"media-item\">\r\n    <button type=\"button\" class=\"close media-remove\" aria-label=\"Close\" title=\"Remove\">\r\n        <span aria-hidden=\"true\">\xD7</span>\r\n    </button>\r\n    <a href=\"#\" class=\"media-item-link\" style=\"background-image: url('{url}')\"></a>\r\n</div>";
  var mediaFileItemTemplate = "<div class=\"media-item\">\r\n    <button type=\"button\" class=\"close media-remove\" aria-label=\"Close\" title=\"Remove\">\r\n        <span aria-hidden=\"true\">\xD7</span>\r\n    </button>\r\n    <a href=\"#\" class=\"media-item-link media-item-icon\">\r\n        <div>\r\n            <i class=\"fa {icon} \"></i>\r\n        </div>\r\n        <div class=\"media-item-name\">\r\n            {name}\r\n        </div>        \r\n    </a>\r\n</div>";
  var Media = /*#__PURE__*/function () {
    function Media(element, config) {
      _classCallCheck(this, Media);
      this._config = this._getConfig(config);
      this._element = element;
      this.$form = null;
      this._model = null;
      this._list = null;
      this._buildForm();
      this._updateValue();
      this._addModelListener();
      $$1(this._element).on(MEDIA_EVENTS.CLICK_DATA_API, MEDIA_ELEMENTS.ADD, this, function (event) {
        return event.data.pick();
      });
      $$1(this._element).on(MEDIA_EVENTS.CLICK_DATA_API, MEDIA_ELEMENTS.REMOVE, this, function (event) {
        return event.data.remove($$1(event.target.parentNode.parentNode).index());
      });
      $$1(this._element).on(MEDIA_EVENTS.CLICK_DATA_API, MEDIA_ELEMENTS.CLEAR, this, function (event) {
        return event.data.clear();
      });
      $$1(this._element).on(MEDIA_EVENTS.CLICK_DATA_API, MEDIA_ELEMENTS.LIST_ITEM, this, function (event) {
        return event.data.preview($$1(event.target.parentNode.parentNode).index());
      });
    }
    return _createClass(Media, [{
      key: "_buildForm",
      value: function _buildForm() {
        if (this.$form) return;
        var cfg = this._config;
        var html = format(mediaTemplate, {
          ControlName: Util.escHtml(cfg.name),
          ClearTitle: Util.escHtml(cfg.clearTitle),
          AddTitle: Util.escHtml(cfg.addTitle)
        });
        this.$form = $$1(html);
        $$1(this._element).append(this.$form);
        this._model = this.$form.find('.media-model').get(0);
        this._list = this.$form.find('.media-list').get(0);
      }

      // Getters
    }, {
      key: "addItem",
      value:
      // Public

      function addItem(f) {
        $$1(this._element).trigger(MEDIA_EVENTS.ADD, f.url);
        this._value.push(f.url);
        this._model.innerText = JSON.stringify(this._value);
        this._drawItem(f);
        $$1(this._element).trigger(MEDIA_EVENTS.ADDED, f.url);
        $$1(this._element).trigger(MEDIA_EVENTS.CHANGE);
      }
    }, {
      key: "clear",
      value: function clear() {
        $$1(this._element).trigger(MEDIA_EVENTS.CLEAR);
        this._model.innerText = "[]";
        this._value = [];
        this._list.innerHTML = "";
        $$1(this._element).trigger(MEDIA_EVENTS.CLEARED);
        $$1(this._element).trigger(MEDIA_EVENTS.CHANGE);
      }
    }, {
      key: "preview",
      value: function preview(index) {
        if (typeof this._config.mediaPreviewer === "boolean") return;
        this._config.mediaPreviewer(this._value, index);
      }
    }, {
      key: "pick",
      value: function pick() {
        openNewMedia(this._config, this, function (files, context) {
          files.forEach(function (f) {
            return context.addItem(f);
          });
        });
      }
    }, {
      key: "remove",
      value: function remove(index) {
        var item = this._value[index];
        if (!item) return;
        $$1(this._element).trigger(MEDIA_EVENTS.DELETE, item);
        this._value.splice(index, 1);
        this._model.innerText = this._value.length ? JSON.stringify(this._value) : "[]";
        var itemEl = $$1(this._list).children()[index];
        itemEl.classList.add(MEDIA_ELEMENTS.HIDE);
        $$1(itemEl).remove();
        $$1(this._element).trigger(MEDIA_EVENTS.DELETED, item);
        $$1(this._element).trigger(MEDIA_EVENTS.CHANGE);
      }

      // Private
    }, {
      key: "_addModelListener",
      value: function _addModelListener() {
        var _this = this;
        $$1(this._model).on(MEDIA_EVENTS.CHANGE_DATA_API, function (e) {
          _this._updateValue();
          _this._drawItems();
          $$1(_this._element).trigger(MEDIA_EVENTS.CHANGE);
        });
      }
    }, {
      key: "_drawItem",
      value: function _drawItem(item) {
        var tmpl = "";
        if (item.type === "image") {
          tmpl = format(mediaImageItemTemplate, {
            url: item.url
          });
        } else {
          tmpl = format(mediaFileItemTemplate, {
            name: item.name,
            icon: Util.fileIcon(item.name)
          });
        }
        $$1(tmpl).appendTo(this._list);
      }
    }, {
      key: "_drawItems",
      value: function _drawItems() {
        var _this2 = this;
        this._list.innerHTML = "";
        this._value.forEach(function (e) {
          return _this2._drawItem(e);
        });
      }
    }, {
      key: "_getConfig",
      value: function _getConfig(config) {
        config = _objectSpread2(_objectSpread2({}, MEDIA_DEFAULTS), config);
        Util.typeCheckConfig(MEDIA_NAME, config, MEDIA_DEFAULT_TYPE);
        return config;
      }
    }, {
      key: "_updateValue",
      value: function _updateValue() {
        var val = this._model.innerText.trim();
        this._value = [];
        if (!val) return;
        try {
          this._value = JSON.parse(val);
        } catch (_unused) {
          console.error("The model value is not valid JSON", this._model);
        }
        if (!Array.isArray(this._value)) {
          console.error("The model value is not valid JSON Array", this._model);
          this._value = [];
        }
      }

      // Static
    }], [{
      key: "VERSION",
      get: function get() {
        return MEDIA_VERSION;
      }
    }, {
      key: "Default",
      get: function get() {
        return MEDIA_DEFAULTS;
      }
    }, {
      key: "_jQueryInterface",
      value: function _jQueryInterface(config, relatedTarget) {
        return this.each(function () {
          var data = $$1(this).data(MEDIA_DATA_KEY);
          var _config = _objectSpread2(_objectSpread2(_objectSpread2({}, MEDIA_DEFAULTS), $$1(this).data()), _typeof(config) === "object" && config ? config : {});
          if (!data) {
            data = new Media(this, _config);
            $$1(this).data(MEDIA_DATA_KEY, data);
          }
          if (typeof config === "string") {
            if (typeof data[config] === "undefined") {
              throw new TypeError("No method named \"".concat(config, "\""));
            }
            data[config](relatedTarget);
          }
        });
      }
    }]);
  }();
  $$1.fn[MEDIA_NAME] = Media._jQueryInterface;
  $$1.fn[MEDIA_NAME].Constructor = Media;
  $$1.fn[MEDIA_NAME].noConflict = function () {
    $$1.fn[MEDIA_NAME] = $$1.fn[MEDIA_NAME];
    return Media._jQueryInterface;
  };

  exports.Media = Media;

}));
//# sourceMappingURL=media.js.map
