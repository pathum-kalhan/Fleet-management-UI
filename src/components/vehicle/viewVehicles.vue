<template>
  <v-layout row wrap>
    <v-flex xs12 sm12 md12>
      <v-alert v-model="hasAlert" dismissible :type="alertType">{{alert}}</v-alert>
    </v-flex>
    <v-flex xs12 sm12 md12>
      <v-card>
        <v-card-title>
          <h1>View and update vehicles</h1>
        </v-card-title>
        <v-card-text>
         
          <v-text-field label="Search" v-model="search" outline></v-text-field>

          <v-data-table :items="items" :headers="headers" :search="search" disable-initial-sort  :pagination.sync="pagination">
            <template slot="items" slot-scope="props">
              <td>{{props.item.id}}</td>
              <td>{{props.item.category.name}}</td>
              <td>{{props.item.make}}</td>
              <td>{{props.item.year}}</td>
              <td>{{props.item.color}}</td>
              <td>{{props.item.vin}}</td>
              <td>{{props.item.tankVolume}}</td>
              <td>{{props.item.fuelLevel}}</td>
              <td>{{props.item.notes}}</td>
              <td>
                <v-btn
                  class="warning"
                  @click="$router.push({path:'/vehicle',query:{id:props.item.id}})"
                >Update</v-btn>
              </td>
              <td>
                <v-btn
                  @click="PUT('vehicle',props.item.status,props.item.id)"
                  :class="{'error':props.item.status}"
                >
                  <span v-if="props.item.status">Disable</span>
                  <span v-else>Enable</span>
                </v-btn>
              </td>
              <td>{{props.item.createdAt}}</td>
              <td>{{props.item.updatedAt}}</td>
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
      pagination: {
        rowsPerPage: 10
      },
      search: '',
      items: [],
      headers: [
        { text: 'Id', value: 'id' },
        { text: 'Category', value: 'category.name' },
        { text: 'Model', value: 'make' },
        { text: 'Year', value: 'year' },
        { text: 'Color', value: 'color' },
        { text: 'Registration number', value: 'vin' },
        { text: 'Tank Volume (Lt.)', value: 'tankVolume' },
        { text: 'Fuel level', value: 'fuelLevel' },
        { text: 'Notes', value: 'notes' },
        {
          text: 'Update',
          value: null,
          sortable: false,
        },
        {
          text: 'Change status',
          value: 'status',
        },
        {
          text: 'createdAt',
          value: 'createdAt',
        },
        {
          text: 'updatedAt',
          value: 'updatedAt',
        },
      ],
      alertType: 'error',
      hasAlert: false,
      alert: '',
    };
  },
  methods: {
    async GET() {
      try {
        const data = await this.$http.get('vehicle');
        this.items = data.data;
      } catch (error) {
        this.alertType = 'error';
        this.alert = 'Error while loading the data from api...';
        this.hasAlert = false;
      }
    },
    async PUT(model_name, status, id) {
      try {
        await this.$http.put('common', { model_name, status: !status, id });
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
