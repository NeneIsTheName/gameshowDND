<template>
<header class="header">
    <div class="header__title">
        <p class="header__title--text">{{ title }}</p>
    </div>
</header>
</template>

<script>

export default {
    name: "header",
    props: ["title"],
}
</script>