import axios from 'axios'

const http = axios.create()

http.defaults.baseURL = 'http://api.com'
http.defaults.timeout = 5000
// api.defaults.headers.post[''] = ''

const api = {
  workspace: {
    list: function () {
      return [{
        name: '黄祥云Dev',
        key: 'huangxy-dev',
        host: '192.168.30.61:18080'
      }, {
        name: '开发环境',
        key: 'dev',
        host: 'http://api-dev.yryz.com/gateway/'
      }]
    },
    change: function (item) {
      return true
    },
    sync: function (item) {
      return null
    },
    delete: function (item) {
      return null
    },
    add: function (item) {
      return null
    }
  },

  service: {
    list: function () {
      return [{
        serviceName: 'activity-info-controller',
        description: '活动管理服务',
        pathCount: 6
      }, {
        serviceName: 'behavior-controller',
        description: '失恋项目封装用户行为服务 点赞，评论，收藏',
        pathCount: 4
      }, {
        serviceName: 'comment-todo-controller',
        description: '运营待办-评论中心',
        pathCount: 2
      }]
    }
  },
  path: {
    list: function (type, typeValue) {
      return [{
        service: {
          serviceName: 'comment-todo-controller',
          description: '运营待办-评论中心'
        },
        method: 'post',
        path: '/{version}/pv/provincial-capital-configs',
        description: '活动管理服务'
      }]
    },
    primary: function (pathIdentity) {
      return {
        identity: pathIdentity,
        basic: {
          service: {
            serviceName: 'comment-todo-controller',
            description: '运营待办-评论中心'
          },
          method: 'POST',
          path: '/{version}/pv/provincial-capital-configs',
          description: '活动管理服务'
        },
        parameters:
          [
            {
              name: 'spaceId',
              in: 'query',
              description: '空间ID',
              required: true,
              type: 'string'
            },
            {
              name: 'tenantId',
              in: 'header',
              description: '租户ID（全局请求头）',
              required: false,
              type: 'string'
            },
            {
              name: 'token',
              in: 'header',
              description: '用户登录TOKEN（全局请求头）',
              required: false,
              type: 'string'
            },
            {
              name: 'userId',
              in: 'header',
              description: 'userId',
              required: true,
              type: 'integer',
              format: 'int64'
            },
            {
              name: 'version',
              in: 'path',
              required: true,
              type: 'string'
            }
          ],
        scheme:
          {
            req: '{\n' +
              '  "coverUrl": "string",\n' +
              '  "createDate": "2019-02-28T05:38:36.911Z",\n' +
              '  "createUserId": 0,\n' +
              '  "delFlag": 0,\n' +
              '  "description": "string",\n' +
              '  "endDate": "2019-02-28T05:38:36.911Z",\n' +
              '  "kid": 0,\n' +
              '  "lastUpdateDate": "2019-02-28T05:38:36.911Z",\n' +
              '  "lastUpdateUserId": 0,\n' +
              '  "onlineDate": "2019-02-28T05:38:36.911Z",\n' +
              '  "rcmdDate": "2019-02-28T05:38:36.911Z",\n' +
              '  "rcmdFlag": "string",\n' +
              '  "refContent": "string",\n' +
              '  "refType": "string",\n' +
              '  "refUrl": "string",\n' +
              '  "shelveFlag": 0,\n' +
              '  "sort": 0,\n' +
              '  "startDate": "2019-02-28T05:38:36.911Z",\n' +
              '  "title": "string"\n' +
              '}',
            resp: '{\n' +
              '  "content": "string",\n' +
              '  "createDate": "2019-02-28T05:38:59.978Z",\n' +
              '  "createUserId": 0,\n' +
              '  "delFlag": 0,\n' +
              '  "exampleFlag": 0,\n' +
              '  "isLucky": 0,\n' +
              '  "isPrivate": 0,\n' +
              '  "kid": 0,\n' +
              '  "lastUpdateDate": "2019-02-28T05:38:59.978Z",\n' +
              '  "lastUpdateUserId": 0,\n' +
              '  "shelveFlag": 0,\n' +
              '  "tagId": 0,\n' +
              '  "tagName": "string"\n' +
              '}'
          },
        valid: {
          scriptType: 'javascript',
          script: '\n' +
            'function test (path, req, resp) {\n' +
            '  let errors = [];\n' +
            '  //TODO\n' +
            '  return errors\n' +
            '}',
          results: [
            {ok: true, rule: '响应码==400'},
            {ok: false, rule: '返回评论标识不能为空', msg: '返回值data为null'},
            {ok: false, msg: '图片路径中含有非法字符'}]
        }
      }
    },
    submit: function (httpReq, script) {

    }
  }
}

export {api, http}
