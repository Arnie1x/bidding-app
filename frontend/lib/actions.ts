import { z } from "zod";
import { useToast } from "@/hooks/use-toast"
import { apiClient as client } from "@/utils/apiClient";

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

class Data {
    data: object | null;
    errors: any | null;
    constructor(data: object | null, errors: any | null) {
        this.data = data;
        this.errors = errors;
    }
}

// export function toast(description: string, title?: string, variant?: 'default' | 'destructive') {
//     const { toast } = useToast()
//     if (title && description && variant) {
//         toast({
//             title: title,
//             description: description,
//             variant: variant,
//         })
//     }
//     else if (title && description) {
//         toast({
//             title: title,
//             description: description,
//         })
//     }
//     else if (description) {
//         toast({
//             description: description
//     })}
// }

export async function signUp(data: SignUpFormData) {
    try {
        const schema = z.object({
            name: z.string(),
            email: z.string().email(),
            password: z.string().min(5),
            confirmPassword: z.string().min(5),
        }).safeParse(data)

        if (!schema.success) {
            return schema.error;
        }
        const res = await client.post('/signup', data);
        if (res.status === 200) {
            return res.data
        }
    } catch (error) {
        console.error(error);
    }
}

interface BidFormData {
    product_id: number;
    bid_amount: number;
}

export async function placeBid(formData: FormData) {
    try {
        const product_id = formData.get("product_id") as string;
        const res = await client.post(`/product/${product_id}/bid`, formData);
        // console.log(res.data);
        return new Data(res.data, null);
    } catch (error) {
        console.error(error);
        return new Data(null, error);
    }
}

interface ProductFormData {
    name: string;
    description: string;
    starting_price: number;
    bidding_end_time: Date;
}

export async function getProducts() {
    try {
        const res = await client.get('/products');
        // console.log(res.data);
        return res.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getProductsWithBids(headers: { [key: string]: string } | null) {
    try {
        // TODO :: Fix authentication such that I can fetch bids based on token
        if (!headers) {
            headers = {};
        }
        const res = await client.get(`/products/bids`, headers);
        if (res.data && res.status !== 200) {
            console.log(res.data);
            return new Data(null, res.data);
        }
        return new Data(res.data, null);
    } catch (error) {
        console.error(error);
        return new Data(null, error);
    }
}

export async function createProduct(formData: FormData) {
    try {
        formData.set("bidding_end_time", formData.get("bidding_end_time") as string);
        const res = await client.post('/add-product', formData);
        return new Data(res.data, null);
    } catch (error) {
        console.error(error);
        return new Data(null, error);
    }
}

export async function deleteProduct(product_id: number) {
    try {
        const res = await client.delete(`/product/${product_id}`);
        return new Data(res.data, null);
    } catch (error) {
        console.error(error);
        return new Data(null, error);
    }
}

export async function testProtectedRoute() {
    try {
        const res = await client.get('/protected');
        console.log("Protected Route Working");
        return res.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}