<template>
    <v-navigation-drawer
            id="appDrawer"
            :mini-variant.sync="mini"
            fixed
            :dark="$vuetify.dark"
            app
            v-model="drawer"
    >
        <v-toolbar color="primary darken-1">
            <img src="@/assets/logo.png" width="24" height="24"/>
            <v-toolbar-title class="ml-0 pl-3">
                <span class="hidden-sm-and-down white--text">{{ $store.state.appTitle }}</span>
            </v-toolbar-title>
        </v-toolbar>

        <v-list expand>
            <template v-for="(item,i) in drawerMenu">
                <v-list-group v-if="item.items" :group="item.group" :prepend-icon="item.icon" v-bind:key="i" no-action>
                    <v-list-tile slot="activator" ripple>
                        <v-list-tile-content>
                            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>

                    <template v-for="(subItem,si) in item.items">
                        <v-list-tile v-bind:to="subItem.path" ripple v-bind:key="si">
                            <v-list-tile-content>
                                <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                            </v-list-tile-content>
                            <v-chip v-if="subItem.badge" color="primary" class="v-chip--x-small" disabled
                                    text-color="white">
                                {{subItem.badge}}
                            </v-chip>
                        </v-list-tile>
                    </template>
                </v-list-group>

                <v-list-tile v-else :key="item.title" v-bind:to="item.path" ripple>
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>{{ item.title }}</v-list-tile-content>
                    <v-chip v-if="item.badge" color="primary" class="v-chip--x-small" disabled text-color="white">
                        {{item.badge}}
                    </v-chip>
                </v-list-tile>
            </template>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
  export default {
    name: 'drawer',
    data: () => ({
      mini: false,
      drawer: true,
      drawerMenu: []
    }),
    created () {
      this.drawerMenu = this.$store.state.drawerMenu
    }
  }
</script>

<style>
    .v-chip--x-small {
        font-size: 10px;
        height: 16px;
    }
</style>
