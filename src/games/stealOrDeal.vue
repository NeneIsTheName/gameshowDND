<template>
<header_file title="Steal Or Deal"/>

<main class="main">
    <section class="stealOrDeal">
        <div class="game">
            <div class="game__text">
                <p class="game__text--title">Trust Game:</p>
            </div>
            <div class="game__vs" v-for="(pair, index) in pairedPlayers.pairs" :id="`trust${index}`">
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
        <div class="special" v-if="pairedPlayers.special_game">
            <div class="special__text">
                <p class="special__text--title">Special Game:</p>
            </div>
            <div class="special__game" id="specialGame">
                <p class="special__game--player">
                    {{ pairedPlayers.special_game.name }}
                    <span v-if="showGold">| Gold: {{ pairedPlayers.special_game.gold }}</span>
                </p>
            </div>
            <div class="special__start">
                <button class="special__start--play" @click.once="special_game(pairedPlayers.special_game.id)">Play</button>
            </div>
        </div>
        <div class="reveal">
            <div class="reveal__gold">
                <button class="reveal__gold--button" @click.once="showGold=true">Reveal</button>
            </div>
        </div>
    </section>
</main>

<footer_file link="thanksForPlaying"/>
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
        }
    },
    computed: {
        players(){
            return this.$store.state.players
        },
        pairedPlayers(){
            // Shuffle players so it will be random who is playing against who.
            const shuffled_players = this.players.map(player => ({player, sort: Math.random()}))
                                         .sort((player, place) => player.sort - place.sort)
                                         .map(({ player }) => player)

            //If shuffled_players is uneven the player with the smallest ammount of gold in the array will be the special_game.
            let special_game = false
            if(shuffled_players.length % 2 !== 0){
                const lowestGold = Math.min(...shuffled_players.map(player => player.gold))
                const players = shuffled_players.filter(player => player.gold === lowestGold)
                const player_choosen = players[Math.floor(Math.random() * players.length)]
                const player_index = shuffled_players.findIndex(player => player.id === player_choosen.id)
                shuffled_players.splice(player_index, 1);
                special_game = player_choosen
            }

            // Create pairs of the shuffled_players.
            let pairs = []
            for(let i=0; i<shuffled_players.length-1; i+=2){
                pairs.push(shuffled_players.slice(i, i+2))
            }

            return {pairs, special_game}
        }
    },
    methods: {
        trust_game(){
            this.pairedPlayers.pairs.forEach((pair, index) => {
                if(pair[0].deal && pair[1].deal){
                    document.getElementById(`trust${index}`).classList.add("trust")
                }
                else{
                    document.getElementById(`trust${index}`).classList.add("untrust")
                }
            });
        },
        special_game(id){
            const check = Math.random() < 0.5
            document.getElementById("specialGame").classList.remove("win", "lost")
            if(check){
                document.getElementById("specialGame").classList.add("win")
            }
            else{
                document.getElementById("specialGame").classList.add("lost")
            }
        }
    },
}
</script>

