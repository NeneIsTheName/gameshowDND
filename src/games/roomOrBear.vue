<template>
<header_file title="Room or Bear"/>

<main class="main">
    <section class="roomOrBear">
        <div class="rooms">
            <div class="room" v-for="(room, index) in rooms" :style="{width: `${100/rooms.length}%`}">
                <div class="room__title">
                    <p  class="room__title--text">Room {{ index+1 }}</p>
                </div>
                <draggable
                    :list="room"
                    group="players"
                    draggable=".room__list--player"
                    animation="300"
                    class="room__list"
                >
                    <template #item="{ element: player }">
                        <p class="room__list--player">{{ player.name }}</p>
                    </template>
                </draggable>
                <div class="room__gold">
                    <p class="room__gold--text">Gold: </p>
                    <span contenteditable="true" class="room__gold--input" id="earnedGold">0</span>
                </div>
            </div>
        </div>
        <div class="players">
            <draggable
                :list="players"
                group="players"
                draggable=".players__list--player"
                animation="300"
                class="players__list"
            >
                <template #item="{ element: player }">
                    <p class="players__list--player">{{ player.name }}</p>
                </template>
            </draggable>
        </div>
    </section>
</main>
</template>

<script>
import header_file from '../components/header.vue'
import draggable from 'vuedraggable';

export default{
    name: "roomOrBear",
    components: {
        header_file,
        draggable
    },

    data(){
        return {
            rooms: [],
        }
    },

    computed: {
        players(){
            return this.$store.state.players
        },
    },

    mounted(){
        this.players.forEach(player => {
            this.rooms.push([])
        });
    },
}
</script>

