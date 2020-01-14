<template>
  <v-layout row wrap justify-center align-center>
    <v-flex xs12 sm12 md6>
      <v-card>
        <v-card-title>
          <h1>Summary Report</h1>
        </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs11 sm6>
                <v-menu
                  ref="menu1"
                  v-model="menu1"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="startFrom"
                      label="Start from"
                       class="required"
                      append-icon="fa-calendar-alt"
                      v-on="on"
                      outline
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="startFrom"
                    no-title
                    @input="menu1 = false"
                    :max="$moment().format('YYYY-MM-DD')"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs11 sm6>
                <v-menu
                  ref="menu2"
                  v-model="menu2"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="stopAt"
                      label="Stop at"
                      append-icon="fa-calendar-alt"
                      v-on="on"
                      outline
                       class="required"
                       :disabled="!startFrom"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="stopAt"
                    no-title
                    @input="menu2 = false"
                    :max="$moment().format('YYYY-MM-DD')"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <JsonExcel
            class="btn"
            :fetch="POST"
            :fields="json_fields"
            name="summaryReport.csv"
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

import { required, maxLength } from 'vuelidate/lib/validators';

const date_greather_than = (value, vm) => {
  const from = new Date(vm.startFrom);
  const to = new Date(value);
  return from <= to;
};

export default {
  validations: {
    startFrom: { required },
    stopAt: { required, date_greather_than },

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
        Type: 'type',
        Value: 'value',


      },
      items: [],
      selectedUsers: [],
      dateFrom: '',
      alertType: 'error',
      alert: 'Error while loading the data from api...',
      hasAlert: false,
      menu1: false,
      menu2: false,
      startFrom: null,
      stopAt: null,
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
          from: this.startFrom,
          to: this.stopAt,
        };
        if (this.$v.$invalid) {
          this.alertType = 'error';
          this.alert = 'Please fill all the required fields.';
          this.hasAlert = true;
          return;
        }
        const data = await this.$http.post('/reports/summaryR', formData);
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
