<template>
<header_file title="AllStars Gameshow"/>

<main class="main">
    <section class="competitor">
        <div class="competitor-h">
            <div class="competitor-h__title">
                <h1 class="competitor-h__title--text">Who is playing:</h1>
            </div>
        </div>

        <div class="competitor-m">
            <div class="competitor-m__form">
                <input @input="add_names($event.target.value)" class="competitor-m__form--input">
            </div>
            <div v-for="player in this.players" class="competitor-m__competitors">
                    <p class="competitor-m__competitors--names">{{ player.name }} | Gold: </p>
                    <span contenteditable="true" class="competitor-m__competitors--input" @input="start_gold($event, player.id)">0</span>
            </div>
        </div>

        <div class="competitor-f">
            <p class="competitor-f__text">
                <router-link to="/role-D100" class="competitor-f__text--link">Start Game ONE</router-link>
            </p>
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
    computed: {
        players(){
            return this.$store.state.players
        }
    },
    methods: {
        add_names(name_list){
            const players = name_list.trim().split(",")
            this.$store.commit('addPlayer', players)
        },
        start_gold(earnedGold, playerID){
            this.$store.commit('startGold', {id: playerID, startGold: Number(earnedGold.target.innerText)})
        }
    },
}
</script>

