<template>
    <div class="container">
        <div class="players-roleD100">
            <section v-for="player in this.$store.state.players" class="role-card">
                <div class="player-details">
                    <div class="player-details__name">
                        <p class="player-details__name--text">{{ player.name }}</p>
                    </div>
                </div>
                <div class="player-details__number">
                    <p class="player-details__number--text" :id="`randomNumber${player.id}`">0</p>
                </div>
            </section>
        </div>
        <section class="generator-card">
            <div class="between">
                <div class="between__number">
                    <input v-model="between.min" class="between__number--input" type="text">
                </div>
                <div class="between__number">
                    <p class="between__number--text">and</p>
                </div>
                <div class="between__number">
                    <input class="between__number--input" type="text" v-model="between.max">
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
    name: "competitors",
    data(){
        return {
            between: { min: 0, max: 0 },
        }
    },
    methods: {
        generateNumber(){
            if(!isNaN(this.between.min) && !isNaN(this.between.max)){
                this.$store.state.players.forEach(player => {
                    document.getElementById(`randomNumber${player.id}`).innerText = Math.floor(Math.random() * (this.between.max - this.between.min + 1)) + Number(this.between.min)
                });
            }
            else{
                alert("Please enter a valid number")
            }
        }
    }
}
</script>
