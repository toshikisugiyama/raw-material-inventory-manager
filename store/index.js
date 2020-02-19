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
  inventories: [],
  materials: []
})

export const getters = {
  getUser: state => state.user,
  getPages: state => state.pages,
  getInventories: state => state.inventories,
  getMaterials: state => state.materials
}

export const mutations = {
  setUser (state, payload) {
    state.user = payload
  },
  setInventories (state, payload) {
    state.inventories.push(payload)
  },
  setMaterials (state, payload) {
    state.materials = payload
  },
  addMaterials (state, payload) {
    state.materials.push(payload)
  }
}

export const actions = {
  setUser ({ commit }, payload) {
    commit('setUser', payload)
  },
  setInventories ({ commit }, payload) {
    commit('setInventories', payload)
  },
  setMaterials ({ commit }, payload) {
    commit('setMaterials', payload)
  },
  addMaterials ({ commit }, payload) {
    commit('addMaterials', payload)
  }
}
