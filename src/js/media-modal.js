import MediaNew from "./media-new";

export default function openNewMedia(config, context, onSuccess) {

  if (config.search) {
    setTimeout(function ($mediaNewSearch, config) {
      $mediaNewSearch.val(config.search).trigger("input");
    }, 80, $(".media-new-Search"), config);
  }

  var mediaNew = new MediaNew(config, context, onSuccess);
  mediaNew.open();

  return this;
}
