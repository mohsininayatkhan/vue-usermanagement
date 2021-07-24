<template>
  <form @submit.prevent="handleSubmit">
      <h3>Sign Up</h3>
       <input type="title" placeholder="Full Name" v-model="title" required>
      <input type="email" placeholder="Email" v-model="email" required>
      <input type="password" placeholder="Password" v-model="password" required>
      <div v-if="error" class="error">{{ error }}</div>
      <button v-if="!isPending">Sign up</button>
      <button v-if="isPending" disabled>Loading</button>
  </form>
</template>

<script>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import useLogin from '@/composables/useSignup'

export default {
    name: 'Signup',
    setup() {
        const router = useRouter()
        const {error, signup, isPending} = useLogin()

        const email = ref('')
        const password = ref('')
        const title = ref('')

        const handleSubmit = async () => {
            const res =  await signup(email.value, password.value, title.value)

            if(!error.value) {
                console.log('User Signed in', res.user)
                router.push('/')
            }           
        }

        return {email, password, title, handleSubmit, error, isPending}
    }
}
</script>

<style>

</style>