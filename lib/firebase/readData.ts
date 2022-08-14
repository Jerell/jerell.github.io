import {
  collection,
  getDocs,
  Firestore,
  DocumentData,
} from 'firebase/firestore';

export default async function readData(db: Firestore, collectionName: string) {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const data: DocumentData[] = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
}
