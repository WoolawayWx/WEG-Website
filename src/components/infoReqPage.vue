<script setup>
import { supabase } from '@/supabase';
import { onMounted, ref } from 'vue';
let Docs = ref()
async function LoadDocs() {
    let { data: InfoReqs, error } = await supabase
    .from('InfoReqs')
    .select('*')
    if(error) {
        console.log(error)
    } else {
        console.log(InfoReqs)
        Docs.value = InfoReqs
    }
}

onMounted(() => {
    LoadDocs()
})
</script>

<template>
<h1 class="header-text">Infomation Requests</h1>
<p class="Doc">View the latest infomation request packets below.</p>
<div class="ColReverseDown">
    <div v-for="(doc, index) in Docs" class="Doc" :key="index">
            {{ doc.date }} | {{ doc.type }} | <a :href="doc.link">Click To View</a>
        
    </div>
</div>

</template>

<style scoped>
.ColReverseDown {
    display: flex;
    flex-direction: column-reverse;
}
.Doc {
    color: black;
}
@media (min-width: 768px) {
    .Doc {
        font-size: 1.5cqw;
        padding: 0.25cqw;
        margin: 0.25cqw;
        border-bottom: 0.1cqw solid black;
        width: 75%;
        margin-left: 12.5%;
        margin-right: 12.5%;
    }
    .header-text {
        font-size: 2cqw;
        color: black;
    }
}
@media (max-width: 768px) {
    .Doc {
        font-size: 3.25cqw;
        padding: 0.4cqw;
        margin: 0.4cqw;
        border-bottom: 0.1cqw solid black;
        width: 75%;
        margin-left: 12.5%;
        margin-right: 12.5%;
    }
    .header-text {
        font-size: 5cqw;
        color: black;
    }
}
</style>