import { ref } from 'vue'
import { userFirestore } from '../firebase/config'

const useCollection = (collection) => {

  const error = ref(null)
  const isPending = ref(false)

  // add a new document
  const addDoc = async (doc) => {
    error.value = null
    isPending.value = true

    try {
      await userFirestore.collection(collection).add(doc)
      isPending.value = false;
    }
    catch(err) {
      isPending.value = false;
      console.log(err.message)
      error.value = 'could not create the document'
    }
  }

  // update a document
  const updatedDoc = async (id, doc) => {
    error.value = null
    isPending.value = true

    
    try {
      let userDoc = await userFirestore.collection(collection).doc(id).get()
      console.log(userDoc, userDoc.exists)

      if( userDoc.exists) {
        await userFirestore.collection(collection).doc(id).update(doc)
      } else {
        await userFirestore.collection(collection).doc(id).set(doc)
      }
      
      isPending.value = false;
    }
    catch(err) {
      isPending.value = false;
      console.log(err.message)
      error.value = 'could not update the document'
    }
  }

  return { error, addDoc, updatedDoc, isPending }

}

export default useCollection