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
                            hide-actions
                    >
                        <template slot="items" slot-scope="props">
                            <tr>
                                <td class="text-xs-left">{{ props.item.application}}</td>
                                <td class="text-xs-left">{{ props.item.wsName }}</td>
                                <td class="text-xs-left">{{ props.item.wsKey}}</td>
                                <td class="text-xs-left">{{ props.item.apiUrl}}</td>
                                <td class="text-xs-left">{{ props.item.statusDesc }}</td>
                                <td class="text-xs-left">
                                    <v-tooltip bottom>
                                        <v-btn flat icon color="green" slot="activator"
                                               v-on:click="refresh(props.item)">
                                            <v-icon>cached</v-icon>
                                        </v-btn>
                                        <span>同步接口参数</span>
                                    </v-tooltip>
                                    <v-tooltip bottom>
                                        <v-btn flat icon color="red" slot="activator"
                                               v-on:click="remove(props.item)">
                                            <v-icon>delete</v-icon>
                                        </v-btn>
                                        <span>删除工作空间</span>
                                    </v-tooltip>
                                    <v-tooltip bottom v-if="!props.item.status || props.item.status == 0">
                                        <v-btn flat icon color="blue" slot="activator"
                                               v-on:click="change(props.item)">
                                            <v-icon>add</v-icon>
                                        </v-btn>
                                        <span>切换工作空间</span>
                                    </v-tooltip>
                                </td>
                            </tr>
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
                    <v-text-field
                            v-model="input.application"
                            label="项目名称"
                            hint="请输入项目名称"
                    ></v-text-field>
                    <v-layout>
                        <v-flex xs12 md6>
                            <v-text-field
                                    label="空间名称"
                                    v-model="input.wsName"
                            ></v-text-field>
                        </v-flex>
                        &nbsp;&nbsp;
                        <v-flex xs12 md6>
                            <v-text-field
                                    label="空间唯一标识"
                                    hint="不可重复，全局唯一"
                                    v-model="input.wsKey"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-text-field
                            label="请求地址"
                            v-model="input.apiUrl"
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

  import aceEditor from '@/components/common/aceEditor'
  import breadcrumb from '@/components/common/breadcrumb'

  export default {
    name: 'spacePanel',
    components: {breadcrumb, aceEditor},
    data: () => ({
      breads: [],
      headers: [
        {text: '项目名称', value: 'application'},
        {
          text: '空间名称',
          sortable: false,
          value: 'wsName'
        },
        {text: '命名空间', value: 'wsKey'},
        {text: '网关地址', value: 'apiUrl'},
        {text: '连接状态', value: 'status'},
        {text: '操作', value: 'iron'}
      ],
      spaceItems: [],
      dialog: false,
      input: {
        application: '',
        wsName: '',
        wsKey: '',
        apiUrl: ''
      }
    }),
    created () {
      this.load()
    },
    methods: {
      load: function () {
        // 查询所有空间
        this.$http.get('/workspace/action/list').then((resp) => {
          this.spaceItems = resp.data
          /**
           * 获取用户当前工作空间
           */
          let nws = this.$store.state.currentWorkspace
          if (!nws) {
            return
          }
          this.change(nws)
        })
      },
      refresh: function (nws) {
        this.$http.post('/workspace/action/refresh', nws).then((resp) => {
          this.$toast.success('刷新成功')
        })
      },
      remove: function (nws) {
        debugger
        this.$http.delete('/workspace/' + nws.kid).then((resp) => {
          this.$toast.success('删除成功')
          this.load()
        })
      },
      change: function (nws) {
        let afterArray = []
        for (let i = 0; i < this.spaceItems.length; i++) {
          let item = this.spaceItems[i]
          if (item.kid === nws.kid) {
            item['statusDesc'] = '已连接'
            item.status = 1
          } else {
            item['statusDesc'] = ''
            item.status = 0
          }
          afterArray.push(item)
        }
        this.spaceItems = afterArray
        this.$store.commit('setWorkspace', nws)
      },
      openDialog: function () {
        this.dialog = true
      },
      closeDialog: function () {
        this.dialog = false
      },
      saveDialog: function () {
        this.$http.post('/workspace', this.input).then((resp) => {
          this.$toast.success('新增成功')
          this.dialog = false
          this.load()
        })
        this.input = {}
      }
    }
  }
</script>

<style scoped>

</style>
