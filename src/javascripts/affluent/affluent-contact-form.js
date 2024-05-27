let digitalData = {}
function setAffluentFormDataTrack(type, formName, formData, track) {
  const event = `track_form_${type}`;
  if (!digitalData.form) digitalData.form = {};
  digitalData.form.name = formName;
  digitalData.form = {...digitalData.form, ...formData};
  if (track) {
    console.log(event, 'digitalData', JSON.stringify(digitalData, null, 2));
    // trying(() => _satellite.track(event));
  }
}

document.addEventListener('alpine:init', () => {
  Alpine.data('affluent_contact_form', () => ({
    fields: {},
    data: {},
    status: 'idle',
    successMessage: '',
    failMessage: '',
    formName: '',
    touched: false,
    init(){
      const _this =this;
      this.formName = [
        document.querySelector('.affluent-contact-form_title').innerText || null,
        this.$root.name || null,
        this.$root.id || null,
      ].filter(name => !!name).join(' | ')

      const formControls = this.$root.querySelectorAll('.affluent-contact-form_form-control, .affluent-contact-form_submit');
      formControls.forEach(control => {
        control.addEventListener('click', () => {
          if(!_this.touched) {
            _this.touched = true;
            setAffluentFormDataTrack('start', _this.formName, {}, true);
          }
        })
      })

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
    initField($el) {
      const { name, type, label } = $el;
      const { pre, primary } = $el.dataset;
      const fielddata = { error: false, dirty: false, message: '', type, label, el: $el, primary, value: '' }
      this.fields[name] = pre ? {...fielddata, pre} : fielddata;
    },
    inputValidation($el, value) {
      const name = $el.name;
      if (!this.fields[name].dirty) {
        this.fields[name].dirty = true;
      }
      this.fields[name].value = value;
      let data_check_validation = $el.dataset.checkValidation; //ele.getAttribute('data-check-validation');
      let data_error_message = $el.dataset.errorMessage; //ele.getAttribute('data-error-message');
      let data_custom_regex = $el.dataset.customRegex; //ele.getAttribute('data-custom-regex');
      let data_custom_regex_error = $el.dataset.customRegexError; //ele.getAttribute('data-custom-regex-error');

      if ((data_check_validation == 'false') || value == '') {
        this.fields[name].error = false;
        this.fields[name].message = '';
      }

      if ((data_check_validation === 'true') || (value != '' && $el.type !== 'checkbox')) {
        if (value == '' || $el.type === 'checkbox' && !$el.checked) {
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
      console.log("🚀 ~ getFormData ~ this.fields:", this.fields)
      const fields_name = Object.keys(this.fields);
      for(const field_name of fields_name){
        this.inputValidation(this.fields[field_name].el, this.fields[field_name].value);
      }
      //When submit, validate and get the fields name that is error
      const errorFields = fields_name.reduce((acc, key) => { 
        if (this.fields[key].error) 
          return [...acc, {label: this.fields[key].label, message: this.fields[key].message}]
        else 
          return acc
      }, []);
      const error = {
        numsErrors: errorFields.length,
        fieldLabels: errorFields.map(field => field.label).join(','),
        messages: errorFields.map(field => field.message).join(','),
      }
      if (errorFields.length)  setAffluentFormDataTrack('error', this.formName, {error}, true);;

      return errorFields.length === 0;
    },
    getFormData(){
      const fields_name = Object.keys(this.fields);
      const data = fields_name.reduce((acc, fieldname) => {
        const el = this.fields[fieldname].el;
        if(el.type === "checkbox"){
          return {...acc, [fieldname]: el.checked ? el.dataset.value || '' : ''};
        }
        else {
          return {...acc, [fieldname]: el.value};
        }
      }, {});
      console.log("🚀 ~ data ~ data:", data)
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
        const fieldsname = Object.keys(this.fields);
        const aoifield = fieldsname.filter(fieldname => this.fields[fieldname].primary);
        const areaofInterest = this.fields[aoifield]?.el.value || '';
        setAffluentFormDataTrack('complete', this.formName, {areaofInterest}, true);
        if ((data && data.status === 400) || data.status === 500 || data.status === 403) {
          this.status = 'fail';
        } else {
          this.status = 'success';
        }
      }
      catch(e){
        console.log("🚀 ~ onSubmit ~ e:", e)
        this.status = 'fail'
      }
    },
    loadJsonPlayer(id, url) {
      const player = this.GetJsonPlayerInsideContainer(id);
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
        return { value: '', fieldName: '', placeholder: '', label: this.$el.querySelector('label').innerText }
      },
    },
    textfield: {
      ['x-init'](){
        this.$el.label = this.label;
        const { name, placeholder } = this.$el;
        this.fieldName = name;
        this.placeholder = placeholder;
        this.initField(this.$el);
        this.$watch('value', val => this.inputValidation(this.$el, val))
      },
      ['@focus'](){
        this.$el.placeholder = ''
      },
      ['@focusout'](){
        this.$el.placeholder = this.placeholder;
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
  