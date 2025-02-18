import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "../ui/dialog";
import { createProduct } from "@/lib/actions";
import { toast } from "@/hooks/use-toast";

const ProductCreateForm = () => {
  const handleSubmit = async (formData: FormData) => {
    "use server";
    const res = await createProduct(formData);
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
    <form action={handleSubmit} className="flex flex-col gap-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Product A"
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="lorem ipsum dolor sit amet"
        />
      </div>
      <div>
        <Label htmlFor="starting_price">Starting Price</Label>
        <Input
          id="starting_price"
          name="starting_price"
          type="number"
          placeholder="e.g. 1000"
        />
      </div>
      <div>
        <Label htmlFor="biddingEndTime">Bidding End Time</Label>
        <Input
          id="bidding_end_time"
          name="bidding_end_time"
          type="datetime-local"
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