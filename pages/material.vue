<template>
  <v-form>
    <v-row>
      <v-col
        v-for="item in items"
        :key="item.label"
        :cols="item.col"
      >
        <v-text-field
          v-model="item.value"
          :label="item.label"
          :type="item.type"
        />
      </v-col>
      <v-col>
        <v-btn
          depressed
          large
        >
          決定
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          value: '',
          label: '品名',
          type: 'text',
          col: 12
        },
        {
          value: '',
          label: '製造者もしくは仕入先',
          type: 'text',
          col: 12
        },
        {
          value: '',
          label: '社内コード',
          type: 'text',
          col: 12
        },
        {
          value: '',
          label: '製造番号',
          type: 'text',
          col: 4
        },
        {
          value: '',
          label: '在庫',
          type: 'text',
          col: 4
        },
        {
          value: '',
          label: '単位',
          type: 'text',
          col: 4
        }
      ]
    }
  }
  // middleware: 'authenticated'
}
</script>
