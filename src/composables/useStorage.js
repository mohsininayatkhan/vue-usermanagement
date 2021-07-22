import {ref} from 'vue'
import {userStorage} from '../firebase/config'
import getUser from './getUser'

const { user } = getUser()

const useStorage = () => {
    const error = ref(null)
    const url = ref(null)
    const filePath = ref(null)

    const uploadImage = async (file) => {
        filePath.value = `profile/${user.value.uid}/${file.name}`
        const storageRef = userStorage.ref(filePath.value)

        try {
            const res = await storageRef.put(file)
            url.value = await res.ref.getDownloadURL()

        } catch(e) {
            error.value = e.message;
        }
    }
    return {filePath, url, error, uploadImage}
}
export default useStorage