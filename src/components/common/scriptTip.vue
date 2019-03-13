<template>
    <v-expansion-panel>
        <v-expansion-panel-content>
            <template slot="header">
                <div>标准函数</div>
            </template>
            <v-card>
                <v-card-text>
                    <v-chip>function init()</v-chip>
                    <v-divider></v-divider>
                    <v-chip>function testing(code,header,body)</v-chip>
                </v-card-text>
            </v-card>
        </v-expansion-panel-content>
        <v-expansion-panel-content>
            <template slot="header">
                <div>参数工具方法</div>
            </template>
            <v-card>
                <v-card-text>
                    请求路径设置
                    <br/>
                    <v-chip>$getUri(?)</v-chip>
                    <v-chip>$setUri(?,?)</v-chip>
                    <v-divider></v-divider>
                    请求头设置
                    <br/>
                    <v-chip>$getHeader(?)</v-chip>
                    <v-chip>$setHeader(?,?)</v-chip>
                    <br/>
                    <v-divider></v-divider>
                    请求参数
                    <br/>
                    <v-chip>$getQuery(?)</v-chip>
                    <v-chip>$setQuery(?,?)</v-chip>
                </v-card-text>
            </v-card>
        </v-expansion-panel-content>
        <v-expansion-panel-content>
            <template slot="header">
                <div>验证结果</div>
            </template>
            <v-card>
                <v-card-text>
                    <v-chip>$appendResult(rule,msg,ok)</v-chip>
                </v-card-text>
            </v-card>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script>
  export default {
    name: 'scriptTip'
  }
</script>

<style scoped>

</style>
