<template>
  <v-layout row wrap>
    <v-flex xs12 sm12 md12>
      <v-alert v-model="hasAlert" dismissible :type="alertType">{{alert}}</v-alert>
    </v-flex>
    <v-flex xs12 sm12 md12>
      <v-card>
        <v-card-title>
          <h1>View and update users</h1>
        </v-card-title>
        <v-card-text>
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
              <td>{{props.item.name}}</td>
              <!-- <td>{{props.item.profileImg}}</td> -->
              <td>{{props.item.role}}</td>
              <td>{{props.item.email}}</td>
              <td>{{props.item.nic}}</td>
              <td>{{props.item.address}}</td>
              <td>{{props.item.contactNumber1}}</td>
              <td>{{props.item.contactNumber2}}</td>
              <td>
                <v-btn
                  class="warning"
                  @click="$router.push({path:'/user',query:{id:props.item.id}})"
                >Update</v-btn>
              </td>
              <td>
                <v-btn
                  @click="PUT('user',props.item.status,props.item.id)"
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
// import { CHANGE_STATUS } from "../../assets/image-upload.js";
export default {
  //   mixins: [CHANGE_STATUS],
  mounted() {
    this.GET();
  },
  data() {
    return {
      pagination: {
        rowsPerPage: 10
      },
      search: "",
      items: [],
      headers: [
        { text: "ID", value: "id" },
        { text: "Name", value: "name" },
        // { text: 'Display picture', value: 'profileImg' },
        { text: "Role", value: "role" },
        { text: "Email", value: "email" },
        { text: "NIC", value: "nic" },
        { text: "Address", value: "address" },
        { text: "Contact Number 1", value: "contactNumber1" },
        { text: "Contact Number 2", value: "contactNumber2" },

        // { text: "Created at", value: "createdAt" },
        {
          text: "Update",
          value: null,
          sortable: false
        },
        {
          text: "Change status",
          value: "status"
        }
      ],
      alertType: "error",
      hasAlert: false,
      alert: ""
    };
  },
  methods: {
    async GET() {
      try {
        const data = await this.$http.get("user");

        data.data.forEach((element, i) => {
          data.data[i].name = `${element.gender ? "Mr." : "Ms."}${
            element.firstName
          } ${element.lastName}`;
        });

        this.items = data.data;
      } catch (error) {
        this.alertType = "error";
        this.alert = "Error while loading the data from api...";
        this.hasAlert = false;
      }
    },
    async PUT(model_name, status, id) {
      try {
        await this.$http.put("common", { model_name, status: !status, id });
        this.GET();
      } catch (error) {
        // alert('Status changing failed!');
      }
    }
  }
};
</script>
