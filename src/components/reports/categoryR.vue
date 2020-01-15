<template>
  <v-layout row wrap justify-center>
    <v-flex xs12 sm12 md8>
      <v-card>
        <v-card-title>
          <h1>Category Report</h1>
        </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12 sm12 md12>
              <v-autocomplete
                label="Order by"
                outline
                :items="orderByTypes"
                item-text="text"
                item-value="value"
                v-model="orderBy"
              ></v-autocomplete>
            </v-flex>
            <v-flex xs12 sm12 md12>
              <v-radio-group row v-model="status">
                <v-radio label="Active" value="Active"></v-radio>
                <v-radio label="Inactive" value="Inactive"></v-radio>
                <v-radio label="All" value="All"></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs12 sm12 md6>
              <v-subheader>From</v-subheader>
              <v-date-picker  v-model="dateFrom" :max="maxDate"></v-date-picker>
            </v-flex>
            <v-flex xs12 sm12 md6>
              <v-subheader>To</v-subheader>
              <v-date-picker  v-model="dateTo" :max="maxDate"></v-date-picker>
            </v-flex>
            <p style="color:red">From date should be greather than To date.</p>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <JsonExcel
            class="btn"
            :fetch="POST"
            :fields="json_fields"
            name="categoryReport.csv"
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
  mounted() {
    this.maxDate = this.$moment().format('YYYY-MM-DD');
  },
  validations: {
    dateFrom: { required },
    dateTo: { required, date_greather_than },

    orderBy: { required },
    status: { required },
  },
  components: {
    JsonExcel,
  },
  data() {
    return {
      maxDate: '',
      json_fields: {
        Id: 'id',
        Name: 'name',
        Description: 'description',
        Status: 'status',
        createdAt: 'createdAt',
        UpdatedAt: 'updatedAt',
      },
      orderByTypes: [
        { text: 'Name Ascending', value: 'name' },
        { text: 'Name Descending', value: 'name DESC' },
        { text: 'Status Ascending', value: 'status' },
        { text: 'Status Descending', value: 'status DESC' },
        { text: 'Created Date Ascending', value: 'createdAt' },
        { text: 'Created Date Descending', value: 'createdAt DESC' },
      ],
      orderBy: '',
      status: '',
      dateFrom: '',
      alertType: 'error',
      alert: 'Error while loading the data from api...',
      hasAlert: false,
      dateTo: '',
    };
  },
  methods: {
    async POST() {
      try {
        const formData = {
          from: this.dateFrom,
          to: this.dateTo,
          orderBy: this.orderBy,
          status: this.status,
        };
        if (this.$v.$invalid) {
          this.alertType = 'error';
          this.alert = 'Please fill all the required fields.';
          this.hasAlert = true;
          return;
        }

        const data = await this.$http.post('/reports/category', formData);
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
