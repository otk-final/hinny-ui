<template>
    <v-timeline dense clipped>
        <v-timeline-item color="primary" small v-for="(item, i) in items" :key="i" v-on:click="goInfo(item)">
            <v-layout justify-space-between>
                <v-flex xs2 text-xs-left>{{item.createTime}}</v-flex>
                <v-flex xs6 text-xs-left>{{item.path}}</v-flex>
                <v-flex xs2 text-xs-left>
                    <span flat class="red--text" v-if="item.status == 'fail'">
                        失败
                    </span>
                    <span flat class="green--text" v-if="item.status == 'success'">
                        成功
                    </span>
                    <span flat class="blue--grey" v-if="item.status == 'part'">
                        部分通过
                    </span>
                </v-flex>
                <v-flex xs2 text-xs-left>
                    <v-icon color="primary" v-on:click="goInfo(item)">info</v-icon>
                </v-flex>
            </v-layout>

        </v-timeline-item>
    </v-timeline>
</template>

<script>
  export default {
    name: 'caseLogPanel',
    data: () => ({
      items: [
        {createTime: '2019-03-08', path: 'http://localhost:8082/#/case/action/log-list', status: 'success'},
        {createTime: '2019-03-08', path: 'http://localhost:8082/#/case/action/log-list', status: 'fail'},
        {createTime: '2019-03-08', path: 'http://localhost:8082/#/case/action/log-list', status: 'part'}]
    }),
    methods: {
      goInfo: function (item) {
        this.$router.push({
          name: 'httpCtrl',
          query: {type: 'log', primaryId: item.primaryId}
        })
      }
    }
  }
</script>

<style scoped>

</style>
