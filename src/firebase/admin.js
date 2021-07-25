import * as admin from "firebase-admin"
import serviceAccountKey from './serviceAccountKey.json'

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey)
});

export default admin