<template>
<header_file title="Liars Dice"/>

<main class="main">

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
}
</script>