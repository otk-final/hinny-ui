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
                                :items="items"
                                label="查询类型"
                        ></v-select>
                    </v-flex>
                    <v-flex xs12 md8>
                        <v-text-field
                                label="搜索接口"
                                value="*"
                                hint="可以通过[请求路径]或[服务名].*代表该类型下所有接口"
                                append-icon="search"
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
                    >
                        <template slot="items" slot-scope="props">
                            <tr @click="props.expanded = !props.expanded">
                                <td class="text-xs-left">{{ props.item.serviceName }}</td>
                                <td class="text-xs-left">{{ props.item.method }}</td>
                                <td class="text-xs-left">{{ props.item.apiName }}</td>
                                <td class="text-xs-left">{{ props.item.description }}</td>
                                <td class="text-xs-left">
                                    <v-tooltip bottom>
                                        <v-btn flat icon color="blue" slot="activator">
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
  import breadcrumb from '@/components/breadcrumb'

  export default {
    name: 'pathPanel',
    components: {
      breadcrumb
    },
    data: () => ({
      breads: [{text: '项目管理', href: ''}, {text: '接口查询', href: ''}],
      items: [{text: '服务名', value: 'service'}, {text: '请求路径', value: 'path'}],
      headers: [
        {
          text: '服务名称',
          sortable: false,
          value: 'serviceName'
        },
        {text: '请求方法', value: 'method'},
        {text: '路径', value: 'apiName'},
        {text: '备注', value: 'description'},
        {text: '操作', value: 'iron'}
      ],
      pathItems: []
    }),
    created () {
      this.pathItems = this.$api.path.list('', '')
    },
    methods: {
      search: function () {
        this.pathItems = this.$api.path.list('', '')
      }
    }
  }
</script>

<style scoped>

</style>
