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
                        v-if="props.item.type !== 'array' && props.item.enum === undefined"
                >{{ props.item.value }}
                    <v-text-field
                            slot="input"
                            v-model="props.item.value"
                            label="value"
                            single-line
                    ></v-text-field>
                </v-edit-dialog>
                <v-combobox
                        v-if="props.item.type === 'array'"
                        v-model="props.item.value"
                        :items="props.item.enum"
                        multiple
                        chips
                ></v-combobox>
                <v-combobox
                        v-if="props.item.type !== 'array' && props.item.enum != null"
                        v-model="props.item.value"
                        :items="props.item.enum"
                ></v-combobox>

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
        headers: [{
          text: '',
          sortable: false,
          value: 'name'
        }, {
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
    },
    watch: {
      items: function (newVal, oldVal) {
        let requiredArray = []
        let me = this
        me.items.forEach(function (item) {
          if (item.required) requiredArray.push(item.name)
        })
        this.selected = requiredArray
      }
    },
    methods: {
      getValues: function () {
        let me = this
        let selectArray = []
        for (let i = 0; i < me.items.length; i++) {
          let item = me.items[i]
          if (me.selected.indexOf(item.name) === -1) {
            continue
          }
          let val = {type: item.type, name: item.name}
          if (item.type === 'array') {
            val.value = (item.value === undefined ? [] : item.value)
          } else {
            val.value = (item.value === undefined ? '' : item.value)
          }
          selectArray.push(val)
        }
        return selectArray
      }
    }
  }
</script>

<style scoped>

</style>
