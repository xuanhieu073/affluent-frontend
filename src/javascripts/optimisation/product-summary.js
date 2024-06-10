document.addEventListener("alpine:init", () => {
  Alpine.data("productSummary", () => ({
    currentPage: 0,
    totalPages: 0,
    init() {
      const _this = this;
      this.totalPages = this.$refs.list.childElementCount;
      const productsCard = this.$refs.list.children;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            _this.currentPage = entry.target.index
          }
        });
      }, {
        threshold: 0.20
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
      console.log(index)
      const targetProductCard = this.$root.querySelector(`[data-index='${index}']`);
      targetProductCard.scrollIntoView({ behavior: "smooth"})
    }
  }));
});