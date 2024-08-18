import axios from "axios"
const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then((response) => {
        console.log("promise fulfilled");
        return response.data;
      });
}

const create = newUser => {
    const request = axios.post(baseUrl, newUser)
    return request.then(response => {
        console.log("User added:", response.data);
    return response.data;})
    .catch((error) => {
        console.log("Error adding user:", error);
      });

    };


export default {
    getAll,
    create,
}