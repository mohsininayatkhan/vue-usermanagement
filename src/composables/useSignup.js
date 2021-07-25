import { ref } from 'vue'
import { userAuth } from '../firebase/config'
import useCollection from './useCollection'

const error = ref(null)
const isPending = ref(false)

const signup = async (email, password, title) => {
  error.value = null
  isPending.value = true

  const {updatedDoc} = useCollection('users')

  try {
    const res = await userAuth.createUserWithEmailAndPassword(email, password)

    if (!res) {
      throw new Error('Could not complete signup')
    }

    await res.user.updateProfile({ displayName: title })
    
    await updatedDoc(res.user.uid, {
      'name': title,
      'email': email,
      'status': 'Online'
    })

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