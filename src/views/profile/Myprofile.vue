<template>
  <form  @submit.prevent="handleUpdate">
      <h4>Update Profile</h4>
      <input type="text" required placeholder="Title" v-model="title">
      <input type="phone" required placeholder="Phone" v-model="phone">
      <textarea placeholder="About Yourself" v-model="about"></textarea>      
      <select v-model="status">
          <option>Online</option>
          <option>Offline</option>
      </select>
      <label>Upload profile image</label>
      <input type="file" @change="handleChange">      
      <div class="error">{{ fileError }}</div>
      <button>Update</button>
  </form>
</template>

<script>
import {ref} from 'vue'
import useStorage from '@/composables/useStorage'

export default {
    name: 'Myprofile',
    setup() {
        const {filePath, url, error, uploadImage} = useStorage()

        const title = ref('')
        const about = ref('')
        const phone = ref('')
        const status = ref('Online')

        const file = ref(null)
        const fileError = ref(null)

        const allowedFileTypes = ['image/png', 'image/jpeg'];

        const handleUpdate = async () => {
           console.log(file.value)
            if(file.value) {
                debugger
                 await uploadImage(file.value)
                 console.log('Image, ', url.value)
            }
            console.log(title.value, about.value, phone.value, status.value, file.value)
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
        return {title, about, phone, status, fileError, handleUpdate, handleChange}
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