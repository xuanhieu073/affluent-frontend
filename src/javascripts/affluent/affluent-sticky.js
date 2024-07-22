document.addEventListener('alpine:init', () => {
  Alpine.data('affluent_sticky', () => ({
    init() {
      // const stickyClass = this.$refs.sticky.classList;
      // const observer = new IntersectionObserver((entries) => {
      //   entries.forEach((entry) => {
      //     stickyClass.toggle('stick', !entry.isIntersecting)
      //   });
      // });
      // observer.observe(this.$root);
    }
  }));
});
  