import {
  collection,
  getDocs,
  Firestore,
  DocumentData,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';

export default async function readData(db: Firestore, collectionName: string) {
  const auth = getAuth();
  await signInAnonymously(auth);

  const collectionRef = collection(db, collectionName);
  const q = query(
    collectionRef,
    where('approved', '==', true),
    orderBy('date', 'desc')
  );

  const querySnapshot = await getDocs(q);
  const data: DocumentData[] = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
}
