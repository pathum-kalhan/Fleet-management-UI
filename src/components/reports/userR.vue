<template>
  <v-layout row wrap justify-center>
    <v-flex xs12 sm12 md6>
      <v-card>
        <v-card-title color="red">
          <h1>User Report</h1>
        </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12 sm12 md12>
              <v-autocomplete
                label="Roles"
                outline
                :items="items"
                item-text="role"
                item-value="role"
                multiple
                v-model="selectedRoles"
              ></v-autocomplete>
            </v-flex>
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
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <JsonExcel
            class="btn"
            :fetch="POST"
            :fields="json_fields"
            name="userReport.csv"
            type="csv"
            :style=" $v.$invalid ? 'pointer-events:none;' : 'pointer-events:auto;' "
          >Download Excel</JsonExcel>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import JsonExcel from "vue-json-excel";
import { required } from "vuelidate/lib/validators";

export default {
  validations() {
    return {
      selectedRoles: { required },
      orderBy: { required },
      status: { required }
    };
  },
  components: {
    JsonExcel
  },
  mounted() {
    this.GET();
  },
  data() {
    return {
      json_fields: {
        Id: "id",
        "Full name": "fullName",
        Email: "email",
        NIC: "nic",
        "Contact Number 1": "contactNumber1",
        "Contact Number 2": "contactNumber2",
        Address: "address",
        Notes: "notes",
        Role: "role",
        Status: "status",
        createdAt: "createdAt",
        updatedAt:"updatedAt"
      },
      items: [],
      selectedRoles: ["admin"],
      orderByTypes: [
        { text: "First Name Ascending", value: "firstName" },
        { text: "Last Name Descending", value: "lastName DESC" },
        { text: "Created Date Ascending", value: "createdAt" },
        { text: "Created Date Descending", value: "createdAt DESC" }
      ],
      orderBy: "firstName",
      alertType: "error",
      alert: "Error while loading the data from api...",
      hasAlert: false,
      status: "All"
    };
  },
  methods: {
    async GET() {
      try {
        const data = await this.$http.get("reports/roles");

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
          roles: this.selectedRoles,
          orderBy: this.orderBy,
          status: this.status
        };

        if (this.$v.$invalid) {
          this.alertType = "error";
          this.alert = "Please fill all the required fields.";
          this.hasAlert = true;
          return;
        }

        const data = await this.$http.post("/reports/user", formData);
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

<style>
.btn {
  display: inline-block;
  padding: 6px 12px;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 4px;
  text-decoration: none;

  color: #333;
  background-color: #fff;
  border-color: #ccc;
}
</style>
