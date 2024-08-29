<template>
    <div class="w-full">
        <div class="bg-primary w-full">
            <div class="w-4/5 mx-[10%] py-4 md:flex-row flex flex-col">
                <div class="md:w-1/3 flex justify-center items-center w-full md:min-w-1/3">
                    <img src="@/assets/images/_branding/logo/WEG_White.svg" width="100%" height="100%" class="w-[30%] h-[30%] md:w-1/2 md:h-1/2" alt="Logo for Weahter Emergency Group">
                </div>
                <div class="md:w-1/3 flex justify-center items-center w-full md:min-w-1/3">
                    <p class="text-white font-bold uppercase text-lg py-2"><i>Always Pushing for Better</i></p>
                </div>
                <div class="md:w-1/3 flex justify-center items-center w-full text-white flex-col flex-wrap md:min-w-1/3">
                    <RouterLink to="/joinWEG" class="Footer-Buttons" title="Join WEG">Join WEG</RouterLink>
                    <RouterLink to="/mission" class="Footer-Buttons" title="Mission Statement">Mission Statement</RouterLink>
                    <RouterLink to="/about" class="Footer-Buttons" title="About">About</RouterLink>
                    <RouterLink to="/contact" class="Footer-Buttons" title="Contact">Contact</RouterLink>
                    <RouterLink to="/privacy" class="Footer-Buttons" title="Privacy Policy">Privacy Policy</RouterLink>
                </div>
            </div>
        </div>
        <div class="bg-white text-black">
            <p class="uppercase text-xs md:text-xl text-center">©2024 Weather Emergency Group by WoolawayWx LLC</p>
        </div>
    </div>
</template>