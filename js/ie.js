// This file is licensed under the MIT License (MIT) available on
// http://opensource.org/licenses/MIT.

"use strict";

function pngfix() {
  //Allows IE6 to render transparent png
  var arVersion = navigator.appVersion.split("MSIE");
  var version = parseFloat(arVersion[1]);
  if ((version >= 5.5) && (document.body.filters))
  {
    for (var i = 0; i < document.images.length; i++)
    {
      var img = document.images[i];
      var imgName = img.src.toUpperCase();
      if (imgName.substring(imgName.length - 3, imgName.length) === "PNG")
      {
        //Workaround to skip github icons
        if (img.src.indexOf('gravatar.com') !== -1) continue;
        var imgID = (img.id) ? "id='" + img.id + "' " : "";
        var imgClass = (img.className) ? "class='" + img.className + " ieimg' " : "class='ieimg' ";
        var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' ";
        var imgStyle = "display:inline-block;" + img.style.cssText;
        var imgWidth = img.width;
        var imgHeight = img.height;
        //Workaround for hidden img to prevent 0px width and height
        if (img.src.indexOf('/img/clients/') !== -1) {
          imgWidth = '72';
          imgHeight = '72';
        }
        if (img.align === "left") imgStyle = "float:left;" + imgStyle;
        if (img.align === "right") imgStyle = "float:right;" + imgStyle;
        if (img.parentElement.href) imgStyle = "cursor:hand;" + imgStyle;
        var strNewHTML = "<span " + imgID + imgClass + imgTitle + " style=\"" + "width:" + imgWidth + "px; height:" + imgHeight + "px;" + imgStyle + ";" + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader" + "(src=\'" + img.src + "\', sizingMethod='scale');\"></span>";
        img.outerHTML = strNewHTML;
        i = i - 1;
      }
    }
  }
}

//Render all transparent pngs
window.onload = pngfix;
