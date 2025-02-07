import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ProductCard from "./product-card";
import { ProductBidForm } from "./product-bid-form";

interface ProductDialogProps {
  title: string;
  description: string;
  highestBid: number;
  biddingEndTime: string;
  startingPrice: number;
}

export function ProductDialog(props: ProductDialogProps) {
  // const handleBid = (e) => {
  //   e.preventDefault();
  //   console.log(bidAmount);
  // };

  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer" asChild>
        <ProductCard
          title={props.title}
          description={props.description}
          highestBid={props.highestBid}
          biddingEndTime={props.biddingEndTime}
          startingPrice={props.startingPrice}
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          <DialogDescription>{props.description}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 justify-between">
          <Table>
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold">Highest Bid</TableHead>
                <TableHead className="font-bold">
                  $ {props.highestBid}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Starting Price</TableCell>
                <TableCell>$ {props.startingPrice}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Bidding End Time</TableCell>
                <TableCell>{props.biddingEndTime}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <ProductBidForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
