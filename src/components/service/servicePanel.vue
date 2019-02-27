<template>
    <v-container grid-list-xl fluid>
        <v-layout row wrap>
            <v-flex lg12>
                <breadcrumb title="服务列表" :items="breads"></breadcrumb>
            </v-flex>
            <v-flex xs12>
                <v-card>
                    <v-toolbar flat color="white">
                        <v-toolbar-title>服务列表</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" dark @click="expand = !expand">
                            创建
                        </v-btn>
                    </v-toolbar>
                    <v-data-table
                            :headers="headers"
                            :items="serviceItems"
                            item-key="name"
                    >
                        <template slot="items" slot-scope="props">
                            <tr @click="props.expanded = !props.expanded">
                                <td class="text-xs-left">{{ props.item.serviceName }}</td>
                                <td class="text-xs-left">{{ props.item.serviceId }}</td>
                                <td class="text-xs-left">{{ props.item.apiName }}</td>
                                <td class="text-xs-left">{{ props.item.description }}</td>
                                <td class="text-xs-left">{{ props.item.pathCount }}</td>
                                <td class="text-xs-left">
                                    <v-tooltip bottom>
                                        <v-btn flat icon color="primary" slot="activator">
                                            <v-icon>list</v-icon>
                                        </v-btn>
                                        <span>接口列表</span>
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
    name: 'servicePanel',
    components: {
      breadcrumb
    },
    data: () => ({
      breads: [{text: '项目管理', href: ''}, {text: '服务列表', href: ''}],
      headers: [
        {
          text: '服务名称',
          sortable: false,
          value: 'serviceName'
        },
        {text: '服务标识', value: 'serviceId'},
        {text: '接口名称', value: 'apiName'},
        {text: '备注', value: 'description'},
        {text: '接口数量', value: 'pathCount'},
        {text: '操作', value: 'iron'}
      ],
      serviceItems: []
    }),
    created () {
      this.serviceItems = this.$api.service.list()
    }
  }
</script>

<style scoped>

</style>
