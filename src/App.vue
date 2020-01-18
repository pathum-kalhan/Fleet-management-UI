<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer" v-if="token" dark>

      <v-list>
        <template v-for="item in permissions">
          <v-list-group
            v-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon
          >
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.text }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
              @click="$router.push(child.path)"
              color="red"
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content  :style="child.path === $route.path ? 'color:red;' : ''">
                <v-list-tile-title>{{ child.text }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else :key="item.text" @click="$router.push(item.path)">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app class="primary">
      <v-toolbar-side-icon @click="drawer = !drawer" v-if="token" dark></v-toolbar-side-icon>
      <v-icon dark large>fa-truck-moving</v-icon>
      <v-toolbar-title class="white--text">Hettiarachchi Logistics TMS</v-toolbar-title>
      <v-chip v-if="token" class="ml-1">{{name}}</v-chip>
      <v-spacer v-if="token"></v-spacer>
       <v-avatar color="indigo" v-if="token" @click="$router.push('/resetPassword')">
      <v-icon dark>fa-cogs</v-icon>
    </v-avatar>
      <v-btn v-if="token" @click="onLogout">logout</v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid grid-list-sm>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer  class="primary white--text">
      <v-spacer></v-spacer>

      <v-icon class="ml-1 mr-1" color="red">fa-code</v-icon>WITH
      <v-icon class="ml-1 mr-1" color="red">fa-heart</v-icon>BY LAHIRU
      <v-spacer></v-spacer>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {

  computed: {
    ...mapState(['token', 'name', 'role', 'permissions']),

  },
  name: 'App',
  data() {
    return {
      drawer: true,

    };
  },
  methods: {
    ...mapActions(['logout']),
    async onLogout() {
      await this.logout();
      this.$router.push('/');
    },

  },
};
</script>
