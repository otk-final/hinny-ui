<template>
    <v-data-table
            v-model="selected"
            :headers="headers"
            :items="items"
            item-key="key"
            hide-actions
            select-all
            class="elevation-1"
    >
        <template slot="items" slot-scope="props">
            <td style="width: 10%">
                <v-checkbox
                        v-model="props.selected"
                        primary
                        hide-details
                ></v-checkbox>
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
      items: Array
    },
    data () {
      return {
        selected: [],
        headers: [{
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
    }
  }
</script>

<style scoped>

</style>
