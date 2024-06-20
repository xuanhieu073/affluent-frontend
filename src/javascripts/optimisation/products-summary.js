document.addEventListener("alpine:init", () => {
  Alpine.data("productSummary", () => ({
    currentPage: 0,
    totalPages: 0,
    isOverflow: false,
    init() {
      const _this = this;
      const list = this.$refs.list;

      if (!list) {
        console.error("Reference to list element is undefined");
        return;
      }

      this.isOverflow = list.clientWidth < list.scrollWidth
      this.totalPages = list.childElementCount;
      const productsCard = list.children;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            _this.currentPage = entry.target.index
          }
        });
      }, {
        threshold: 0.2
      });
      let i = 0;
      for(const productCard of productsCard) {
        productCard.index = i;
        productCard.setAttribute("data-index", i);
        observer.observe(productCard);
        i++;
      }
    },
    scrollTo(index) {
      const targetProductCard = this.$root.querySelector(`[data-index='${index}']`);
      const isOverflowList = this.$refs.list.clientWidth < this.$refs.list.scrollWidth;
      if (targetProductCard && isOverflowList) {
        const leftScroll = targetProductCard.clientWidth * index;
        this.$refs.list.scrollTo({ left: leftScroll, behavior: "smooth" });
      }
      if(targetProductCard.getBoundingClientRect().bottom < targetProductCard.clientHeight * 0.2){
        this.currentPage = index;
      }
    }
  }));
});
