<template>
<header_file title="Steal Or Deal"/>

<main class="main">
    <section class="stealOrDeal">
        <div class="game">
            <div class="game__text">
                <p class="game__text--title">Trust Game:</p>
            </div>
            <div class="game__vs" v-for="(pair, index) in pairs" :id="`trust${index}`">
                <div>
                    <p class="game__vs--player">{{ pair[0].name }} <span v-if="showGold">| Gold: {{ pair[0].gold }}</span></p>
                    <button class="game__vs--deal" @click.once="pair[0].deal = true">Deal</button>
                    <button class="game__vs--steal" @click.once="pair[0].deal = false">Steal</button>
                </div>
                <div>
                    <p class="game__vs--player">{{ pair[1].name }} <span v-if="showGold">| Gold: {{ pair[1].gold }}</span></p>
                    <button class="game__vs--deal" @click.once="pair[1].deal = true">Deal</button>
                    <button class="game__vs--steal" @click.once="pair[1].deal = false">Steal</button>
                </div>
            </div>
            <div class="game__start">
                <button class="game__start--play" @click.once="trust_game()">Play</button>
            </div>
        </div>
        <div class="special" v-if="special_player">
            <div class="special__text">
                <p class="special__text--title">Special Game:</p>
            </div>
            <div class="special__game" id="specialGame">
                <p class="special__game--player">
                    {{ special_player.name }}
                    <span v-if="showGold">| Gold: {{ special_player.gold }}</span>
                </p>
            </div>
            <div class="special__start">
                <button class="special__start--play" @click.once="special_game(special_player)">Play</button>
            </div>
        </div>
        <div class="reveal">
            <div class="reveal__gold">
                <button class="reveal__gold--button" @click.once="showGold=true">Reveal</button>
            </div>
        </div>
    </section>
</main>

<footer_file text="End" link="#"/>
</template>

<script>
import header_file from '../components/header.vue'
import footer_file from '../components/footer.vue'

export default{
    name: "competitors",

    components: {
        header_file,
        footer_file,
    },
    data(){
        return {
            showGold: false,
            pairs: [],
            special_player: false
        }
    },
    computed: {
        players(){
            return this.$store.state.players
        },
    },
    mounted(){
        // Shuffle players so it will be random who is playing against who.
        const shuffled_players = this.players.map(player => ({player, sort: Math.random()}))
                                             .sort((player, place) => player.sort - place.sort)
                                             .map(({ player }) => player)

        //If shuffled_players is uneven the player with the smallest ammount of gold in the array will be the special_game.
        if(shuffled_players.length % 2 !== 0){
            const lowestGold = Math.min(...shuffled_players.map(player => player.gold))
            const players = shuffled_players.filter(player => player.gold === lowestGold)
            const player_choosen = players[Math.floor(Math.random() * players.length)]
            const player_index = shuffled_players.findIndex(player => player.id === player_choosen.id)
            shuffled_players.splice(player_index, 1);
            this.special_player = player_choosen
        }

        // Create pairs of the shuffled_players.
        for(let i=0; i<shuffled_players.length-1; i+=2){
            this.pairs.push(shuffled_players.slice(i, i+2))
        }
    },
    methods: {
        trust_game(){
            this.pairs.forEach((pair, pair_index) => {
                if(pair[0].deal && pair[1].deal){
                    document.getElementById(`trust${pair_index}`).classList.add("trust")
                }
                else if(!pair[0].deal && !pair[1].deal){
                    pair.forEach(player => {
                        this.$store.commit('removeGold', {id: player.id, removeGold: player.gold})
                    })
                    document.getElementById(`trust${pair_index}`).classList.add("untrust")
                }
                else{
                    pair.forEach(player => {
                        if(player.deal){
                            this.$store.commit('removeGold', {id: player.id, removeGold: player.gold})
                        }
                        else{
                            this.$store.commit('addGold', {id: player.id, earnedGold: player.gold})
                        }
                    })
                    document.getElementById(`trust${pair_index}`).classList.add("untrust")
                }
            })
        },
        special_game(player){
            const win = Math.random() < 0.5
            document.getElementById("specialGame").classList.remove("win", "lost")
            if(win){
                this.$store.commit('addGold', {id: player.id, earnedGold: player.gold})
                document.getElementById("specialGame").classList.add("win")
            }
            else{
                this.$store.commit('removeGold', {id: player.id, removeGold: player.gold})
                document.getElementById("specialGame").classList.add("lost")
            }
        }
    },
}
</script>

