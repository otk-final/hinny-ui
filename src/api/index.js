import axios from 'axios'

const http = axios.create()

http.defaults.baseURL = 'http://api.com'
http.defaults.timeout = 5000
// api.defaults.headers.post[''] = ''

const api = {
  workspace: {
    list: function () {
      return [{
        spaceName: '黄祥云Dev',
        spaceKey: 'huangxy-dev',
        apiGateway: '192.168.30.61:18080'
      }, {
        spaceName: '开发环境',
        spaceKey: 'dev',
        apiGateway: 'http://api-dev.yryz.com/gateway/'
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
        serviceName: '失恋',
        serviceId: 'lovelorn',
        apiName: 'activity-info-controller',
        description: '活动管理服务',
        pathCount: 6
      }, {
        serviceName: '失恋',
        serviceId: 'lovelorn',
        apiName: 'behavior-controller',
        description: '失恋项目封装用户行为服务 点赞，评论，收藏',
        pathCount: 4
      }, {
        serviceName: '失恋',
        serviceId: 'lovelorn',
        apiName: 'comment-todo-controller',
        description: '运营待办-评论中心',
        pathCount: 2
      }]
    }
  },
  path: {
    list: function (type, typeValue) {
      return [{
        serviceName: '省会城市配置服务',
        method: 'post',
        apiName: '/{version}/pv/provincial-capital-configs',
        description: '活动管理服务',
        pathCount: 10
      }]
    },
    primary: function (pathIdentity) {
      return {
        base: {},
        parameters: [{
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
            type: 'string',
            enum: [
              'v1.1',
              'v1'
            ]
          }],
        schemeContent: {
          req: '',
          resp: '{\n' +
            '  "status": true,\n' +
            '  "code": "200",\n' +
            '  "msg": "success",\n' +
            '  "errorMsg": "success",\n' +
            '  "data": {\n' +
            '    "id": null,\n' +
            '    "kid": 304891458420736,\n' +
            '    "createDate": "2019-02-25 16:04:54",\n' +
            '    "lastUpdateDate": "2019-02-26 18:38:56",\n' +
            '    "createUserId": 239666530312192,\n' +
            '    "lastUpdateUserId": 239666530312192,\n' +
            '    "title": "活动标题111111",\n' +
            '    "coverUrl": "https://cdn-qa.yryz.com/lovelorn/image/default/201902/304891328552960.jpg?w=1024&h=768",\n' +
            '    "description": "大萨达打撒大厦大厦",\n' +
            '    "shelveFlag": 1,\n' +
            '    "onlineDate": null,\n' +
            '    "startDate": null,\n' +
            '    "endDate": null,\n' +
            '    "refType": "content",\n' +
            '    "refUrl": null,\n' +
            '    "refContent": null,\n' +
            '    "rcmdFlag": "0",\n' +
            '    "rcmdDate": null,\n' +
            '    "sort": 0,\n' +
            '    "delFlag": 0\n' +
            '  },\n' +
            '  "currentTime": 1551266660382\n' +
            '}'
        }
      }
    },
    submit: function (httpReq, script) {

    }
  }
}

export {api, http}
