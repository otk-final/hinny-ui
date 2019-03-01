/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import Vue from 'vue'
import Router from 'vue-router'

import pathPanel from '@/components/service/pathPanel'
import servicePanel from '@/components/service/servicePanel'
import spacePanel from '@/components/workspace/spacePanel'
import httpExecute from '@/components/service/httpExecute'

Vue.use(Router)
export default new Router({
  routes: [{
    path: '/service/action/list',
    name: 'servicePanel',
    components: {default: servicePanel}
  }, {
    path: '/project/path/list',
    name: 'pathPanel',
    components: {default: pathPanel}
  }, {
    path: '/workspace/action/list',
    name: 'spacePanel',
    components: {default: spacePanel}
  }, {
    path: '/testcase/http',
    name: 'httpExecute',
    components: {default: httpExecute}
  }]
})
