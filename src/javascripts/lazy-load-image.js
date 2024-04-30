function load(img) {
  const url = img.getAttribute("lazy-src");
  if(url) {
    img.setAttribute("src", url);
    img.removeAttribute("lazy-src");
  }
}

export function lazyLoadImage(imageEntries) {
  if(imageEntries) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          load(entry.target);
        }
      });
    });
    
    imageEntries.forEach((img) => {
      observer.observe(img);
    });
  }
}