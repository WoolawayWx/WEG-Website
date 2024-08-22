import { supabase } from '@/supabase'
import { createRouter, createWebHistory } from 'vue-router'
import { ref } from 'vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/weather/current',
    name: 'currentweather',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/weather/current/current_weather.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ContactView.vue')
  },
  {
    path: '/branding',
    name: 'Branding',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/BrandingView.vue')
  },
  {
    path: '/weather/severe',
    name: 'Severe Weather',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/severeView.vue')
  },
  {
    path: '/config/alert',
    name: 'Alert',
    meta: {
      requiresAuth: true,
      AdminOnly: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AlertConfigView.vue'),
  },
  {
    path: '/weather/alerts',
    name: 'NWS Alerts',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/NWSAlertsView.vue'),
  },
  {
    path: '/weather/text/products',
    name: 'NWS Text Products',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/NWSTextProducts.vue'),
  },
  {
    path: '/weather/fire',
    name: 'Fire Weather',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/weather/fire/FireWeatherHome.vue'),
  },
  {
    path: '/weather/drought',
    name: 'Drought',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/weather/droughtWeather.vue'),
  },
  {
    path: '/account',
    name: 'Account',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/userPages/UserAccount.vue'),
  },
  {
    path: '/admin/banner',
    name: 'Banner',
    meta: {
      requiresAuth: true,
      AdminOnly: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/admin pages/bannerUpdate.vue'),
  },
  {
    path: '/admin/dailyUpdate',
    name: 'Daily Update',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/admin pages/DailyUpdate.vue'),
  },
  {
    path: '/weather/winter',
    name: 'Winter Weather',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/WinterWeather.vue'),
  },
  {
    path: '/admin/packets',
    name: 'Update Packets',
    meta: {
      requiresAuth: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/components/admin/PacketConfig.vue'),
  },
  {
    path: '/weather/forecast/point',
    name: 'Point Forecast',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/pointForecast.vue'),
  },
  {
    path: '/weather',
    name: 'Weather',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/WeatherPage.vue'),
  },
  {
    path: '/weather/text/AFD',
    name: 'AFDs',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/viewAFD.vue'),
  },
  {
    path: '/events/wegcmd',
    name: 'WEG RSVP',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/special/WEG_CMD_Meeting.vue'),
  },
  {
    path: '/exp/geoWeather',
    name: 'Weather for Location',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/EXP/WeatherForLocation.vue'),
  },
  {
    path: '/posts/create',
    name: 'Create a Post',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/post/createPost_view.vue'),
  },
  {
    path: '/posts',
    name: 'Post',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/post/PostList.vue'),
  },
  {
    path: '/posts/:postID',
    name: 'Blog Post',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/post/PostView.vue'),
  },
  {
    path: '/admin/Daily',
    name: 'Daily Update',
    meta: {
      requiresAuth: true,
      AdminOnly: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/EXP/NewDailyUpdate.vue'),
  },
  {
    path: '/unauthorized',
    name: 'Unauthorized',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/unauthorizedPage.vue'),
  },
  {
    path: '/login',
    name: 'Log In',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/LoginView.vue'),
  },
  {
    path: '/admin/announcement',
    name: 'Create Announcement',
    meta: {
      requiresAuth: true,
      AdminOnly: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/admin pages/announcements/buildAnnouncements.vue'),
  },
  {
    path: '/other',
    name: 'Non-Weather',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/NonWeather_View.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404 Error',
    component: () => import('@/components/Page_404.vue')
  },
  {
    path: '/mission',
    name: 'Mission Statement',
    component: () => import('@/views/MissionStatement.vue')
  },
  {
    path: '/privacy',
    name: 'Privacy Policy',
    component: () => import('@/views/PrivacyPolicy.vue')
  },
  {
    path: '/joinWEG',
    name: 'Join the Group',
    component: () => import('@/views/joinWEG.vue')
  },
  {
    path: '/events',
    name: 'WEG Events',
    component: () => import('@/views/EventsPage.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    meta: {
      requiresAuth: true,
      AdminOnly: true
    },
    component: () => import('@/components/admin/AdminPage.vue')
  },
  {
    path: '/weather/winter/roads',
    name: 'Winter Roads',
    component: () => import('@/components/weather/winter/RoadConditions.vue')
  },
  {
    path: '/weather/winter/incidents',
    name: 'Winter Weather Incidents',
    component: () => import('@/components/weather/winter/incidents/incident_map.vue')
  },
  {
    path: '/weather/severe/reportsmap',
    name: 'Severe Weather Reports Map',
    component: () => import('@/components/weather/severe/Reports/SevereWeatherReports.vue')
  },
  {
    path: '/account/edit',
    name: 'Edit Account Infomation',
    meta: {
      requiresAuth: true,
    },
    component: () => import('@/components/account/elements/accountEdit.vue')
  },
  {
    path: '/docs/inforeq',
    name: 'WEG Information Request',
    component: () => import('@/components/infoReqPage.vue')
  },
  {
    path: '/file/:filepath*',
    name: 'File Viewer',
    props: true,
    component: () => import('@/components/pages/files/FileViewer.vue')
  },
  {
    path: '/training',
    name: 'Training',
    component: () => import('@/views/ComingSoon.vue')
  }
  // {
  //   path: '/test',
  //   name: 'Test',
  //   component: () => import('@/components/beta/TestMap.vue')
  // },

  
]



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

let dbPromise

function openDB(name, view, version = 1, autoIncrement = false) {
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(name, version)
      req.onupgradeneeded = () =>
        req.result.createObjectStore(view, { autoIncrement })
      req.onerror = () => reject(req.error)
      req.onsuccess = () => resolve(req.result)
    })
  }
  return dbPromise
}

router.beforeEach((to) => {
  // Open the connection when the page is loaded or restored from bfcache.
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      console.log('This page was restored from the bfcache.')
    } else {
      console.log('This page was loaded normally.')
    }
    openDB('bfcache', to.name)
  })

  // Close the connection to the database when the user is leaving.
  window.addEventListener('pagehide', (event) => {
    if (event.persisted) {
      console.log('This page *might* be entering the bfcache.')
    } else {
      console.log('This page will unload normally and be discarded.')
    }
    if (dbPromise) {
      dbPromise.then((db) => db.close())
      dbPromise = null
    }
  })
})

