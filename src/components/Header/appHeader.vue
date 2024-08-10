<template>
    <nav class="w-full m-0 p-0">
        <div id="Desktop" class="w-full">
            <div class="w-full bg-primary text-white font-Bebas flex flex-row">
                <div class="w-1/3 text-left pl-6 py-2">
                    <div></div>
                </div>
                <div class="w-1/3 text-center text-4xl py-2">
                    Weather Emergency Group
                </div>
                <div class="w-1/3 text-2xl py-2 text-right pr-6 align-middle">
                    <!-- <button class="pi pi-sign-in NavBarButton" title="Sign In"></button>
                    <button class="pi pi-sign-out NavBarButton" title="Sign Out"></button>
                    <button class="pi pi-cog NavBarButton" title="Settings"></button> -->
                    <div></div>
                </div>
            </div>
            <div class="w-full bg-primary flex justify-center">
                <div class="w-[70%] flex flex-row justify-evenly ml-auto mr-auto lg:w-[70%] xl:w-[50%] 2xl:w-[40%]">
                    <RouterLink to="/" custom v-slot="{ navigate, isActive }">
                        <button class="NavButton" @click="navigate" role="link" :class="{ 'active-link': isActive }">
                            Home
                        </button>
                    </RouterLink>
                    <RouterLink to="/file" custom v-slot="{ navigate, isActive }">
                        <button class="NavButton" @click="navigate" role="link" :class="{ 'active-link': isActive }">
                            Files
                        </button>
                    </RouterLink>
                    <div class="relative" @mouseover="WeatherMenu = true" @click="WeatherMenu = true"
                        @mouseleave="WeatherMenu = false">
                        <button class="NavButton" role="link"
                            :class="{ 'active-link': route.path.startsWith('/weather') }">
                            Weather
                        </button>
                        <Transition>
                            <div class="absolute Desktop-Nav-Dropdown" style="z-index: 500;" v-if="WeatherMenu">
                                <RouterLink to="/weather/severe" custom v-slot="{ navigate, isActive }">
                                    <button class="Desktop-Nav-Dropdown-Child" @click="navigate" role="link"
                                        :class="{ 'dropmenu-active': isActive }">
                                        Severe
                                    </button>
                                </RouterLink>
                                <RouterLink to="/weather/fire" custom v-slot="{ navigate, isActive }">
                                    <button class="Desktop-Nav-Dropdown-Child" @click="navigate" role="link"
                                        :class="{ 'dropmenu-active': isActive }">
                                        Fire
                                    </button>
                                </RouterLink>
                                <RouterLink to="/weather/drought" custom v-slot="{ navigate, isActive }">
                                    <button class="Desktop-Nav-Dropdown-Child" @click="navigate" role="link"
                                        :class="{ 'dropmenu-active': isActive }">
                                        Drought
                                    </button>
                                </RouterLink>
                                <RouterLink to="/weather/winter" custom v-slot="{ navigate, isActive }">
                                    <button class="Desktop-Nav-Dropdown-Child" @click="navigate" role="link"
                                        :class="{ 'dropmenu-active': isActive }">
                                        Winter
                                    </button>
                                </RouterLink>
                                <RouterLink to="/weather/forecast/point" custom v-slot="{ navigate, isActive }">
                                    <button class="Desktop-Nav-Dropdown-Child" @click="navigate" role="link"
                                        :class="{ 'dropmenu-active': isActive }">
                                        Point Forecast
                                    </button>
                                </RouterLink>
                                <RouterLink to="/weather/current" custom v-slot="{ navigate, isActive }">
                                    <button class="Desktop-Nav-Dropdown-Child" @click="navigate" role="link"
                                        :class="{ 'dropmenu-active': isActive }">
                                        Current Conditions
                                    </button>
                                </RouterLink>
                            </div>
                        </Transition>

                    </div>
                    <!-- <RouterLink to="/" custom v-slot="{ navigate, isActive }">
                        <button class="NavButton" @click="navigate" role="link" :class="{ 'active-link': isActive }">
                            Training
                        </button>
                    </RouterLink> -->
                    <div class="relative" @mouseover="AboutMenu = true" @click="AboutMenu = true"
                        @mouseleave="AboutMenu = false">
                        <button class="NavButton" role="link">
                            About and More
                        </button>
                        <Transition>
                            <div class="absolute Desktop-Nav-Dropdown" style="z-index: 500;" v-if="AboutMenu">
                                <RouterLink to="/about" custom v-slot="{ navigate, isActive }">
                                    <button class="Desktop-Nav-Dropdown-Child" @click="navigate" role="link"
                                        :class="{ 'dropmenu-active': isActive }">
                                        About WEG
                                    </button>
                                </RouterLink>
                                <RouterLink to="/contact" custom v-slot="{ navigate, isActive }">
                                    <button class="Desktop-Nav-Dropdown-Child" @click="navigate" role="link"
                                        :class="{ 'dropmenu-active': isActive }">
                                        Contact
                                    </button>
                                </RouterLink>
                                <RouterLink to="/joinWEG" custom v-slot="{ navigate, isActive }">
                                    <button class="Desktop-Nav-Dropdown-Child" @click="navigate" role="link"
                                        :class="{ 'dropmenu-active': isActive }">
                                        Join
                                    </button>
                                </RouterLink>
                                <RouterLink to="/branding" custom v-slot="{ navigate, isActive }">
                                    <button class="Desktop-Nav-Dropdown-Child" @click="navigate" role="link"
                                        :class="{ 'dropmenu-active': isActive }">
                                        Branding
                                    </button>
                                </RouterLink>
                                <RouterLink to="/mission" custom v-slot="{ navigate, isActive }">
                                    <button class="Desktop-Nav-Dropdown-Child" @click="navigate" role="link"
                                        :class="{ 'dropmenu-active': isActive }">
                                        Mission Statement
                                    </button>
                                </RouterLink>
                            </div>
                        </Transition>

                    </div>
                </div>
            </div>
        </div>
        <div id="Mobile" class="w-full relative flex-col">
            <div class="bg-primary flex flex-row w-full" :class="{'fixed z-[2100]': MobileMenu}">
                <button class="text-white font-Bebas text-left w-[90%] ml-[5%] text-xl">Weather Emergency Group</button>
                <button title="menu" @click="MobileMenu =! MobileMenu"><span class="pi text-white" :class="{'pi-bars': !MobileMenu, 'pi-times': MobileMenu}"></span></button>
            </div>
            <div class="fixed w-full h-full bg-primary z-[2000] pt-[8%]" v-if="MobileMenu">
                <div class="flex flex-col justify-center text-center">
                    <RouterLink to="/" custom v-slot="{ navigate, isActive }">
                        <button class="NavButton_Mobile" @click="navigate" role="link" :class="{ 'active-link': isActive }">
                            Home
                        </button>
                    </RouterLink>
                    <RouterLink to="/file" custom v-slot="{ navigate, isActive }">
                        <button class="NavButton_Mobile" @click="navigate" role="link" :class="{ 'active-link': isActive }">
                            Files
                        </button>
                    </RouterLink>
                    <div class="relative" @click="WeatherMenu = true"
                        @mouseleave="WeatherMenu = false">
                        <button class="NavButton_Mobile" role="link"
                            :class="{ 'active-link': route.path.startsWith('/weather') }">
                            Weather
                        </button>
                        <Transition>
                            <div class="absolute Desktop-Nav-Dropdown" style="z-index: 500;" v-if="WeatherMenu">
                                <RouterLink to="/weather/severe" custom v-slot="{ navigate, isActive }">
                                    <button class="Desktop-Nav-Dropdown-Child" @click="navigate" role="link"
                                        :class="{ 'dropmenu-active': isActive }">
                                        Severe
                                    </button>
                                </RouterLink>
                                <RouterLink to="/weather/fire" custom v-slot="{ navigate, isActive }">
                                    <button class="Desktop-Nav-Dropdown-Child" @click="navigate" role="link"
                                        :class="{ 'dropmenu-active': isActive }">
                                        Fire
                                    </button>
                                </RouterLink>
                                <RouterLink to="/weather/drought" custom v-slot="{ navigate, isActive }">
                                    <button class="Desktop-Nav-Dropdown-Child" @click="navigate" role="link"
                                        :class="{ 'dropmenu-active': isActive }">
                                        Drought
                                    </button>
                                </RouterLink>
                                <RouterLink to="/weather/winter" custom v-slot="{ navigate, isActive }">
                                    <button class="Desktop-Nav-Dropdown-Child" @click="navigate" role="link"
                                        :class="{ 'dropmenu-active': isActive }">
                                        Winter
                                    </button>
                                </RouterLink>
                                <RouterLink to="/weather/forecast/point" custom v-slot="{ navigate, isActive }">
                                    <button class="Desktop-Nav-Dropdown-Child" @click="navigate" role="link"
                                        :class="{ 'dropmenu-active': isActive }">
                                        Point Forecast
                                    </button>
                                </RouterLink>
                                <RouterLink to="/weather/current" custom v-slot="{ navigate, isActive }">
                                    <button class="Desktop-Nav-Dropdown-Child" @click="navigate" role="link"
                                        :class="{ 'dropmenu-active': isActive }">
                                        Current Conditions
                                    </button>
                                </RouterLink>
                            </div>
                        </Transition>

                    </div>
                    <RouterLink to="/file" custom v-slot="{ navigate, isActive }">
                        <button class="NavButton_Mobile" @click="navigate" role="link" :class="{ 'active-link': isActive }">
                            Training
                        </button>
                    </RouterLink>
                    <div class="relative" @mouseover="AboutMenu = true" @click="AboutMenu = true"
                        @mouseleave="AboutMenu = false">
                        <button class="NavButton_Mobile" role="link">
                            About and More
                        </button>
                        <Transition>
                            <div class="absolute Desktop-Nav-Dropdown" style="z-index: 500;" v-if="AboutMenu">
                                <RouterLink to="/about" custom v-slot="{ navigate, isActive }">
                                    <button class="Desktop-Nav-Dropdown-Child" @click="navigate" role="link"
                                        :class="{ 'dropmenu-active': isActive }">
                                        About WEG
                                    </button>
                                </RouterLink>
                                <RouterLink to="/contact" custom v-slot="{ navigate, isActive }">
                                    <button class="Desktop-Nav-Dropdown-Child" @click="navigate" role="link"
                                        :class="{ 'dropmenu-active': isActive }">
                                        Contact
                                    </button>
                                </RouterLink>
                                <RouterLink to="/joinWEG" custom v-slot="{ navigate, isActive }">
                                    <button class="Desktop-Nav-Dropdown-Child" @click="navigate" role="link"
                                        :class="{ 'dropmenu-active': isActive }">
                                        Join
                                    </button>
                                </RouterLink>
                                <RouterLink to="/branding" custom v-slot="{ navigate, isActive }">
                                    <button class="Desktop-Nav-Dropdown-Child" @click="navigate" role="link"
                                        :class="{ 'dropmenu-active': isActive }">
                                        Branding
                                    </button>
                                </RouterLink>
                                <RouterLink to="/mission" custom v-slot="{ navigate, isActive }">
                                    <button class="Desktop-Nav-Dropdown-Child" @click="navigate" role="link"
                                        :class="{ 'dropmenu-active': isActive }">
                                        Mission Statement
                                    </button>
                                </RouterLink>
                            </div>
                        </Transition>

                    </div>
                </div>
                <div class="fixed bottom-5 flex flex-row justify-center w-full text-white">
                    <button class="pi pi-sign-in NavBarButton" title="Sign In"></button>
                    <button class="pi pi-sign-out NavBarButton" title="Sign Out"></button>
                    <button class="pi pi-cog NavBarButton" title="Settings"></button>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
    import { useRoute } from "vue-router";
    import { ref, watch } from "vue";
    const route = useRoute();

    let WeatherMenu = ref(false);
    let AboutMenu = ref(false)
    let MobileMenu = ref(false)

    watch(route, () => {
    MobileMenu.value = false;
    });
</script>

<style scoped>
    @media (max-width: 1024px) {
        #Desktop {
            display: none;
        }
    }
    @media (min-width: 1024px) {
        #Mobile {
            display: none;
        }
    }

    .v-enter-active,
    .v-leave-active {
        transition: opacity 0.3s ease;
    }

    .v-enter-from,
    .v-leave-to {
        opacity: 0;
    }
</style>
