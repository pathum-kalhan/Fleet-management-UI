<template>
  <v-layout row wrap>

    <v-flex xs12 sm12 md12>
      <v-form ref="vehicleForm">
        <v-card>
          <v-card-title>
            <h1 v-if="component_status">Create a vehicle</h1>
            <h1 v-else>Update a vehicle</h1>
          </v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 sm12 md4>
                <v-select
                  outline
                  label="Category"
                  v-model="categoryId"
                  :items="categories"
                  item-text="name"
                  item-value="id"
                  class="required"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm12 md4>
                <v-text-field
                  outline
                  label="Model"
                  v-model="make"
                  counter="15"
                  :error-messages="modelErrors"
                  @input="$v.make.$touch()"
                   class="required"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md4>
                <v-autocomplete outline label="Year" v-model="year" :items="years"  class="required"></v-autocomplete>
              </v-flex>
              <v-flex xs12 sm12 md4>
                <v-text-field
                  outline
                  label="Color"
                  v-model="color"
                  :error-messages="colorErrors"
                  @input="$v.color.$touch()"
                  counter="15"
                   class="required"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md4>
                <v-text-field
                  outline
                  label="Vehicle registration number"
                  v-model="vin"
                  counter="8"
                  :error-messages="vinErrors"
                  @input="$v.vin.$touch()"
                   class="required"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md4>
                <v-text-field
                  outline
                  label="Tank volume (In liters)"
                  v-model="tankVolume"
                  :error-messages="tankVolumeErrors"
                  @input="$v.tankVolume.$touch()"
                   class="required"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-subheader class="required">Fuel type *</v-subheader>
                <v-radio-group v-model="fuelType" row  >
                  <v-radio label="Petrol" value="petrol"></v-radio>
                  <v-radio label="Diesel" value="diesel"></v-radio>
                </v-radio-group>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-textarea
                  outline
                  label="Notes"
                  v-model="notes"
                  :counter="100"
                  :error-messages="notesErrors"
                  @input="$v.notes.$touch()"
                ></v-textarea>
              </v-flex>
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
  minValue,
  maxValue,
} from 'vuelidate/lib/validators';

export default {
  computed: {
    years() {
      const thisYear = 2019;
      const startYear = 2019 - 30;
      const yearsList = [];
      for (let index = startYear; index < thisYear + 1; index++) {
        yearsList.push(index);
      }
      return yearsList;
    },
    modelErrors() {
      const errors = [];
      if (!this.$v.make.$dirty) return errors;
      !this.$v.make.required && errors.push('Model is required.');
      !this.$v.make.maxLength
        && errors.push('Maximum length for the Model is 15.');
      return errors;
    },
    colorErrors() {
      const errors = [];
      if (!this.$v.color.$dirty) return errors;
      !this.$v.color.required && errors.push('Color is required.');
      !this.$v.color.maxLength
        && errors.push('Maximum length for the Color is 15.');
      return errors;
    },
    vinErrors() {
      const errors = [];
      if (!this.$v.vin.$dirty) return errors;
      !this.$v.vin.required && errors.push('VRN is required.');
      !this.$v.vin.maxLength && errors.push('Maximum length for the VRN is 8.');
      return errors;
    },
    tankVolumeErrors() {
      const errors = [];
      if (!this.$v.tankVolume.$dirty) return errors;
      !this.$v.tankVolume.required && errors.push('Tank volume is required.');
      !this.$v.tankVolume.minValue
        && errors.push('Minimum value for the tank volume is 1.');
      !this.$v.tankVolume.maxValue
        && errors.push('MAximum value for the tank volume is 400.');

      return errors;
    },
    notesErrors() {
      const errors = [];
      if (!this.$v.notes.$dirty) return errors;

      !this.$v.notes.maxLength
        && errors.push('Maximum length for the notes is 100.');
      return errors;
    },
  },

  validations() {
    return {
      categoryId: { required },
      make: { required, maxLength: maxLength(15) },
      year: { required },
      color: { required, maxLength: maxLength(15) },
      vin: { required, maxLength: maxLength(8) },
      tankVolume: { required, minValue: minValue(1), maxValue: maxValue(400) },
      fuelType: { required },
      notes: { maxLength: maxLength(100) },
    };
  },
  mounted() {
    this.GET();
    if (this.$route.query.id) {
      this.component_status = false;
      this.GET_DATA(this.$route.query.id);
    }
  },
  data() {
    return {
      make: '',
      year: '',
      color: '',
      vin: '',
      tankVolume: '',
      notes: '',
      categoryId: '',
      categories: [],
      component_status: true,
      id: '',
      alertType: 'error',
      hasAlert: false,
      alert: '',
      fuelType: 'diesel',
    };
  },
  methods: {
    async GET() {
      try {
        const data = await this.$http.get('category');
        this.categories = data.data.filter(el => el.status);
      } catch (error) {
        this.alertType = 'error';
        this.alert = 'Error while loading the categories data from api...';
        this.hasAlert = false;
      }
    },
    async POST() {
      try {
        const formData = {
          make: this.make,
          year: this.year,
          color: this.color,
          vin: this.vin,
          tankVolume: this.tankVolume,
          notes: this.notes,
          categoryId: this.categoryId,
          fuelType: this.fuelType,
        };

        if (this.component_status) {
          await this.$http.post('/vehicle', formData);
          this.$refs.vehicleForm.reset();
          this.$v.$reset();

          this.alertType = 'success';
          this.alert = 'Vehicle created successfully.';
          this.hasAlert = true;
        } else {
          await this.$http.put(`/vehicle/${this.id}`, formData);
          this.$router.push('/viewVehicles');
        }
      } catch (error) {
        if (this.component_status) {
          if (error.response.status === 422) {
          this.alert = error.response.data;
        } else {
          this.alert = 'Vehicle creatation failed.';
        }
          this.alertType = 'error';
          this.hasAlert = true;
        } else {
          this.alertType = 'success';
          this.alert = 'Vehicle updation failed.';
          this.hasAlert = true;
        }
      }
    },
    async GET_DATA(id) {
      try {
        const data = await this.$http.get(`/vehicle/${id}`);
        this.id = data.data.id;
        this.make = data.data.make;
        this.year = data.data.year;
        this.color = data.data.color;
        this.vin = data.data.vin;
        this.tankVolume = data.data.tankVolume;
        this.notes = data.data.notes;
        this.categoryId = data.data.categoryId;
        this.fuelType = data.data.fuelType;
      } catch (error) {
        this.alertType = 'error';
        this.alert = 'Error while loading the vehicle data from api...';
        this.hasAlert = true;
      }
    },
  },
};
</script>
