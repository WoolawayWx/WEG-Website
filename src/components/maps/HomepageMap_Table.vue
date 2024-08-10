
  
  <script>
  
  export default {
  data() {
      return {
        zoom: 9,
        coordinates: [36.83, -93.98],
        Wheaton: "Loading",
        Cassville:"Loading",
        Noel: "Loading",
        Neosho: "Loading",
        Wheaton_Temp: "Loading",
        Cassville_Temp:"Loading",
        Noel_Temp: "Loading",
        Neosho_Temp: "Loading",
        Wheaton_Rain: "Loading",
        Cassville_Rain:"Loading",
        Noel_Rain: "Loading",
        Neosho_Rain: "Loading",
        Wheaton_Hum: "Loading",
        Cassville_Hum:"Loading",
        Noel_Hum: "Loading",
        Neosho_Hum: "Loading",
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
            this.Cassville_Temp = data.STATION[0].OBSERVATIONS.air_temp_value_1.value
            this.Cassville_Hum = data.STATION[0].OBSERVATIONS.relative_humidity_value_1.value
            this.Cassville_Rain = data.STATION[0].OBSERVATIONS.precip_accum_24_hour_value_1.value
          })
          this.StationID = "AV446"
          fetch("https://api.synopticdata.com/v2/stations/latest?&stid="+(this.StationID)+"&units=english,speed|mph,pres|mb&recent=1440&24hsummary=1&qc_remove_data=off&qc_flags=on&qc_checks=all&hfmetars=1&showemptystations=1&precip=1&timeformat=%H:%M&obtimezone=local&token=dbdc2dba77634cb99cd8969c2a75d708")
          .then(res=>{
            return res.json();
          })
          .then(data=> {
            this.Noel_Temp = data.STATION[0].OBSERVATIONS.air_temp_value_1.value
            this.Noel_Hum = data.STATION[0].OBSERVATIONS.relative_humidity_value_1.value
            this.Noel_Rain = data.STATION[0].OBSERVATIONS.precip_accum_24_hour_value_1.value
          })
          this.StationID = "E4150"
          fetch("https://api.synopticdata.com/v2/stations/latest?&stid="+(this.StationID)+"&units=english,speed|mph,pres|mb&recent=1440&24hsummary=1&qc_remove_data=off&qc_flags=on&qc_checks=all&hfmetars=1&showemptystations=1&precip=1&timeformat=%H:%M&obtimezone=local&token=dbdc2dba77634cb99cd8969c2a75d708")
          .then(res=>{
            return res.json();
          })
          .then(data=> {
            this.Neosho_Temp = data.STATION[0].OBSERVATIONS.air_temp_value_1.value
            this.Neosho_Hum = data.STATION[0].OBSERVATIONS.relative_humidity_value_1.value
            this.Neosho_Rain = data.STATION[0].OBSERVATIONS.precip_accum_24_hour_value_1.value
          })
          this.StationID = "F6791"
          fetch("https://api.synopticdata.com/v2/stations/latest?&stid="+(this.StationID)+"&units=english,speed|mph,pres|mb&recent=1440&24hsummary=1&qc_remove_data=off&qc_flags=on&qc_checks=all&hfmetars=1&showemptystations=1&precip=1&timeformat=%H:%M&obtimezone=local&token=dbdc2dba77634cb99cd8969c2a75d708")
          .then(res=>{
            return res.json();
          })
          .then(data=> {
            this.Wheaton_Temp = data.STATION[0].OBSERVATIONS.air_temp_value_1.value
            this.Wheaton_Hum = data.STATION[0].OBSERVATIONS.relative_humidity_value_1.value
            this.Wheaton_Rain = data.STATION[0].OBSERVATIONS.precip_accum_24_hour_value_1.value
          })
    }
    },
    mounted() {
        this.OverviewData();
    },
    components: {
    },
  };
  </script>
  
  <template>
    <div class="" style="padding: 0px; display: flex; align-items: center;">
      <table class="table">
        <tr class="header">
          <th>Location</th>
          <th>Tempature</th>
          <th>Rainfall</th>
          <th>Humdity</th>
        </tr>
        <tr>
          <td>Anderson/Noel</td>
          <td>{{ Noel_Temp }}ºF</td>
          <td>{{ Noel_Rain }} IN</td>
          <td>{{ Noel_Hum }}%</td>
        </tr>
        <tr>
          <td>Shell Knob</td>
          <td>{{ Cassville_Temp }}ºF</td>
          <td>{{ Cassville_Rain }} IN</td>
          <td>{{ Cassville_Hum }}%</td>
        </tr>
        <tr>
          <td>Wheaton</td>
          <td>{{ Wheaton_Temp }}ºF</td>
          <td>{{ Wheaton_Rain }} IN</td>
          <td>{{ Wheaton_Hum }}%</td>
        </tr>
        <tr>
          <td>Neosho</td>
          <td>{{ Neosho_Temp }}ºF</td>
          <td>{{ Neosho_Rain }} IN</td>
          <td>{{ Neosho_Hum }}%</td>
        </tr>
      </table>
    </div>
  </template>

<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,500;9..40,800&display=swap');

.location{
  color: black;
  font-size: 2em;
  text-align: center;
  font-family: 'DM Sans', sans-serif;
  font-weight: 800;
}

.mapBox{
  display: flex;
  align-items: center;
  height: 30em;
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
}
.table {
  font-family: 'DM Sans', sans-serif;
  width: 90%;
  text-align: center;
}
.table:th {
  background-color: black;
  color: white;
}
@media only screen and (max-width: 768px) {
    .table {
        width: 10%;
    }
    
}
</style>