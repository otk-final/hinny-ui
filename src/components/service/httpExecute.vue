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
                        :items="basic"
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
                        <line-edit-table :items="reqHeaders"></line-edit-table>
                    </v-tab-item>
                    <v-tab-item>
                        <line-edit-table :items="reqPaths"></line-edit-table>
                    </v-tab-item>
                    <v-tab-item>
                        <line-edit-table :items="reqParameters"></line-edit-table>
                    </v-tab-item>
                    <v-tab-item>
                        <vue-json-editor :show-btns="false" :mode="code" :modes="modes"></vue-json-editor>
                    </v-tab-item>
                    <v-tab-item>
                        <ace-editor v-model="content" :lang="javascript" :readonly="false"></ace-editor>
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
                        <line-edit-table :items="reqHeaders"></line-edit-table>
                    </v-tab-item>
                    <v-tab-item>
                        <vue-json-editor :show-btns="false" :mode="code" :modes="modes"></vue-json-editor>
                    </v-tab-item>
                </v-tabs>
            </v-flex>
            <v-flex sm12>
                <h3 style="text-align: left">验证结果</h3>
            </v-flex>
            <v-flex xs12>
                <v-data-table
                        :items="validResults"
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
  import lineEditTable from '@/components/service/lineEditTable'
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
      breads: [{text: '项目管理', href: ''}, {text: '接口查询', href: ''}, {text: '添加活动', href: ''}],
      reqHeaders: [{key: 'token', value: 'fdsfd', description: '用户Token'}, {
        key: 'tenantId',
        value: 'lovelorn',
        description: '租户标识'
      }],
      reqPaths: [{key: 'version', value: 'v1', description: '版本号'}],
      reqParameters: [{key: 'pageNo', value: 1, description: ''}, {key: 'pageSize', value: 10, description: ''}],
      basic: [
        {name: '服务', value: 'lovelorn'},
        {name: '所属组', value: '运营待办-评论中心'},
        {name: '接口名称', value: '提交评论'},
        {name: '请求方法', value: 'POST'},
        {name: '请求地址', value: '/{version}/pv/todo-comment/action/list-admin'}],
      modes: ['code', 'tree', 'text', 'view'],
      content: '',

      validHeaders: [{
        text: '规则说明',
        sortable: false,
        value: 'rule'
      }, {
        text: '验证结果',
        sortable: false,
        value: 'msg'
      }, {
        text: '状态',
        sortable: false,
        value: 'ok'
      }],
      validResults: [{ok: true, rule: '响应码'}, {ok: false, rule: '评论标识不能为空', msg: '异常，，，'}, {ok: false, msg: 'daad'}]
    })
  }
</script>

<style scoped>

</style>
