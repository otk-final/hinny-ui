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
                        <line-edit-table :items="requestArg.headers"></line-edit-table>
                    </v-tab-item>
                    <v-tab-item>
                        <line-edit-table :items="requestArg.paths"></line-edit-table>
                    </v-tab-item>
                    <v-tab-item>
                        <line-edit-table :items="requestArg.querys"></line-edit-table>
                    </v-tab-item>
                    <v-tab-item>
                        <vue-json-editor :show-btns="false"
                                         :modes="modes"
                                         :value="requestArg.body">
                        </vue-json-editor>
                    </v-tab-item>
                    <v-tab-item>
                        <ace-editor v-model="valid.script" :lang="valid.type" :readonly="false"></ace-editor>
                    </v-tab-item>
                </v-tabs>
            </v-flex>
            <v-btn mt-0 color="primary">执行</v-btn>
            <v-btn mt-0 color="primary">存档</v-btn>
            <v-flex sm12>
                <h3 style="text-align: left">响应</h3>
            </v-flex>
            <v-flex xs12>
                <v-tabs class="elevation-1">
                    <v-tab>响应头</v-tab>
                    <v-tab>响应报文</v-tab>
                    <v-tab-item>
                        <line-edit-table :items="responseArg.headers"></line-edit-table>
                    </v-tab-item>
                    <v-tab-item>
                        <vue-json-editor :show-btns="false"
                                         :modes="modes"
                                         :value="responseArg.body">
                        </vue-json-editor>
                    </v-tab-item>
                </v-tabs>
            </v-flex>
            <v-flex sm12>
                <h3 style="text-align: left">验证结果</h3>
            </v-flex>
            <v-flex xs12>
                <v-data-table
                        :items="valid.results"
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
    </v-container>
</template>

<script>
  import breadcrumb from '@/components/breadcrumb'
  import lineEditTable from '@/components/lineEditTable'
  import vueJsonEditor from 'vue-json-editor'
  import aceEditor from '@/components/aceEditor'

  import 'brace/mode/javascript'
  import 'brace/theme/chrome'

  export default {
    name: 'httpCallForm',
    components: {
      aceEditor,
      vueJsonEditor,
      lineEditTable,
      breadcrumb
    },
    data: () => ({
      breads: [{text: '项目管理', href: ''}, {text: '接口查询', href: ''}],
      modes: ['code', 'tree', 'text', 'view'],
      validHeaders: [
        {text: '规则说明', sortable: false, value: 'rule'},
        {text: '验证结果', sortable: false, value: 'msg'},
        {text: '状态', sortable: false, value: 'ok'}],
      basicItems: [],
      requestArg: {},
      responseArg: {},
      schemeReq: {},
      schemeResp: {},
      valid: {}
    }),
    created () {
      let primary = this.$api.path.primary('')
      this.basicItems = [
        {name: '服务说明', value: primary.basic.service.description},
        {name: '请求方法', value: primary.basic.method},
        {name: '请求地址', value: primary.basic.path}
      ]

      this.breads.push({text: primary.basic.service.serviceName})
      this.breads.push({strong: primary.basic.description})

      let pathArgs = []
      let headerArgs = []
      let queryArgs = []

      primary.parameters.forEach(function (p) {
        let arg = {key: p.name, value: '', description: p.description}
        if (p.in === 'query') {
          pathArgs.push(arg)
        } else if (p.in === 'header') {
          headerArgs.push(arg)
        } else if (p.in === 'path') {
          queryArgs.push(arg)
        }
      })

      this.requestArg = {
        paths: pathArgs,
        headers: headerArgs,
        querys: queryArgs,
        body: JSON.parse(primary.scheme.req)
      }
      this.responseArg = {headers: [], body: JSON.parse(primary.scheme.resp)}
      this.valid = {
        type: primary.valid.scriptType,
        script: primary.valid.script,
        results: primary.valid.results
      }
    }
  }
</script>

<style scoped>

</style>
