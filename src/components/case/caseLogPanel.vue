<template>
    <v-timeline dense clipped>
        <v-timeline-item color="primary" small v-for="(item, i) in items" :key="i" v-on:click="goInfo(item)">
            <v-layout justify-space-between>
                <v-flex xs2 text-xs-left>{{item.createTime}}</v-flex>
                <v-flex xs6 text-xs-left>{{item.path}}</v-flex>
                <v-flex xs2 text-xs-left>
                    <span flat class="red--text" v-if="item.status === -1">
                        失败
                    </span>
                    <span flat class="green--text" v-if="item.status === 1">
                        成功
                    </span>
                    <span flat class="blue--grey" v-if="item.status === 0">
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
    props: {
      caseKid: Number
    },
    data: () => ({
      items: []
    }),
    created () {
      this.load(this.caseKid)
    },
    methods: {
      goInfo: function (item) {
        this.$router.push({
          name: 'httpCtrl',
          query: {type: 'log', logKid: item.kid}
        })
      },
      load: function (caseKid) {
        let params = {
          caseKid: caseKid
        }
        let me = this
        this.$http.get('/case/action/get-logs', {params: params}).then((resp) => {
          me.items = resp.data
        })
        /**
         * 通知父组件缓存当前数据
         */
      }
    }
  }
</script>

<style scoped>

</style>
