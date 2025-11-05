<template>
<header_file title="Shield The Deal"/>

<main class="main">
    <section class="big-card">
        <div class="rooms-list">
            <div v-for="(player, index) in this.players" class="room" :id="`player${player.id}`" :style="{width: `${100/this.players.length}%`}">
                <div class="room__title">
                    <p class="room__title--text">{{ player.name }}</p>
                    <p class="room__title--text">tokens: <span :id="`tokens${player.id}`">3</span></p>
                </div>
                <div class="room__choice">
                    <button class="room__choice--shield" @click="shield(player.id)">Shield</button>
                    <button class="room__choice--steal" @click="stealer=player.id">Steal</button>
                </div>
            </div>
        </div>

        <div class="shieldTheDeal">
            <div v-if="stealer" class="players-list">
                <div v-for="player in players" class="players-list__choose">
                    <p v-if="player.id != stealer" @click="linkSteal(player.id)" class="players-list__choose--player">{{ player.name }}</p>
                </div>
            </div>
            <div class="start">
                <div class="start__round">
                    <button class="start__round--button" @click="start_round()">Start Round</button>
                </div>
            </div>
        </div>

        <div class="reward">
            <div class="reward__gold">
                <p class="reward__gold--text">Gold:</p>
                <span contenteditable="true" @input="earnedGold = Number($event.target.innerText)" class="reward__gold--input" id="earnedGold">10</span>
            </div>
        </div>
    </section>
</main>

<footer_file text="Next Game" link="roomOrBear"/>
</template>

<script>
import header_file from '../components/header.vue';
import footer_file from '../components/footer.vue';

export default{
    name: "liarsDice",
    components: {
        header_file,
        footer_file,
    },
    computed: {
        players() {
            return this.$store.state.players
        }
    },
    data(){
        return {
            earnedGold: 10,
            stealer: 0,
            steals: [],
        }
    },
    methods: {
        shield(id){
            document.getElementById(`player${id}`).classList.add('shield')
            document.getElementById(`tokens${id}`).innerText = Number(document.getElementById(`tokens${id}`).innerText)-1
        },
        linkSteal(stolen_from){
            if(!this.steals.filter(steal => steal.stealer === this.stealer).length){
                this.steals.push({stealer: this.stealer, stolen_from: stolen_from})
                document.getElementById(`player${this.stealer}`).classList.add('lost')
                document.getElementById(`tokens${this.stealer}`).innerText = Number(document.getElementById(`tokens${this.stealer}`).innerText)-1
            }
            this.stealer = 0
        },
        start_round(){
            this.players.forEach(player => {
                const check = this.steals.filter(steal_filter => steal_filter.stolen_from === player.id).length
                console.log(check)
                if(document.getElementById(`player${player.id}`).classList.contains("shield") || !check){
                    this.$store.commit('addGold', {id: player.id, earnedGold: this.earnedGold})
                }
            })

            this.steals.forEach(steal => {
                if(!document.getElementById(`player${steal.stolen_from}`).classList.contains("shield")){
                    //Checks if stealer has bin stolen from.
                    const check_stealer = this.steals.filter(steal_filter => steal_filter.stolen_from === steal.stealer).length

                    console.log(check_stealer)
                    let gold = 0
                    if(!check_stealer){
                        gold = Math.ceil(this.earnedGold+this.earnedGold/this.steals.filter(steal_filter => steal_filter.stolen_from === steal.stolen_from).length)
                        console.log("Not stolen from Stealer: "+gold)
                    }
                    else{
                        gold = Math.ceil(this.earnedGold/this.steals.filter(steal_filter => steal_filter.stolen_from === steal.stolen_from).length)
                        console.log("Stolen from Stealer: "+gold)
                    }
                    this.$store.commit('addGold', {id: steal.stealer, earnedGold: gold})
                }
            })

            this.players.forEach(player => {
                document.getElementById(`player${player.id}`).classList.remove('shield')
                document.getElementById(`player${player.id}`).classList.remove('lost')
            })
            this.stealer = 0
            this.steals = []
        }
    }
}
</script>