// import Swiper JS
import Swiper from "swiper";
// import Swiper styles
import "swiper/css";

document.addEventListener('alpine:init', () => {
  Alpine.data('cardCarousel', () => ({ 
    swiper: null, 
    current: 0,
    init() {
      this.swiper = new Swiper(this.$refs.containerCardLefts, {
        loop: false,
        speed: 800,
        slidesPerView: 'auto',
        autoplay: { 
          delay: 8000,
          disableOnInteraction: false
        },
        slideToClickedSlide: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        breakpoints: {
          320: {
            spaceBetween: 16,
            centeredSlides: false
          },
          960: {
            spaceBetween: 69,
            centeredSlides: true,
          }
        }
      });
      const swiper = this.swiper;
      this.swiper.on('slideChangeTransitionEnd', function (target) {
        this.current = target.realIndex;
      });
      this.swiper.on('activeIndexChange', function () {
        swiper.params.autoplay.delay = 8000;
      });
    }
  }));
  Alpine.data('cardLeftContent', () => ({
    goto(type = '_self') {
      type = type === '' ? '_self' : type;
      const url = this.$refs.card.dataset.url;
      window.open(url, type);
      this.swiper.params.autoplay.delay = 16000;
    },
    clickCard(type) {
      this.swiper.autoplay.stop();
      this.swiper.params.autoplay.delay = 16000;
      this.swiper.autoplay.start();
      const currentBreakpoint = Number(this.swiper.currentBreakpoint);
      const next = this.swiper.realIndex;
      const current = this.current;
      if (currentBreakpoint < 960 && (current === next)) {
        this.goto(type);
      }
    }
  }));
});