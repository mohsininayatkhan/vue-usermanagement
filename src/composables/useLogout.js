import { ref } from 'vue'
import { userAuth } from '../firebase/config'
import useCollection from './useCollection'

// refs
const error = ref(null)
const isPending = ref(false)

// logout function
const logout = async () => {
  error.value = null
  isPending.value = true

  const {updatedDoc} = useCollection('users')

  try {    
    await updatedDoc(userAuth.currentUser.uid, {'status': 'Offline' })
    await userAuth.signOut()
    isPending.value = false
  }
  catch(err) {
    isPending.value = false
    console.log(err.message)
    error.value = err.message
  }
}

const useLogout = () => {
  return { error, logout, isPending }
}

export default useLogout