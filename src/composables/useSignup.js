import { ref } from 'vue'
import { userAuth } from '../firebase/config'

const error = ref(null)
const isPending = ref(false)

const signup = async (email, password, title) => {
  error.value = null
  isPending.value = true

  try {
    const res = await userAuth.createUserWithEmailAndPassword(email, password)
    if (!res) {
      throw new Error('Could not complete signup')
    }
    await res.user.updateProfile({ displayName: title })
    error.value = null
    isPending.value = false
    
    return res
  }
  catch(err) {
    isPending.value = false
    console.log(err.message)
    error.value = err.message
  }
}

const useSignup = () => {
  return { error, signup, isPending }
}

export default useSignup