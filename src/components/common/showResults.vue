<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-card-title>
          <h1>{{name}}</h1>
        </v-card-title>
        <v-card-text>
          <v-text-field label="Search" v-model="search" outline></v-text-field>

          <v-data-table :items="items" :headers="headers" :search="search">
            <template slot="items" slot-scope="props">
              <td>{{props.item.id}}</td>

            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      items: [],
      headers: [],
      search: '',
    };
  },
};
</script>
