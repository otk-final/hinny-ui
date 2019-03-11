<template>
    <v-container grid-list-xl fluid>
        <v-layout row wrap>
            <v-flex lg12>
                <breadcrumb title="执行记录" :items="breads"></breadcrumb>
            </v-flex>

            <v-flex lg12>
                <v-layout>
                    <module-link-options ref="moduleLinkOptions" :caseType="caseType"
                                         :module="module"></module-link-options>
                    <v-flex xs12 md6>
                        <v-text-field
                                label="案例名称/请求路径"
                                v-model="searchText"
                                hint="可以通过模糊匹配进行查询"
                                append-icon="search"
                                @keyup.enter="search"
                        ></v-text-field>
                    </v-flex>
                </v-layout>
            </v-flex>

            <v-flex xs12>
                <v-card>
                    <v-toolbar flat color="white">
                        <v-toolbar-title>查询结果</v-toolbar-title>
                    </v-toolbar>
                    <v-data-table
                            :headers="headers"
                            :items="items"
                            item-key="kid"
                            hide-actions
                    >
                        <template slot="items" slot-scope="props">
                            <tr v-on:click="props.expanded = !props.expanded">
                                <td class="text-xs-left">{{ props.item.module}}</td>
                                <td class="text-xs-left">{{ props.item.caseType }}</td>
                                <td class="text-xs-left">{{ props.item.caseName }}</td>
                                <td class="text-xs-left">{{ props.item.createTime }}</td>
                                <td class="text-xs-left">
                                    <v-tooltip bottom>
                                        <v-btn flat icon color="primary" slot="activator"
                                               v-on:click="goTryAgain(props.item)">
                                            <v-icon>refresh</v-icon>
                                        </v-btn>
                                        <span>重新执行</span>
                                    </v-tooltip>
                                </td>
                            </tr>
                        </template>
                        <template slot="expand" slot-scope="props">
                            <v-card>
                                <v-card-text style="text-align: left">
                                    <case-log-panel :caseKid="props.item.kid" ></case-log-panel>
                                </v-card-text>
                            </v-card>
                        </template>
                    </v-data-table>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  import breadcrumb from '@/components/common/breadcrumb'
  import moduleLinkOptions from '@/components/common/moduleLinkOptions'
  import caseLogPanel from '@/components/case/caseLogPanel'

  export default {
    name: 'caseTplPanel',
    components: {
      caseLogPanel,
      moduleLinkOptions,
      breadcrumb
    },
    data: () => ({
      expanded: false,

      caseType: '',
      module: '',
      searchText: '',

      breads: [{text: '案例计划', href: ''}, {text: '执行记录', href: ''}],
      headers: [
        {text: '模块名称', value: 'module'},
        {text: '案例类型', value: 'caseType'},
        {text: '案例名称', value: 'caseName'},
        {text: '创建时间', value: 'createTime'},
        {text: '操作', value: 'iron'}
      ],
      items: []
    }),
    created () {
      this.load({caseType: this.caseType, module: this.module, searchText: this.searchText})
    },
    methods: {
      load: function (params) {
        this.$http.get('/case/action/list', {params: params}).then((resp) => {
          this.items = resp.data
        })
      },
      search: function () {
        let me = this
        let params = {
          caseType: me.$refs['moduleLinkOptions'].getCaseType(),
          module: me.$refs['moduleLinkOptions'].getModule(),
          searchText: me.searchText
        }
        this.load(params)
      },
      expandedEvent: function (item) {
        debugger
        // @click="props.expanded = !props.expanded"
        this.expanded = !this.expanded
      },
      goInfo: function (item) {

      },
      goTryAgain: function (item) {

      }
    }
  }
</script>

<style scoped>

</style>
