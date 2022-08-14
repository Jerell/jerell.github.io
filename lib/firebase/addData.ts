import { collection, addDoc, Firestore } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';

export default async function addData(
  db: Firestore,
  collectionName: string,
  content: object
) {
  const auth = getAuth();
  await signInAnonymously(auth);
  try {
    const docRef = await addDoc(collection(db, collectionName), content);
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}
