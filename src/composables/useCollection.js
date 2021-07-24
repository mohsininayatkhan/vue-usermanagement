import { ref } from 'vue'
import { userFirestore } from '../firebase/config'

const useCollection = (collection) => {

  const errorCollection = ref(null)
  const isPendingCollection = ref(false)  
  const document = ref(null)   

  // add a new document
  const addDoc = async (doc) => {
    error.value = null
    isPendingCollection.value = true

    try {
      await userFirestore.collection(collection).add(doc)
      isPendingCollection.value = false;
    }
    catch(err) {
      isPendingCollection.value = false;
      console.log(err.message)
      errorCollection.value = 'could not create the document'
    }
  }

  // update a document
  const updatedDoc = async (id, doc) => {
    errorCollection.value = null
    isPendingCollection.value = true
    
    try {
      let userDoc = await userFirestore.collection(collection).doc(id).get()
      console.log(userDoc, userDoc.exists)

      if( userDoc.exists) {
        await userFirestore.collection(collection).doc(id).update(doc)
      } else {
        await userFirestore.collection(collection).doc(id).set(doc)
      }
      
      isPendingCollection.value = false;
    }
    catch(err) {
      isPendingCollection.value = false;
      console.log(err.message)
      errorCollection.value = 'could not update the document'
    }
  } 

  const getDoc = async (id) => {
    errorCollection.value = null
    isPendingCollection.value = true

    try {
      let doc = await userFirestore.collection(collection).doc(id).get()      
      isPendingCollection.value = false;
      document.value = await doc.data()
      console.log(document.value)
    }
    catch(err) {
      isPendingCollection.value = false;
      console.log(err.message)
      errorCollection.value = 'could not get the document'
    }
  }

  /*const getDoc = async (id) => {
    error.value = null
    isPending.value = true

    try {
      let doc = await userFirestore.collection(collection).doc(id).get()      
      isPending.value = false;
      document.value = await doc.data()
    }
    catch(err) {
      isPending.value = false;
      console.log(err.message)
      error.value = 'could not get the document'
    }
  }*/

  return { errorCollection, document, getDoc, addDoc, updatedDoc, isPendingCollection }
}

export default useCollection