<template>
  <v-layout row wrap>
    <v-flex xs12 sm12 md12>
      <v-form ref="tripForm">
        <v-card>
          <v-card-title>
            <h1 v-if="component_status">Create a maintenance job</h1>
            <h1 v-else>Update the maintenance job</h1>
          </v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 sm12 md6>
                <v-autocomplete
                  label="Select a vehicle"
                  v-model="vehicleId"
                  :items="vehicles"
                  item-value="id"
                  item-text="vehicleName"
                  class="required"
                  outline
                ></v-autocomplete>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field label="Payment" v-model="allowances" outline class="required"></v-text-field>

                
              </v-flex>
              <v-flex xs11 sm6>
                <v-menu
                  ref="menu1"
                  v-model="menu1"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="startFrom"
                      label="Start from"
                      append-icon="fa-calendar-alt"
                      class="required"
                      v-on="on"
                      outline
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="startFrom"
                    no-title
                    @input="menu1 = false"
                    :min="$moment().format('YYYY-MM-DD')"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs11 sm6>
                <v-menu
                  ref="menu2"
                  v-model="menu2"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="stopAt"
                      label="Stop at"
                      append-icon="fa-calendar-alt"
                      class="required"
                      v-on="on"
                      outline
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="stopAt"
                    no-title
                    @input="menu2 = false"
                    :min="$moment().format('YYYY-MM-DD')"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-textarea
                  label="Notes"
                  outline
                  v-model="notes"
                  :counter="100"
                  :error-messages="notesErrors"
                  @input="$v.notes.$touch()"
                ></v-textarea>
              </v-flex>


            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-btn
              v-if="component_status"
              class="success"
              @click="POST"
              :disabled="$v.$invalid"
            >create</v-btn>

            <v-btn v-else class="error" @click="POST" :disabled="$v.$invalid">update</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-flex>
    <v-flex xs12 sm12 md12>
      <v-alert v-model="hasAlert" dismissible :type="alertType">{{alertingMessage}}</v-alert>
    </v-flex>
  </v-layout>
</template>

<script>
import { required, maxLength } from 'vuelidate/lib/validators';

export default {
  computed: {
    notesErrors() {
      const errors = [];
      if (!this.$v.notes.$dirty) return errors;

      !this.$v.notes.maxLength
        && errors.push('Maximum length for the notes is 100.');
      return errors;
    },
  },
  validations() {
    return {
      vehicleId: { required },
      // driverId: { required },
      stopAt: { required },
      startFrom: { required },
      notes: { maxLength: maxLength(100) },
    };
  },
  mounted() {
    if (this.$route.query.id) {
      this.component_status = false;
      this.GET_DATA(this.$route.query.id);
    }
    this.GET();
  },
  data() {
    return {
      selectedPlaces: [],
      places: '',
      allowances: '',
      startFrom: '',
      menu: '',
      driverId: '',
      vehicleId: '',
      vehicles: [],
      component_status: true,
      id: '',

      items: [],
      address: '',

      notes: '',
      drivers: [],
      menu1: '',
      menu2: '',
      stopAt: '',
      hasAlert: false,
      alertType: 'success',
      alertingMessage: '',
      isPaid: true,
    };
  },
  methods: {
    async POST() {
      try {
        let { allowances } = this;
        if (!this.allowances) {
          allowances = 0;
        }
        const formData = {
          vehicleId: this.vehicleId,
          notes: this.notes,
          payment: allowances,
          stopAt: this.stopAt,
          startFrom: this.startFrom,
          isPaid: this.isPaid,

        };

        if (this.component_status) {
          const data = await this.$http.post('/maintenance', formData);
          this.$v.$reset();
          this.$refs.tripForm.reset();
          this.alertType = 'success';
          this.alertingMessage = 'Job is created successfully.';
          this.hasAlert = true;
        } else {
          await this.$http.put(`/place/${this.id}`, formData);
          this.$router.push('/viewPlaces');
        }
      } catch (error) {
        if (error.response.status === 422) {
          this.alertType = 'error';
          this.alertingMessage = error.response.data.toString();
          this.hasAlert = true;
        }
      }
    },
    async GET_DATA(id) {
      try {
        const data = await this.$http.get(`/place/${id}`);
        this.id = data.data.id;
        this.name = data.data.name;
        this.address = data.data.address;
        this.lat = data.data.lat;
        this.lng = data.data.lng;
        this.notes = data.data.notes;
      } catch (error) {
        
        alert('Error while loading the data from api...');
      }
    },
    async GET() {
      try {
        const data = await this.$http.get('vehicle');
        data.data.forEach(e => (e.vehicleName = `${e.make} ${e.vin}`));
        this.vehicles = data.data.filter(e => e.status);
        const drivers = await this.$http.get('user');
        drivers.data.forEach(e => (e.name = `${e.firstName} ${e.lastName}`));
        this.drivers = drivers.data.filter(
          e => e.role === 'driver' && e.status,
        );

        const places = await this.$http.get('place');
        this.places = places.data.filter(e=> e.status)
      } catch (error) {
        alert('Error while loading the data from api...');
      }
    },
  },
};
</script>
