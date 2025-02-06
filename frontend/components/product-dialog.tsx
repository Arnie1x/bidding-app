import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ProductCard from "./product-card"


export function ProductDialog() {
  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer" asChild>
        <ProductCard />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Product A</DialogTitle>
          <DialogDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt sint eius aliquam in laborum voluptatem iste tempore voluptas ipsum odio.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
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
          <div className="flex flex-row items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Bid Amount
            </Label>
            <Input type="number" id="Amount" placeholder="e.g. 1000" className="col-span-3" />
          </div>
        </div>
        <DialogFooter className="flex justify-end">
        <DialogClose asChild>
            <Button type="button" className="mt-2 sm:mt-0" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button type="submit">Place Bid</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
