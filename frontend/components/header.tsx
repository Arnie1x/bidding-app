'use client';

import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { logOut } from "@/app/lib/actions";
import Divider from "./ui/divider";
import { getProducts } from "@/app/lib/data";
import ProductCreateDialog from "./product/product-create-dialog";

export default function Header() {
    // const user = useSession().data?.user;

    return (
        <header className="flex w-full justify-between items-center p-5 rounded-xl bg-green-600 my-2 text-white">
            <h1 className="text-2xl font-bold">Bidding App</h1>
            <div className="flex gap-2 items-center h-full">
                {/* <p>Hello, { user?.name }</p> */}
                <ProductCreateDialog />
                <Divider orientation="vertical" />
                <form action={
                    async () => {
                        await logOut();
                    }
                }><Button variant="ghost">Sign Out</Button></form>
            </div>
        </header>
    );
}