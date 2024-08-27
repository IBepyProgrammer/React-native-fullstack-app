import { useEffect, useState } from "react";
import { Alert } from "react-native";

const useAppwrite = (fn) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        setIsLoading(true);

        try {
            // Below instead of calling the getAllPosts function, we can call "fn".
            // This is because we will pass getAllPosts as a function through props.

            // const response = await getAllPosts();
            const response = await fn();
            setData(response);
        } catch (error) {
            Alert.alert("Error", error.message)
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    // We can create another function called refetch
    // This will be a callback function that calls the data one more time on refresh(using refreshControl.)
    // Note that, to use the fetchData function, we move it out of the useEffect.
    const refetch = () => fetchData();

    // We can console.log the data from appwrite to the terminal to check if the data we added manually was fetched correctly.
    // console.log(data);

    // Since we are using a custom hook, we can return "data" instead of console.log of the fetched data.
    return { data, isLoading, refetch }
}

export default useAppwrite;