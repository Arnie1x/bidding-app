"use client";

import { DialogClose } from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import { DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { FormEvent, useState } from "react";
import { deleteProduct, placeBid, testProtectedRoute } from "@/lib/actions";
import { useRouter } from "next/router";
import { toast } from "@/hooks/use-toast";
import { store } from "@/store/store";

export function ProductBidForm({ product_id }: { product_id: number }) {
  const [amount, setAmount] = useState(0);
  const state = store.getState();
  const user = state.auth.user || {};

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await placeBid({ product_id, bid_amount: amount });
    // const res = await testProtectedRoute();
    if (res.errors) {
      toast({
        title: "Error",
        description: `${res.errors}`,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Bid placed successfully for $ " + amount,
      });
    }
    // const router = useRouter();
    // router.reload();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="flex flex-row items-center gap-4">
        <Label htmlFor="username" className="text-right text-sm">
          Bid Amount
        </Label>
        <Input type="hidden" id="product_id" value={product_id} />
        <Input
          type="number"
          id="Amount"
          placeholder="e.g. 1000"
          className="col-span-3"
          onChange={(e) => setAmount(e.target.valueAsNumber)}
        />
      </div>
      <DialogFooter className="w-full flex flex-row gap-4 justify-between sm:justify-between mt-4">
        {user.admin_id && (
          <Button onClick={async () => {
            const res = await deleteProduct(product_id);
            if (res) toast({
              title: "Success",
              description: "Product deleted successfully",
            })
            else toast({
              title: "Error",
              description: "Product deletion failed. Please try again.",
              variant: "destructive",
            })
          }} type="button" className="mt-2 sm:mt-0" variant="destructive">
            Delete
          </Button>
        )}
        <div>
          <DialogClose asChild>
            <Button type="button" className="mt-2 sm:mt-0" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button type="submit">Place Bid</Button>
        </div>
      </DialogFooter>
    </form>
  );
}
