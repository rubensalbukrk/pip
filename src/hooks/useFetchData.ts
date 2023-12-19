import React, {useState, useEffect} from 'react'

export const useFetchData = <T>(fetchData: () => Promise<T[]>) => {
    const [list, setList] = useState<T[]>([]);
    
    async function getData() {
        const list = await fetchData();
        setList(list)
    }

    useEffect(() => {
        fetchData().then((list => {
            setList(list)
        }))
    },[])
    
    return { list, getData}
}