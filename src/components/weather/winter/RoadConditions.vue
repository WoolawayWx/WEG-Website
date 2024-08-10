<template>
    <RoadConditionMap></RoadConditionMap>
</template>

<script setup>
    import { useHead } from '@unhead/vue'
    import { computed, onMounted } from 'vue';
    import RoadConditionMap from '@/components/maps/Roadways/RoadConditionMap.vue';

    function PageLoad() {
        const SiteData = {
            title: 'Road Conditions',
            description: 'Displaying road conditons across the state of Missouri'
        }
        useHead({
            title: computed(() => SiteData.title),
            meta: [
                {
                    name: 'description',
                    content: computed(() => SiteData.description)
                }
            ]
        })
    }

    onMounted(() => {
        PageLoad()
    })
</script>