<template>
  <div class="body">
    <h1>About WEG</h1>
  <h3>Our Mission is to bring the Emergency services sectors across Southwest Missouri, Northwest Arkansas, and Northeast Oklahoma together to protect life and property.</h3>
  <br>
  <p>Weather Emergency Group is a privately operated organization that specializes in providing detailed, customized weather data to fire departments, law enforcement, emergency management, and other public safety agencies. Unlike widely available public forecasts, the group's services are tailored specifically to meet the unique needs of emergency responders.

The organization was founded by Cade Woolaway, a meteorology student that studied at the <a href="https://www.ou.edu/ags/meteorology">University of Oklahoma</a> and is currently pursuing a master’s degree in Environmental Science at the <a href="https://majors.missouri.edu/environmental-sciences-atmosphere-bs/">University of Missouri</a>. With a background in firefighting and emergency response, Cade combines his expertise in weather science with firsthand experience in public safety. This unique blend of knowledge enables him to deliver critical weather insights and communicate risk in a way that resonates with those in the emergency response field.</p>
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
    <p>McDonald County Emergency Management</p>
    <p>Monett Rural Fire Protection District</p>
    <p>Northern Stone Northeast Barry Fire Protection District</p>
    <p>Purdy Fire Protection District</p>
    <p>Seligman Fire Protection District</p>
    <p>Stella Rural Fire Protection District</p>
    <p>Washburn Fire Protection District</p>
  </div>
  <div class="flex flex-row justify-center">
    <img src="@/assets/departments/Cassville.png" class="AboutPageDepartmentLogo">
    <img src="@/assets/departments/FD_MonettRural.png" class="AboutPageDepartmentLogo">
  </div>
  <span class="text-xs">Department logos are used only with explicit permission or when directly provided to WEG.</span>
  <h4>If you department is intrested in join the WEG, please send a email to <a href="mailto:weg@woolawaywx.com">weg@woolawaywx.com</a> or <a href="mailto:cade@woolawaywx.com">cade@woolawaywx.com</a>  today!</h4>
  <p class="tinytext">Weather Emergency Group reserves the right to accept, decline, or remove departments as this is a privately managed weather management organization. Departments apart of the Weather Emergency Group display responsible actions and knowledge towards weather and how it affects the daily operations of emergency services.</p>
</div>
</template>

<script setup>
import { useHead } from '@unhead/vue';

useHead({
  title: 'About - WEG'
})
</script>
<style scoped>
a {
  text-decoration: underline;
}
</style>
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