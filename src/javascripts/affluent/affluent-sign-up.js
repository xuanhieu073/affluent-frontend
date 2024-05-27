document.addEventListener('alpine:init', () => {
  Alpine.data('blog_sign_up_form', () => ({
    fields: {},
    data: {},
    status: 'idle',
    successMessage: '',
    failMessage: '',
    formName: '',
    Viewed: false,
    init(){
      this.formName = this.$root.getAttribute('name');
      const { successMessage, failMessage, urlSuccessAnimation, urlFailAnimation } = this.$el.dataset;
      this.successMessage = successMessage;
      this.failMessage = failMessage;
      this.$watch('status', status => {
        if(status == 'success'){
          this.loadJsonPlayer('sl-success', urlSuccessAnimation);
        }
        if(status == 'fail'){
          this.loadJsonPlayer('sl-fail', urlFailAnimation);
        }
        setTimeout(() => {
          this.status = 'idle';
        }, 5000);
      })
    },
    checkIfFormVisibleOnView() {
      const rect = this.$root.getBoundingClientRect();
      if(
        !this.Viewed
        && rect.top >= 0
        && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        && rect.top != 0 && rect.bottom != 0
      ){
        this.Viewed = true;
        trackPopupForm(this.formName, 'view');
      }
    },
    initField(ele) {
      const { name, type } = ele;
      console.log("🚀 ~ initField ~ name:", name)
      this.fields[name] = { error: false, dirty: false, message: '', type: type, el: ele };
    },
    inputValidation($el) {
      const name = $el.name;
      if (!this.fields[name].dirty) {
        this.fields[name].dirty = true;
      }

      let ele = $el;
      let value = ele.value;
      let data_check_validation = ele.dataset.checkValidation; //ele.getAttribute('data-check-validation');
      let data_error_message = ele.dataset.errorMessage; //ele.getAttribute('data-error-message');
      let data_custom_regex = ele.dataset.customRegex; //ele.getAttribute('data-custom-regex');
      let data_custom_regex_error = ele.dataset.customRegexError; //ele.getAttribute('data-custom-regex-error');

      if ((data_check_validation == 'false') || value == '') {
        this.fields[name].error = false;
        this.fields[name].message = '';
      }

      if ((data_check_validation === 'true') || value != '') {
        if (value == '') {
          this.fields[name].error = true;
          this.fields[name].message = data_error_message;
        } else if (data_custom_regex != '') {
          const regex = new RegExp(data_custom_regex);
          if (regex.test(value)) {
            this.fields[name].error = false;
            this.fields[name].message = '';
          } else {
            this.fields[name].error = true;
            this.fields[name].message = data_custom_regex_error;
          }
        } else {
          this.fields[name].error = false;
          this.fields[name].message = '';
        }
      }
    },
    onValidate() {
      const fields_name = Object.keys(this.fields);
      for(const field_name of fields_name){
        this.inputValidation(this.fields[field_name].el);
      }
      //When submit, validate and get the fields name that is error
      const errorFields = fields_name.filter((key) => this.fields[key].error);
      console.log("🚀 ~ onValidate ~ errorFields:", errorFields)
      // if (errorFields.length) trackPopupFormError(this.formName, errorFields);

      return !fields_name.some((key) => {
        return this.fields[key].error === true;
      });
    },
    getFormData(){
      let data = {}
      const fields_name = Object.keys(this.fields);
      const inputElements = this.$root.getElementsByTagName('input');
      fields_name.forEach((fieldName) => {
        for(const inputEle of inputElements){
          if(inputEle.name == fieldName){
            data[fieldName] = inputEle.value;
          }
        }
      });
      data.source = 'Web form';
      return data;
    },
    // Integrate reCaptchaV3
    recapchaGetToken: (sitekey) => new Promise((resolve) => {
      grecaptcha.ready(async function() {
        const token = await grecaptcha.execute(sitekey, {action: 'submit'});
        resolve(token);
      });
    }),
    async onSubmitWithRecapt() {
      const {sitekey} = this.$root.dataset;
      if(sitekey) {
        const token = await this.recapchaGetToken(sitekey);
        this.onSubmit(token);
      }
      else {
        this.onSubmit();
      }
    },
    async onSubmit(token = null){
      console.log('onsubmit')
      const isValidate = this.onValidate();
      if(!isValidate){
        return;
      }
      const getAPIheaders = customHeaders => {
        var defaultHeaders = {
            'Content-Type': 'application/json; charset=UTF-8',
            'X-Aviva-Referer': window.location.href,
          },
          headers = {...defaultHeaders, ...customHeaders};
        return headers;
      };
      const body = token ? JSON.stringify({token, ...this.getFormData()}).replace(/&/g, 'and') : JSON.stringify(this.getFormData()).replace(/&/g, 'and');
      const { url: submitUrl, apiKey } = this.$root.dataset;
      const options = {
          method: 'POST',
          headers: getAPIheaders(apiKey ? {Authorization: 'Bearer '.concat(apiKey)} : {}),
          body,
      };
      try {
        const data = await fetch(submitUrl, options)
          .then(function (response) {
              return response.json().then(function (data) {
                  return {
                      status: response.status,
                      body: data,
                  };
              });
          })
        if ((data && data.status === 400) || data.status === 500 || data.status === 403) {
          this.status = 'fail';
          trackPopupForm(this.formName, 'submit');
        } else {
          this.status = 'success';
          trackPopupForm(this.formName, 'submit');
        }
      }
      catch(e){
        this.status = 'fail'
      }
    },
    loadJsonPlayer(id, url) {
      console.log("🚀 ~ loadJsonPlayer ~ url:", url)
      const player = this.GetJsonPlayerInsideContainer(id);
      console.log("🚀 ~ loadJsonPlayer ~ player:", player)
      player.addEventListener('rendered', (e) => {
        player.load(url);
      });
      player.load(url);
    },
    GetJsonPlayerInsideContainer(childID) {
      var elm = {};
      var elms = this.$root.getElementsByTagName("lottie-player");
      for (var i = 0; i < elms.length; i++) {
        if (elms[i].id === childID) {
          elm = elms[i];
          break;
        }
      }
      return elm;
    },
    datafield: {
      ['x-data']() {
        return {fieldName: '', placeholder: ''}
      },
    },
    textfield: {
      ['x-init'](){
        const { name, placeholder } = this.$el;
        this.fieldName = name;
        this.placeholder = placeholder;
        this.initField(this.$el);
      },
      ['@focus'](){
        this.$el.placeholder = ''
      },
      ['@focusout'](){
        this.$el.placeholder = this.placeholder;
      },
      ['@input'](){
        this.inputValidation(this.$el)
      },
      [':class']() {
        return this.fieldName in this.fields && this.fields[this.fieldName].error && 'error'
      },
    },
    errorclass: {
      [':class']() {
        return this.fieldName in this.fields && this.fields[this.fieldName].error && 'error'
      },
    },
    errormessage: {
      ['x-show']() { 
        return this.fieldName in this.fields && this.fields[this.fieldName].error && 'error'; 
      },
      ['x-text']() {
        return this.fields[this.fieldName].message
      },
    }
  }));
});
  