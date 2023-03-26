import { defineStore } from "pinia";

export const useValidateStore = defineStore("validateStore", {
  //state is like data()
  state: () => ({
    password1: null,
  }),
  //getters are like computed:
  getters: {},
  //actions are like methods
  actions: {
    validatePassword(validator, value) {
      if (value) {
        console.log(value);
        //regex: any >= 8 characters
        if (value.match("^(?=.*?[0-9]).{8,}$")) {
          this.password1 = value;
          return true;
        }
      } else if (value == null && !validator.required) {
        return true;
      }
      return false;
    },

    validateEmail(validator, value) {
      console.log(validator);
      if (value) {
        //regex= email
        if (
          value.match(
            "^(?=.{1,64}@)[A-Za-z0-9_-]+(.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(.[A-Za-z0-9-]+)*(.[A-Za-z]{2,})$"
          )
        ) {
          return true;
        }
      } else if (value == null && !validator.required) {
        return true;
      }
      return false;
    },
    validateFileSize(input) {
      if (input) {
        const fileSize = input.file.file.size / 1024 / 1024; // in MiB
        if (fileSize < 100) {
          return true;
        }
        return false;
      }
    },

    validateCheckbox(validator, value) {
      console.log(validator);
      if (value) {
        return true;
      } else if (value == null && !validator.required) {
        return true;
      }
      return false;
    },

    validatePasswordRepeat(validator, password2) {
      if (this.password1 && password2) {
        if (this.password1 === password2) {
          return true;
        }
      }

      return false;
    },

    onlyAllowNumber(value) {
      return !value || /^\d+$/.test(value);
    },
  },
});
