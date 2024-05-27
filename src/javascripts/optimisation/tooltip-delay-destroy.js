document.addEventListener("alpine:init", () => {
  Alpine.store("delaydes", {
    on: '',

    toggle(value) {
      this.on = value;
    },
    desTooltipByStore(id) {
      const targetTooltip = document.getElementById(id);
      targetTooltip.hidePopover();
    },
  });
});