<template>
<header_file title="Steal Or Deal"/>

<main class="main">
    <section class="stealOrDeal">
        <div class="">
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

    },
}
</script>

