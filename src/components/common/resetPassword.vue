<template>
  <v-layout row wrap justify-center>
    <v-flex xs12 sm12 md6>
      <v-form ref="passwordReset">
        <v-card>
          <v-card-title>
            <h2>Change Password</h2>
          </v-card-title>
          <v-card-text>
            <v-text-field
              label="Old password"
              v-model="oldPassword"
              counter="15"
              class="required"
              :error-messages="oldPasswordErrors"
              @blur="$v.oldPassword.$touch()"
            ></v-text-field>
            <v-text-field
              label="New password"
              v-model="newPassword"
              counter="15"
              class="required"
              :error-messages="newPasswordErrors"
              @blur="$v.newPassword.$touch()"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn class="primary" block :disabled="$v.$invalid" @click="handleResetPassword">change</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-flex>
    <v-flex xs12 sm12 md12>
      <v-alert v-model="hasAlert" dismissible :type="alertType">{{alert}}</v-alert>
    </v-flex>
  </v-layout>
</template> 

<script>
import { required, maxLength, minLength } from "vuelidate/lib/validators";

export default {
  validations: {
    oldPassword: {
      required,
      maxLength: maxLength(15),
      minLength: minLength(6)
    },
    newPassword: { required, maxLength: maxLength(15), minLength: minLength(6) }
  },
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      alert: "Failed",
      alertType: "error",
      hasAlert: false
    };
  },
  computed: {
    oldPasswordErrors() {
      const errors = [];
      if (!this.$v.oldPassword.$dirty) return errors;
      if (
        !this.$v.oldPassword.required &&
        errors.push("Old password is required.")
      )
        return errors;
      if (
        !this.$v.oldPassword.minLength &&
        errors.push("Length for a valid Old password is 6 to 15.")
      )
        return errors;
      if (
        !this.$v.oldPassword.maxLength &&
        errors.push("Length for a valid Old password is 6 to 15.")
      )
        return errors;
      return errors;
    },
    newPasswordErrors() {
      const errors = [];
      if (!this.$v.newPassword.$dirty) return errors;
      if (
        !this.$v.newPassword.required &&
        errors.push("Old password is required.")
      )
        return errors;
      if (
        !this.$v.newPassword.minLength &&
        errors.push("Length for a valid Old password is 6 to 15.")
      )
        return errors;
      if (
        !this.$v.newPassword.maxLength &&
        errors.push("Length for a valid Old password is 6 to 15.")
      )
        return errors;
      return errors;
    }
  },
  methods: {
    async handleResetPassword() {
     
      try {
        await this.$http.put("user/password", {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword
        });
        this.$refs.passwordReset.reset();
        this.$v.$reset();

        this.alert = "Password changed successfully!";
        this.alertType = "success";
        this.hasAlert = true;
      } catch (error) {
        if (error.response.status === 401) {
          this.alert = error.response.data;
        } else {
          this.alert = "Failed";
        }
        this.alertType = "error";
        this.hasAlert = true;
      }
    }
  }
};
</script>