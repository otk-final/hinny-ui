<template>
    <v-app :dark="dark">
        <drawer></drawer>
        <toolbar></toolbar>
        <v-content>
            <!---->
            <router-view/>
        </v-content>
        <!--<footers></footers>-->
    </v-app>
</template>
<script>
  import drawer from '@/components/drawer'
  // import footers from '@/components/footers'
  import toolbar from '@/components/toolbar'

  export default {
    name: 'App',
    components: {drawer, toolbar},
    data () {
      return {dark: false}
    },
    created () {
    }
  }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
