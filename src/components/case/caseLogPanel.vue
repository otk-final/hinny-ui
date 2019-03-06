<template>
    <v-container grid-list-xl fluid>
        <v-layout row wrap>
            <v-flex lg12>
                <breadcrumb title="执行记录" :items="breads"></breadcrumb>
            </v-flex>

            <v-flex lg12>
                <v-layout>
                    <v-flex xs12 md4>
                        <v-select
                                v-model="searchChecked"
                                :items="searchOptions"
                                label="查询类型"
                                ref="findType"
                        ></v-select>
                    </v-flex>
                    <v-flex xs12 md8>
                        <v-text-field
                                label="搜索记录"
                                v-model="searchText"
                                :value="searchText"
                                hint="可以通过[模块名称],[相关分组/标签],[案例名称]进行查询"
                                append-icon="search"
                                @keyup.enter="enterSearch"
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
                            item-key="caseName"
                            hide-actions
                    >
                        <template slot="items" slot-scope="props">
                            <tr @click="props.expanded = !props.expanded">
                                <td class="text-xs-left">{{ props.item.moduleName }}</td>
                                <td class="text-xs-left">{{ props.item.groupName }}</td>
                                <td class="text-xs-left">{{ props.item.caseName }}</td>
                                <td class="text-xs-left">
                                    <v-btn flat color="red" v-if="props.item.status == 'fail'">
                                        失败
                                    </v-btn>
                                    <v-btn flat color="green" v-if="props.item.status == 'success'">
                                        成功
                                    </v-btn>
                                    <v-btn flat color="blue-grey" v-if="props.item.status == 'part'">
                                        部分通过
                                    </v-btn>
                                </td>
                                <td class="text-xs-left">{{ props.item.createTime }}</td>
                                <td class="text-xs-left">

                                    <v-tooltip bottom>
                                        <v-btn flat icon color="primary" slot="activator"
                                               v-on:click="goTryAgain(props.item)">
                                            <v-icon>refresh</v-icon>
                                        </v-btn>
                                        <span>重新执行</span>
                                    </v-tooltip>
                                    <v-tooltip bottom>
                                        <v-btn flat icon color="primary" slot="activator"
                                               v-on:click="goInfo(props.item)">
                                            <v-icon>info</v-icon>
                                        </v-btn>
                                        <span>详情</span>
                                    </v-tooltip>
                                </td>
                            </tr>
                        </template>
                        <template slot="expand" slot-scope="props">
                            <v-card>
                                <v-card-text style="text-align: left">
                                    <h3 style="text-align: left">CURL:</h3>
                                    {{props.item.curl}}
                                    <br/><br/>
                                    <h3 style="text-align: left">备注:</h3>
                                    {{props.item.description}}
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

  export default {
    name: 'caseLogPanel',
    components: {
      breadcrumb
    },
    data: () => ({
      expanded: false,
      searchOptions: [
        {text: '模块名称', value: 'module'},
        {text: '分组', value: 'group'},
        {text: '案例名称', value: 'case'}
      ],
      breads: [{text: '案例计划', href: ''}, {text: '执行记录', href: ''}],
      headers: [
        {text: '模块名称', value: 'moduleName'},
        {text: '分组/标签', value: 'groupName'},
        {text: '案例名称', value: 'caseName'},
        {text: '状态', value: 'status'},
        {text: '创建时间', value: 'createTime'},
        {text: '操作', value: 'iron'}
      ],
      items: [
        {moduleName: '用户行为模块', groupName: '点赞', caseName: '用户点赞操作', status: 'success'},
        {
          moduleName: '用户行为模块',
          groupName: '关注',
          caseName: '用户关注自己',
          status: 'fail',
          curl: 'curl -X GET "http://api-dev.yryz.com/gateway/lovelorn/v1.1/pb/activity-info/4324234" -H "accept: */*"',
          description: 'Vue.js - The Progressive JavaScript Framework... 你可以像绑定普通属性一样在模板中绑定计算属性。Vue 知道 vm.reversedMessage 依赖于 vm.message,因此当 vm.mess...'
        },
        {
          moduleName: '用户行为模块',
          groupName: '关注',
          caseName: '用户关注不存在的用户',
          status: 'part',
          createTime: '2019-03-04 19:32:11'
        }
      ]
    }),
    methods: {
      goInfo: function (item) {
        this.$router.push({name: 'pathPanel', query: {findType: 'service', value: item.serviceName}})
      },
      goTryAgain: function (item) {
        this.$router.push({name: 'pathPanel', query: {findType: 'service', value: item.serviceName}})
      }
    }
  }
</script>

<style scoped>

</style>
