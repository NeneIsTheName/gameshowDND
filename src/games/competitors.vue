<template>
    <div class="container">
        <section class="competitor">
            <div class="header">
                <div class="header__title">
                    <h1 class="header__title--text">Who is playing:</h1>
                </div>
            </div>
            <div class="body">
                <div class="body__form">
                    <input @input="add_names($event.target.value)" class="body__form--input">
                </div>
                <div v-for="player in this.$store.state.players" class="body__competitors">
                        <p class="body__competitors--names">{{ player.name }} | Gold: </p>
                        <span contenteditable="true" class="body__competitors--input" @input="start_gold($event, player.id)">0</span>
                </div>
            </div>
            <div class="footer">
                <p class="footer__text">
                    <router-link to="/role-D100" class="footer__text--link">Start Game ONE</router-link>
                </p>
            </div>
        </section>
    </div>
</template>

<script>

export default{
    name: "competitors",
    methods: {
        add_names(name_list){
            const players = name_list.trim().split(",")
            this.$store.commit('addPlayer', players)
        },
        start_gold(earnedGold, playerID){
            this.$store.commit('startGold', {id: playerID, startGold: Number(earnedGold.target.innerText)})
            console.log(this.$store.state.players)
        }
    },
}
</script>

