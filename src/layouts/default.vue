<template>
    <div class="l-default">
        <TheHeader />
        <Nuxt />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TheHeader from '~/components/common/TheHeader.vue';

export default Vue.extend({
    components: {
        TheHeader,
    },
});
</script>

<style lang="scss" scoped>
@import '~/assets/styles/layout/_default';
</style>
