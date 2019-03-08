<template>
    <v-toolbar id="appToolbar"
               color="primary"
               fixed
               dark
               app>
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-side-title>
            <v-btn icon flat>
                <v-icon>home</v-icon>
            </v-btn>
            <span>{{wsName}}</span>
        </v-toolbar-side-title>
        <v-spacer></v-spacer>
        <v-btn icon>
            <v-icon>refresh</v-icon>
        </v-btn>
        <v-btn icon>
            <v-icon>more_vert</v-icon>
        </v-btn>
    </v-toolbar>
</template>

<script>
  export default {
    name: 'toolbar',
    computed: {
      wsName: function () {
        let nws = this.$store.state.currentWorkspace
        if (nws) {
          return nws['wsName'] + ' ' + nws['apiUrl']
        }
        return ''
      }
    }
  }
</script>

<style scoped>

</style>
