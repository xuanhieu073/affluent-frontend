document.addEventListener("alpine:init", () => {
  Alpine.data("affluent_leadinsection", () => ({
    totalCard: 0,
    cardPerCol: 0,
    init() {
      const cards = this.$root.querySelectorAll(".affluent-card_icon");
      this.totalCard = cards.length;
      if((this.totalCard % 4 === 0) || this.totalCard > 6) {
        this.cardPerCol = 4;
      }
      else {
        this.cardPerCol = 3;
      }
      const lastRowCardCount = this.totalCard % this.cardPerCol;
      if(this.cardPerCol === 3) {
        for(let i = 0; i < Math.floor(this.totalCard / this.cardPerCol) * this.cardPerCol; i++) {
          cards[i].style.marginInline = `4px`;
        }
      }
      for(let i = Math.floor(this.totalCard / this.cardPerCol) * this.cardPerCol; i < this.totalCard; i++) {
        const addMargin = (4-lastRowCardCount) * 4;
        cards[i].style.marginInline = `${addMargin}px`;
      }
    },
  }));
});
