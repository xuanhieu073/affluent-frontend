document.addEventListener("alpine:init", () => {
  Alpine.data("affluent_products_grid", () => ({
    showAll: false,
    productCards: [],
    init() {
      this.productCards = this.$root.querySelectorAll(".affluent-card_medium");
      for(let i = 4; i < this.productCards.length; i++) {
        this.productCards[i].style.display = "none";
      }
      if(this.productCards.length <= 4) {
        this.$refs.loadMore.style.setProperty('display', 'none');
      }
    },
    toggleShowAll() {
      if(this.showAll) {
        for(let i = 4; i < this.productCards.length; i++) {
          this.productCards[i].style.display = "none";
        }
      }
      else {
        for(let i = 4; i < this.productCards.length; i++) {
          this.productCards[i].style.display = null;
        }
      }
      this.showAll = !this.showAll;
    }
  }));
});
