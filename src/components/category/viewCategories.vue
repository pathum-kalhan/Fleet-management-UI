<template>
  <v-layout row wrap>
    <v-flex xs12 sm12 md12>
      <v-alert v-model="hasAlert" dismissible :type="alertType">{{alert}}</v-alert>
    </v-flex>
    <v-flex xs12 sm12 md12>
      <v-card>
        <v-card-title>
          <h1>View and update categories</h1>
        </v-card-title>
        <v-card-text>
         
          <v-text-field label="Search" v-model="search" outline></v-text-field>
          <v-data-table :items="items" :headers="headers" :search="search" disable-initial-sort  :pagination.sync="pagination">
            <template slot="items" slot-scope="props">
              <td>{{props.item.id}}</td>
              <td>{{props.item.name}}</td>
              <td>{{props.item.description}}</td>
              <td>{{props.item.createdAt}}</td>
              <td>{{props.item.updatedAt}}</td>
              <td>
                <v-btn
                  class="warning"
                  @click="$router.push({path:'/category',query:{id:props.item.id}})"
                >Update</v-btn>
              </td>
              <td>
                <v-btn
                  @click="PUT('category',props.item.status,props.item.id)"
                  :class="{'error':props.item.status}"
                >
                  <span v-if="props.item.status">Disable</span>
                  <span v-else>Enable</span>
                </v-btn>
              </td>
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
        { text: 'Name', value: 'name' },
        { text: 'Description', value: 'description' },
        {
          text: 'createdAt',
          value: 'createdAt',
        },
        {
          text: 'updatedAt',
          value: 'updatedAt',
        },
        {
          text: 'Update',
          value: null,
          sortable: false,
        },
        {
          text: 'Change status',
          value: 'status',
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
        const data = await this.$http.get('category');
        this.items = data.data;
      } catch (error) {
        this.alertType = 'error';
        this.alert = 'Error while loading the data from api...';
        this.hasAlert = true;
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
