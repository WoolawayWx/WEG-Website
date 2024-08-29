<template>
  <Head>
    <title>Home - WEG</title>
    <meta name="description" content="A site focused on enhancing public safety and addressing severe weather impacts in collaboration with emergency management, fire, and law enforcement partners.">
  </Head>

  <div class="w-full desktop:text-[3cqw] mobile:text-[5cqw] font-Bebas font-semibold bg-gradient-to-t" :style="backgroundImageStyle"
    style="background-repeat: no-repeat, no-repeat; background-position: center; background-size: cover;">
    <div class="bg-black bg-opacity-40 text-white">
      <p class="">One Group,</p>
      <p class="">One Team,</p>
      <p class="">Always Pushing for Better!</p>
    </div>
  </div>
  <div class="mobile:w-4/5 mobile:ml-[10%] desktop:w-2/3 desktop:ml-[16%] text-black">
    <h1 class="font-Bebas mobile:text-[7cqw] desktop:text-[2cqw]">Welcome to the one and only, Weather Emergency Group!
    </h1>
    <p class="mobile:text-[5cqw] desktop:text-[1.5cqw] font-Raleway">Weather Emergency Group is something special that
      just continues to grow year after year. The group consist of departments all across Southwest Missouri, and
      hopeful to expand into Northwest Arkansas, and Northeast Oklahoma in due time. </p>
    <br>
    <p class="mobile:text-[5cqw] desktop:text-[1.5cqw] font-Raleway">We are thrilled to have you! Please check out our
      resources on our website, and look over our <a href="/about">about</a> and <a href="/joinweg">joining</a> pages if
      you are interested in always pushing for the best! </p>
  </div>
  <div class="pt-4 pb-4">
    <div class="flex desktop:flex-row mobile:flex-col justify-center desktop:w-3/4 m-auto">
      <RouterLink to="/weather/severe" class="btn-primary">
        Severe Weather
      </RouterLink>
      <RouterLink to="/weather/drought" class="btn-primary">
        Drought Weather
      </RouterLink>
      <RouterLink to="/weather/fire" class="btn-primary">
        Fire Weather
      </RouterLink>
      <RouterLink to="/about" class="btn-primary">
        About WEG
      </RouterLink>
      <RouterLink to="/joinWEG" class="btn-primary">
        Join WEG Today!
      </RouterLink>
    </div>
  </div>
  <div class="w-full">
    <div class="desktop:w-3/4 desktop:ml-[12.5%] desktop:text-[1.5cqw] mobile:w-[90%] mobile:ml-[5%] mobile:mr-[5%]">
      <hr class="accentLine">
      <p class="font-Raleway">What is WEG?</p>
      <i class="font-serif">"WEG is a collaborative effort uniting public safety entities throughout Southwest Missouri,
        Northwest Arkansas, and Northeast Oklahoma. Our mission is simple yet crucial: to enhance our region's
        preparedness and response capabilities for weather-related incidents. Together, we strive for excellence in
        safeguarding our communities during times of crisis."</i>
      <p class="font-Raleway"> - Cade Woolaway, Founder and Director of WEG</p>
      <hr class="accentLine">
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue';

  const departmentNumber = ref(Math.floor(Math.random() * NumOfDepartments) + 1);
  const NumOfDepartments = 3
  const backgroundImageStyle = computed(() => {
    return {
      background: 'linear-gradient(90deg, #000, #111)',
      backgroundImage: `url(./assets/images/departmentCovers/${departmentNumber.value}.webp)`,
    };
  });

</script>

<style>
  a {
    text-decoration: underline;
  }
</style>
