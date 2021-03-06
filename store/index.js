export const strict = false
export const state = () => ({
  user: null,
  pages: [
    {
      name: '原材料一覧',
      path: '/',
      menu: true
    },
    {
      name: '原材料受入',
      path: '/inventory',
      menu: true
    },
    {
      name: '原材料登録',
      path: '/material',
      menu: true
    },
    {
      name: 'ログイン',
      path: '/login',
      menu: false
    }
  ],
  materialCode: '',
  inventories: [],
  materials: []
})

export const getters = {
  getUser: state => state.user,
  getPages: state => state.pages,
  getInventories: state => state.inventories,
  getMaterials: state => state.materials,
  getMaterialCode: state => state.materialCode
}

export const mutations = {
  setUser (state, payload) {
    state.user = payload
  },
  setInventories (state, payload) {
    state.inventories = payload
  },
  addInventories (state, payload) {
    state.inventories.push(payload)
  },
  setMaterials (state, payload) {
    state.materials = payload
  },
  setMaterialCode (state, payload) {
    state.materialCode = payload
  }
}

export const actions = {
  setUser ({ commit }, payload) {
    commit('setUser', payload)
  },
  setInventories ({ commit }, payload) {
    commit('setInventories', payload)
  },
  addInventories ({ commit }, payload) {
    commit('addInventories', payload)
  },
  setMaterials ({ commit }, payload) {
    commit('setMaterials', payload)
  },
  setMaterialCode ({ commit }, payload) {
    commit('setMaterialCode', payload)
  },
  resetMaterialCode ({ commit }) {
    commit('setMaterialCode', '')
  }
}
