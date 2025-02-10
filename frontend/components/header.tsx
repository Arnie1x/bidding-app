"use client";

import { Button } from "./ui/button";
import Divider from "./ui/divider";
import ProductCreateDialog from "./product/product-create-dialog";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/authSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { store } from "@/store/store";

export default function Header() {
    const state = store.getState();
    const user = state.auth.user;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleLogout = () => {
    dispatch(logout());
    router.push("/signin");
  };

  return (
    <header className="sticky top-0 flex w-full justify-between items-center p-5 rounded-xl bg-green-600 my-2 text-white">
      <Link href={'/'}>
          <h1 className="text-2xl font-bold">Bidding App</h1>
      </Link>
      <div className="flex gap-2 items-center h-full">
        {user && (
            <>
                <p className="text-sm px-4">Hello, { user.name }</p>
                <Divider orientation="vertical" />
            </>
        )}
        <ProductCreateDialog />
        <Divider orientation="vertical" />
        <Button onClick={handleLogout} variant="ghost">
          Sign Out
        </Button>
      </div>
    </header>
  );
}
