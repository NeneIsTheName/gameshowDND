<template>
<footer class="footer">
    <div class="footer__text">
        <router-link :to="`/${ link }`" class="footer__text--link">{{ text }}</router-link>
    </div>
</footer>
</template>

<script>

export default {
    name: "footer",
    props: ["text", "link"],
}
</script>