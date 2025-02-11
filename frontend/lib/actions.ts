import { apiClient } from "@/utils/apiClient";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast"



interface SignUpFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
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
        const res = await apiClient.post('/signup', data);
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

export async function placeBid(data: BidFormData) {
    try {
        const res = await apiClient.post(`/product/${data.product_id}/bid`, data);
        // console.log(res.data);
        // toast(`Bid placed successfully for $ ${data.bid_amount}`, "Success");
        return res.data;
    } catch (error) {
        console.error(error);
        // toast("Something went wrong while placing the bid. Please try again.", "Error", "destructive");
        return null;
    }
}

export async function testProtectedRoute() {
    try {
        const res = await apiClient.get('/protected');
        // console.log(res.data);
        return res.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}