/*!
    * Bssyco Media v1.0.0 (https://bssyco.github.io/media/)
    * Copyright 2026 Parviz Taghavi
    * Licensed under MIT (https://github.com/bssyco/media/LICENSE)
    */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery')) :
  typeof define === 'function' && define.amd ? define(['exports', 'jquery'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.media = {}, global.jQuery));
})(this, (function (exports, $$1) { 'use strict';

  const MEDIA_NAME = "media";
  const MEDIA_VERSION = "1.0.0";
  const MEDIA_DATA_KEY = "bs.media";
  const MEDIA_EVENT_KEY = `.${MEDIA_DATA_KEY}`;
  const MEDIA_DEFAULTS = {
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
  const MEDIA_DEFAULT_TYPE = {
    mediaPreviewer: "(function|string|boolean)"
  };
  const MEDIA_EVENTS = {
    ADD: `add${MEDIA_EVENT_KEY}`,
    ADDED: `added${MEDIA_EVENT_KEY}`,
    CHANGE: `change${MEDIA_EVENT_KEY}`,
    CLEAR: `clear${MEDIA_EVENT_KEY}`,
    CLEARED: `cleared${MEDIA_EVENT_KEY}`,
    DELETE: `delete${MEDIA_EVENT_KEY}`,
    DELETED: `deleted${MEDIA_EVENT_KEY}`,
    CHANGE_DATA_API: `change${MEDIA_EVENT_KEY}`,
    CLICK_DATA_API: `click${MEDIA_EVENT_KEY}`,
    CLICK_SELECT_BTN: `click${MEDIA_EVENT_KEY}`,
    CLICK_FOLDER_BTN: `click${MEDIA_EVENT_KEY}`,
    CLICK_PAGE_BTN: `click${MEDIA_EVENT_KEY}`,
    CLICK_ITEM: `click${MEDIA_EVENT_KEY}`,
    CLICK_INPUT_SEARCH: `click${MEDIA_EVENT_KEY}`
  };
  const MEDIA_ELEMENTS = {
    ADD: ".media-add",
    REMOVE: ".media-remove",
    CLEAR: ".media-clear",
    LIST_ITEM: ".media-item",
    SELECT: ".media-new-select",
    ITEM: ".media-new-item",
    FOLDER: ".media-new-folder-btn",
    PAGE: ".media-new-page-btn",
    SEARCH: ".media-new-search"};
  const FILE_ICONS = {
    pdf: "fa-file-pdf-o text-danger",
    doc: "fa-file-word-o text-primary",
    docx: "fa-file-word-o text-primary",
    xls: "fa-file-excel-o text-success",
    xlsx: "fa-file-excel-o text-success",
    csv: "fa-file-csv-o text-success",
    ppt: "fa-file-powerpoint-o text-warning",
    pptx: "fa-file-powerpoint-o text-warning",
    txt: "fa-file-text-o text-secondary",
    zip: "fa-file-zipper-o text-info",
    rar: "fa-file-zipper-o text-info",
    mp4: "fa-file-video-o text-info",
    mp3: "fa-file-audio-o text-info",
    svg: "fa-file-image-o text-warning",
    jpg: "fa-file-image-o text-primary",
    png: "fa-file-image-o text-primary",
    jpeg: "fa-file-image-o text-primary"
  };

  const TRANSITION_END = 'transitionend';
  const MAX_UID = 1000000;
  const MILLISECONDS_MULTIPLIER = 1000;

  // Shoutout AngusCroll (https://goo.gl/pxwQGp)
  function toType(obj) {
    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
  }
  function getSpecialTransitionEndEvent() {
    return {
      bindType: TRANSITION_END,
      delegateType: TRANSITION_END,
      handle(event) {
        if ($$1(event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
        }
        return undefined; // eslint-disable-line no-undefined
      }
    };
  }
  function transitionEndEmulator(duration) {
    let called = false;
    $$1(this).one(Util.TRANSITION_END, () => {
      called = true;
    });
    setTimeout(() => {
      if (!called) {
        Util.triggerTransitionEnd(this);
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

  const Util = {
    TRANSITION_END: 'bsTransitionEnd',
    getUID(prefix) {
      do {
        // eslint-disable-next-line no-bitwise
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(prefix));
      return prefix;
    },
    getSelectorFromElement(element) {
      let selector = element.getAttribute('data-target');
      if (!selector || selector === '#') {
        const hrefAttr = element.getAttribute('href');
        selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : '';
      }
      try {
        return document.querySelector(selector) ? selector : null;
      } catch (err) {
        return null;
      }
    },
    getTransitionDurationFromElement(element) {
      if (!element) {
        return 0;
      }

      // Get transition-duration of the element
      let transitionDuration = $$1(element).css('transition-duration');
      let transitionDelay = $$1(element).css('transition-delay');
      const floatTransitionDuration = parseFloat(transitionDuration);
      const floatTransitionDelay = parseFloat(transitionDelay);

      // Return 0 if element or transition duration is not found
      if (!floatTransitionDuration && !floatTransitionDelay) {
        return 0;
      }

      // If multiple durations are defined, take the first
      transitionDuration = transitionDuration.split(',')[0];
      transitionDelay = transitionDelay.split(',')[0];
      return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
    },
    reflow(element) {
      return element.offsetHeight;
    },
    triggerTransitionEnd(element) {
      $$1(element).trigger(TRANSITION_END);
    },
    // TODO: Remove in v5
    supportsTransitionEnd() {
      return Boolean(TRANSITION_END);
    },
    isElement(obj) {
      return (obj[0] || obj).nodeType;
    },
    typeCheckConfig(componentName, config, configTypes) {
      for (const property in configTypes) {
        if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
          const expectedTypes = configTypes[property];
          const value = config[property];
          const valueType = value && Util.isElement(value) ? 'element' : toType(value);
          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(`${componentName.toUpperCase()}: ` + `Option "${property}" provided type "${valueType}" ` + `but expected type "${expectedTypes}".`);
          }
        }
      }
    },
    findShadowRoot(element) {
      if (!document.documentElement.attachShadow) {
        return null;
      }

      // Can find the shadow root otherwise it'll return the document
      if (typeof element.getRootNode === 'function') {
        const root = element.getRootNode();
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
    escHtml(s) {
      return $$1("<span>").text(s).html();
    },
    fileIcon(name) {
      var ext = (name || "").split(".").pop().toLowerCase();
      return FILE_ICONS[ext] || "fa-file-o text-secondary";
    },
    formatSize(bytes) {
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
  	var nargs = /\{([0-9a-zA-Z]+)\}/g;
  	var slice = Array.prototype.slice;

  	stringTemplate = template;

  	function template(string) {
  	    var args;

  	    if (arguments.length === 2 && typeof arguments[1] === "object") {
  	        args = arguments[1];
  	    } else {
  	        args = slice.call(arguments, 1);
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

  const mediaNewTemplate = "<div class=\"modal fade\" tabindex=\"-1\">\r\n    <div class=\"modal-dialog modal-xl modal-dialog-scrollable\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header py-2\">\r\n                <h6 class=\"modal-title\">\r\n                    <i class=\"fa fa-images me-1\">\r\n                    </i> {Title}\r\n                </h6>\r\n                <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\"></button>\r\n            </div>\r\n            <div class=\"row px-3 pt-2\">\r\n                <div class=\"col-sm-8 media-new-folders d-flex flex-wrap gap-1 pb-1\"></div>\r\n                <div class=\"col-sm-4 pb-1\">\r\n                    <input type=\"text\" class=\"form-control form-control-sm media-new-search\" placeholder=\"{SearchPlaceholder}\" />\r\n                </div>\r\n            </div>\r\n            <div class=\"modal-body\" style=\"min-height:340px;\">\r\n                <div class=\"media-new-grid\"></div>\r\n                <div class=\"media-new-empty\" style=\"display:none;\">\r\n                    <i class=\"fa fa-folder2-open\"></i>\r\n                    {EmptyText}\r\n                </div>\r\n                <div class=\"media-new-loading\" style=\"display:none;\">\r\n                    <i class=\"fa fa-arrows\"></i>\r\n                </div>\r\n            </div>\r\n            <div class=\"modal-footer py-2 d-flex justify-content-between\">\r\n                <div class=\"media-new-footer-info\"></div>\r\n                <div class=\"d-flex flex-wrap align-items-center gap-1\">\r\n                    <nav class=\" pb-1\">\r\n                        <ul class=\"pagination pagination-sm mb-0 media-new-pagination\"></ul>\r\n                    </nav>\r\n                    <button type=\"button\" class=\"btn btn-sm btn-primary media-new-select pb-1\" disabled> {SelectText}\r\n                    </button>\r\n                    <button type=\"button\" class=\"btn btn-sm btn-secondary pb-1\" data-bs-dismiss=\"modal\"> {CancelText}\r\n                    </button>\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n</div>";
  const mediaNewGridTemplate = "<div class=\"media-new-item {selClass}\" data-url=\"{url}\" data-name=\"{name}\" data-type=\"{type}\" title=\"{name} ({size})\">\r\n    {preview}\r\n    <div class=\" media-new-check\">\r\n        <i class=\"fa fa-check\"></i>\r\n    </div>\r\n    <div class=\"media-new-item-name\">\r\n        {name}\r\n    </div>\r\n</div>";
  class MediaNew {
    constructor(config, context, onSuccess) {
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
    defaults = $$1.extend({}, MEDIA_DEFAULTS);

    /**
     * @param {Object} opts
     * @param {boolean}  opts.multiple  - Allow multiple file selection (default: false)
     * @param {string}   opts.folder    - Pre-select a folder tab
     * @param {Function} opts.onSelect  - Callback: function(files) where files = [{url, name}]
     * @param {string}   opts.apiUrl    - Override API endpoint for this call
     * @param {Object}   opts.ajaxData  - Extra AJAX params for this call
     */
    open() {
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
    template(str, data) {
      return str.replace(/\{(\w+)\}/g, function (m, key) {
        return data[key] !== undefined ? data[key] : m;
      });
    }
    buildModal() {
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
      this.$modal.on(MEDIA_EVENTS.CLICK_SELECT_BTN, MEDIA_ELEMENTS.SELECT, this, event => event.data.onConfirm());
      this.$modal.on(MEDIA_EVENTS.CLICK_ITEM, MEDIA_ELEMENTS.ITEM, this, event => event.data.onItemClick(event));
      this.$modal.on(MEDIA_EVENTS.CLICK_FOLDER_BTN, MEDIA_ELEMENTS.FOLDER, this, event => event.data.onFolderClick(event));
      this.$modal.on(MEDIA_EVENTS.CLICK_PAGE_BTN, MEDIA_ELEMENTS.PAGE, this, event => event.data.onPageClick(event));
      this.$modal.on(MEDIA_EVENTS.CLICK_INPUT_SEARCH, MEDIA_ELEMENTS.SEARCH, this, event => event.data.onSearchInput(event));
      this.$modal.on(MEDIA_EVENTS.HIDDEN_BS_MODAL, this, function (event) {
        event.data.state.selected = [];
        //event.data.state.onSelect = null;
        event.data.state.onSuccess = null;
      });
    }
    renderFolders() {
      var cfg = this.state.config;
      var $folders = this.$modal.find(".media-new-folders").empty();
      $folders.append(`<button type="button" class="btn btn-outline-secondary btn-sm media-new-folder-btn ${this.state.folder === "" ? " active" : ""}" data-folder="">
            ${Util.escHtml(cfg.allText)}
       </button>`);
      for (var i = 0; i < this.state.folders.length; i++) {
        var folder = this.state.folders[i];
        var active = this.state.folder === folder ? " active" : "";
        $folders.append(`<button type="button" class="btn btn-outline-secondary btn-sm media-new-folder-btn ${active}" data-folder="${Util.escHtml(folder)}">
          ${Util.escHtml(folder)}
        </button>`);
      }
    }
    renderGrid() {
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
          preview.innerHTML = `<i class="fa ${Util.fileIcon(f.name)}">`;
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
    renderPagination() {
      var $pg = this.$modal.find(".media-new-pagination").empty();
      if (this.state.pages <= 1) return;
      $pg.append(`<li class="page-item ${this.state.page <= 1 ? "disabled" : ""}">
        <a class="page-link media-new-page-btn" data-page="${this.state.page - 1}" href="#">&laquo;</a>
      </li>`);
      var start = Math.max(1, this.state.page - 3);
      var end = Math.min(this.state.pages, start + 6);
      if (end - start < 6) start = Math.max(1, end - 6);
      for (var p = start; p <= end; p++) {
        $pg.append(`<li class="page-item ${p === this.state.page ? "active" : ""}">
            <a class="page-link media-new-page-btn" data-page="${p}" href="#">
              ${p}
            </a>
          </li>`);
      }
      $pg.append(`<li class="page-item ${this.state.page >= this.state.pages ? " disabled" : ""}">
        <a class="page-link media-new-page-btn" data-page="${this.state.page + 1}" href="#">&raquo;</a>
      </li>`);
    }
    renderInfo() {
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
    render() {
      this.renderFolders();
      this.renderGrid();
      this.renderPagination();
      this.renderInfo();
    }
    loadFiles() {
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
        success: function (res) {
          this.instance.state.files = res.files || [];
          this.instance.state.folders = res.folders || [];
          this.instance.state.total = res.total || 0;
          this.instance.state.page = res.page || 1;
          this.instance.state.pages = res.pages || 1;
          this.instance.render();
        },
        error: function () {
          this.instance.$modal.find(".media-new-grid").empty().hide();
          this.instance.$modal.find(".media-new-loading").hide();
          this.instance.$modal.find(".media-new-empty").show().html('<i class="fa fa-exclamation-triangle"></i>' + "<span>" + this.instance.state.config.errorText + "</span>");
        },
        complete: function () {
          this.instance.state.loading = false;
          this.instance.$modal.find(".media-new-loading").hide();
        }
      });
    }
    onItemClick(target) {
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
    onFolderClick(e) {
      e.preventDefault();
      this.state.folder = $$1(e.currentTarget).data("folder");
      this.state.page = 1;
      this.loadFiles();
    }
    onSearchInput() {
      clearTimeout(this.searchTimer);
      this.searchTimer = setTimeout(function (context) {
        context.state.search = context.$modal.find(".media-new-search").val().trim();
        context.state.page = 1;
        context.loadFiles();
      }, 300, this);
    }
    onPageClick(e) {
      e.preventDefault();
      var p = parseInt($$1(e.currentTarget).data("page"), 10);
      if (p < 1 || p > this.state.pages || p === this.state.page) return;
      this.state.page = p;
      this.loadFiles();
    }
    onConfirm() {
      if (this.state.selected.length === 0) return;
      var cb = this.state.onSuccess;
      var files = this.state.selected.slice();
      bootstrap.Modal.getInstance(this.$modal[0]).hide();
      if (typeof cb === "function") cb(files, this.state.context);
    }
    mlUuid() {
      var s = [],
        hex = "0123456789abcdef";
      for (var i = 0; i < 36; i++) s[i] = hex.substr(Math.floor(Math.random() * 16), 1);
      s[14] = "4";
      s[19] = hex.substr(parseInt(s[19], 16) & 3 | 8, 1);
      s[8] = s[13] = s[18] = s[23] = "-";
      return s.join("");
    }
    mlGetFileType(url) {
      var imageExts = ["jpg", "jpeg", "png", "gif", "webp", "svg", "ico", "bmp"];
      var ext = (url || "").split(".").pop().toLowerCase();
      return imageExts.indexOf(ext) >= 0 ? "image" : "other";
    }
    injectBrowseButton(uploader) {
      var $container = uploader.$uploaderContainer;
      if (!$container) return;
      if ($container.find(".media-new-browse-card").length) return;
      var isMultiple = uploader.config.multiple;
      var cfg = $$1.extend({}, MEDIA_DEFAULTS);
      var $btn = $$1('<div class="jquery-uploader-select-card media-new-browse-card">' + '<div class="jquery-uploader-select">' + '<div class="media-new-browse-btn">' + '<i class="' + Util.escHtml(cfg.uploaderButtonIcon) + '"></i>' + "<span>" + Util.escHtml(cfg.uploaderButtonText) + "</span>" + "</div>" + "</div>" + "</div>");
      $btn.on("click", function () {
        MediaLibrary.open({
          multiple: isMultiple,
          onSelect: function (files) {
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
  }

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

  const mediaTemplate = "<div class=\"media\">\r\n    <textarea class=\"media-model\" name=\"{ControlName}\">\r\n      []\r\n      </textarea>\r\n    <div class=\"media-list\">\r\n    </div>\r\n    <div class=\"media-toolbox\">\r\n        <div>\r\n            <button class=\"btn btn-light media-add\">\r\n                <i class=\"fa fa-plus\"></i>\r\n                {AddTitle}\r\n            </button>\r\n            <button class=\"btn btn-light media-clear\">\r\n                <i class=\"fa fa-trash\"></i>\r\n                {ClearTitle}\r\n            </button>\r\n        </div>\r\n    </div>\r\n</div>";
  const mediaImageItemTemplate = "<div class=\"media-item\">\r\n    <button type=\"button\" class=\"close media-remove\" aria-label=\"Close\" title=\"Remove\">\r\n        <span aria-hidden=\"true\">×</span>\r\n    </button>\r\n    <a href=\"#\" class=\"media-item-link\" style=\"background-image: url('{url}')\"></a>\r\n</div>";
  const mediaFileItemTemplate = "<div class=\"media-item\">\r\n    <button type=\"button\" class=\"close media-remove\" aria-label=\"Close\" title=\"Remove\">\r\n        <span aria-hidden=\"true\">×</span>\r\n    </button>\r\n    <a href=\"#\" class=\"media-item-link media-item-icon\">\r\n        <div>\r\n            <i class=\"fa {icon} \"></i>\r\n        </div>\r\n        <div class=\"media-item-name\">\r\n            {name}\r\n        </div>        \r\n    </a>\r\n</div>";
  class Media {
    constructor(element, config) {
      this._config = this._getConfig(config);
      this._element = element;
      this.$form = null;
      this._model = null;
      this._list = null;
      this._buildForm();
      this._updateValue();
      this._addModelListener();
      $$1(this._element).on(MEDIA_EVENTS.CLICK_DATA_API, MEDIA_ELEMENTS.ADD, this, event => event.data.pick());
      $$1(this._element).on(MEDIA_EVENTS.CLICK_DATA_API, MEDIA_ELEMENTS.REMOVE, this, event => event.data.remove($$1(event.target.parentNode.parentNode).index()));
      $$1(this._element).on(MEDIA_EVENTS.CLICK_DATA_API, MEDIA_ELEMENTS.CLEAR, this, event => event.data.clear());
      $$1(this._element).on(MEDIA_EVENTS.CLICK_DATA_API, MEDIA_ELEMENTS.LIST_ITEM, this, event => event.data.preview($$1(event.target.parentNode.parentNode).index()));
    }
    _buildForm() {
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

    static get VERSION() {
      return MEDIA_VERSION;
    }
    static get Default() {
      return MEDIA_DEFAULTS;
    }

    // Public

    addItem(f) {
      $$1(this._element).trigger(MEDIA_EVENTS.ADD, f.url);
      this._value.push(f.url);
      this._model.innerText = JSON.stringify(this._value);
      this._drawItem(f);
      $$1(this._element).trigger(MEDIA_EVENTS.ADDED, f.url);
      $$1(this._element).trigger(MEDIA_EVENTS.CHANGE);
    }
    clear() {
      $$1(this._element).trigger(MEDIA_EVENTS.CLEAR);
      this._model.innerText = "[]";
      this._value = [];
      this._list.innerHTML = "";
      $$1(this._element).trigger(MEDIA_EVENTS.CLEARED);
      $$1(this._element).trigger(MEDIA_EVENTS.CHANGE);
    }
    preview(index) {
      if (typeof this._config.mediaPreviewer === "boolean") return;
      this._config.mediaPreviewer(this._value, index);
    }
    pick() {
      openNewMedia(this._config, this, function (files, context) {
        files.forEach(f => context.addItem(f));
      });
    }
    remove(index) {
      let item = this._value[index];
      if (!item) return;
      $$1(this._element).trigger(MEDIA_EVENTS.DELETE, item);
      this._value.splice(index, 1);
      this._model.innerText = this._value.length ? JSON.stringify(this._value) : "[]";
      let itemEl = $$1(this._list).children()[index];
      itemEl.classList.add(MEDIA_ELEMENTS.HIDE);
      $$1(itemEl).remove();
      $$1(this._element).trigger(MEDIA_EVENTS.DELETED, item);
      $$1(this._element).trigger(MEDIA_EVENTS.CHANGE);
    }

    // Private

    _addModelListener() {
      $$1(this._model).on(MEDIA_EVENTS.CHANGE_DATA_API, e => {
        this._updateValue();
        this._drawItems();
        $$1(this._element).trigger(MEDIA_EVENTS.CHANGE);
      });
    }
    _drawItem(item) {
      let tmpl = "";
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
    _drawItems() {
      this._list.innerHTML = "";
      this._value.forEach(e => this._drawItem(e));
    }
    _getConfig(config) {
      config = {
        ...MEDIA_DEFAULTS,
        ...config
      };
      Util.typeCheckConfig(MEDIA_NAME, config, MEDIA_DEFAULT_TYPE);
      return config;
    }
    _updateValue() {
      let val = this._model.innerText.trim();
      this._value = [];
      if (!val) return;
      try {
        this._value = JSON.parse(val);
      } catch {
        console.error("The model value is not valid JSON", this._model);
      }
      if (!Array.isArray(this._value)) {
        console.error("The model value is not valid JSON Array", this._model);
        this._value = [];
      }
    }

    // Static

    static _jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        let data = $$1(this).data(MEDIA_DATA_KEY);
        const _config = {
          ...MEDIA_DEFAULTS,
          ...$$1(this).data(),
          ...(typeof config === "object" && config ? config : {})
        };
        if (!data) {
          data = new Media(this, _config);
          $$1(this).data(MEDIA_DATA_KEY, data);
        }
        if (typeof config === "string") {
          if (typeof data[config] === "undefined") {
            throw new TypeError(`No method named "${config}"`);
          }
          data[config](relatedTarget);
        }
      });
    }
  }
  $$1.fn[MEDIA_NAME] = Media._jQueryInterface;
  $$1.fn[MEDIA_NAME].Constructor = Media;
  $$1.fn[MEDIA_NAME].noConflict = () => {
    $$1.fn[MEDIA_NAME] = $$1.fn[MEDIA_NAME];
    return Media._jQueryInterface;
  };

  exports.Media = Media;

}));
//# sourceMappingURL=media.js.map
