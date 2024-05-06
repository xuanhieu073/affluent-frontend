document.addEventListener("alpine:init", () => {
  Alpine.data("infographic", () => ({
    selectedPlan: 'starter-plus',
    yllpay: 5,
    shover: false,
    yhover: false,
    dhover: false,
    changeNumberInterval: null,
    get sllpay() {
      return 100-this.yllpay;
    },
    init() {
      this.$watch('selectedPlan', v => {
        clearInterval(this.changeNumberInterval);
        if(v === 'starter-plus') {
          this.changeNumberInterval = setInterval(() => {
            if(this.yllpay > 5) {
              this.yllpay--;
            }
            else {
              clearInterval(this.changeNumberInterval);
            }
          }, 10)
        }
        else {
          this.changeNumberInterval = setInterval(() => {
            if(this.yllpay < 42) {
              this.yllpay++;
            }
            else {
              clearInterval(this.changeNumberInterval);
            }
          }, 10)
        }
      })
    },
    async showTooltip(id, targetHoverEl) {
      const targetTooltip = document.getElementById(id);
      const align = targetTooltip.classList.contains('right-align')
      const bodyRect = document.body.getBoundingClientRect();
      const elemRect = this.$refs[targetHoverEl].getBoundingClientRect();
      let top = elemRect.top - bodyRect.top;
      let left = 0, right = 0;
      if(align) {
        right = bodyRect.width - elemRect.left;
        targetTooltip.style.setProperty('--right', right+'px');
      } else {
        left = elemRect.right;
        targetTooltip.style.setProperty('--left', left+'px');
      }
      targetTooltip.style.setProperty('--top', top+'px');
      targetTooltip.showPopover();
      
      top-=targetTooltip.offsetHeight + 10;
      targetTooltip.style.setProperty('--top', top < 0 ? 0 : top+'px');
      
      if(align) {
        right-=targetTooltip.offsetWidth - 12;
        targetTooltip.style.setProperty('--right', right < 0 ? 0 : right+'px');
        const tooltipRect = targetTooltip.getBoundingClientRect();
        const pointer = elemRect.left - tooltipRect.left + 50-11;
        targetTooltip.style.setProperty('--pointer', pointer + 'px');
      } else {
        left-=targetTooltip.offsetWidth - 12;
        targetTooltip.style.setProperty('--left', left < 0 ? 0 : left+'px');
        const tooltipRect = targetTooltip.getBoundingClientRect();
        const pointer = elemRect.left - tooltipRect.left + elemRect.width/2-11;
        targetTooltip.style.setProperty('--pointer', pointer + 'px');
        // console.log("🚀 ~ showTooltip ~ tooltipRect.left, elemRect.left:", tooltipRect.left, elemRect.left)
      }
    },
    hideTooltip(id) {
      const targetTooltip = document.getElementById(id);
      targetTooltip.hidePopover();
    }
  }));
  Alpine.data("toolipPopover", () => ({
    init() {
      const triggerEls = this.$root.querySelectorAll('[href^="#"]')
      for(const triggerEl of triggerEls) {
        triggerEl.addEventListener('click', () => this.hoverTooltip('tooltippov', triggerEl));
      }
    },
    async hoverTooltip(id, el) {
      const targetTooltip = document.getElementById(id);
      const align = targetTooltip.classList.contains('right-align')
      const bodyRect = document.body.getBoundingClientRect();
      const elemRect = el.getBoundingClientRect();
      console.log("🚀 ~ hoverTooltip ~ el:", el)
      let top = elemRect.top - bodyRect.top;
      console.log("🚀 ~ hoverTooltip ~ elemRect.top :", elemRect.top )
      let left = 0, right = 0;
      if(align) {
        right = bodyRect.width - elemRect.left;
        targetTooltip.style.setProperty('--right', right+'px');
      } else {
        left = elemRect.right;
        targetTooltip.style.setProperty('--left', left+'px');
      }
      targetTooltip.style.setProperty('--top', top+'px');
      targetTooltip.showPopover();
      
      top-=targetTooltip.offsetHeight;
      // targetTooltip.style.setProperty('--top', top < 0 ? 0 : top+'px');
      
      if(align) {
        right-=targetTooltip.offsetWidth - 12;
        targetTooltip.style.setProperty('--right', right < 0 ? 0 : right+'px');
        const tooltipRect = targetTooltip.getBoundingClientRect();
        const pointer = elemRect.left - tooltipRect.left + 50-11;
        targetTooltip.style.setProperty('--pointer', pointer + 'px');
      } else {
        left-=targetTooltip.offsetWidth - 12;
        targetTooltip.style.setProperty('--left', left < 0 ? 0 : left+'px');
        const tooltipRect = targetTooltip.getBoundingClientRect();
        const pointer = elemRect.left - tooltipRect.left + elemRect.width/2-11;
        targetTooltip.style.setProperty('--pointer', pointer + 'px');
        // console.log("🚀 ~ showTooltip ~ tooltipRect.left, elemRect.left:", tooltipRect.left, elemRect.left)
      }
    },
    desTooltip(id) {
      const targetTooltip = document.getElementById(id);
      targetTooltip.hidePopover();
    }
  }));
});
