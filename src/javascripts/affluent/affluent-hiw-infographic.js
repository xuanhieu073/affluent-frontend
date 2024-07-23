// import Swiper JS
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

document.addEventListener("alpine:init", () => {
  Alpine.data("affluent_hiwinfographic", () => ({
    swiper: null,
    init() {
      this.swiper = new Swiper(this.$refs.swiper, {
        modules: [Navigation, Pagination],
        slidesPerView: "auto",
        spaceBetween: 8,
        centeredSlides: true,
        slideToClickedSlide: true,
        pagination: {
          el: this.$refs.pagination,
          clickable: true,
          renderBullet: function (index, className) {
            return '<span class="' + className + '">' + "</span>";
          },
        },
        breakpoints: {
          768: {
            spaceBetween: 0,
          },
        },
      });
      const { backButton, nextButton } = this.$root.dataset;
      const backbutonStyle = `
        .affluent-hiw-infographic_container .swiper-slide-next:hover { cursor: url(${nextButton}) 20 20, move; }
        .affluent-hiw-infographic_container .swiper-slide-prev:hover { cursor: url(${backButton}) 15 15, move; }
      `;
      const style = document.createElement('style');
      if (style.styleSheet) {
        style.styleSheet.cssText = backbutonStyle;
      } else {
        style.appendChild(document.createTextNode(backbutonStyle));
      }
      document.getElementsByTagName('head')[0].appendChild(style);
    },
  }));
});
