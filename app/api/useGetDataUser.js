import { useEffect, useState } from "react"
import { db } from "@/firebase/firebase"
import { collection, onSnapshot } from "firebase/firestore";

const useGetDataUser = collectionName => {
    const [data, setData] = useState([])
    const collectionRef = collection(db, collectionName)

    useEffect(() => {
        const getData = async () => {

            onSnapshot(collectionRef, (snapshot) => {
                setData(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            })

        };
        getData();
    }, []);

    return { data };
};

export default useGetDataUser;