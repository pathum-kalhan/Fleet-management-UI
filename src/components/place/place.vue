<template>
  <v-layout row wrap>
    <v-flex xs12 sm12 md12>
      <v-form ref="form">
        <v-card>
          <v-card-title>
            <h1 v-if="component_status">Create a place</h1>
            <h1 v-else>Update a place</h1>
          </v-card-title>
          <v-card-text>
            <v-text-field
              label="Name"
              v-model="name"
              :counter="35"
              outline
              @input="$v.name.$touch()"
              :error-messages="nameErrors"
              class="required"
            ></v-text-field>

            <v-layout row wrap>
              <v-flex xs12 sm12 md6>
                <v-text-field
                  label="Latitude"
                  v-model="lat"
                  outline
                  class="required"
                  :error-messages="latitudeErrors"
                  @input="$v.lat.$touch()"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field
                  label="Longitude"
                  v-model="lng"
                  :error-messages="lngErrors"
                  @input="$v.lng.$touch()"
                  outline
                  class="required"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-textarea
                  label="Notes"
                  outline
                  v-model="notes"
                  :error-messages="notesErrors"
                  @input="$v.notes.$touch()"
                  counter="300"
                ></v-textarea>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-textarea
                  label="Address"
                  outline
                  class="required"
                  v-model="address"
                  :error-messages="addressErrors"
                  @input="$v.address.$touch()"
                  counter="100"
                ></v-textarea>
              </v-flex>
              <!-- <v-flex xs12 sm12 md12>
                <v-file-input label="File input"></v-file-input>
              </v-flex> -->
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-btn
              v-if="component_status"
              class="success"
              @click="POST"
              :disabled="$v.$invalid"
            >create</v-btn>
            <v-btn v-else class="error" @click="POST" :disabled="$v.$invalid">update</v-btn>
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
  decimal,
} from 'vuelidate/lib/validators';

export default {
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push('Name is required.');
      !this.$v.name.maxLength
        && errors.push('Maximum length for the name is 35.');
      return errors;
    },
    latitudeErrors() {
      const errors = [];
      if (!this.$v.lat.$dirty) return errors;
      !this.$v.lat.required && errors.push('Latitude is required.');
      !this.$v.lat.decimal && errors.push('Please enter a valid latitude.');
      return errors;
    },
    lngErrors() {
      const errors = [];
      if (!this.$v.lng.$dirty) return errors;
      !this.$v.lng.required && errors.push('Longitude is required.');
      !this.$v.lng.decimal && errors.push('Please enter a valid longitude.');
      return errors;
    },
    notesErrors() {
      const errors = [];
      if (!this.$v.notes.$dirty) return errors;

      !this.$v.notes.maxLength
        && errors.push('Maximum length for the notes is 300.');
      return errors;
    },
    addressErrors() {
      const errors = [];
      if (!this.$v.address.$dirty) return errors;
      // !this.$v.address.required && errors.push("Name is required.");
      !this.$v.address.maxLength
        && errors.push('Maximum length for the address is 100.');
      return errors;
    },
  },
  validations() {
    return {
      name: { required, maxLength: maxLength(35) },
      lat: { required, decimal },
      lng: { required, decimal },
      notes: { maxLength: maxLength(300) },
      address: { maxLength: maxLength(100), required },
    };
  },
  mounted() {
    if (this.$route.query.id) {
      this.component_status = false;
      this.GET_DATA(this.$route.query.id);
    }
    // this.GET();
  },
  data() {
    return {
      component_status: true,
      id: '',
      name: '',
      items: [],
      address: '',
      lat: '',
      lng: '',
      notes: '',
      alertType: 'error',
      hasAlert: false,
      alert: '',
    };
  },
  methods: {
    async POST() {
      try {
        const formData = {
          //   id: this.id,
          name: this.name,
          address: this.address,
          lat: this.lat,
          lng: this.lng,
          notes: this.notes,
        };

        if (this.component_status) {
          const data = await this.$http.post('/place', formData);
          this.$refs.form.reset();
          this.$v.$reset();
          (this.alertType = 'success'),
          (this.alert = 'Place created successfully!');
          this.hasAlert = true;
        } else {
          await this.$http.put(`/place/${this.id}`, formData);
          this.$router.push('/viewPlaces');
        }
        // alert("Success!");
      } catch (error) {
        if (error.response.status === 422) {
          this.alert = error.response.data;
        } else {
          this.alert = 'Failed!';
        }
        this.alertType = 'error';
        this.hasAlert = true;
      }
    },
    async GET_DATA(id) {
      try {
        const data = await this.$http.get(`/place/${id}`);
        this.id = data.data.id;
        this.name = data.data.name;
        this.address = data.data.address;
        this.lat = data.data.lat;
        this.lng = data.data.lng;
        this.notes = data.data.notes;
      } catch (error) {
        console.log(error);
        alert('Error while loading the data from api...');
      }
    },
    // async GET() {
    //   try {
    //     const data = await this.$http.get(`subject`);
    //     this.items = data.data.filter(e => !e.parent_subject_id);
    //   } catch (error) {
    //     alert("Error while loading the data from api...");
    //   }
    // }
  },
};
</script>
