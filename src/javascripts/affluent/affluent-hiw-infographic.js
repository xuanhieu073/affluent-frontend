// import Swiper JS
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

document.addEventListener("alpine:init", () => {
  Alpine.data("affluent_hiwinfographic", () => ({
    swiper: null,
    init() {
      this.swiper = new Swiper(this.$refs.swiper, {
        modules: [Navigation, Pagination],
        slidesPerView: 'auto',
        spaceBetween: 8,
        centeredSlides: true,
        pagination: {
          el: this.$refs.pagination,
          clickable: true,
          renderBullet: function (index, className) {
            return '<span class="' + className + '">' + "</span>";
          },
        },
        breakpoints: {
          768: {
            spaceBetween: 32,
          }
        }
      })
    },
  }));
});
