
  
  <script>
  import "leaflet/dist/leaflet.css";
  import { LMap, LTileLayer, LMarker, LIcon } from "@vue-leaflet/vue-leaflet";
  
  export default {
  data() {
      return {
        zoom: 9,
        coordinates: [36.83, -93.98],
        Wheaton: "Loading",
        ShellKnob:"Loading",
        Noel: "Loading",
        Neosho: "Loading",
        Republic: "Loading",
        Cassville: "Loading",
        Butterfield: "Loading",
        PeaRidge: "Loading",
        StationID: "",
      };
    },
    methods: {
        OverviewData() {
          this.StationID = "F3232"
          fetch("https://api.synopticdata.com/v2/stations/latest?&stid="+(this.StationID)+"&units=english,speed|mph,pres|mb&recent=1440&24hsummary=1&qc_remove_data=off&qc_flags=on&qc_checks=all&hfmetars=1&showemptystations=1&precip=1&timeformat=%H:%M&obtimezone=local&token=dbdc2dba77634cb99cd8969c2a75d708")
          .then(res=>{
            return res.json();
          })
          .then(data=> {
            this.ShellKnob = data.STATION[0].OBSERVATIONS.precip_accum_24_hour_value_1.value
          })
          this.StationID = "AV446"
          fetch("https://api.synopticdata.com/v2/stations/latest?&stid="+(this.StationID)+"&units=english,speed|mph,pres|mb&recent=1440&24hsummary=1&qc_remove_data=off&qc_flags=on&qc_checks=all&hfmetars=1&showemptystations=1&precip=1&timeformat=%H:%M&obtimezone=local&token=dbdc2dba77634cb99cd8969c2a75d708")
          .then(res=>{
            return res.json();
          })
          .then(data=> {
            this.Noel = data.STATION[0].OBSERVATIONS.precip_accum_24_hour_value_1.value
          })
          this.StationID = "E4150"
          fetch("https://api.synopticdata.com/v2/stations/latest?&stid="+(this.StationID)+"&units=english,speed|mph,pres|mb&recent=1440&24hsummary=1&qc_remove_data=off&qc_flags=on&qc_checks=all&hfmetars=1&showemptystations=1&precip=1&timeformat=%H:%M&obtimezone=local&token=dbdc2dba77634cb99cd8969c2a75d708")
          .then(res=>{
            return res.json();
          })
          .then(data=> {
            this.Neosho = data.STATION[0].OBSERVATIONS.precip_accum_24_hour_value_1.value
          })
          this.StationID = "F6791"
          fetch("https://api.synopticdata.com/v2/stations/latest?&stid="+(this.StationID)+"&units=english,speed|mph,pres|mb&recent=1440&24hsummary=1&qc_remove_data=off&qc_flags=on&qc_checks=all&hfmetars=1&showemptystations=1&precip=1&timeformat=%H:%M&obtimezone=local&token=dbdc2dba77634cb99cd8969c2a75d708")
          .then(res=>{
            return res.json();
          })
          .then(data=> {
            this.Wheaton = data.STATION[0].OBSERVATIONS.precip_accum_24_hour_value_1.value
          })
          this.StationID = "F8147"
          fetch("https://api.synopticdata.com/v2/stations/latest?&stid="+(this.StationID)+"&units=english,speed|mph,pres|mb&recent=1440&24hsummary=1&qc_remove_data=off&qc_flags=on&qc_checks=all&hfmetars=1&showemptystations=1&precip=1&timeformat=%H:%M&obtimezone=local&token=dbdc2dba77634cb99cd8969c2a75d708")
          .then(res=>{
            return res.json();
          })
          .then(data=> {
            this.Republic = data.STATION[0].OBSERVATIONS.precip_accum_24_hour_value_1.value
          })
          this.StationID = "F5451"
          fetch("https://api.synopticdata.com/v2/stations/latest?&stid="+(this.StationID)+"&units=english,speed|mph,pres|mb&recent=1440&24hsummary=1&qc_remove_data=off&qc_flags=on&qc_checks=all&hfmetars=1&showemptystations=1&precip=1&timeformat=%H:%M&obtimezone=local&token=dbdc2dba77634cb99cd8969c2a75d708")
          .then(res=>{
            return res.json();
          })
          .then(data=> {
            this.Cassville = data.STATION[0].OBSERVATIONS.precip_accum_24_hour_value_1.value
          })
          // this.StationID = "TT530"
          // fetch("https://api.synopticdata.com/v2/stations/latest?&stid="+(this.StationID)+"&units=english,speed|mph,pres|mb&recent=1440&24hsummary=1&qc_remove_data=off&qc_flags=on&qc_checks=all&hfmetars=1&showemptystations=1&precip=1&timeformat=%H:%M&obtimezone=local&token=dbdc2dba77634cb99cd8969c2a75d708")
          // .then(res=>{
          //   return res.json();
          // })
          // .then(data=> {
          //   this.PeaRidge = data.STATION[0].OBSERVATIONS.precip_accum_24_hour_value_1.value
          // })
          this.StationID = "C4438"
          fetch("https://api.synopticdata.com/v2/stations/latest?&stid="+(this.StationID)+"&units=english,speed|mph,pres|mb&recent=1440&24hsummary=1&qc_remove_data=off&qc_flags=on&qc_checks=all&hfmetars=1&showemptystations=1&precip=1&timeformat=%H:%M&obtimezone=local&token=dbdc2dba77634cb99cd8969c2a75d708")
          .then(res=>{
            return res.json();
          })
          .then(data=> {
            this.PeaRidge = data.STATION[0].OBSERVATIONS.precip_accum_24_hour_value_1.value
          })
    }
    },
    mounted() {
        this.OverviewData();
    },
    components: {
      LMap,
      LTileLayer,
      LMarker,
      LIcon
    },
  };
  </script>
  
  <style></style>
  
  <template>
    <div id="map" class="mapBox">
      <l-map ref="map" v-model:zoom="zoom" :center="[36.83, -93.98]" scrollWheelZoom="false">
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
          attribution="<p>Synoptic Data, WoolawayWx API Service</p>"
        ></l-tile-layer>D

        <l-marker :lat-lng="[0, 0]">
            <l-icon class-name="">Blank</l-icon>
        </l-marker>
        <l-marker :lat-lng="[36.624048924852566, -93.62451589371311]">
            <l-icon class-name="location">{{ ShellKnob }}"</l-icon>
        </l-marker>
        <l-marker :lat-lng="[36.551172043962914, -94.48666115922099]">
            <l-icon class-name="location">{{ Noel }}"</l-icon>
        </l-marker>
        <l-marker :lat-lng="[36.85629068187173, -94.37264916703305]">
            <l-icon class-name="location">{{ Neosho }}"</l-icon>
        </l-marker>
        <l-marker :lat-lng="[36.74000640823638, -94.08352674070821]">
            <l-icon class-name="location">{{ Wheaton }}"</l-icon>
        </l-marker>
        <l-marker :lat-lng="[37.12117, -93.49233]">
            <l-icon class-name="location">{{ Republic }}"</l-icon>
        </l-marker>
        <l-marker :lat-lng="[36.68617, -93.82150]">
            <l-icon class-name="location">{{ Cassville }}"</l-icon>
        </l-marker>
        <l-marker :lat-lng="[36.469830, -93.923630]">
            <l-icon class-name="location">{{ PeaRidge }}"</l-icon>
        </l-marker>
      </l-map>
    </div>
  </template>

<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,500;9..40,800&display=swap');

.location{
  color: black;
  font-size: 1.5em;
  text-align: center;
  font-family: 'DM Sans', sans-serif;
  font-weight: 800;
}

#map {
    width: 100%;
    aspect-ratio: 2/1;
}
</style>