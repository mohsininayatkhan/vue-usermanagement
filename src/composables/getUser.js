import { ref } from 'vue'
import { userAuth } from '../firebase/config'

// refs
const user = ref(userAuth.currentUser)

// auth changes
userAuth.onAuthStateChanged(_user => {
  console.log('User state change. Current user is:', _user)
  user.value = _user
});

const getUser = () => {
  return { user } 
}

export default getUser