export default router

let UserName = ref("")
let LoggedIn = ref("")
let MemberRole = ref("")
let AdminRole = ref("")
let NoMetaData = ref("")
let HasAdminRole = ref("")
let isAdmin = ref("")
let isMember = ref("")

router.beforeEach(async (to, from, next) => {
  await UserRoles()
  if(to.meta.AdminOnly && isAdmin.value) {
    next()
  } else if(to.meta.AdminOnly && !isAdmin.value) {
    next('Unauthorized')
  } else if(to.meta.requiresAuth && isMember.value) {
    next()
  } else if(to.meta.requiresAuth && !isMember.value) {
    next('Unauthorized')
  } else {
    next()
  }
})

async function UserRoles() {
  var group_id = 'dfc1f42f-0fb1-413e-b02d-87950c6063ac'
  let MemberRole = await supabase.rpc('is_group_member', {group_id})
  if(MemberRole.data == true) {
      isMember.value = true
  } else {
      isMember.value = false
  }
  group_id = 'a9cbbf5c-ca54-4304-89a8-5cc69d5aadd8'
  let AdminRole = await supabase.rpc('is_group_member', {group_id})
  if(AdminRole.data == true) {
      isAdmin.value = true
  } else {
      isAdmin.value = false
  }
}

export async function SignOut() {
  await supabase.auth.signOut()
  console.log("Signed Out")
  location.reload();
}


export {
  UserName, LoggedIn, AdminRole, MemberRole, NoMetaData, HasAdminRole
}