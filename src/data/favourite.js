import Vue from 'vue'
import firebase from 'firebase/app'

export default {
  state: {
    favouritesInitialized: false,
    favourites: {}
  },

  getters: {
    favouritesInitialized: (state) => state.favouritesInitialized,

    favourites: (state) => state.favourites
  },

  mutations: {
    initializeFavourites (state) {
      state.favouritesInitialized = true
    },

    setFavourites (state, favourites) {
      state.favourites = favourites
    },

    setFavourite (state, eventId) {
      Vue.set(state.favourites, eventId, true)
    },

    unsetFavourite (state, eventId) {
      Vue.delete(state.favourites, eventId)
    }
  },

  actions: {
    initFavourites ({commit, dispatch}) {
      const favourites = {}

      return dispatch('getUserRef')
        .then(userRef => userRef.get())
        .then(user => {
          if (user.data().favourites) {
            user.data().favourites.forEach(favourite => {
              favourites[favourite] = true
            })
          }
        })
        .then(() => commit('setFavourites', favourites))
        .then(() => commit('initializeFavourites'))
    },

    setFavourite ({commit, dispatch}, eventId) {
      commit('setFavourite', eventId)
      dispatch('warnAboutLosingData')
      return dispatch('getUserRef')
        .then(user => user.update({favourites: firebase.firestore.FieldValue.arrayUnion(Number(eventId))}))
    },

    unsetFavourite ({commit, dispatch}, eventId) {
      commit('unsetFavourite', eventId)
      dispatch('warnAboutLosingData')
      return dispatch('getUserRef')
        .then(user => user.update({favourites: firebase.firestore.FieldValue.arrayRemove(Number(eventId))}))
    },

    toggleFavourite ({commit, state, dispatch}, eventId) {
      if (state.favourites[eventId]) {
        return dispatch('unsetFavourite', eventId)
      } else {
        return dispatch('setFavourite', eventId)
      }
    }
  }
}
