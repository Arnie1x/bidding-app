import { apiClient } from "@/utils/apiClient";
import axios from "axios";

export async function getProducts() {
    try {
        const res = await apiClient.get('/products');
        // console.log(res.data);
        return res.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}