<template>
  <v-layout row wrap>
    <v-flex xs12 sm12 md12>
      <v-alert v-model="hasAlert" dismissible :type="alertType">{{alert}}</v-alert>
    </v-flex>
    <v-flex xs12 sm12 md12>
      <v-card>
        <v-card-title>
          <h1>View and update trips</h1>
        </v-card-title>
        <v-card-text>
          <v-text-field label="Search" v-model="search" outline></v-text-field>

          <v-data-table :items="items" :headers="headers" :search="search" disable-initial-sort>
            <template slot="items" slot-scope="props">
              <td>{{props.item.id}}</td>
              <td>{{props.item.vehicle.vin}}</td>
              <td>{{props.item.user.fullName}}</td>
              <td>{{props.item.startFrom}}</td>
              <td>{{props.item.stopAt}}</td>
              <td>{{props.item.places}}</td>
              <td>{{props.item.allowances}}</td>
              <td>{{props.item.status}}</td>
              <td>{{props.item.createdAt}}</td>
              <td>
                <v-btn
                  v-if="props.item.status=== 'pending' && role !== 'driver'"
                  outline
                  @click="PUT('trip','canceled',props.item.id)"
                >cancel</v-btn>
                <v-btn
                  v-if="props.item.status=== 'pending' && role === 'driver'"
                  outline
                  @click="PUT('trip','ongoing',props.item.id)"
                >start</v-btn>
                <v-btn
                  v-if="props.item.status=== 'ongoing' && role === 'driver'"
                  outline
                  @click="PUT('trip','finished',props.item.id)"
                >finished</v-btn>
              </td>
              <td>{{props.item.notes}}</td>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['role']),
  },
  mounted() {
    this.GET();
  },
  data() {
    return {
      search: '',
      items: [],
      headers: [
        { text: 'Id', value: 'id' },
        { text: 'Vehicle', value: 'vehicle.vin' },
        { text: 'Driver', value: 'user.name' },
        { text: 'Start', value: 'startFrom' },
        { text: 'End', value: 'stopAt' },
        { text: 'Places', value: 'places' },
        { text: 'Allowances', value: 'allowances' },
        { text: 'Status', value: 'status' },
        {
          text: 'createdAt',
          value: 'createdAt',
        },
        {
          text: 'Actions',
          value: null,
          sortable: false,
        },
        { text: 'Notes', value: 'notes', width: 100 },
      ],
      alertType: 'error',
      hasAlert: false,
      alert: '',
    };
  },
  methods: {
    async GET() {
      try {
        const data = await this.$http.get('trip');
        this.items = data.data;
      } catch (error) {
        this.alertType = 'error';
        this.alert = 'Error while loading the data from api...';
        this.hasAlert = true;
      }
    },
    async PUT(model_name, status, id) {
      try {
        const r = confirm(`This will mark status as ${status}?`);
        if (r == false) {
          return;
        }
        await this.$http.put('common', { model_name, status, id });
        this.GET();
      } catch (error) {
        this.alertType = 'error';
        this.alert = 'Status change failed!';
        this.hasAlert = true;
      }
    },
  },
};
</script>
