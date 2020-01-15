<template>
  <v-layout row wrap justify-center align-center>
    <v-flex xs12 sm12 md8>
      <v-card>
        <v-card-title>
          <h1>Audit Report</h1>
        </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12 sm12 md6>
              <v-subheader>From</v-subheader>
              <v-date-picker  v-model="dateFrom" :max="maxDate"></v-date-picker>
            </v-flex>
            <v-flex xs12 sm12 md6>
              <v-subheader>To</v-subheader>
              <v-date-picker  v-model="dateTo" :max="maxDate" :disabled="true"></v-date-picker>
            </v-flex>
            <v-flex xs12 sm12 md12>
              <p style="color:red">From date should be greather than To date.</p>
              <v-autocomplete
                label="Users"
                :items="items"
                item-value="id"
                item-text="fullName"
                v-model="selectedUsers"
                multiple
                outline

              ></v-autocomplete>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <JsonExcel
            class="btn"
            :fetch="POST"
            :fields="json_fields"
            name="auditReport.csv"
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
  validations: {
    dateFrom: { required },
    dateTo: { required, date_greather_than },
    selectedUsers: { required },
  },
  components: {
    JsonExcel,
  },
  mounted() {
    this.GET();
    this.maxDate = this.$moment().format('YYYY-MM-DD');
  },
  data() {
    return {
      maxDate: '',
      json_fields: {
        id: 'id',
        'Full name': 'name',
        Area: 'area',
        Action: 'action',
        Description: 'description',
        'Reference Id': 'refId',
        CreatedAt: 'createdAt',
      },
      items: [],
      selectedUsers: [],
      dateFrom: '',
      dateTo: '',
      alertType: 'error',
      alert: 'Error while loading the data from api...',
      hasAlert: false,
    };
  },
  methods: {
    async GET() {
      try {
        const data = await this.$http.get('user');

        this.items = data.data;
      } catch (error) {
        this.alertType = 'error';
        this.alert = 'Error while loading the data from api...';
        this.hasAlert = false;
      }
    },
    async POST() {
      try {
        const formData = {
          ids: this.selectedUsers,
          from: this.dateFrom,
          to: this.dateTo,
        };
        if (this.$v.$invalid) {
          this.alertType = 'error';
          this.alert = 'Please fill all the required fields.';
          this.hasAlert = true;
          return;
        }
        const data = await this.$http.post('/reports/audits', formData);
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
