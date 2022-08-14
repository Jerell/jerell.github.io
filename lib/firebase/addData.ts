import { collection, addDoc, Firestore } from 'firebase/firestore';

export default async function addData(
  db: Firestore,
  collectionName: string,
  content: object
) {
  try {
    const docRef = await addDoc(collection(db, collectionName), content);
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}
