<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabaseClient'

const Info = ref([])

async function getWEGUpdate() {
  const { data } = await supabase.from('weg_updates').select()
  Info.value = data
}

onMounted(() => {
  getWEGUpdate()
})
</script>

<template>
  <ul>
    <li v-for="update in Info" :key="update.id">{{ update.date }}{{ update.updateText }}</li>
  </ul>
</template>