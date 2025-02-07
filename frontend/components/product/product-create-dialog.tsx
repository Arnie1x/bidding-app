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
import { Button } from "@/components/ui/button";
import ProductCreateForm from "./product-create-form";


const ProductCreateDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"}>Create Product</Button>
      </DialogTrigger>
      <DialogContent>
      <DialogHeader>
          <DialogTitle>Create Product</DialogTitle>
        </DialogHeader>
        <ProductCreateForm />
        <DialogFooter className="flex justify-end">
          <DialogClose asChild>
            <Button type="button" className="mt-2 sm:mt-0" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button type="submit">Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductCreateDialog;