<template>
    <v-layout>
        <v-flex xs12 md6>
            <v-combobox
                    v-model="module"
                    :items="moduleItems"
                    chips
                    label="模块名称"
                    hint="请选择或自定义功能模块"
                    v-on:change="moduleChange"
            ></v-combobox>
        </v-flex>
        <v-flex xs12 md6>
            <v-combobox
                    v-model="caseType"
                    chips
                    :items="caseTypeItems"
                    label="类型名称"
                    hint="请选择或自定义案例类型"
            ></v-combobox>
        </v-flex>
    </v-layout>
</template>

<script>
  export default {
    name: 'moduleLinkOptions',
    data: () => ({
      caseType: '',
      module: '',
      caseTypeItems: [],
      moduleAll: []
    }),
    created () {
      /**
       * 加载module-groups
       */
      this.$http.get('/case/action/get-modules').then((resp) => {
        this.moduleAll = resp.data
      })
    },
    computed: {
      moduleItems: function () {
        let moduleItems = []
        this.moduleAll.forEach(function (item) {
          moduleItems.push(item.module)
        })
        return moduleItems
      }
    },
    methods: {
      getModule: function () {
        return this.module
      },
      getCaseType: function () {
        return this.caseType
      },
      moduleChange: function (val) {
        /**
         * 联动
         */
        let me = this
        me.moduleAll.forEach(function (item) {
          if (item.module === val) {
            me.caseType = ''
            me.caseTypeItems = item.caseTypes
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
