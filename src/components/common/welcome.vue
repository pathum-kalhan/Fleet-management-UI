<template>
  <v-layout justify-center row wrap>
    <v-flex xs12 sm12 md12>
      <v-alert v-model="hasError" dismissible type="error">{{alert}}</v-alert>
    </v-flex>
    <v-flex xs12 sm12 md6>
      <v-card>
        <v-card-title class="primary white--text">
          <h2>Welcome back!</h2>
        </v-card-title>
        <v-card-text>
          <v-text-field
            label="NIC Number"
            v-model="nic"
            :error-messages="nicNumberErrors"
            @blur="$v.nic.$touch()"
            outline
          ></v-text-field>
          <v-text-field
            type="password"
            label="Password"
            counter="15"
            outline
            v-model="password"
            class="required"
            @blur="$v.password.$touch()"
            :error-messages="passwordErrors"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn class="primary" :disabled="$v.$invalid" @click="onLogin">login</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { required, maxLength, minLength } from 'vuelidate/lib/validators';

import permission from '../../permissions';
import { mapActions } from 'vuex';
// import routes from "../../routes.js";
const nicValidator = (value) => {
  const oldNic = /^[0-9]{9}[vVxX]$/;
  const newNic = /^[0-9]{12}$/;
  return oldNic.test(value) || newNic.test(value);
};
export default {
  validations() {
    return {
      nic: {
        required,
        nicValidator,
      },
      password: { required, minLength: minLength(6), maxLength: maxLength(15) },
    };
  },
  computed: {
    nicNumberErrors() {
      const errors = [];
      if (!this.$v.nic.$dirty) return errors;
      if (!this.$v.nic.required && errors.push('NIC number is required.')) return errors;
      if (
        !this.$v.nic.nicValidator
        && errors.push('NIC number format is invalid.')
      ) return errors;
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      if (!this.$v.password.required && errors.push('Password is required.')) return errors;
      if (
        !this.$v.password.minLength
        && errors.push('Length for a valid password is 6 to 15.')
      ) return errors;
      if (
        !this.$v.password.maxLength
        && errors.push('Length for a valid password is 6 to 15.')
      ) return errors;
      return errors;
    },
  },
  data() {
    return {
      nic: '',
      password: '',
      hasError: false,
      alert: '',
    };
  },
  methods: {
    ...mapActions(['login','setPermissions']),
    async onLogin() {
      try {
        const data = await this.$http.post('user/login', {
          nic: this.nic,
          password: this.password,
        });

        await this.login({
          name: data.data.userName,
          role: data.data.role,
          token: data.data.token,
        });
         

      
        await this.setPermissions(permission[data.data.role])
        this.$router.push('/viewTrips');
      } catch (error) {
        
        if (error.response.status === 401) {
          this.alert = error.response.data;
        } else {
          this.alert = 'Ops! Something went wrong!';
        }
        this.hasError = true;
      }
    },
  },
};
</script>
