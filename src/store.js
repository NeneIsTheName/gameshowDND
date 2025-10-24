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
                        gold: 0,
                        playing: true
                    })
                }
            });
        },
        startGold(state, playerInfo){
            const player = state.players.find(player => (player.id === playerInfo.id))
            player.gold = Number(playerInfo.startGold)
        },
        addGold(state, playerInfo){
            const player = state.players.find(player => (player.id === playerInfo.id))
            if(player.playing) player.gold += Number(playerInfo.earnedGold)
        }
    },

    plugins: [
        createPersistedState({
            paths: ['players']
        })
    ]
})

export default store