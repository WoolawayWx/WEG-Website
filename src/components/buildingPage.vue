<template>
    <div class="building-title">
        <div class="flex-col-center width-20"><span class="material-symbols-outlined icon POC-right">construction</span></div>
        <div class="flex-col-center width-60"><h1>Under Construction</h1></div>
        <div class="flex-col-center width-20"><span class="material-symbols-outlined icon POC-left">construction</span></div>
        
        
        
    </div>
    
    <p>This page is not quite ready yet. Please check back later as this page is in development.</p>
</template>

<script setup>

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
.material-symbols-outlined {
    
  font-variation-settings:
  'FILL' 0,
  'wght' 400,
  'GRAD' 0,
  'opsz' 40
}
.POC-left {
    margin-left: 0;
    margin-right: auto;
}
.POC-right {
    margin-left: auto;
    margin-right: 0;
}
.icon {
    color: black;
    aspect-ratio: 1/1;
    width: 50%;
    font-size: 5cqw;
}
.building-title {
    display: flex;
    flex-direction: row;
    color: black;
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
}
.flex-col-center {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.width-20 {
    width: 20%;
}
.width-60 {
    width: 60%;
}
</style>