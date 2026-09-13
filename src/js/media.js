import $ from "jquery";
import Util from "./util";
import openNewMedia from "./media-modal";
import mediaTemplate from "../html/media.html";
import mediaImageItemTemplate from "../html/media-image-item.html";
import mediaFileItemTemplate from "../html/media-file-item.html";
import format from "string-template"
import {
  MEDIA_NAME,
  MEDIA_VERSION,
  MEDIA_DEFAULTS,
  MEDIA_EVENTS,
  MEDIA_ELEMENTS,
  MEDIA_DEFAULT_TYPE,
  MEDIA_DATA_KEY,
} from "./var";

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

    $(this._element).on(
      MEDIA_EVENTS.CLICK_DATA_API,
      MEDIA_ELEMENTS.ADD,
      this,
      (event) => event.data.pick(),
    );
    $(this._element).on(
      MEDIA_EVENTS.CLICK_DATA_API,
      MEDIA_ELEMENTS.REMOVE,
      this,
      (event) =>
        event.data.remove($(event.target.parentNode.parentNode).index()),
    );
    $(this._element).on(
      MEDIA_EVENTS.CLICK_DATA_API,
      MEDIA_ELEMENTS.CLEAR,
      this,
      (event) => event.data.clear(),
    );
    $(this._element).on(
      MEDIA_EVENTS.CLICK_DATA_API,
      MEDIA_ELEMENTS.LIST_ITEM,
      this,
      (event) =>
        event.data.preview($(event.target.parentNode.parentNode).index()),
    );
  }

  _buildForm() {
    if (this.$form) return;

    var cfg = this._config;
    var html = format(mediaTemplate, {
      ControlName: Util.escHtml(cfg.name), 
      ClearTitle: Util.escHtml(cfg.clearTitle),
      AddTitle: Util.escHtml(cfg.addTitle)
    });

    this.$form = $(html);
    $(this._element).append(this.$form);
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
    $(this._element).trigger(MEDIA_EVENTS.ADD, f.url);
    this._value.push(f.url);
    this._model.innerText = JSON.stringify(this._value);

    this._drawItem(f);
    $(this._element).trigger(MEDIA_EVENTS.ADDED, f.url);
    $(this._element).trigger(MEDIA_EVENTS.CHANGE);
  }

  clear() {
    $(this._element).trigger(MEDIA_EVENTS.CLEAR);

    this._model.innerText = "[]";
    this._value = [];
    this._list.innerHTML = "";

    $(this._element).trigger(MEDIA_EVENTS.CLEARED);
    $(this._element).trigger(MEDIA_EVENTS.CHANGE);
  }

  preview(index) {
    if (typeof this._config.mediaPreviewer === "boolean") return;

    this._config.mediaPreviewer(this._value, index);
  }

  pick() {
    openNewMedia(this._config, this, function (files, context) {
      files.forEach((f) => context.addItem(f));
    });
  }

  remove(index) {
    let item = this._value[index];
    if (!item) return;

    $(this._element).trigger(MEDIA_EVENTS.DELETE, item);
    this._value.splice(index, 1);
    this._model.innerText = this._value.length ? JSON.stringify(this._value) : "[]";

    let itemEl = $(this._list).children()[index];
    itemEl.classList.add(MEDIA_ELEMENTS.HIDE);

    $(itemEl).remove();

    $(this._element).trigger(MEDIA_EVENTS.DELETED, item);
    $(this._element).trigger(MEDIA_EVENTS.CHANGE);
  }

  // Private

  _addModelListener() {
    $(this._model).on(MEDIA_EVENTS.CHANGE_DATA_API, (e) => {
      this._updateValue();
      this._drawItems();
      $(this._element).trigger(MEDIA_EVENTS.CHANGE);
    });
  }

  _drawItem(item) {

    let tmpl = "";

    if (item.type === "image") {
      tmpl = format(mediaImageItemTemplate, { url: item.url });
    } else {
      tmpl = format(mediaFileItemTemplate, {
         name: item.name,
         icon: Util.fileIcon(item.name),
        });
    }

    $(tmpl).appendTo(this._list);
  }

  _drawItems() {
    this._list.innerHTML = "";
    this._value.forEach((e) => this._drawItem(e));
  }

  _getConfig(config) {
    config = {
      ...MEDIA_DEFAULTS,
      ...config,
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
      let data = $(this).data(MEDIA_DATA_KEY);
      const _config = {
        ...MEDIA_DEFAULTS,
        ...$(this).data(),
        ...(typeof config === "object" && config ? config : {}),
      };

      if (!data) {
        data = new Media(this, _config);
        $(this).data(MEDIA_DATA_KEY, data);
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

$.fn[MEDIA_NAME] = Media._jQueryInterface;
$.fn[MEDIA_NAME].Constructor = Media;
$.fn[MEDIA_NAME].noConflict = () => {
  $.fn[MEDIA_NAME] = $.fn[MEDIA_NAME];
  return Media._jQueryInterface;
};

export default Media;
