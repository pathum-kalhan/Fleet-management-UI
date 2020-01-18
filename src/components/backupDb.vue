<template>
<v-layout row wrap>
    <v-flex xs12 sm12 md12>
        <v-card>
            <v-card-title>
                <h2>Backup Database</h2>
            </v-card-title>
            <v-card-actions>
                <v-btn class="success" @click="POST">Backup now</v-btn>
            </v-card-actions>
        </v-card>
    </v-flex>
    <v-flex xs12 sm12 md12>
      <v-alert v-model="hasAlert" dismissible :type="alertType">{{alert}}</v-alert>
    </v-flex>
</v-layout>
</template>

<script>
export default {
  data() {
    return {
      alert: 'Failed',
      alertType: 'error',
      hasAlert: false,
    };
  },
  methods: {
    async POST() {
      try {
        await this.$http.post('/backup');

        this.alert = 'Backup created successfully!';
        this.alertType = 'success';
        this.hasAlert = true;

        // alert("Success!");
      } catch (error) {
        this.alert = 'Failed';

        this.alertType = 'error';
        this.hasAlert = true;
      }
    },
  },
};
</script>
