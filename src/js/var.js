export const MEDIA_NAME = "media";
export const MEDIA_FILE_NAME = "media.js";
export const MEDIA_VERSION = "1.0.1";
export const MEDIA_DATA_KEY = "bs.media";
export const MEDIA_EVENT_KEY = `.${MEDIA_DATA_KEY}`;
export const MEDIA_DATA_API_KEY = ".data-api";

export const MEDIA_DEFAULTS = {
  mediaPreviewer: true,
  name: "media",

  apiUrl: "/api/media-list", // Your backend endpoint
  perPage: 48, // Files per page
  title: "Media Library", // Modal title
  selectText: "Select", // Select button text
  cancelText: "Cancel", // Cancel button text
  allText: "All", // "All folders" tab text
  searchPlaceholder: "Search files...", // Search input placeholder
  emptyText: "No files found", // Empty this.state text
  errorText: "Error loading files", // Error this.state text
  fileInfoText: "{count} files", // Footer info (supports {count} and {selected})
  selectedInfoText: "{selected} selected — {count} files",
  uploaderButtonText: "Media Library", // Button text on uploader
  uploaderButtonIcon: "bi bi-images", // Bootstrap icon class
  ajaxHeaders: {}, // Extra headers for API call (e.g. Authorization)
  ajaxData: {}, // Extra params for API call (e.g. csrf token)
  multiple: false,
  
  addTitle: "",
  clearTitle: ""
};

export const MEDIA_DEFAULT_TYPE = {
  mediaPreviewer: "(function|string|boolean)",
};

export const MEDIA_EVENTS = {
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
  CLICK_INPUT_SEARCH: `click${MEDIA_EVENT_KEY}`,
};

export const MEDIA_ELEMENTS = {
  ADD: ".media-add",
  REMOVE: ".media-remove",
  CLEAR: ".media-clear",
  LIST: ".media-list",
  LIST_ITEM: ".media-item",

  SELECT: ".media-new-select",
  ITEM: ".media-new-item",
  FOLDER: ".media-new-folder-btn",
  PAGE: ".media-new-page-btn",
  SEARCH: ".media-new-search",
  HIDDEN_BS_MODAL: "hidden.bs.modal",
};

export const FILE_ICONS = {
  pdf: "fa-file-pdf text-danger",
  doc: "fa-file-word text-primary",
  docx: "fa-file-word text-primary",
  xls:  "fa-file-excel text-success",
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
