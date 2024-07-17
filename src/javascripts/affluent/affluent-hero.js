// import Swiper JS
import Swiper from "swiper";
// import Swiper styles
import "swiper/css";

import { lazyLoadImage } from "../lazy-load-image";

document.addEventListener("alpine:init", () => {
  Alpine.data("affluent_hero", () => ({
    swiper: null,
    heroImageSet: [],
    loadedCount: 0,
    activeIndex: 0,
    async init() {
      this.heroImageSet = this.$root.querySelectorAll('.affluent-hero_bg');
      this.swiper = new Swiper(this.$root, {
        autoplay: {
          delay: this.$root.dataset.autoplayMs || 5000,
          disableOnInteraction: false,
        },
        breakpoints: {
          768: {
            allowTouchMove: false,
          }
        }
      })
      await this.$nextTick();
      const allImgs = [...this.heroImageSet].reduce((acc, hero) => {
        const imgs = hero.querySelectorAll('img[lazy-swiper-src]');
        return [...acc, ...imgs]
      }, [])
      lazyLoadImage(allImgs);
      const _this = this;
      this.swiper.on('realIndexChange', (e) => {
        _this.activeIndex = e.realIndex;
      });

      //calc pagination possiton
      const herocontents = this.$root.querySelectorAll('.affluent-hero_content');
      const maxContentHeight = [...herocontents].reduce((acc, item) => {
        return item.offsetHeight > acc ? item.offsetHeight : acc;
      }, 0)
      this.$root.style.setProperty('--pagi-top', 8 + maxContentHeight + 'px')
    },
    goToSlide(index){
      this.swiper.slideTo(index);
    }
  }));
});
