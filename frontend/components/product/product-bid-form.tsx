'use client';

import { DialogClose } from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import { DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { useState } from "react";

export function ProductBidForm() {
    const [amount, setAmount] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
          amount,
        });
      };
    
    return (
        <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="flex flex-row items-center gap-4">
            <Label htmlFor="username" className="text-right text-sm">
              Bid Amount
            </Label>
            <Input
              type="number"
              id="Amount"
              placeholder="e.g. 1000"
              className="col-span-3"
              onChange={(e) => setAmount(e.target.valueAsNumber)}
            />
          </div>
          <DialogFooter className="flex justify-end mt-4">
            <DialogClose asChild>
              <Button
                type="button"
                className="mt-2 sm:mt-0"
                variant="secondary"
              >
                Close
              </Button>
            </DialogClose>
            <Button type="submit">Place Bid</Button>
          </DialogFooter>
        </form>
    );
}