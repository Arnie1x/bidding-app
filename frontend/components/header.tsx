"use client";

import { Button } from "./ui/button";
import Divider from "./ui/divider";
import ProductCreateDialog from "./product/product-create-dialog";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/authSlice";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { store } from "@/store/store";
import { useEffect, useState } from "react";

export default function Header() {
    const router = useRouter();
    const pathName = usePathname();
    const [state, setState] = useState({})
    const [user, setUser] = useState({})

    useEffect(() => {
        const state =  store.getState();
        return setState(state);
    }, [pathName])

    useEffect(() => {
        const user =  store.getState().auth.user || {};
        return setUser(user);
    }, [state])

//   const state = store.getState();
  const dispatch = useAppDispatch();
  const handleSignout = () => {
    dispatch(logout());
    router.push("/signin");
  };
  const handleSignin = () => {
    router.push("/signin");
  };

  return (
    <header className="sticky top-0 flex w-full justify-between items-center p-5 rounded-xl bg-green-600 my-2 text-white">
      <Link href={"/"}>
        <h1 className="text-2xl font-bold">Bidding App</h1>
      </Link>
      <div className="flex gap-2 items-center h-full">
        {user.name && (
          <>
            <p className="text-sm px-4">Hello, {user.name}</p>
            <Divider orientation="vertical" />
            <Button onClick={() => router.push('/bids')} variant="ghost">
            View Bids
          </Button>
            <Divider orientation="vertical" />
          </>
        )}
        {user.admin_id && (
          <>
            <ProductCreateDialog />
            <Divider orientation="vertical" />
          </>
        )}
        {user.name ? (
          <Button onClick={handleSignout} variant="ghost">
            Sign Out
          </Button>
        ) : (
          <Button onClick={handleSignin} variant="ghost">
            Sign In
          </Button>
        )}
      </div>
    </header>
  );
}
