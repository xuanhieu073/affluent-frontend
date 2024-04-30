import { lazyLoadImage } from "./lazy-load-image";

function ready() {
  const allImages = document.querySelectorAll("img[lazy-src]");
  if(allImages.length) lazyLoadImage(allImages);
}

document.addEventListener("DOMContentLoaded", ready);
