<template>
    <v-container grid-list-xl fluid>
        <v-layout row wrap>

            <v-flex lg12>
                <breadcrumb title="接口详情" :items="breads"></breadcrumb>
            </v-flex>

            <v-flex sm12>
                <h3 style="text-align: left">基本配置</h3>
            </v-flex>
            <v-flex xs12>
                <v-data-table
                        :items="basicItems"
                        class="elevation-1"
                        hide-actions
                        hide-headers>
                    <template slot="items" slot-scope="props">
                        <td style="text-align: left;width: 15%">{{props.item.name}}</td>
                        <td style="text-align: left">{{props.item.value}}</td>
                    </template>
                </v-data-table>
            </v-flex>

            <v-flex sm12>
                <h3 style="text-align: left">请求</h3>
            </v-flex>

            <v-flex xs12>
                <v-tabs class="elevation-1">
                    <v-tab>请求头</v-tab>
                    <v-tab>URI参数</v-tab>
                    <v-tab>请求参数</v-tab>
                    <v-tab>报文体</v-tab>
                    <v-tab>验证脚本</v-tab>
                    <v-tab-item>
                        <line-edit-table ref="header" :items="requestArg.header"></line-edit-table>
                    </v-tab-item>
                    <v-tab-item>
                        <line-edit-table ref="uri" :items="requestArg.uri"></line-edit-table>
                    </v-tab-item>
                    <v-tab-item>
                        <line-edit-table ref="query" :items="requestArg.query"></line-edit-table>
                    </v-tab-item>
                    <v-tab-item>
                        <vue-json-editor :show-btns="false"
                                         :modes="modes"
                                         :value="requestBody">
                        </vue-json-editor>
                    </v-tab-item>
                    <v-tab-item>
                        <ace-editor v-model="scriptContext" :lang="scriptType" :readonly="false"></ace-editor>
                    </v-tab-item>
                </v-tabs>
            </v-flex>
            <v-btn mt-0 color="primary" v-on:click="submit">执行</v-btn>
            <v-btn mt-0 color="primary" v-on:click="openArchiveDialog">存档</v-btn>
            <v-flex sm12>
                <h3 style="text-align: left">响应</h3>
            </v-flex>
            <v-flex xs12>
                <v-tabs class="elevation-1">
                    <v-tab>响应头</v-tab>
                    <v-tab>响应报文</v-tab>
                    <v-tab-item>
                        <line-edit-table :items="responseArg.header"></line-edit-table>
                    </v-tab-item>
                    <v-tab-item>
                        <vue-json-editor :show-btns="false"
                                         :modes="modes"
                                         :value="responseBody">
                        </vue-json-editor>
                    </v-tab-item>
                </v-tabs>
            </v-flex>

            <v-flex sm12 v-show="validFlag">
                <h3 style="text-align: left">验证</h3>
            </v-flex>
            <v-flex xs12 v-show="validFlag">
                <v-data-table
                        :items="validItems"
                        :headers="validHeaders"
                        class="elevation-1"
                        hide-actions>
                    <template slot="items" slot-scope="props">
                        <td style="text-align: left">{{props.item.rule}}</td>
                        <td style="text-align: left">{{props.item.msg}}</td>
                        <td style="text-align: left;width: 20%">
                            <v-chip v-if="props.item.ok" small color="green" text-color="white">
                                成功
                            </v-chip>
                            <v-chip v-else color="red" small text-color="white">
                                失败
                            </v-chip>
                        </td>
                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>

        <v-dialog v-model="archiveDialog" width="800px" persistent>
            <v-card>
                <v-card-title class="justify-center">
                    <span class="headline">归档执行记录</span>
                </v-card-title>
                <v-card-text>
                    <v-text-field
                            v-model="input.name"
                            label="案例名称"
                            value=""
                            hint="请输入当前接口测试案例名称"
                    ></v-text-field>
                    <v-layout>
                        <v-flex xs12 md6>
                            <v-combobox
                                    v-model="input.module"
                                    chips
                                    :items="moduleItems"
                                    label="功能模块"
                                    hint="请选择或自定义功能模块"
                                    v-on:change="moduleSelected"
                            ></v-combobox>
                        </v-flex>
                        &nbsp;&nbsp;
                        <v-flex xs12 md6>
                            <v-combobox
                                    v-model="input.group"
                                    :items="groupItems"
                                    chips
                                    label="分组"
                                    hint="请选择或自定义分组"
                            ></v-combobox>
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-textarea
                                v-model="input.description"
                                label="备注"
                                value=""
                                hint="当前测试案例相关说明"
                        ></v-textarea>
                    </v-layout>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat @click.native="closeArchiveDialog">关闭</v-btn>
                    <v-btn depressed color="primary" @click.native="saveArchiveDialog">确认</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
  import breadcrumb from '@/components/common/breadcrumb'
  import lineEditTable from '@/components/common/lineEditTable'
  import vueJsonEditor from 'vue-json-editor'
  import aceEditor from '@/components/common/aceEditor'

  import 'brace/mode/javascript'
  import 'brace/theme/chrome'

  export default {
    name: 'httpCtrl',
    components: {
      aceEditor,
      vueJsonEditor,
      lineEditTable,
      breadcrumb
    },
    data: () => ({
      initType: '',
      validFlag: false,
      archiveDialog: false,
      validHeaders: [
        {text: '规则说明', sortable: false, value: 'rule'},
        {text: '验证结果', sortable: false, value: 'msg'},
        {text: '状态', sortable: false, value: 'ok'}],
      validItems: [],
      breads: [{text: '项目管理', href: ''}, {text: '接口查询', href: ''}],
      modes: ['code', 'tree', 'text', 'view'],
      basicItems: [],

      primary_id: '',

      requestArg: {},
      requestBody: '',
      responseArg: {},
      responseBody: '',

      scriptType: 'javascript',
      scriptContext: '',
      input: {
        name: '',
        module: '',
        group: '',
        description: ''
      },
      moduleGroup: [],
      groupItems: []
    }),
    created () {
      this.initType = this.$router.currentRoute.query['type']
      let primaryId = this.$router.currentRoute.query['primaryId']
      this.$http.get('/path/action/primary', {
        params: {primaryId: primaryId}
      }).then((resp) => {
        this.formatPrimary(resp.data)
      })
      /**
       * 加载module-groups
       */
      this.$http.get('/case/action/get-module-group').then((resp) => {
        this.moduleGroup = resp.data
      })
    },
    computed: {
      moduleItems: function () {
        let moduleItems = []
        this.moduleGroup.forEach(function (item) {
          moduleItems.push(item.module)
        })
        return moduleItems
      }
    },
    methods: {
      formatPrimary: function (primary) {
        this.primary_id = primary.path['primary_id']

        this.basicItems = [
          {name: '服务说明', value: primary.path.service.description},
          {name: '请求方法', value: primary.path.method},
          {name: '请求地址', value: primary.path.path}
        ]

        this.breads.push({text: primary.path.service.serviceName})
        this.breads.push({strong: primary.path.description})
        this.requestArg = {
          uri: primary.request.uri,
          header: primary.request.header,
          query: primary.request.query
        }
        this.requestBody = JSON.parse(primary.request.body)
        this.responseArg = {header: []}
        this.responseBody = JSON.parse(primary.response.body)
      },
      submit: function () {
        /*
         *  获取被选中的值
         */
        let me = this
        let data = {
          primary_id: me.primary_id,
          request: {
            header: me.$refs.header.getValues(),
            uri: me.$refs.uri.getValues(),
            query: me.$refs.query.getValues(),
            body: me.requestBody
          },
          valid: {
            script_type: 'javascript',
            script: me.scriptContext
          }
        }
        debugger
        me.$http.post('/case/action/execute', data).then((resp) => {

        })
        debugger
      },
      openArchiveDialog: function () {
        this.archiveDialog = true
      },
      saveArchiveDialog: function () {
        this.archiveDialog = false
      },
      closeArchiveDialog: function () {
        this.archiveDialog = false
      },
      moduleSelected: function (val) {
        /**
         * 联动
         */
        let me = this
        me.groupItems = []
        me.moduleGroup.forEach(function (item) {
          if (item.module === val) {
            me.input.group = ''
            me.groupItems = item.groups
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
