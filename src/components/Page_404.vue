<template>
    <div class="Lights">
        <div class="Lights-Element Blue">
            <span> </span>
        </div>
        <div class="Lights-Element Red">
            <span> </span>
        </div>
    </div>
    <div class="safe-text">
        <h1>404 Error</h1>
        <p>Don't worry, you are not in trouble. You just navigated to a url that doesn't exist. Either try again, or click "Return Home" to go back to the homepage.</p>
        <RouterLink to="/">
            <button class="return-home-button">Return Home</button>
        </RouterLink>
    </div>
    
</template>

<script setup>

</script>

<style>
@media (min-width: 768px) {
    .Lights {
        display: flex;
        flex-direction: row;
        width: 20%;
        margin-right: 40%;
        margin-left: 40%;
        margin-top: 40px;
    }
    .Lights-Element {
        width: 50%;
        aspect-ratio: 4/1;
    }
    .Blue {
        background-color: blue;
        animation: strobe_two .5s infinite;
    }
    .Red {
        background-color: red;
        animation: strobe_one .5s infinite;
    }
    @keyframes strobe_two{
        0%{
            opacity: 1;
        }
        100%{
            opacity: 0;
        }
    }
    @keyframes strobe_one{
        100%{
            opacity: 1;
        }
        0%{
            opacity: 0;
        }
    }
    .return-home-button {
        width: 10%;
        border: 2px solid black;
        margin-bottom: 40px;
        border-radius: 0.25cqw;
        background-color: rgba(0, 0, 0, 0);
        color: black;
    }

}
@media (max-width: 768px) {
    .Lights {
        display: flex;
        flex-direction: row;
        width: 60%;
        margin-right: 20%;
        margin-left:   20%;
        margin-top: 40px;
    }
    .Lights-Element {
        width: 50%;
        aspect-ratio: 4/1;
    }
    .Blue {
        background-color: blue;
        animation: strobe .7s infinite;
    }
    .Red {
        background-color: red;
        animation: strobe .7s infinite;
        animation-delay: 500ms;
    }
    @keyframes strobe{
        0%{
            opacity: 1;
        }
        100%{
            opacity: 0;
        }
    }
    .safe-text {
        width: 80%;
        margin-left: 10%;
        margin-right: 10%;
    }
    .return-home-button {
        width: 40%;
        border: 2px solid black;
        margin-bottom: 40px;
        border-radius: 2cqw;
        background-color: rgba(0, 0, 0, 0);
        color: black;
    }

}

</style>