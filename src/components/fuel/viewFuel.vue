<template>
  <v-layout row wrap>
    <v-dialog v-model="dialog">
      <v-card>
        <v-form>
          <v-card-text>
            <h2>Tank Capacity : {{tankVolume}} Liters</h2>
            <h2>In Tank : {{inTank}} Liters</h2>
            <h2>Maximum amount can add : {{acceptLit}}</h2>

            <v-text-field label="Add" outline v-model="amount"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn class="primary" @click="add(amount)" :disabled="!isAmountValid">add</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog v-model="removeFuelDialog">
      <v-card>
        <v-form>
          <v-card-text>
            <h2>Maximum amount can remove : {{inTank}}</h2>

            <v-text-field label="Remove" outline v-model="removeAmount"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn class="primary" @click="remove(removeAmount)" :disabled="!isValidRemoveAmount">remove</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <v-flex xs12 sm12 md12>
      <v-alert v-model="hasAlert" dismissible :type="alertType">{{alert}}</v-alert>
    </v-flex>
    <v-flex xs12 sm12 md12>
      <v-card>
        <v-card-title>
          <h1>View and update fuel level</h1>
        </v-card-title>
        <v-card-text>
          <v-text-field label="Search" v-model="search" outline></v-text-field>

          <v-data-table :items="items" :headers="headers" :search="search" disable-initial-sort>
            <template slot="items" slot-scope="props">
              <td>{{props.item.id}}</td>
              <td>{{props.item.make}}</td>
              <td>{{props.item.year}}</td>
              <td>{{props.item.color}}</td>
              <td>{{props.item.vin}}</td>
              <td>{{props.item.tankVolume}}</td>
              <td>{{props.item.fuelLevel}}</td>
              <td>
                <v-chip
                  :color="props.item.fuelPercentage.color"
                >{{props.item.fuelPercentage.percentage}}</v-chip>
              </td>

              <td>
                <!-- <v-btn class="warning" @click="openDialog(props.item.id)">Update</v-btn> -->
                <!-- <v-btn class="warning"  fab >
                </v-btn>-->
                <v-icon
                  color="blue"
                  @click="openDialog(props.item.id,props.item.tankVolume,props.item.fuelLevel)"
                >fa-plus-circle</v-icon>
                <!-- <i class="fas "></i> -->
              </td>
              <td>
                <v-icon
                  color="red"
                  @click="removeFuel(props.item.id,props.item.tankVolume,props.item.fuelLevel)"
                >fa-minus-circle</v-icon>
              </td>
              <!-- <i class="fas "></i> -->
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  computed: {
    isAmountValid() {
      if (this.amount <= this.acceptLit && this.amount > 0) {
        return true;
      }
      return false;
    },
    isValidRemoveAmount() {
      if (this.removeAmount <= this.inTank && this.removeAmount > 0) {
        return true;
      }
      return false;
    },
  },
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
        { text: 'Id', value: 'id' },

        { text: 'Model', value: 'make' },
        { text: 'Year', value: 'year' },
        { text: 'Color', value: 'color' },
        { text: 'Registration Number', value: 'vin' },
        { text: 'Tank Volume (Lt.)', value: 'tankVolume' },
        { text: 'In Tank', value: 'fuelLevel' },
        { text: 'Percentage', value: 'fuelPercentage.percentage' },

        {
          text: 'Add',
          value: null,
          sortable: false,
        },
        {
          text: 'Remove',
          value: null,
          sortable: false,
        },
      ],
      alertType: 'error',
      hasAlert: false,
      alert: '',
      acceptLit: null,
      tankVolume: null,
      inTank: null,
      removeFuelDialog: false,
      removeAmount: null,
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
    async openDialog(id, tv, fl) {
      try {
        this.id = id;
        this.dialog = true;
        this.acceptLit = tv - fl;
        this.tankVolume = tv;
        this.inTank = fl;
      } catch (error) {
        this.alertType = 'error';
        this.alert = 'Status change failed!';
        this.hasAlert = true;
      }
    },
    async removeFuel(id, tv, fl) {
      try {
        this.id = id;
        this.removeFuelDialog = true;
        this.acceptLit = tv - fl;
        this.tankVolume = tv;
        this.inTank = fl;
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
    async remove(amount) {
      try {
        await this.$http.put(`vehicle/fuelremove/${this.id}`, { fuelLevel: amount });
        this.GET();
        this.removeFuelDialog = false;
      } catch (error) {
        this.alertType = 'error';
        this.alert = 'Status change failed!';
        this.hasAlert = true;
      }
    },
  },
};
</script>
