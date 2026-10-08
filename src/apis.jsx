import axios from "axios";

const apiInstance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/posts"
});

export default apiInstance;
