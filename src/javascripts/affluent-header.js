document.addEventListener("alpine:init", () => {
  Alpine.data("affluentheader", () => ({
    menuShow: false,
    submenuid: '',
    async init() {
      const _this = this;
      const root = this.$root;
      this.$watch('submenuid', val => {
        this.$refs.submenu.classList.toggle('hidden', false)
      })
      const menuLength = root.querySelectorAll('.affluent-header_menu li').length;
      if(menuLength == 0) {
        _this.$refs.menuIcon.style.display = 'none';
      }
      const observerHeader = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const percentageVisible = entry.intersectionRatio * 100;
            console.log(`Percentage visible: ${percentageVisible.toFixed(2)}%`);
            if (percentageVisible < 100) {
              _this.$refs.container.style.setProperty("--p", "fixed");
              _this.$refs.reserve.style.setProperty(
                "--h",
                `${_this.$refs.container.offsetHeight}px`
              );
            } else {
              // _this.$refs.container.style.setProperty("--p", "relative");
              // _this.$refs.reserve.style.setProperty("--h", `0px`);
            }
          });
        },
        {
          threshold: [0, 1],
        }
      );
      await this.$nextTick();
      observerHeader.observe(root);
    },
    toggleShowMenu() {
      this.menuShow = !this.menuShow;
      if (this.menuShow) {
        this.$refs.menu.style.setProperty("--d", "block");
        this.$refs.layout.style.setProperty("--h", "100vh");
        document.body.style.overflow = "hidden";
      } else {
        this.$refs.menu.style.setProperty("--d", "none");
        this.$refs.layout.style.setProperty("--h", "auto");
        document.body.style.overflow = null;
      }
    },
    screen() {
      const breakpoint = getComputedStyle(this.$root).getPropertyValue('--breakpoint');
      return breakpoint.toString();
    },
    unhovershowsubmenu() {
      if(this.screen() === 'desktop') this.submenuid = '';
    },
    showsubmenu: {
      ['@mouseover']() { 
        if(this.screen() === 'desktop') this.submenuid = this.$el.dataset.target;
      },
      ['@click']() { 
        if(this.screen() === 'mobile') this.submenuid = this.$el.dataset.target;
      },
    },
    submenu: {
      ['x-show'](){
        return this.$el.dataset.submenuid === this.submenuid;
      },
      ['x-transition:enter.opacity.duration.500ms'](){}
    }
  }));
});
