<template>
  <div class="body">
    <h1>About WEG</h1>
  <h3>Our Mission is to bring the Emergency services sectors across Southwest Missouri, Northwest Arkansas, and Northeast Oklahoma together to protect life and property.</h3>
  <br>
  <p>Weather Emergency Group is a privately run organization that specifically works with fire departments, law enforcement, emergency management, and other public safety departments to provide in-depth and tailored data that is not available on the public market. The director and founder of Weather Emergency Group are Cade Woolaway, a meteorology student at the University of Oklahoma, who has background in fire fighting and emergency response to allow him to tailor weather information to emergency situations and communicate risk as a person in the public safety sector would understand it. </p>
  <h3>Participating Departments</h3>
  <div class="departmentlist">
    <p>Auroa Rural Fire Protection District</p>
    <p>Barry County E-911 Services</p>
    <p>Barry County Office of Emergency Management</p>
    <p>Barry County Sheriffs Office</p>
    <p>Butterfield Fire Protection District</p>
    <p>Cassville Fire Protection District</p>
    <p>Central Crossing Fire Protection District</p>
    <p>City of Monett Fire Department</p>
    <p>Eagle Rock - Golden - Mano Fire Protection District</p>
    <p>Exeter Fire Protection District</p>
    <p>Granby East Newton Fire Protection District</p>
    <p>Jenkins Fire Protection District</p>
    <p>Marionville City Fire Department</p>
    <p>Monett Rural Fire Protection District</p>
    <p>Northern Stone Northeast Barry Fire Protection District</p>
    <p>Purdy Fire Protection District</p>
    <p>Seligman Fire Protection District</p>
    <p>Washburn Fire Protection District</p>
  </div>
  <h4>If you department is intrested in join the WEG, please send a email to weg@woolawaywx.com or cade@woolawaywx.com today!</h4>
  <p class="tinytext">Weather Emergency Group reserves the right to accept, decline, or remove departments as this is a privately managed weather management organization. Departments apart of the Weather Emergency Group display responsible actions and knowledge towards weather and how it affects the daily operations of emergency services.</p>
</div>
</template>

<script>

export default {
  name: 'About_WEG',
  components: {
  }
}
</script>

<style>
.body {
  width: 75%;

}
.departmentlist {
  list-style: none;
  text-align: center;
  justify-content: center;
  margin: auto;
  padding: auto;
}

@media only screen and (min-width: 768px) {
    .body {
      width: 60%;
      font-size: 20px;
      justify-content: center;
      text-align: center;
      margin: auto;
    }
    
}
@media only screen and (max-width: 768px) {
    .body {
      text-align: center;
      justify-content: center;
      margin: auto;
      
      
    }
    
}
.tinytext {
  font-size: 10px;
}
</style>
