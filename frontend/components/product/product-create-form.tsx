'use client';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import { FormEvent, useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "../ui/dialog";
import { createProduct } from "@/lib/actions";
import { toast } from "@/hooks/use-toast";

const ProductCreateForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startingPrice, setStartingPrice] = useState(0);
  const [biddingEndTime, setBiddingEndTime] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await createProduct({ name, description, starting_price: startingPrice, bidding_end_time: new Date(biddingEndTime) });
      if (res.errors) {
        toast({
          title: "Error",
          description: `${res.errors}`,
          variant: "destructive",
        });
      }
      else {
        toast({
          title: "Success",
          description: "Product created successfully",
        });
      }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="startingPrice">Starting Price</Label>
        <Input
          id="startingPrice"
          name="startingPrice"
          type="number"
          value={startingPrice}
          onChange={(e) => setStartingPrice(e.target.valueAsNumber)}
        />
      </div>
      <div>
        <Label htmlFor="biddingEndTime">Bidding End Time</Label>
        <Input
          id="biddingEndTime"
          name="biddingEndTime"
          type="datetime-local"
          value={biddingEndTime}
          onChange={(e) => setBiddingEndTime(e.target.value)}
        />
      </div>
      {/* <Button type="submit">Create Product</Button> */}
      <div className="flex flex-col sm:flex-row gap-2 justify-end">
      <DialogClose asChild><Button type="button" className="mt-2 sm:mt-0" variant="secondary">Close</Button></DialogClose>
      <Button type="submit">Create</Button>
      </div>
    </form>
  );
}

export default ProductCreateForm;