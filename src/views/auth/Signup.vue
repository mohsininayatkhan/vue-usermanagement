<template>
  <form @submit.prevent="handleSubmit">
      <h3>Sign Up</h3>
       <input type="title" placeholder="Title" v-model="title" required>
      <input type="email" placeholder="Email" v-model="email" required>
      <input type="password" placeholder="Password" v-model="password" required>
      <div v-if="error" class="error">{{ error }}</div>
      <button v-if="!isPending">Sign up</button>
      <button v-if="isPending" disabled>Loading</button>
  </form>
</template>

<script>
import {ref} from 'vue'
import useLogin from '@/composables/useSignup'

export default {
    name: 'Signup',
    setup() {
        const {error, signup, isPending} = useLogin()

        const email = ref('')
        const password = ref('')
        const title = ref('')

        const handleSubmit = async () => {
            const res =  await signup(email.value, password.value, title.value)

            if(!error) {
                console.log('User Loggged in')
            }
            console.log(res.user);
        }

        return {email, password, title, handleSubmit, error, isPending}
    }
}
</script>

<style>

</style>