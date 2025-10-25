<template>
<header_file title="Room or Bear"/>

<main class="main">
    <section class="roomOrBear">
        <div class="rooms">
            <div class="room" v-for="(room, index) in rooms" :style="{width: `${100/rooms.length}%`}">
                <div class="room__title">
                    <p class="room__title--text">Room {{ index+1 }}</p>
                    <p class="room__title--text" :id="`room${index}`">Room</p>
                </div>
                <draggable
                    :list="room"
                    :item-key="`${index+1}`"
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
                    <span contenteditable="true" class="room__gold--input" :id="`roomGold${index}`">0</span>
                </div>
            </div>
        </div>
        <div class="randomizer">
            <div class="randomizer__room">
                <button class="randomizer__room--button" @click="randomizeRoom">Randomize Room</button>
                <button class="randomizer__room--button"  @click="earndGold">Add Gold</button>
            </div>
        </div>
        <div class="players">
            <draggable
                :list="players"
                item-key="0"
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
            offerRoom: Math.random() < 0.5,
            players: this.$store.state.players.slice()
        }
    },
    mounted(){
        this.players.forEach(player => {
            this.rooms.push([])
        });
    },
    methods: {
        randomizeRoom(){
            //All filled rooms.
            let filledRooms = []

            //Sets every room to his default and checks if room is filled. (If room is filled put room in: let filledRooms)
            this.rooms.forEach((room, index) => {
                document.getElementById(`room${index}`).innerText = "Room"
                document.getElementById(`roomGold${index}`).innerText = 40
                if(room.length) filledRooms.push(index)
            })

            //Creates the offer room and this can only be a room that is filled. (this room is created 1/2 times)
            if(filledRooms.length){
                if(this.offerRoom){
                    const choosenRoom = Math.floor(Math.random() * filledRooms.length)
                    document.getElementById(`room${filledRooms[choosenRoom]}`).innerText = "Offer"
                    document.getElementById(`roomGold${filledRooms[choosenRoom]}`).innerText = "?"
                }
                this.offerRoom = (this.offerRoom) ? false : true
            }

            //Creates bear rooms. (it can only be a bear room if it is a default room and not the special room)
            const bears = Math.floor(this.rooms.length/2)
            let madeBears = 0
            while(madeBears < bears){
                const room = Math.floor(Math.random() * this.rooms.length)
                if(document.getElementById(`room${room}`).innerText === "Room"){
                    document.getElementById(`room${room}`).innerText = "Bear"
                    document.getElementById(`roomGold${room}`).innerText = 25
                    madeBears++
                }
            }

            //Checks if room isn't the special room and if room has 3 or more players in it. (If it does it removes 10 gold)
            this.rooms.forEach((room, index) => {
                if(document.getElementById(`roomGold${index}`).innerText !== "?" && room.length > 2){
                    document.getElementById(`roomGold${index}`).innerText -= 10
                }
            })
        },
        earndGold(){
            this.rooms.forEach((room, room_i) => {
                let roomGold = document.getElementById(`roomGold${room_i}`).innerText
                room.forEach(player => {
                    this.$store.commit('addGold', {id: player.id, earnedGold: roomGold})
                })
            })
        }
    }
}
</script>
