<template>
  <form @submit.prevent="handleSubmit">
      <h3>Login</h3>
      <input type="email" placeholder="Email" v-model="email" required>
      <input type="password" placeholder="Password" v-model="password" required>
      <div v-if="error" class="error">{{ error }}</div>
      <button v-if="!isPending">Login</button>
      <button v-if="isPending" disabled>Loading</button>
  </form>
</template>

<script>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import useLogin from '@/composables/useLogin'

export default {
    name: 'Login',
    setup() {
        const router = useRouter()
        const {error, login, isPending} = useLogin()

        const email = ref('')
        const password = ref('')

        const handleSubmit = async () => {
            const res =  await login(email.value, password.value)
            if(!error.value) {
                console.log('User Loggged in')
                router.push('/')
            }            
        }
        return {email, password, handleSubmit, error, isPending}
    }
}
</script>

<style>

</style>