import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const drawerMenu = [
  {title: '搜索', path: '/search', icon: 'search'},
  {title: '工作空间', path: '/workspace/action/list', icon: 'apps', badge: 'feature'},
  {
    title: '项目管理',
    icon: 'code',
    group: '/project',
    items: [
      {title: '服务列表', path: '/service/action/list'},
      {title: '接口查询', path: '/path/action/list', badge: 'new'}
    ]
  },
  {
    title: '案例计划',
    icon: 'edit',
    path: '/case',
    items: [
      {title: '执行记录', path: '/case/action/log-list'},
      {title: '案例编排', path: '/case/action/group-list', badge: 'new'}
    ]
  },
  {title: '测试报告', path: '/mock', icon: 'build', badge: 'feature'}
]

const store = new Vuex.Store({
  state: {
    appTitle: 'Hinny OPS',
    drawerMenu: drawerMenu,
    currentWorkspace: null
  },
  mutations: {
    getDrawerMenu () {
      return this.state.drawerMenu
    },
    setWorkspace (state, space) {
      state.currentWorkspace = space
    }
  }
})

export default store
