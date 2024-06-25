document.addEventListener("alpine:init", () => {
  Alpine.data("toolipPopover", () => ({
    init() {
      const triggerEls = this.$root.querySelectorAll('[href^="#"]');
      for (const triggerEl of triggerEls) {
        const tooltipId = this.$id('tp') + triggerEl.getAttribute("href").replace("#", "");
        triggerEl.addEventListener("click", (e) => {
          e.preventDefault();
          this.hoverTooltip(tooltipId, triggerEl);
          this.$store.delaydes.toggle(tooltipId);
        });
        triggerEl.addEventListener("mouseover", () => {
          this.hoverTooltip(tooltipId, triggerEl);
          this.$store.delaydes.toggle(tooltipId);
        });
        triggerEl.addEventListener("mouseleave", () => {
          this.desTooltip(tooltipId);
          this.$store.delaydes.toggle('');
        });
      }
    },
    async hoverTooltip(id, el) {
      const targetTooltip = document.getElementById(id);
      const bodyRect = document.body.getBoundingClientRect();
      const elemRect = el.getBoundingClientRect();
      let top = elemRect.top - bodyRect.top + 2;
      let left = 0;

      left = elemRect.left;
      targetTooltip.style.setProperty("--left", left + "px");

      targetTooltip.style.setProperty("--top", top + "px");
      targetTooltip.showPopover();

      if (elemRect.top < targetTooltip.clientHeight) {
        targetTooltip.classList.remove("top-pointer");
        targetTooltip.classList.add("bottom-pointer");
        top += el.offsetHeight;
      } else {
        targetTooltip.classList.remove("bottom-pointer");
        targetTooltip.classList.add("top-pointer");
        top -= targetTooltip.offsetHeight;
      }

      targetTooltip.style.setProperty("--top", top < 0 ? 0 : top + "px");
    },
    desTooltip(id) {
      const targetTooltip = document.getElementById(id);
      setTimeout(() => {
        if (this.$store.delaydes.on !== id) targetTooltip.hidePopover();
      }, 50);
    },
  }));
});

if (navigator.userAgent.indexOf('Windows') !== -1 && navigator.userAgent.indexOf('Chrome') !== -1) {
  document.documentElement.classList.add('chrome-windows');
}