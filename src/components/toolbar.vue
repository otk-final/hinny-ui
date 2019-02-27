<template>
    <v-toolbar id="appToolbar"
               color="primary"
               fixed
               dark
               app>
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-spacer></v-spacer>
        <v-btn icon>
            <v-icon>search</v-icon>
        </v-btn>
        <v-btn icon>
            <v-icon>apps</v-icon>
        </v-btn>
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
    name: 'toolbar'
  }
</script>

<style scoped>

</style>
