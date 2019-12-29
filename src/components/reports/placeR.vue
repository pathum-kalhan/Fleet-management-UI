<template>
  <v-layout row wrap justify-center>
    <v-flex xs12 sm12 md6>
      <v-card>
        <v-card-title>
          <h1>Places Report</h1>
        </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12 sm12 md12>
              <v-radio-group row v-model="status">
                <v-radio label="Active" value="Active"></v-radio>
                <v-radio label="Inactive" value="Inactive"></v-radio>
                <v-radio label="All" value="All"></v-radio>
              </v-radio-group>
            </v-flex>

            <v-flex xs12 sm12 md12>
              <v-subheader>Created From</v-subheader>
              <v-date-picker :landscape="true" v-model="dateFrom" :max="maxDate"></v-date-picker>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <JsonExcel
            class="btn"
            :fetch="POST"
            :fields="json_fields"
            name="placeReport.csv"
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
import JsonExcel from "vue-json-excel";
import { required } from "vuelidate/lib/validators";

export default {
  validations: {
    dateFrom: { required },
    status: { required }
  },
  components: {
    JsonExcel
  },
  mounted() {
    this.GET();
    this.maxDate = this.$moment().format("YYYY-MM-DD");
  },
  data() {
    return {
      maxDate: "",
      json_fields: {
        Id: "id",
        Name: "name",
        Notes: "notes",
        Address: "address",
        Latitude: "lat",
        Longitude: "lng",
        Status: "status",
        CreatedAt: "createdAt",
        UpdatedAt: "updatedAt"
      },
      items: [],
      selectedUsers: [],
      dateFrom: "",
      alertType: "error",
      alert: "Error while loading the data from api...",
      hasAlert: false,
      status: ""
    };
  },
  methods: {
    async GET() {
      try {
        const data = await this.$http.get("user");

        this.items = data.data;
      } catch (error) {
        this.alertType = "error";
        this.alert = "Error while loading the data from api...";
        this.hasAlert = false;
      }
    },
    async POST() {
      try {
        const formData = {
          dateFrom: this.dateFrom,
          status: this.status
        };
        if (this.$v.$invalid) {
          this.alertType = "error";
          this.alert = "Please fill all the required fields.";
          this.hasAlert = true;
          return;
        }
        const data = await this.$http.post("/reports/place", formData);
        if (data.data.length === 0) {
          this.alertType = "error";
          this.alert = "No data available!";
          this.hasAlert = true;
          return;
        }
        return data.data;
      } catch (error) {
          this.alertType = "error";
        this.alert = "Some thing went wrong!";
        this.hasAlert = true;
      }
    }
  }
};
</script>
