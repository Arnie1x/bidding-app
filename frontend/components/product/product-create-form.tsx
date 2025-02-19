"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "../ui/dialog";
import { createProduct } from "@/lib/actions";
import { toast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "../ui/scroll-area";
import Divider from "../ui/divider";
import { FormEvent, useState, useEffect } from "react";

const hours = [...Array(24)].map((_, i) => String(i).padStart(2, "0"));
const minutes = [...Array(60)].map((_, i) => String(i).padStart(2, "0"));

const ProductCreateForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startingPrice, setStartingPrice] = useState(0);
  const [biddingEndDate, setBiddingEndDate] = useState(new Date());
  const [biddingEndHour, setBiddingEndHour] = useState("23");
  const [biddingEndMinute, setBiddingEndMinute] = useState("59");

  useEffect(() => {
    const biddingEndDateWithTime = new Date(biddingEndDate);
    biddingEndDateWithTime.setHours(parseInt(biddingEndHour));
    biddingEndDateWithTime.setMinutes(parseInt(biddingEndMinute));
    setBiddingEndDate(biddingEndDateWithTime);
  }, [biddingEndHour, biddingEndMinute]);
  const handleSubmit = async (formEvent: FormEvent) => {
    formEvent.preventDefault();
    const res = await createProduct(
      name,
      description,
      startingPrice,
      biddingEndDate,
      biddingEndHour,
      biddingEndMinute
    );
    if (res.errors) {
      toast({
        title: "Error",
        description: `${res.errors}`,
        variant: "destructive",
      });
    } else {
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
          placeholder="Product A"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="lorem ipsum dolor sit amet"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="starting_price">Starting Price</Label>
        <Input
          id="starting_price"
          name="starting_price"
          type="number"
          placeholder="e.g. 1000"
          value={startingPrice}
          onChange={(e) => setStartingPrice(parseInt(e.target.value))}
        />
      </div>
      <div className="flex flex-row w-full gap-2">
        <div className="w-full">
          <Label htmlFor="biddingEndTime">Bidding End Date</Label>
          <Input
            id="bidding_end_date"
            name="bidding_end_date"
            type="date"
            value={biddingEndDate.toISOString().split("T")[0]}
            onChange={(e) => setBiddingEndDate(new Date(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="biddingEndTime">Bidding End Time</Label>
          <div className="flex flex-row gap-2">
            <Select
              onValueChange={setBiddingEndHour}
              value={biddingEndHour}
              name="bidding_end_hour"
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="HH" />
              </SelectTrigger>
              <SelectContent>
                {hours.map((hour) => (
                  <div>
                    <SelectItem key={hour} value={hour}>
                      {hour}
                    </SelectItem>
                    <Divider orientation="horizontal" />
                  </div>
                ))}
              </SelectContent>
            </Select>
            <Select
              onValueChange={setBiddingEndMinute}
              value={biddingEndMinute}
              name="bidding_end_minute"
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="MM" />
              </SelectTrigger>
              <SelectContent>
                <ScrollArea className="h-72">
                  {minutes.map((minute) => (
                    <div>
                      <SelectItem key={minute} value={minute}>
                        {minute}
                      </SelectItem>
                      <Divider orientation="horizontal" />
                    </div>
                  ))}
                </ScrollArea>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      {/* <Button type="submit">Create Product</Button> */}
      <div className="flex flex-col sm:flex-row gap-2 justify-end">
        <DialogClose asChild>
          <Button type="button" className="mt-2 sm:mt-0" variant="secondary">
            Close
          </Button>
        </DialogClose>
        <Button type="submit">Create</Button>
      </div>
    </form>
  );
};

export default ProductCreateForm;
