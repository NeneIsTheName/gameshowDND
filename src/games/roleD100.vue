<template>
    <div class="container">
        <section class="header-roleD100">
            <div class="header-roleD100__title">
                <p class="header-roleD100__title--text">Role D100</p>
            </div>
        </section>
        <div class="players-roleD100">
            <section v-for="player, index in this.players" class="role-card">
                <div class="player-details">
                    <div class="player-details__name">
                        <p class="player-details__name--text">{{ player.name }}</p>
                        <p>{{ playerGold[player.id] }}</p>
                    </div>
                    <div class="player-details__number">
                        <p class="player-details__number--text" :id="`randomNumber${player.id}`">0</p>
                    </div>
                    <div class="player-details__check">
                        <button class="player-details__check--keep" @click="keepGold(player.id)">Keep Gold</button>
                        <button class="player-details__check--lost" @click="lostGame(player.id)">Lost Game</button>
                    </div>
                </div>
            </section>
        </div>
        <section class="">

        </section>
        <section class="generator-card">
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
            playerGold: []
        }
    },
    computed: {
        players() {
            return this.$store.state.players
        }
    },
    mounted(){
        this.players.forEach((player, index) => {
            this.playerGold[player.id] = 0
        });
        console.log(this.playerGold)
    },
    methods: {
        generateNumber(){
            if(!isNaN(this.between.min) && !isNaN(this.between.max)){
                this.players.forEach((player, index) => {
                    document.getElementById(`randomNumber${index}`).innerText = Math.floor(Math.random() * (this.between.max - this.between.min + 1)) + Number(this.between.min)
                });
            }
            else{
                alert("Please enter a valid number")
            }
        },
        keepGold(playerID){
            this.$store.commit('addPlayerGold', playerID)
        }
    }
}
</script>
