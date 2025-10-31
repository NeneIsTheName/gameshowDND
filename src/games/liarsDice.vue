<template>
<header_file title="Liars Dice"/>

<main class="main">
    <section class="big-card">
        <div class="rooms-list">
            <div v-for="(player, index) in this.players" class="room" :id="`player${index}`" :style="{width: `${100/this.players.length}%`}">
                <div class="room__title">
                    <p class="room__title--text">{{ player.name }}</p>
                </div>
                <div class="room__gold">
                    <p class="room__gold--text">Gold:</p>
                    <span contenteditable="true" class="room__gold--input" :id="`earnedGold${index}`">0</span>
                </div>
                <div class="room__lost">
                    <button class="room__lost--button" @click.once="lostGame(player.id, index)">Lost Game</button>
                </div>
            </div>
        </div>
        <div class="liarsDice">
            <div class="rolles">
                <div class="rolles__form">
                    <p class="rolles__form--label">Rolles:</p>
                    <input type="text" class="rolles__form--input" @input="change_dice_counter($event.target.value)">
                </div>
                <div class="rolles__dice">
                    <p v-for="dice_value in dice_values" class="rolles__dice--text">{{ dice_value.dice }} = {{ dice_value.count }}</p>
                </div>
            </div>
            <div class="reward">
                <div class="reward__gold">
                    <p class="reward__gold--text">Gold:</p>
                    <span contenteditable="true" @input="earnedGold = Number($event.target.innerText)" class="reward__gold--input" id="earnedGold">5</span>
                </div>
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
            dice_values: [
                {dice: 1,  count: 0},
                {dice: 2, count: 0},
                {dice: 3, count: 0},
                {dice: 4, count: 0},
                {dice: 5, count: 0},
                {dice: 6, count: 0},
            ],
            earnedGold: 5,
        }
    },
    methods: {
        change_dice_counter(rolled_numbers){
            //Resets each count.
            this.dice_values.forEach(dice_value => {
                dice_value.count = 0
            })

            //Get every role in an array.
            const rolled_array = rolled_numbers.trim().split(",")

            //Adds the ammount of rolled for every dice.
            this.dice_values.forEach(dice_value => {
                dice_value.count = rolled_array.filter(rolles => (Number(rolles) === dice_value.dice)).length
            })
        },
        lostGame(playerID, index){
            const earnedGold = Number(document.getElementById(`earnedGold${index}`).innerText)+Number(document.getElementById("earnedGold").innerText)
            this.$store.commit('addGold', {id: playerID, earnedGold: earnedGold})
            document.getElementById(`player${index}`).classList.add("lost")
        }
    }
}
</script>