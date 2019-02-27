<template>
    <v-container grid-list-xl fluid>
        <v-layout row wrap>
            <v-flex lg12>
                <breadcrumb title="工作空间" :items="breads"></breadcrumb>
            </v-flex>
            <v-flex lg12>
                <v-card>
                    <v-toolbar flat color="white">
                        <v-toolbar-title>查询结果</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" dark @click="openDialog">
                            创建
                        </v-btn>
                    </v-toolbar>
                    <v-data-table
                            :headers="headers"
                            :items="spaceItems"
                            item-key="name"
                    >
                        <template slot="items" slot-scope="props">
                            <tr @click="props.expanded = !props.expanded">
                                <td class="text-xs-left">{{ props.item.spaceName }}</td>
                                <td class="text-xs-left">{{ props.item.spaceKey }}</td>
                                <td class="text-xs-left">{{ props.item.apiGateway }}</td>
                                <td class="text-xs-left">{{ props.item.statusDesc }}</td>
                                <td class="text-xs-left">
                                    <v-tooltip bottom>
                                        <v-btn flat icon color="green" slot="activator">
                                            <v-icon>cached</v-icon>
                                        </v-btn>
                                        <span>同步接口参数</span>
                                    </v-tooltip>
                                    <v-tooltip bottom>
                                        <v-btn flat icon color="red" slot="activator">
                                            <v-icon>delete</v-icon>
                                        </v-btn>
                                        <span>删除工作空间</span>
                                    </v-tooltip>

                                    <v-tooltip bottom v-if="!props.item.status || props.item.status == 0">
                                        <v-btn flat icon color="blue" slot="activator"
                                               v-on:click="changeWorkspace(props.item)">
                                            <v-icon>add</v-icon>
                                        </v-btn>
                                        <span>切换工作空间</span>
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
        <v-dialog v-model="dialog" width="800px" persistent>
            <v-card>
                <v-card-title class="justify-center">
                    <span class="headline">创建工作空间</span>
                </v-card-title>
                <v-card-text>
                    <v-layout>
                        <v-flex xs12 md6>
                            <v-text-field
                                    label="空间名称"
                                    type="spaceName"
                            ></v-text-field>
                        </v-flex>
                        &nbsp;&nbsp;
                        <v-flex xs12 md6>
                            <v-text-field
                                    label="空间唯一标识"
                                    type="spaceKey"
                                    hint="不可重复，全局唯一"
                                    v-model="application"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-text-field
                            label="请求地址"
                            value="127.0.0.1:8080"
                            hint="请输入请求域名 或 主机:端口"
                    ></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat @click.native="closeDialog">关闭</v-btn>
                    <v-btn depressed color="primary" @click.native="saveDialog">确认</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-container>
</template>

<script>

  import breadcrumb from '@/components/breadcrumb'

  export default {
    name: 'spacePanel',
    components: {breadcrumb},
    data: () => ({
      breads: [],
      headers: [
        {
          text: '空间名称',
          sortable: false,
          value: 'spaceName'
        },
        {text: '命名空间', value: 'spaceKey'},
        {text: '网关地址', value: 'apiGateway'},
        {text: '连接状态', value: 'status'},
        {text: '操作', value: 'iron'}
      ],
      spaceItems: [],
      dialog: false
    }),
    created () {
      // 查询所有空间
      this.spaceItems = this.$api.workspace.list()
      /**
       * 获取用户当前工作空间
       */
      let nws = this.$store.state.currentWorkspace
      if (!nws) {
        return
      }
      this.changeWorkspace(nws)
    },
    methods: {
      changeWorkspace: function (nws) {
        this.spaceItems.forEach(function (item) {
          if (item.spaceKey === nws['spaceKey']) {
            item['statusDesc'] = '已连接'
            item.status = 1
          } else {
            item['statusDesc'] = ''
            item.status = 0
          }
        })
        this.$store.commit('setWorkspace', nws)
      },
      openDialog: function () {
        this.dialog = true
      },
      closeDialog: function () {
        this.dialog = false
      },
      saveDialog: function () {
        this.dialog = false
      }
    }
  }
</script>

<style scoped>

</style>
