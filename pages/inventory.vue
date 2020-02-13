<template>
  <v-form>
    <v-row>
      <v-col v-for="item in items" :key="item.label" cols="12">
        <v-text-field
          v-model="item.value"
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
          value: '',
          label: '社内コード',
          type: 'text'
        },
        {
          value: '',
          label: '品名',
          type: 'text'
        },
        {
          value: '',
          label: '製造者もしくは仕入先',
          type: 'text'
        },
        {
          value: '',
          label: '仕入量',
          type: 'text'
        },
        {
          value: '',
          label: '使用期限',
          type: 'text'
        },
        {
          value: '',
          label: '備考',
          type: 'text'
        }
      ]
    }
  }
  // middleware: 'authenticated'
}
</script>
