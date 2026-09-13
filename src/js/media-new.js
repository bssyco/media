import $ from "jquery";
import { MEDIA_EVENTS, MEDIA_ELEMENTS, MEDIA_DEFAULTS } from "./var";
import Util from "./util";
import mediaNewTemplate from "../html/media-new.html";
import mediaNewGridTemplate from "../html/media-new-grid.html";
import format from "string-template";

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
      config: {},
    };

    $(document).on("uploader-init", "input", this, function (event) {
      
      setTimeout(function (context) {
        var $el = $(context);
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

  defaults = $.extend({}, MEDIA_DEFAULTS);

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
    this.state.config = $.extend(
      {},
      MEDIA_DEFAULTS,
      MediaNew.defaults,
      this._config,
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
      SelectText: Util.escHtml(cfg.selectText),
    });

    this.$modal = $(html);

    $("body").append(this.$modal);

    this.$modal.on(
      MEDIA_EVENTS.CLICK_SELECT_BTN,
      MEDIA_ELEMENTS.SELECT,
      this,
      (event) => event.data.onConfirm(),
    );
    this.$modal.on(
      MEDIA_EVENTS.CLICK_ITEM,
      MEDIA_ELEMENTS.ITEM,
      this,
      (event) => event.data.onItemClick(event),
    );
    this.$modal.on(
      MEDIA_EVENTS.CLICK_FOLDER_BTN,
      MEDIA_ELEMENTS.FOLDER,
      this,
      (event) => event.data.onFolderClick(event),
    );
    this.$modal.on(
      MEDIA_EVENTS.CLICK_PAGE_BTN,
      MEDIA_ELEMENTS.PAGE,
      this,
      (event) => event.data.onPageClick(event),
    );
    this.$modal.on(
      MEDIA_EVENTS.CLICK_INPUT_SEARCH,
      MEDIA_ELEMENTS.SEARCH,
      this,
      (event) => event.data.onSearchInput(event),
    );

    this.$modal.on(MEDIA_EVENTS.HIDDEN_BS_MODAL, this, function (event) {
      event.data.state.selected = [];
      //event.data.state.onSelect = null;
      event.data.state.onSuccess = null;
    });
  }

  renderFolders() {
    var cfg = this.state.config;
    var $folders = this.$modal.find(".media-new-folders").empty();

    $folders.append(
      `<button type="button" class="btn btn-outline-secondary btn-sm media-new-folder-btn ${(this.state.folder === "" ? " active" : "")}" data-folder="">
            ${Util.escHtml(cfg.allText)}
       </button>`
    );

    for (var i = 0; i < this.state.folders.length; i++) {
      var folder = this.state.folders[i];
      var active = this.state.folder === folder ? " active" : "";

      $folders.append(
        `<button type="button" class="btn btn-outline-secondary btn-sm media-new-folder-btn ${active}" data-folder="${Util.escHtml(folder)}">
          ${Util.escHtml(folder)}
        </button>`
      );
    }
  }

  renderGrid() {
    var $grid = this.$modal.find(".media-new-grid").empty();
    var $empty = this.$modal.find(".media-new-empty");
    var $loading = this.$modal.find(".media-new-loading").hide();

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

      $grid.append(
        format(mediaNewGridTemplate, {
          selClass: selClass,
          url: f.url,
          type: f.type,
          name: Util.escHtml(f.name),
          size: Util.formatSize(f.size),
          preview: preview.outerHTML,
        }),
      );
    }
  }

  renderPagination() {
    var $pg = this.$modal.find(".media-new-pagination").empty();
    if (this.state.pages <= 1) return;

    $pg.append(
      `<li class="page-item ${(this.state.page <= 1 ? "disabled" : "")}">
        <a class="page-link media-new-page-btn" data-page="${(this.state.page - 1)}" href="#">&laquo;</a>
      </li>`
    );

    var start = Math.max(1, this.state.page - 3);
    var end = Math.min(this.state.pages, start + 6);
    if (end - start < 6) start = Math.max(1, end - 6);

    for (var p = start; p <= end; p++) {
      $pg.append(
        `<li class="page-item ${(p === this.state.page ? "active" : "")}">
            <a class="page-link media-new-page-btn" data-page="${p}" href="#">
              ${p}
            </a>
          </li>`,
      );
    }

    $pg.append(
      `<li class="page-item ${(this.state.page >= this.state.pages ? " disabled" : "")}">
        <a class="page-link media-new-page-btn" data-page="${(this.state.page + 1)}" href="#">&raquo;</a>
      </li>`
    );
  }

  renderInfo() {
    var cfg = this.state.config;
    var selCount = this.state.selected.length;
    var text =
      selCount > 0
        ? this.template(cfg.selectedInfoText, {
            selected: selCount,
            count: this.state.total,
          })
        : this.template(cfg.fileInfoText, { count: this.state.total });
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

    var $grid = this.$modal.find(".media-new-grid").hide();
    var $empty = this.$modal.find(".media-new-empty").hide();
    this.$modal.find(".media-new-loading").show();

    var cfg = this.state.config;
    var params = $.extend({}, cfg.ajaxData, {
      folder: this.state.folder,
      search: this.state.search,
      page: this.state.page,
    });

    var context = {
      url: cfg.apiUrl,
      data: params,
      dataType: "json",
      headers: cfg.ajaxHeaders,
      instance: this,
    };

    $.ajax({
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
        this.instance.$modal
          .find(".media-new-empty")
          .show()
          .html(
            '<i class="fa fa-exclamation-triangle"></i>' +
              "<span>" +
              this.instance.state.config.errorText +
              "</span>",
          );
      },
      complete: function () {
        this.instance.state.loading = false;
        this.instance.$modal.find(".media-new-loading").hide();
      },
    });
  }

  onItemClick(target) {
    var $item = $(target.currentTarget);
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
        this.state.selected.push({ url: url, name: name, type: type });
        $item.addClass("selected");
      }
    } else {
      this.state.selected = [{ url: url, name: name, type: type }];
      this.$modal.find(".media-new-item").removeClass("selected");
      $item.addClass("selected");
    }
    this.renderInfo();
  }

  onFolderClick(e) {
    e.preventDefault();
    this.state.folder = $(e.currentTarget).data("folder");
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
    var p = parseInt($(e.currentTarget).data("page"), 10);
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
    for (var i = 0; i < 36; i++)
      s[i] = hex.substr(Math.floor(Math.random() * 16), 1);
    s[14] = "4";
    s[19] = hex.substr((parseInt(s[19], 16) & 3) | 8, 1);
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
    var cfg = $.extend({}, MEDIA_DEFAULTS);

    var $btn = $(
      '<div class="jquery-uploader-select-card media-new-browse-card">' +
        '<div class="jquery-uploader-select">' +
        '<div class="media-new-browse-btn">' +
        '<i class="' +
        Util.escHtml(cfg.uploaderButtonIcon) +
        '"></i>' +
        "<span>" +
        Util.escHtml(cfg.uploaderButtonText) +
        "</span>" +
        "</div>" +
        "</div>" +
        "</div>",
    );

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
              $ele: $card,
            });
          }
          uploader.refreshPreviewFileList(this, uploader);
          uploader.refreshValue();
        },
      });
    });

    var $selectCard = $container
      .find(".jquery-uploader-select-card")
      .not(".media-new-browse-card");
    if ($selectCard.length) {
      $selectCard.before($btn);
    } else {
      $container.append($btn);
    }
  }
}

export default MediaNew;
