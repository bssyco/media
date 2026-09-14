# @bssyco/media

A bootstrap javascript control to visualize and select multiple files like images and documents from service.

## Table of contents

- [Quick start](#quick-start)
- [Features](#features)
- [Example](#example)
- [Installation](#installation)
- [Versioning](#versioning)
- [Website](#website)
- [Creator](#creator)
- [More Information](#more-information)
- [Copyright and license](#copyright-and-license)

## Quick start

Media control is a responsive control for selecting documents and images from server.

For using media, you must reference jquery, bootstrap, font-awsome and media.

``` Html

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.3.1/css/all.css" />
    <link rel="stylesheet" href="https://github.com/bssyco/media/dist/css/media.css" />

```

``` Html

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/4.0.0/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.min.js"></script>
    <script src="https://github.com/bssyco/media/dist/js/media.js"></script>

```

Add a div tag to your form.

``` Html

    <div class="media-library"></div>
    
```

Call media in your js tag.

``` javascript

   $('.media-library').media({
       name: "mediaItems",
       apiUrl: "https://github.com/bssyco/media/docs/assets/index.json",
       title: "Media Library",
   }, this);

```

You select div element and call media with your options.

If you want call files from your server, you must replace your server api link with apiUrl value in media parameters.

Your server reponse must be like this:

``` json

    {
      "files": [
      {
        "url": "assets/sample1.jpg",
        "name": "sample1.jpg",
        "type": "image",
        "size": "1200",
        "modified": "2026-01-01"
      },
      {
        "url": "assets/sample2.jpg",
        "name": "sample2.jpg",
        "type": "image",
        "size": "1200",
        "modified": "2026-01-01"
      }
    ]
  }

```

when you submit the form that have media control, form submitted with name that you assigned in media options.

In this example, data submitted with name of 'mediaItems' and value of ["url1", "url2"] in an array.

For more information, visit project website <a href="https://media.bssyco.com">Media Project</a>

## Features

- **Responsive** - media is a responsive control and you can use it in desktop, tablet and mobile.
- **Multi-seclection** - you can select multiple files.
- **Document Searching** - you can search documents and files.
- **Pagination** - Media control uses server-side pagination.
- **Filtering** - You cand filter files with folder options.
- **Performance** - Media control is a fast js control.
- **Scalable** - You can add many media controls in one form with different names.

## Example

In <a href="https://bssyco.github.io/media">Demo</a>, there are two media controls, 'Media Library' and 'Multi-selection Library'.

In 'Media Library' control, users can select one file and in 'Multi-selection Library' users can select multyple files.

## Installation

```bash
npm install @bssyco/media
```

## Versioning

See [the Releases section of our GitHub project](https://github.com/bssyco/media/releases)

## Website

<a href="https://media.bssyco.com">Bssyco</a>

## Creator

Parviz Taghavi <parviz.taghavi@bssyco.com>

- <https://github/bssyco>
- <https://media.bssyco.com>

## More Information

for more information: <a href="https://media.bssyco.com">Media Project</a>

## Copyright and license

Code released under the [MIT License](https://github.com/bssyco/media/LICENSE).