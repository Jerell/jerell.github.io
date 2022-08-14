import {
  collection,
  getDocs,
  Firestore,
  DocumentData,
  query,
  where,
} from 'firebase/firestore';

export default async function readData(db: Firestore, collectionName: string) {
  const collectionRef = collection(db, collectionName);

  const q = query(collectionRef, where('approved', '==', true));

  const querySnapshot = await getDocs(q);
  const data: DocumentData[] = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
}
