'use client';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
const ProductCreateForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startingPrice, setStartingPrice] = useState(0);
  const [biddingEndTime, setBiddingEndTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      name,
      description,
      starting_price: startingPrice,
      bidding_end_time: biddingEndTime,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="startingPrice">Starting Price</Label>
        <Input
          id="startingPrice"
          type="number"
          value={startingPrice}
          onChange={(e) => setStartingPrice(e.target.valueAsNumber)}
        />
      </div>
      <div>
        <Label htmlFor="biddingEndTime">Bidding End Time</Label>
        <Input
          id="biddingEndTime"
          type="datetime-local"
          value={biddingEndTime}
          onChange={(e) => setBiddingEndTime(e.target.value)}
        />
      </div>
      {/* <Button type="submit">Create Product</Button> */}
    </form>
  );
}

export default ProductCreateForm;