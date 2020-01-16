<template>
  <v-layout row wrap justify-center>
    <v-flex xs12 sm12 md8>
      <v-card>
        <v-card-title color="red">
          <h1>Vehicle Report</h1>
        </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12 sm12 md12>
              <v-select
                outline
                label="Category"
                v-model="selectedCats"
                :items="categories"
                item-text="name"
                item-value="id"
                multiple
              ></v-select>
            </v-flex>
            <v-flex xs12 sm12 md12>
              <v-subheader class="required">Fuel type</v-subheader>
              <v-radio-group v-model="fuelType" row>
                <v-radio label="Petrol" value="petrol"></v-radio>
                <v-radio label="Diesel" value="diesel"></v-radio>
                <v-radio label="All" value="All"></v-radio>
              </v-radio-group>
            </v-flex>

            <v-flex xs12 sm12 md6>
              <v-subheader>Created From</v-subheader>
              <v-date-picker  v-model="dateFrom" :max="maxDate"></v-date-picker>
            </v-flex>
            <v-flex xs12 sm12 md6>
              <v-subheader>Created To</v-subheader>
              <v-date-picker  v-model="dateTo" :max="maxDate"></v-date-picker>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <JsonExcel
            class="btn"
            :fetch="POST"
            :fields="json_fields"
            name="vehicleReport.csv"
            type="csv"
            :style=" $v.$invalid ? 'pointer-events:none;cursor: no-drop;' : 'pointer-events:auto;' "

          >Download Excel</JsonExcel>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex xs12 sm12 md12>
      <v-alert v-model="hasAlert" dismissible :type="alertType">{{alert}}</v-alert>
    </v-flex>
  </v-layout>
</template>

<script>
import JsonExcel from 'vue-json-excel';
import { required } from 'vuelidate/lib/validators';

const date_greather_than = (value, vm) => {
  const from = new Date(vm.dateFrom);
  const to = new Date(value);
  return from <= to;
};
export default {
  components: {
    JsonExcel,
  },
  validations: {
    selectedCats: { required },
    dateFrom: { required },
    dateTo: { required, date_greather_than },
    fuelType: { required },
  },
  mounted() {
    this.GET();
    this.maxDate = this.$moment().format('YYYY-MM-DD');
  },
  data() {
    return {
      maxDate: '',
      json_fields: {
        Id: 'id',
        Color: 'color',
        'Fuel Type': 'fuelType',
        'Fuel Level': 'fuelLevel',
        'Tank Volume': 'tankVolume',
        Model: 'make',
        'Vehicle Registration Number': 'vin',
        'Manufactured Year': 'year',
        Notes: 'notes',

        Status: 'status',
        createdAt: 'createdAt',
        UpdatedAt: 'updatedAt',
      },
      items: [],
      selectedCats: [],
      dateFrom: '',
      alertType: 'error',
      alert: 'Error while loading the data from api...',
      hasAlert: false,
      categories: [],
      fuelType: '',
      dateTo: '',
    };
  },
  methods: {
    async GET() {
      try {
        const data = await this.$http.get('category');
        this.categories = data.data;
      } catch (error) {
        this.alertType = 'error';
        this.alert = 'Error while loading the categories data from api...';
        this.hasAlert = false;
      }
    },
    async POST() {
      try {
        const formData = {
          ids: this.selectedCats,
          from: this.dateFrom,
          to: this.dateTo,

          status: this.fuelType,
        };
        if (this.$v.$invalid) {
          this.alertType = 'error';
          this.alert = 'Please fill all the required fields.';
          this.hasAlert = true;
          return;
        }

        const data = await this.$http.post('/reports/vehicle', formData);
        if (data.data.length === 0) {
          this.alertType = 'error';
          this.alert = 'No data available!';
          this.hasAlert = true;
          return;
        }
        return data.data;
      } catch (error) {
        this.alertType = 'error';
        this.alert = 'Some thing went wrong!';
        this.hasAlert = true;
      }
    },
  },
};
</script>
