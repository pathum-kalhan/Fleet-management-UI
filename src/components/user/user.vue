<template>
  <v-layout row wrap>
    <v-flex xs12 sm12 md12>
      <v-form ref="userForm">
        <v-card>
          <v-card-title>
            <h1 v-if="component_status">Create an account</h1>
            <h1 v-else>Update an account</h1>
          </v-card-title>
          <v-card-text>
            <v-divider class="ma-1"></v-divider>
            <v-layout row wrap>
              <v-flex xs12 sm12 md4>
                <v-radio-group row v-model="gender">
                  <v-radio :value="true" label="Mr. " color="blue"></v-radio>
                  <v-radio :value="false" label="Ms. " color="pink"></v-radio>
                </v-radio-group>
              </v-flex>
              <v-flex xs12 sm12 md4>
                <v-text-field
                  label="First name"
                  outline
                  v-model="firstName"
                  counter="15"
                  :error-messages="firstNameErrors"
                  @input="$v.firstName.$touch()"
                  class="required"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md4>
                <v-text-field
                  label="Last name"
                  outline
                  v-model="lastName"
                  counter="15"
                  :error-messages="lastNameErrors"
                  @input="$v.lastName.$touch()"
                  class="required"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field
                  label="Email"
                  outline
                  type="email"
                  v-model="email"
                  @blur="$v.email.$touch()"
                  :error-messages="emailErrors"
                  class="required"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field
                  label="NIC number"
                  v-model="nic"
                  :error-messages="nicNumberErrors"
                  @blur="$v.nic.$touch()"
                  outline
                  class="required"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field
                  label="Contact number 1"
                  outline
                  v-model="contactNumber1"
                  :error-messages="contactNumber1Errors"
                  @blur="$v.contactNumber1.$touch()"
                  counter="10"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field
                  label="Contact number 2"
                  outline
                  v-model="contactNumber2"
                  :error-messages="contactNumber2Errors"
                  @blur="$v.contactNumber2.$touch()"
                  counter="10"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-textarea
                  label="Address"
                  v-model="address"
                  outline
                  counter="100"
                  :error-messages="addressErrors"
                  @input="$v.address.$touch()"
                ></v-textarea>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-textarea
                  label="Notes"
                  v-model="notes"
                  outline
                  @input="$v.notes.$touch()"
                  :error-messages="noteErrors"
                  counter="300"
                ></v-textarea>
              </v-flex>
              <v-flex xs12 sm12 md6 v-if="component_status">
                <v-text-field
                  label="Password"
                  outline
                  type="password"
                  v-model="password"
                  class="required"
                  :error-messages="passwordErrors"
                  @blur="$v.password.$touch()"
                  counter="15"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6 v-if="component_status">
                <v-text-field
                  label="Confirm password"
                  outline
                  type="password"
                  v-model="confirm_password"
                  :error-messages="confirmPasswordErrors"
                  @blur="$v.confirm_password.$touch()"
                >></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-select label="Role" outline v-model="role" class="required" :items="roles"></v-select>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-btn
              v-if="component_status"
              class="success"
              @click="onSignUp"
              :disabled="$v.$invalid"
            >create</v-btn>
            <v-btn v-else class="error" @click="onSignUp" :disabled="$v.$invalid">update</v-btn>
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
import {
  required,
  maxLength,
  minLength,
  email,
  sameAs,
  alpha
} from "vuelidate/lib/validators";

const alwaysOK = { OK: () => true };
const nicValidator = value => {
  const oldNic = /^[0-9]{9}[vVxX]$/;
  const newNic = /^[0-9]{12}$/;
  return oldNic.test(value) || newNic.test(value);
};

const phoneNumberValidator = value => {
  const regexPattern = /^0(70|71|72|75|76|77|78|11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)\d{7}$/;
  return regexPattern.test(value);
};

