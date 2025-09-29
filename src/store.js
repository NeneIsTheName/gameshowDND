import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

const store = createStore({
    state() {
        return {
            players: []
        }
    },

    mutations: {
        addPlayer(state, players){
            state.players = []
            
            players.forEach(player => {
                    if(player !== ""){
                        state.players.push({
                        id: state.players.length + 1,
                        name: player.trim(),
                        gold: 5,
                        playing: true
                    })
                }
            });
        }
    },

    plugins: [
        createPersistedState({
            paths: ['players']
        })
    ]
})

export default store