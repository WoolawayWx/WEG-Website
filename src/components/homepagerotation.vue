<template>
    <div>
        <img :src="activeImg">
    </div>
</template>

<script>


export default {
    name: 'Homepage_Rotation',
    data() {
        return {
            activeImg: "",
            imageNumber: 0
        }
    },
    methods: {
    },
    mounted() {
        setInterval(()=> {
            this.imageNumber = this.imageNumber + 1;
            if(this.imageNumber == 1) {
                this.activeImg="https://www.spc.noaa.gov/partners/outlooks/state/images/MO_swody1.png"
            } else if(this.number == 2) {
                this.activeImg="https://www.spc.noaa.gov/partners/outlooks/state/images/MO_swody1_WIND.png"
            } else {
                this.imageNumber = 0;
            }
        }, 4000 )
    }
}
</script>



<style> 

</style>