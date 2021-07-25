<template>
  <div class="navbar">
    <nav>
      <img src="@/assets/logo.png" alt="My Project">
      <h1>
        <router-link :to="{name: 'Home'}">My Project</router-link>        
      </h1>
      <div class="links">
            <div v-if="user">
               <router-link class="btn" :to="{name: 'Myprofile'}">My Profile</router-link>
               <router-link class="btn" :to="{name: 'Users'}">Users</router-link>
              <span class="current-user">Hi {{ user.displayName}}</span>
              <button @click="handleLogout">Logout</button>
            </div>
            <div v-else>
               <router-link class="btn" :to="{name: 'Signup'}">Signup</router-link>
               <router-link class="btn" :to="{name: 'Login'}">Login</router-link>
            </div>
        </div>
    </nav>
  </div>
</template>

<script>
import useLogout from '@/composables/useLogout'
import getUser from '@/composables/getUser'
import {useRouter} from 'vue-router'
import { ref, watch } from 'vue'

export default {
  setup() {
    
    const {user} = getUser()
    const {logout} = useLogout()
    const router = useRouter()

    const handleLogout = async () => {
      await logout();
      router.push({name: 'Login'})
    }

   
    return {user, handleLogout}
  },
 
}
</script>

<style scoped>
.navbar {
    padding: 16px 10px;
    margin-bottom: 60px;
    background: white;
}
nav {
    display: flex;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
}
nav h1 {
    margin-left: 20px;
}
nav .links {
    margin-left: auto;
}
nav .links a, button {
    margin-left: 16px;
    font-size: 14px;
}
nav img {
    max-height: 60px;
}
span {
  font-size: 14px;
  display: inline-block;
  margin-left: 14px;
  padding-left: 14px;
  border-left: 1px solid #eee;
}
</style>