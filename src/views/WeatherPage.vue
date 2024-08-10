<template>
    <h1>Weather</h1>
    <div class="view_col">
        <div class="cell">
            <h2 class="cell_child">Forecast</h2>
            <RouterLink to="/weather/forecast/point" class="cell_child"><button>Point Forecast</button></RouterLink>
        </div>
        <div class="cell">
            <h2>Current Weather</h2>
            <RouterLink to="/weather/current"><button>Current Weather</button></RouterLink>
        </div>
        <div class="cell">
            <h2>Fire Weather</h2>
            <RouterLink to="/weather/fire"><button>Fire Weather</button></RouterLink>
        </div>
        <div class="cell">
            <h2>Severe Weather</h2>
            <RouterLink to="/weather/severe"><button>Severe Weather</button></RouterLink>
        </div>
        <div class="cell">
            <h2>Drought</h2>
            <RouterLink to="/weather/drought"><button>Drought</button></RouterLink>
        </div>
        <div class="cell">
            <h2>Winter Weather</h2>
        <p>Coming Soon...</p>
        <!-- <RouterLink to="/weather/fire"><button>Fire Weather</button></RouterLink> -->
        </div>
    </div>
    <div class="view_row">
        <div class="cell">
            <h2>Forecast</h2>
            <RouterLink to="/weather/forecast/point"><button>Point Forecast</button></RouterLink>
        </div>
        <div class="cell">
            <h2>Current Weather</h2>
            <RouterLink to="/weather/current"><button>Current Weather</button></RouterLink>
        </div>
        <div class="cell">
            <h2>Fire Weather</h2>
            <RouterLink to="/weather/fire"><button>Fire Weather</button></RouterLink>
        </div>
        <div class="cell">
            <h2>Severe Weather</h2>
            <RouterLink to="/weather/severe"><button>Severe Weather</button></RouterLink>
        </div>
        <div class="cell">
            <h2>Drought</h2>
            <RouterLink to="/weather/drought"><button>Drought</button></RouterLink>
        </div>
        <div class="cell">
            <h2>Winter Weather</h2>
        <p>Coming Soon...</p>
        <!-- <RouterLink to="/weather/fire"><button>Fire Weather</button></RouterLink> -->
        </div>
    </div>

</template>


<script setup>
import { RouterLink } from 'vue-router';
</script>

<style>
.cell button {
    border: solid 2px black;
    color: black;
    height: 2em;
    width: 80%;
    background-color: rgba(0, 0, 0, 0);
}
.cell button:hover {
    background-color: black;
    color: white;
}
.view_col {
    display: flex;
    flex-direction: column;
    display: none;
}
.view_row {
    display: flex;
    flex-direction: row;
    width: 70%;
    margin-left: 15%;
    margin-right: 15%;
}
@media only screen and (min-width: 769px) {
    .cell {
       width: 16.6%;
       display: flex;
       flex-direction: column;
    }
    .cell button {
        height: fit-content;
    }
    .cell_child {
        height: 4vw;
        align-items: center;
    }
    
}
@media only screen and (max-width: 768px) {
    .cell button {
    border: solid 2px black;
    color: black;
    height: 2em;
    width: 12em;
    background-color: rgba(0, 0, 0, 0);
    }
    .view_col {
        display: block;
    }
    .view_row {
        display: none;
    }
}
</style>