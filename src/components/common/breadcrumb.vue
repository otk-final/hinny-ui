<!--
  - Licensed to the Apache Software Foundation (ASF) under one or more
  - contributor license agreements.  See the NOTICE file distributed with
  - this work for additional information regarding copyright ownership.
  - The ASF licenses this file to You under the Apache License, Version 2.0
  - (the "License"); you may not use this file except in compliance with
  - the License.  You may obtain a copy of the License at
  -
  -     http://www.apache.org/licenses/LICENSE-2.0
  -
  - Unless required by applicable law or agreed to in writing, software
  - distributed under the License is distributed on an "AS IS" BASIS,
  - WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  - See the License for the specific language governing permissions and
  - limitations under the License.
  -->

<template>
    <div style="text-align: left">
        <h2>{{title}}</h2>
        <v-breadcrumbs :items="items">
            <template slot="item" slot-scope="props">
                <span v-if="!props.item.strong">{{props.item.text}}</span>
                <strong v-if="props.item.strong">
                    {{props.item.text}}
                    <span class="green--text">{{props.item.strong}}</span>
                </strong>
            </template>
        </v-breadcrumbs>
    </div>
</template>

<script>
  export default {
    name: 'breadcrumb',
    props: {
      title: {
        type: String,
        default: ''
      },
      items: {
        type: Array
      }
    },
    data: () => ({})
  }
</script>

<style scoped>

</style>
