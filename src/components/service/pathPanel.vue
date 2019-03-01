<template>
    <v-container grid-list-xl fluid>
        <v-layout row wrap>
            <v-flex lg12>
                <breadcrumb title="接口查询" :items="breads"></breadcrumb>
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
                                label="搜索接口"
                                v-model="searchText"
                                :value="searchText"
                                hint="可以通过[请求路径]或[服务名].*代表该类型下所有接口"
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
                        <v-spacer></v-spacer>
                        <v-btn color="primary" dark @click="expand = !expand">
                            创建
                        </v-btn>
                    </v-toolbar>
                    <v-data-table
                            :headers="headers"
                            :items="pathItems"
                            item-key="name"
                            hide-actions
                    >
                        <template slot="items" slot-scope="props">
                            <tr>
                                <td class="text-xs-left">{{ props.item.service.serviceName }}</td>
                                <td class="text-xs-left">{{ props.item.service.description }}</td>
                                <td class="text-xs-left">{{ props.item.method }}</td>
                                <td class="text-xs-left">{{ props.item.path }}</td>
                                <td class="text-xs-left">{{ props.item.description }}</td>
                                <td class="text-xs-left">
                                    <v-tooltip bottom>
                                        <v-btn flat icon color="blue" slot="activator" v-on:click="http(props.item)">
                                            <v-icon>gavel</v-icon>
                                        </v-btn>
                                        <span>测试</span>
                                    </v-tooltip>
                                </td>
                            </tr>
                        </template>
                        <template slot="expand" slot-scope="props">
                            <v-card flat>
                                <v-card-text>Peek-a-boo!</v-card-text>
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
    name: 'pathPanel',
    components: {
      breadcrumb
    },
    data: () => ({
      breads: [{text: '项目管理', href: ''}, {text: '接口查询', href: ''}],
      searchOptions: [{text: '服务名', value: 'service'}, {text: '请求路径', value: 'path'}],
      searchChecked: '',
      searchText: '*',
      headers: [
        {
          text: '服务标识',
          sortable: false
        },
        {
          text: '服务名称',
          sortable: false
        },
        {text: '请求方法', value: 'method'},
        {text: '路径', value: 'path'},
        {text: '备注', value: 'description'},
        {text: '操作', value: 'iron'}
      ],
      pathItems: []
    }),
    created () {
      let query = this.$route.query
      if (query.findType && query.value !== '') {
        this.searchChecked = query.findType
        this.searchText = query.value
      }
      this.search(this.searchChecked, this.searchText)
    },
    methods: {
      search: function (type, typeValue) {
        this.$http.get('/path/action/list', {
          params: {type: type, typeValue: typeValue}
        }).then((resp) => {
          this.pathItems = resp.data
        })
      },
      enterSearch: function () {
        return this.search(this.searchChecked, this.searchText)
      },
      http: function (item) {
        debugger
        this.$router.push({
          name: 'httpExecute',
          query: {type: 'execute', primaryId: item.primary_id}
        })
      }
    }
  }
</script>

<style scoped>

</style>
