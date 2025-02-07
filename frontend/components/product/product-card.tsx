import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";

interface ProductCardProps {
  title: string;
  description: string;
  highestBid: number;
  biddingEndTime: string;
  startingPrice: number;
}

export default function ProductCard(props: ProductCardProps) {
  return (
    <Card className="md:max-w-[25rem] md:min-w-[18rem] w-full flex flex-col justify-between">
      <CardHeader className="h-full">
        <CardTitle>{props.title}</CardTitle>
        <CardDescription className="text-ellipsis line-clamp-2 w-full h-full">
          <div className="w-full">{props.description}</div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table className="w-full h-full">
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">Highest Bid</TableHead>
              <TableHead className="font-bold">$ {props.highestBid}</TableHead>
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
        {/* <div className="flex w-full justify-end"><Button variant={"outline"} className="mt-4 w-full">View More</Button></div> */}
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
