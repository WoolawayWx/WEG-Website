<template>
    <h1>Alert Banner Config</h1>
    <div id="alertOn" class="inline">
        <p>Turn On Alert:</p>
        <input type="checkbox" v-model="AlertActive">
    </div>
    <br>
    <div class="inline">
        <p>Title Text: </p>
        <input v-model="textTitle">
    </div>
    <br>
    <div class="inline">
        <p>Body Text</p>
        <input v-model="textBody">
    </div>
    <br>
    <div class="inline">
        <p>URL</p>
        <input v-model="URL">
    </div>
    <p>Alert Active: {{ AlertActive }}</p>
    <div v-show="AlertActive" class="alert">
        <p><b>{{ textTitle }}</b></p>
        <p><a :href="URL">{{ textBody }}</a> </p>
    </div>
    
    
</template>
<script>

export default {
    name: "AlertConfig",
    data() {
        return {
            textTitle: "",
            AlertActive: "false",
            textBody: "",
            URL: []
        }
    }
}
</script>

<style>
.inline {
    margin: auto;
    display: inline-flex;
    padding: 5px;
    
}
.alert {
    background-color: yellow;
    border: 2px black solid;
    width: fit-content;
    text-align: center;
    margin: auto;
    padding: 5px;
}
</style>