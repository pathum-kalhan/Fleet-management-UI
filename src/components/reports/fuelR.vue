<template>
  <v-layout row wrap justify-center>
    <v-flex xs12 sm12 md6>
      <v-card>
        <v-card-title>
          <h1>Fuel Report</h1>
        </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12 sm12 md12>
              <v-autocomplete
                label="Vehicle category"
                outline
                :items="items"
                item-text="name"
                item-value="id"
                multiple
                v-model="selectedCats"
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
                <v-radio label="Active vehicles" value="Active"></v-radio>
                <v-radio label="Inactive vehicles" value="Inactive"></v-radio>
                <v-radio label="All vehicles" value="All"></v-radio>
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
    <v-flex xs12 sm12 md12>
      <v-alert v-model="hasAlert" dismissible :type="alertType">{{alert}}</v-alert>
    </v-flex>
  </v-layout>
</template>

<script>
import JsonExcel from "vue-json-excel";
import { required } from "vuelidate/lib/validators";
// vehicles.id,
//     vehicles.make,
//     vehicles.year,
//     vehicles.color,
//     vehicles.vin,
//     vehicles.tankVolume,
//     vehicles.fuelLevel,
//     vehicles.fuelType,
//     categories.name AS cat
export default {
  validations() {
    return {
      selectedCats: { required },
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
        Model: "make",
        Year: "year",
        Colour:"color",
        RegNumber:"vin",
        TankVolume:"tankVolume",
        FuelLevel:"fuelLevel",
        FuelType:"fuelType",
        Category:"cat"
      },
      items: [],
      selectedCats: [],
      orderByTypes: [
        { text: "Fuel level High to Low", value: "vehicles.fuelLevel DESC" },
        { text: "Fuel level Low to High", value: "vehicles.fuelLevel" },
        { text: "Tank capacity High to Low", value: "vehicles.tankVolume DESC" },
        { text: "Tank capacity Low to High", value: "vehicles.tankVolume" }
      ],
      orderBy: "fuelLevel",
      alertType: "error",
      alert: "Error while loading the data from api...",
      hasAlert: false,
      status: "All"
    };
  },
  methods: {
    async GET() {
      try {
        const data = await this.$http.get("category");
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
          ids: this.selectedCats,
          orderBy: this.orderBy,
          status: this.status
        };

        if (this.$v.$invalid) {
          this.alertType = "error";
          this.alert = "Please fill all the required fields.";
          this.hasAlert = true;
          return;
        }
        
        const data = await this.$http.post("/reports/fuel", formData);
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


