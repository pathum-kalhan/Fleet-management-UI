<template>
  <v-layout row wrap>
    <v-flex xs12 sm12 md12>
      <h1>Dashboard</h1>
      <v-divider></v-divider>
      <h2 class="font-weight-light mb-1">Summary</h2>
    </v-flex>
    <v-flex xs12 sm12 md4 d-flex>
      <v-card color="green">
        <v-card-text>
          <h2 class="font-weight-light">{{onGoingTrips}} ongoing trips</h2>
          <h2 class="font-weight-light">{{pendingTrips}} pending trips</h2>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12 sm12 md4 d-flex>
      <v-card color="blue">
        <v-card-text>
          <h2 class="font-weight-light">{{totalDrivers}} Total drivers</h2>
          <h2 class="font-weight-light">{{drivers}} Active drivers</h2>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12 sm12 md4 d-flex>
      <v-card color="red">
        <v-card-text>
          <h2 class="font-weight-light">{{totalVehicles}} Total vehicles</h2>
          <h2 class="font-weight-light">{{vehicles}} Active vehicles</h2>
          <!--  -->
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12 sm12 md12>
      <v-divider></v-divider>
      <h2 class="font-weight-light mb-1">Last activities</h2>
      <v-text-field label="Search" v-model="search" outline></v-text-field>
      <v-data-table
        :items="items"
        :headers="headers"
        :search="search"
        disable-initial-sort
        :pagination.sync="pagination"
      >
        <template slot="items" slot-scope="props">
          <td>{{props.item.id}}</td>
          <td>{{props.item.area}}</td>
          <td>{{props.item.action}}</td>
          <td>{{props.item.description}}</td>
          <td>{{props.item.user.fullName}}</td>
          <td>{{props.item.refId}}</td>
          <td>{{props.item.createdAt}}</td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  mounted() {
    this.GET();
  },
  data() {
    return {
      drivers: null,
      driversActive: null,
      onGoingTrips: null,
      pendingTrips: null,
      vehicles: null,
      totalVehicles: null,
      totalDrivers: null,
      search: "",
      items: [],
      headers: [
        { text: "Id", value: "id" },
        { text: "Area", value: "area" },
        { text: "Action", value: "action" },
        { text: "Description", value: "description" },
        { text: "User", value: "user.fullName" },
        { text: "Reference Id", value: "refId" },
        { text: "Date and Time", value: "createdAt" }
      ],
      alertType: "error",
      alert: "Error while loading the data from api...",
      hasAlert: false,
      isLoading: true,
      pagination: {
        rowsPerPage: 20
      }
    };
  },
  methods: {
    async GET() {
      try {
        const data = await this.$http.get("dashboard");
        this.drivers = data.data.drivers;
        this.driversActive = data.data.driversActive;
        this.onGoingTrips = data.data.onGoingTrips;
        this.pendingTrips = data.data.pendingTrips;
        this.vehicles = data.data.vehicles;
        this.items = data.data.audits;
        this.totalVehicles = data.data.totalVehicles;
        this.totalDrivers = data.data.totalDrivers;

        //
      } catch (error) {
        this.alertType = "error";
        this.alert = "Error while loading the data from api...";
        this.hasAlert = true;
      }
    }
  }
};
</script>
