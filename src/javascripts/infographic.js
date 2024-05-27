function throttle(callback, limit) {
  var wait = false; // Initially, we're not waiting
  return function () {
    // We return a throttled function
    if (!wait) {
      // If we're not waiting
      callback.call(); // Execute users function
      wait = true; // Prevent future invocations
      setTimeout(function () {
        // After a period of time
        wait = false; // And allow future invocations
      }, limit);
    }
  };
}

document.addEventListener("alpine:init", () => {
  Alpine.store("delaydes", {
    on: false,

    toggle(value) {
      this.on = value;
    },
    desTooltipByStore(id) {
      const targetTooltip = document.getElementById(id);
      targetTooltip.hidePopover();
    },
  });
  Alpine.data("infographic", () => ({
    selectedPlan: "starter-plus",
    yllpay: 5,
    shover: false,
    yhover: false,
    dhover: false,
    changeNumberInterval: null,
    get sllpay() {
      return 100 - this.yllpay;
    },
    init() {
      this.$watch("selectedPlan", (v) => {
        clearInterval(this.changeNumberInterval);
        if (v === "starter-plus") {
          this.changeNumberInterval = setInterval(() => {
            if (this.yllpay > 5) {
              this.yllpay--;
            } else {
              clearInterval(this.changeNumberInterval);
            }
          }, 10);
        } else {
          this.changeNumberInterval = setInterval(() => {
            if (this.yllpay < 42) {
              this.yllpay++;
            } else {
              clearInterval(this.changeNumberInterval);
            }
          }, 10);
        }
      });
    },
    async showTooltip(id, targetHoverEl) {
      const targetTooltip = document.getElementById(id);
      const align = targetTooltip.classList.contains("right-align");
      const bodyRect = document.body.getBoundingClientRect();
      const elemRect = this.$refs[targetHoverEl].getBoundingClientRect();
      let top = elemRect.top - bodyRect.top;
      let left = 0,
        right = 0;
      if (align) {
        right = bodyRect.width - elemRect.left;
        targetTooltip.style.setProperty("--right", right + "px");
      } else {
        left = elemRect.right;
        targetTooltip.style.setProperty("--left", left + "px");
      }
      targetTooltip.style.setProperty("--top", top + "px");
      targetTooltip.showPopover();

      if (elemRect.top < targetTooltip.clientHeight) {
        top = this.$refs.chart.getBoundingClientRect().top - bodyRect.top;
        top += this.$refs.chart.offsetHeight;
        targetTooltip.classList.remove("top-pointer");
        targetTooltip.classList.add("bottom-pointer");
      } else {
        top -= targetTooltip.offsetHeight + 10;
        targetTooltip.classList.remove("bottom-pointer");
        targetTooltip.classList.add("top-pointer");
      }

      targetTooltip.style.setProperty("--top", top < 0 ? 0 : top + "px");

      if (align) {
        right -= targetTooltip.offsetWidth - 12;
        targetTooltip.style.setProperty(
          "--right",
          right < 0 ? 0 : right + "px"
        );
        const tooltipRect = targetTooltip.getBoundingClientRect();
        const pointer = elemRect.left - tooltipRect.left + 50 - 11;
        targetTooltip.style.setProperty("--pointer", pointer + "px");
      } else {
        left -= targetTooltip.offsetWidth - 12;
        targetTooltip.style.setProperty("--left", left < 0 ? 0 : left + "px");
        const tooltipRect = targetTooltip.getBoundingClientRect();
        const pointer =
          elemRect.left - tooltipRect.left + elemRect.width / 2 - 11;
        targetTooltip.style.setProperty("--pointer", pointer + "px");
      }
    },
    hideTooltip(id) {
      const targetTooltip = document.getElementById(id);
      if (!this.$store.delaydes.on) targetTooltip.hidePopover();
    },
  }));
  Alpine.data("toolipPopover", () => ({
    init() {
      const triggerEls = this.$root.querySelectorAll('[href^="#"]');
      for (const triggerEl of triggerEls) {
        const tooltipId = triggerEl.getAttribute("href").replace("#", "");
        triggerEl.addEventListener("click", (e) => {
          e.preventDefault();
          this.hoverTooltip(tooltipId, triggerEl);
          this.$store.delaydes.toggle(true);
        });
        triggerEl.addEventListener("mouseover", () => {
          this.hoverTooltip(tooltipId, triggerEl);
          this.$store.delaydes.toggle(true);
        });
        triggerEl.addEventListener("mouseleave", () => {
          this.desTooltip(tooltipId);
          this.$store.delaydes.toggle(false);
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
        top += el.offsetHeight;
        targetTooltip.classList.remove("top-pointer");
        targetTooltip.classList.add("bottom-pointer");
      } else {
        top -= targetTooltip.offsetHeight;
        targetTooltip.classList.remove("bottom-pointer");
        targetTooltip.classList.add("top-pointer");
      }

      targetTooltip.style.setProperty("--top", top < 0 ? 0 : top + "px");
    },
    desTooltip(id) {
      const targetTooltip = document.getElementById(id);
      setTimeout(() => {
        if (!this.$store.delaydes.on) targetTooltip.hidePopover();
      }, 300);
    },
  }));
});
