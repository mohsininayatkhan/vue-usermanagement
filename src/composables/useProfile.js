import {ref} from 'vue'
import { userAuth } from '../firebase/config'
import getUser from './getUser'
import useCollection from './useCollection'

const useProfile = () => {
    const errorProfile = ref(null)
    const isPendingProfile = ref(false) 
    const resUser = ref(null)
    const profileDocument = ref(null)    
    
    const { error, document, getDoc, addDoc, updatedDoc, isPending } = useCollection('users')

    const updateProfile = async (profile) => { 
         
       try{
           const resUser = getUser()  
            
            await resUser.user.value.updateProfile({displayName: profile.title, photoURL: profile.photoUrl})         
            const data = {
                'about': profile.about, 
                'status': profile.status,
                'phone': profile.phone
            };

            if(profile.filePath) {
                data.filePath = profile.filePath
            }
            
            await updatedDoc(resUser.user.value.uid, data)
            
            errorProfile.value = null
            isPendingProfile.value = false

        } catch(e) {
            console.log(e.message)
            isPendingProfile.value = false
            errorProfile.value = e.message
        }
    }

    return {errorProfile, resUser, isPendingProfile, updateProfile}
}
export default useProfile