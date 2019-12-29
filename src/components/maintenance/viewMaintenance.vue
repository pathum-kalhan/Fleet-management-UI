<template>
  <v-layout row wrap>

    <v-flex xs12 sm12 md12>
      <v-alert v-model="hasAlert" dismissible :type="alertType">{{alert}}</v-alert>
    </v-flex>
    <v-flex xs12 sm12 md12>
      <v-card>
        <v-card-title>
          <h1>View and update maintenance details</h1>
        </v-card-title>
        <v-card-text>
          <v-text-field label="Search" v-model="search" outline></v-text-field>
       
          <v-data-table :items="items" :headers="headers" :search="search" disable-initial-sort>
            <template slot="items" slot-scope="props">

              <td>{{props.item['vehicle.vin']}}</td>
              <td>{{props.item.startFrom}}</td>
              <td>{{props.item.stopAt}}</td>
              <td>{{props.item.payment}}</td>
              <td>{{props.item.notes}}</td>
              <td>{{props.item.createdAt}}</td>
              
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
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
      id: '',
      amount: '',
      dialog: false,
      search: '',
      items: [],
      headers: [
        { text: 'VIN', value: 'vehicle.vin' },

        { text: 'From', value: 'startFrom' },
        { text: 'To', value: 'stopAt' },
        { text: 'Payment', value: 'payment' },
        { text: 'Notes', value: 'notes' },
        { text: 'createdAt', value: 'createdAt' },
      
      ],
      alertType: 'error',
      hasAlert: false,
      alert: '',
    };
  },
  methods: {
    async GET() {
      try {
        const data = await this.$http.get('maintenance');
        this.items = data.data;
      } catch (error) {
        this.alertType = 'error';
        this.alert = 'Error while loading the data from api...';
        this.hasAlert = false;
      }
    },
    async openDialog(id) {
      try {
        this.id = id;
        this.dialog = true;
      } catch (error) {
        this.alertType = 'error';
        this.alert = 'Status change failed!';
        this.hasAlert = true;
      }
    },
    async add(amount) {
      try {
        await this.$http.put(`vehicle/fuel/${this.id}`, { fuelLevel: amount });
        this.GET();
        this.dialog = false;
      } catch (error) {
        this.alertType = 'error';
        this.alert = 'Status change failed!';
        this.hasAlert = true;
      }
    },
  },
};
</script>