export default {
  computed: {
    contactNumber1Errors() {
      const errors = [];
      if (!this.$v.contactNumber1.$dirty || !this.contactNumber1 ) return errors;
      if (
        !this.$v.contactNumber1.phoneNumberValidator &&
        errors.push("Please enter a valid contact number!")
      )
        return errors;
      return errors;
      return errors;
    },
    contactNumber2Errors() {
      const errors = [];
      if (!this.$v.contactNumber2.$dirty || !this.contactNumber2) return errors;
      if (
        !this.$v.contactNumber2.phoneNumberValidator &&
        errors.push("Please enter a valid contact number!")
      )
        return errors;
      return errors;
      return errors;
    },
    firstNameErrors() {
      const errors = [];
      if (!this.$v.firstName.$dirty) return errors;
      if (
        !this.$v.firstName.required &&
        errors.push("First name is required.")
      ) {
        return errors;
      }
      if (
        !this.$v.firstName.alpha &&
        errors.push("First name can contains only alphabetic characters.")
      ) {
        return errors;
      }
      if (
        !this.$v.firstName.maxLength &&
        errors.push("Maximum length for first name is 15.")
      ) {
        return errors;
      }
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.lastName.$dirty) return errors;
      if (!this.$v.lastName.required && errors.push("Last name is required.")) {
        return errors;
      }
      if (
        !this.$v.lastName.alpha &&
        errors.push("Last name can contains only alphabetic characters.")
      ) {
        return errors;
      }
      if (
        !this.$v.lastName.maxLength &&
        errors.push("Maximum length for last name is 15.")
      ) {
        return errors;
      }
      return errors;
    },
    nicNumberErrors() {
      const errors = [];
      if (!this.$v.nic.$dirty) return errors;
      if (!this.$v.nic.required && errors.push("NIC number is required."))
        return errors;
      if (
        !this.$v.nic.nicValidator &&
        errors.push("NIC number format is invalid.")
      )
        return errors;
      return errors;
    },
    addressErrors() {
      const errors = [];
      if (!this.$v.address.$dirty) return errors;
      // !this.$v.address.required && errors.push("Name is required.");
      !this.$v.address.maxLength &&
        errors.push("Maximum length for the address is 100.");
      return errors;
    },
    noteErrors() {
      const errors = [];
      if (!this.$v.notes.$dirty) return errors;
      // !this.$v.address.required && errors.push("Name is required.");
      !this.$v.notes.maxLength &&
        errors.push("Maximum length for the notes is 300.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      if (!this.$v.email.required && errors.push("Email is required."))
        return errors;
      if (!this.$v.email.email && errors.push("Please enter a valid email"))
        return errors;
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      if (!this.$v.password.required && errors.push("Password is required."))
        return errors;
      if (
        !this.$v.password.minLength &&
        errors.push("Length for a valid password is 6 to 15.")
      )
        return errors;
      if (
        !this.$v.password.maxLength &&
        errors.push("Length for a valid password is 6 to 15.")
      )
        return errors;
      return errors;
    },
    confirmPasswordErrors() {
      const errors = [];
      if (!this.$v.confirm_password.$dirty) return errors;
      if (
        !this.$v.confirm_password.sameAs &&
        errors.push("Password not matched")
      )
        return errors;
      return errors;
    }
  },
  validations() {
    return {
      gender: { required },
      role: { required },
      contactNumber1: this.contactNumber1 ? { phoneNumberValidator } : alwaysOK,
      contactNumber2: this.contactNumber2 ? { phoneNumberValidator } : alwaysOK,
      address: { maxLength: maxLength(100) },
      notes: { maxLength: maxLength(300) },
      nic: {
        required,
        nicValidator
      },
      firstName: {
        required,
        alpha,
        maxLength: maxLength(15)
      },
      lastName: {
        required,
        alpha,
        maxLength: maxLength(15)
      },
      email: { required, email },
      password: this.component_status
        ? { required, minLength: minLength(6), maxLength: maxLength(15) }
        : alwaysOK,
      confirm_password: this.component_status
        ? { sameAs: sameAs("password") }
        : alwaysOK
    };
  },
  mounted() {
    if (this.$route.query.id) {
      this.component_status = false;
      this.GET_DATA(this.$route.query.id);
    }
  },
  data() {
    return {
      gender: true,
      firstName: "",
      lastName: "",
      nic: "",
      contactNumbers: "",
      address: "",
      notes: "",
      component_status: true,
      id: "",
      email: "",
      password: "",
      confirm_password: "",
      roles: [
        {
          text: "admin"
        },
        { text: "staff" },
        {
          text: "manager"
        },
        { text: "driver" }
      ],
      role: "staff",
      alertType: "error",
      hasAlert: false,
      alert: "",
      contactNumber1: "",
      contactNumber2: ""
    };
  },
  methods: {
    async onSignUp() {
      try {
        const formData = {
          gender: this.gender,
          firstName: this.firstName,
          lastName: this.lastName,
          nic: this.nic,
          contactNumber1: this.contactNumber1,
          contactNumber2: this.contactNumber2,
          address: this.address,
          notes: this.notes,
          role: this.role,
          password: this.password,
          email: this.email
        };
       
        if (this.component_status) {
          

          await this.$http.post("user/signup", formData);
          this.$refs.userForm.reset();
          this.$v.$reset();
          

          this.alertType = "success";
          this.hasAlert = true;
          this.alert = "User created succesfully!";
        } else {
          await this.$http.put(`/user/${this.id}`, formData);
          this.$router.push("/viewUsers");
        }
      } catch (error) {
        
        if (error.response.status === 422) {
          this.alert = error.response.data;
        }else{
          this.alert = "Failed!";

        }
        this.alertType = "error";
        this.hasAlert = true;
      }
    },
    async GET_DATA(id) {
      try {
        const data = await this.$http.get(`user/${id}`);
        this.id = data.data.id;
        this.email = data.data.email;
        this.role = data.data.role;
        this.gender = data.data.gender;
        this.firstName = data.data.firstName;
        this.lastName = data.data.lastName;
        this.nic = data.data.nic;
        this.contactNumber1 = data.data.contactNumber1;
        this.contactNumber2 = data.data.contactNumber2;
        this.address = data.data.address;
        this.notes = data.data.notes;
        this.role = data.data.role;
        this.password = data.data.password;
        this.email = data.data.email;
      } catch (error) {
        this.alertType = "error";
        this.alert = "Error while loading the data from api...";
        this.hasAlert = false;
      }
    }
  }
};
</script>

<style>
.required label::after {
  content: "*";
  color: red;
}
</style>
