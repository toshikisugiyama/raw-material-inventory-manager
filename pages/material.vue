<template>
  <v-form>
    <v-row>
      <v-col
        v-for="item in items"
        :key="item.label"
        :cols="item.col"
      >
        <v-text-field
          :label="item.label"
          :type="item.type"
        />
      </v-col>
      <v-col>
        <v-btn depressed large>
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
          label: '品名',
          type: 'text',
          col: 12
        },
        {
          label: '製造者もしくは仕入先',
          type: 'text',
          col: 12
        },
        {
          label: '社内コード',
          type: 'text',
          col: 12
        },
        {
          label: '製造番号',
          type: 'text',
          col: 4
        },
        {
          label: '在庫',
          type: 'text',
          col: 4
        },
        {
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
