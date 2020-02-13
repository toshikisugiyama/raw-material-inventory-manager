<template>
  <v-form>
    <v-row>
      <v-col v-for="item in items" :key="item.label" cols="12">
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
          label: '社内コード',
          type: 'text'
        },
        {
          label: '品名',
          type: 'text'
        },
        {
          label: '製造者もしくは仕入先',
          type: 'text'
        },
        {
          label: '仕入量',
          type: 'text'
        },
        {
          label: '使用期限',
          type: 'text'
        },
        {
          label: '備考',
          type: 'text'
        }
      ]
    }
  }
  // middleware: 'authenticated'
}
</script>
