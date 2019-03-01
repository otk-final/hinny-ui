<template>
    <v-snackbar
            v-model="snackbar"
            :color="mode"
            :timeout="timeout"
            :top='top'
    >
        {{text}}
        <v-btn dark flat @click="snackbar = false">
            关闭
        </v-btn>
    </v-snackbar>
</template>

<script>
  export default {
    name: 'snackbar',
    data: () => ({
      top: true,
      snackbar: false,
      text: '',
      timeout: 2000,
      mode: 'success'
    }),
    methods: {
      show: function (mode, text, error) {
        this.snackbar = true
        this.text = text
        this.mode = mode
        if (error) {
          Promise.reject(error)
        }
      }
    }
  }
</script>

<style scoped>

</style>
