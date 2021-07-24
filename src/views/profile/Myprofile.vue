<template>
  <form  @submit.prevent="handleUpdate">
      <h4>Update Profile</h4>
      <div v-if="error" class="error">{{ error }}</div>
      <input type="text" required placeholder="Title" v-model="title">
      <input type="phone" required placeholder="Phone" v-model="phone">
      <textarea placeholder="About Yourself" v-model="about"></textarea>      
      <select v-model="status">
          <option>Online</option>
          <option>Offline</option>
      </select>
      <label>Upload profile image</label>
      <input type="file" @change="handleChange">      
      <div v-if="fileError" class="error">{{ fileError }}</div>
      <button v-if="!isPending">Update</button>
      <button v-if="isPending" disabled>Loading...</button>
  </form>
</template>

<script>
import {ref, onMounted} from 'vue'
import {useRouter} from 'vue-router'
import useStorage from '@/composables/useStorage'
import useProfile from '@/composables/useProfile'
import getUser from '@/composables/getUser'
import useCollection from '@/composables/useCollection'


export default {
    name: 'Myprofile',
    setup() {

        const router = useRouter()

        const {filePath, url, errorStorage, uploadImage} = useStorage()
        const {errorProfile, resUser, isPendingProfile, updateProfile} = useProfile()
        const { errorCollection, document, getDoc, addDoc, updatedDoc, isPendingCollection } = useCollection('users')

        const {user} = getUser() 

        const error = ref('')
        const title = ref('')
        const about = ref('')
        const phone = ref('')
        const status = ref('Online')
        const isPending = ref(false)

        const file = ref(null)
        const fileError = ref(null)
        const allowedFileTypes = ['image/png', 'image/jpeg'];

        onMounted(async () => {
            await getDoc(user.value.uid);

            if(errorCollection.value) {
                error.value = errorCollection.value
                isPending.value = false
                return
            }

            title.value = user.value.displayName
            if(document.value) {
                 about.value = document.value.about
                 phone.value = document.value.phone
                 status.value = document.value.status
            }           
        })

        const handleUpdate = async () => {  
            isPending.value = true

            let data = {
                title: title.value,
                phone: phone.value,
                about: about.value,
                status: status.value
            }

            // uploading file
            if(file.value) {
                const filePath = `profile/${user.value.uid}/${file.value.name}`
                await uploadImage(file.value, filePath)

                if(errorStorage.value) {
                    error.value = errorStorage.value
                    isPending.value = false
                    return
                }
                data.photoUrl = url.value
                data.filePath = filePath.value
            }

            await updateProfile(data)

            if(errorProfile.value) {
               error.value = errorProfile.value
                isPending.value = false
                return 
            }
            
            isPending.value = false
            router.push('/')
        }

        const handleChange = (e) => {           
            const selectedFile = e.target.files[0]
            if(selectedFile && allowedFileTypes.includes(selectedFile.type)) {
                file.value = selectedFile
                fileError.value = null
            } else {
                file.value = null;
                fileError.value = 'Please select allowed file types (png or jpeg)'
            }
        }
        return {title, about, phone, status, fileError, error, isPending, handleUpdate, handleChange}
    }
}
</script>

<style>
input[type="file"] {
    border: 0;
    padding: 0px;
}
label {
    font-size: 12px;
    display: block;
    margin-top: 30px;
}
button {
    margin-top: 20px;
}
</style>