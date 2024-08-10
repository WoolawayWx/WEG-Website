<script setup>
import { ref, onMounted} from 'vue'
let DayState = ref("")
let clockHour = ref("")
let TimeClock = ref("")

function CurrentTime() {
    function clock() {
        const d = new Date()
        if(d.getHours() > 12) {
            DayState.value = "PM"
            clockHour.value = (d.getHours()-12).toLocaleString({minimumIntegerDigits: 2, useGrouping:false})
        } else {
            DayState.value = "AM"
        }
        TimeClock.value = clockHour.value+":"+d.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+":"+d.getSeconds().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+" "+DayState.value
    }
    setInterval(clock,1000)
}
onMounted(() => {
    CurrentTime()
})
</script>

<template>
    <span>{{ TimeClock }}</span>
</template>