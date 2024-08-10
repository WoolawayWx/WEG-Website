<template>
  <dailyUpdate></dailyUpdate>
  <homepage_body></homepage_body>
</template>

<script>
import homepage_body from '@/components/homepage_body.vue';
import dailyUpdate from '@/views/dailyUpdate.vue';

export default {
  name: 'HomeView',
  components: {
    dailyUpdate,
    homepage_body,
  }
}
</script>
