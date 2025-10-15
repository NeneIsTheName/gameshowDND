<template>
<header_file title="Room or Bear"/>

<main class="main">
    <section class="roomOrBear">
        <div class="rooms">
            <draggable
                :list="null"
                group="players"
                draggable=".rooms__room--list"
                :sort="false"
                v-for="room in players_drag.length"
                class="rooms__room"
                :style="{width: `${100/players_drag.length}%`}"
            >
                <p class="rooms__room--title">Room {{ room }}</p>
                <p class="rooms__room--list" v-for="player in players_drag.filter(player => player.list === room)">{{ player.name }}</p>
            </draggable>
        </div>
        <div class="players">
            <draggable
                :list="null"
                group="players"
                draggable=".players__list--item"
                :sort="false"
                class="players__list"
            >
                <p class="players__list--item" v-for="player in players_drag.filter(player => player.list === 0)">
                    {{ player.name }}
                </p>
            </draggable>
        </div>
    </section>
</main>
</template>

<script>
import header_file from '../components/header.vue'
import { VueDraggableNext } from 'vue-draggable-next'

export default{
    name: "roomOrBear",
    components: {
        header_file,
        draggable: VueDraggableNext
    },

    data(){
        return {
            players_drag: [],
        }
    },

    computed: {
        players(){
            return this.$store.state.players
        },
    },

    mounted(){
        this.players.forEach(player => {
            this.players_drag.push({user_id: player.id, name: player.name, list: 0})
        });
    },

    methods: {
        players_room(room_index){
            return this.players_drag.filter(player => player.list === room_index)
        },
        dropPlayer(event, num){
        }
    },
}
</script>

