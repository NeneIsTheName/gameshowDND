<template>
<header_file title="Steal Or Deal"/>

<main class="main">
    <section class="stealOrDeal">
        <div class="game">
            <div class="game__vs" v-for="pair in pairedPlayers.pairs">
                <p class="game__vs--player">{{ pair[0].name }} <span v-if="showGold">| Gold: {{ pair[0].gold }}</span></p>
                <p class="game__vs--player">{{ pair[1].name }} <span v-if="showGold">| Gold: {{ pair[1].gold }}</span></p>
            </div>
            <div class="game__special" v-if="pairedPlayers.special_player">
                <p class="game__special--title">Special Game:</p>
                <p class="game__special--player">
                    {{ pairedPlayers.special_player.name }}
                    <span v-if="showGold">| Gold: {{ pairedPlayers.special_player.gold }}</span>
                </p>
            </div>
            <div class="game__reveal">
                <button class="game__reveal--gold" @click="showGold=true">Reveal Gold</button>
            </div>
        </div>
    </section>
</main>
</template>

<script>
import header_file from '../components/header.vue';

export default{
    name: "competitors",

    components: {
        header_file,
    },
    data(){
        return {
            shuffled_players: [],
            showGold: false,
        }
    },
    computed: {
        players(){
            return this.$store.state.players
        },
        pairedPlayers(){
            // Shuffle players so it will be random who is playing against who.
            this.shuffled_players = this.players.map(player => ({player, sort: Math.random()}))
                                        .sort((player, place) => player.sort - place.sort)
                                        .map(({ player }) => player)

            // Create pairs of the shuffled_players.
            let pairs = []
            for(let i=0; i<this.shuffled_players.length-1; i+=2){
                pairs.push(this.shuffled_players.slice(i, i+2))
            }

            //If shuffled_players is uneven the last player in the array will be the special_player
            let special_player = false
            if(this.shuffled_players.length % 2 !== 0){
                special_player = this.shuffled_players[this.shuffled_players.length-1]
            }
            return {pairs, special_player}
        }
    },
    mounted(){

    },
    methods: {

    },
}
</script>

