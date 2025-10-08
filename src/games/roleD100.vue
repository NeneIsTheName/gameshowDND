<template>
    <div class="container">
        <section class="header-roleD100">
            <div class="header-roleD100__title">
                <p class="header-roleD100__title--text">Role D100</p>
            </div>
        </section>
        <div class="players-roleD100">
            <section v-for="player in this.players" class="role-card" :id="`roleCard${player.id}`">
                <div class="player-details">
                    <div class="player-details__name">
                        <p class="player-details__name--text">{{ player.name }}, {{ player.gold }}</p>
                    </div>
                    <div class="player-details__number">
                        <p class="player-details__number--text" :id="`randomNumber${player.id}`">0</p>
                    </div>
                    <div class="player-details__check">
                        <button class="player-details__check--keep" @click.once="keepGold(player.id)">Keep Gold</button>
                        <button class="player-details__check--lost" @click.once="lostGame(player.id)">Lost Game</button>
                    </div>
                </div>
            </section>
        </div>
        <section class="">

        </section>
        <section class="generator-card">
            <div class="reward">
                <div class="reward__gold">
                    <p class="reward__gold--text">Gold: {{ earnedGold }}</p>
                </div>
            </div>
            <div class="between">
                <div class="between__number">
                    <input v-model="between.min" class="between__number--input" type="text">
                </div>
                <div class="between__number">
                    <p class="between__number--text">and</p>
                </div>
                <div class="between__number">
                    <input v-model="between.max" class="between__number--input" type="text">
                </div>
            </div>
            <div class="generate">
                <div class="generate__random-number">
                    <button @click="generateNumber()" class="generate__random-number--button">Generate Random Number</button>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default{
    name: "roleD100",
    data(){
        return {
            between: { min: 0, max: 0 },
            earnedGold: 0,
        }
    },
    computed: {
        players() {
            return this.$store.state.players
        }
    },
    methods: {
        generateNumber(){
            if(!isNaN(this.between.min) && !isNaN(this.between.max)){
                this.players.forEach((player) => {
                    document.getElementById(`randomNumber${player.id}`).innerText = Math.floor(Math.random() * (this.between.max - this.between.min + 1)) + Number(this.between.min)
                });
                this.earnedGold += (this.between.min < 50) ? 5 : 10
            }
            else{
                alert("Please enter a valid number")
            }
        },
        keepGold(playerID){
            console.log(this.players)
            this.$store.commit('addGold', {id: playerID, earnedGold: this.earnedGold})
            document.getElementById(`roleCard${playerID}`).classList.add("keep")
        },
        lostGame(playerID){
            document.getElementById(`roleCard${playerID}`).classList.add("lost")
        }
    }
}
</script>
