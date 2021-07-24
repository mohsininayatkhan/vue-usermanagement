import {ref} from 'vue'
import {userStorage} from '../firebase/config'
import getUser from './getUser'

const { user } = getUser()

const useStorage = () => {
    const errorStorage = ref(null)
    const url = ref(null)
    const filePath = ref(null)

    const uploadImage = async (file, path) => {
        filePath.value = path
        const storageRef = userStorage.ref(filePath.value)

        try {
            const res = await storageRef.put(file)
            url.value = await res.ref.getDownloadURL()

        } catch(e) {
            errorStorage.value = e.message;
        }
    }
    return {filePath, url, errorStorage, uploadImage}
}
export default useStorage