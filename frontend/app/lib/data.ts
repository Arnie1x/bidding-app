import axios from "axios";

export async function getProducts() {
    try {
        const res = await axios.get('http://localhost:8000/products');
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}