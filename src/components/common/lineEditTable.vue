<template>
    <v-data-table
            v-model="table"
            :headers="headers"
            :items="items"
            item-key="name"
            hide-actions
            class="elevation-1"
    >
        <template slot="items" slot-scope="props">
            <td style="width: 10%">
                <v-checkbox
                        v-model="selected"
                        primary
                        hide-details
                        v-on:change="change"
                        :value="props.item.name"
                >
                </v-checkbox>
            </td>
            <td>
                <v-edit-dialog
                        :return-value="props.item.name"
                        lazy
                > {{ props.item.name }}
                    <v-text-field
                            slot="input"
                            v-model="props.item.name"
                            label="name"
                            single-line
                    ></v-text-field>
                </v-edit-dialog>
            </td>

            <td style="width: 50%">
                <v-edit-dialog
                        :return-value="props.item.value"
                        lazy
                >{{ props.item.value }}
                    <v-text-field
                            slot="input"
                            v-model="props.item.value"
                            label="value"
                            single-line
                    ></v-text-field>
                </v-edit-dialog>
            </td>

            <td style="text-align: left">{{props.item.description}}</td>
        </template>
    </v-data-table>
</template>

<script>
  export default {
    name: 'lineEditTable',
    props: {
      items: Array,
      table: Array
    },
    data () {
      return {
        selected: [],
        headers: [{}, {
          text: '键',
          sortable: false,
          value: 'name'
        }, {
          text: '值',
          sortable: false,
          value: 'value'
        }, {
          text: '备注',
          sortable: false,
          value: 'description'
        }]
      }
    },
    created () {
      let requiredArray = []
      let me = this
      me.items.forEach(function (item) {
        if (item.required) requiredArray.push(item.name)
      })
      this.selected = requiredArray
    },
    computed: {},
    methods: {
      getValues: function () {
        let me = this
        return me.items.filter(function (item) {
          return me.selected.indexOf(item.name) !== -1
        })
      },
      change: function (selected) {
        this.selected = selected
      }
    }
  }
</script>

<style scoped>

</style>
