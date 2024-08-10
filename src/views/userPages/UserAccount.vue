<template>
    <UserInfoPage></UserInfoPage>
</template>

<script setup>
    import UserInfoPage from '@/components/account/UserInfoPage.vue';
    import { useHead } from '@unhead/vue'
    useHead({
    title: 'Account',
    
    })
</script>