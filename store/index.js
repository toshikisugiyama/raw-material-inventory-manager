export const strict = false
export const state = () => ({
  user: null,
  pages: [
    {
      name: '原材料一覧',
      path: '/'
    },
    {
      name: '原材料受入',
      path: '/inventory'
    },
    {
      name: '原材料登録',
      path: '/material'
    }
  ],
  inventories: [
    {
      id: 1,
      materialId: 1,
      lotCode: '11111111',
      dead: '2021年2月10日',
      stockAmount: '30',
      inventoryComment: '',
      status: 0,
      created_at: '2020年2月10日',
      updated_at: '2020年2月10日'
    },
    {
      id: 2,
      materialId: 1,
      lotCode: '22222222',
      dead: '2021年2月10日',
      stockAmount: '30',
      inventoryComment: '',
      status: 0,
      created_at: '2020年2月10日',
      updated_at: '2020年2月10日'
    }
  ],
  materials: [
    {
      id: 1,
      name: '砂糖',
      controlCode: '00000001',
      supplier: '株式会社A',
      total: '30',
      unit: 'kg',
      materialComment: '',
      created_at: '2020年2月10日',
      updated_at: '2020年2月10日'
    }
  ]
})

export const mutations = {
  setUser (state, payload) {
    state.user = payload
  }
}

export const actions = {
  setUser ({ commit }, payload) {
    commit('setUser', payload)
  }
}

export const getters = {
  getUser: state => state.user,
  getPages: state => state.pages,
  getInventories: state => state.inventories,
  getMaterials: state => state.materials
}
