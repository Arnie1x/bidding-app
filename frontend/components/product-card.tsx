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
import { Button } from "./ui/button";

export default function ProductCard() {
  return (
    <Card className="md:max-w-[25rem] md:min-w-[18rem]">
      <CardHeader>
        <CardTitle>Product A</CardTitle>
        <CardDescription>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima,
          quidem incidunt. Eum modi maxime aut officia recusandae dolor voluptas
          ducimus!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">Highest Bid</TableHead>
              <TableHead className="font-bold">$ 100000</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Bidding End Time</TableCell>
              <TableCell>2024-01-01</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Starting Price</TableCell>
              <TableCell>10000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Starting Price</TableCell>
              <TableCell>10000</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="flex w-full justify-end"><Button className="mt-4">Place Bid</Button></div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
