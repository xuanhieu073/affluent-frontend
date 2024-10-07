document.addEventListener("alpine:init", () => {
  Alpine.data("cloneLoginMenu", () => ({
    isOpen: false,
    init() {
      const orgiginLoginButton = document.querySelector('button.sl-main-menu-button');
      console.log("🚀 ~ init ~ orgiginLoginButton:", orgiginLoginButton);
      const originLoginMenu = orgiginLoginButton.parentElement.querySelector('.sl-header-login-menu');
      console.log("🚀 ~ init ~ originLoginMenu:", originLoginMenu)
      this.$refs.loginMenu.innerHTML = originLoginMenu.innerHTML;
    }
  }))
})