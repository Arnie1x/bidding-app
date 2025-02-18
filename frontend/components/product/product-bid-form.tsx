import { DialogClose } from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import { DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { deleteProduct, placeBid, testProtectedRoute } from "@/lib/actions";
import { toast } from "@/hooks/use-toast";
import { getSession } from "@/lib/auth";

export async function ProductBidForm({ product_id }: { product_id: number }) {
  const session = await getSession();
  const user = session?.user || {};

  const handleSubmit = async (formData: FormData) => {
    "use server";
    const res = await placeBid(formData);
    // const res = await testProtectedRoute();
    if (res.errors) {
      toast({
        title: "Error",
        description: `${res.errors}`,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Bid placed successfully for $ " + formData.get("amount"),
      });
    }
    // const router = useRouter();
    // router.reload();
  };

  return (
    <div className="flex flex-col items-end gap-2">
      <form action={handleSubmit} className="flex flex-col w-full">
        <div className="flex flex-row items-center gap-4">
          <Label htmlFor="username" className="text-right text-sm">
            Bid Amount
          </Label>
          <Input
            type="hidden"
            id="product_id"
            name="product_id"
            value={product_id}
          />
          <Input
            type="number"
            id="Amount"
            name="amount"
            placeholder="e.g. 1000"
            className="col-span-3"
          />
        </div>
        <DialogFooter className="w-full flex flex-row gap-4 justify-between sm:justify-between mt-4">
          {user.admin_id && <></>}
          <div className="w-full flex justify-end gap-4">
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
          </div>
        </DialogFooter>
      </form>
      <form className="absolute bottom-0 left-0 p-6"
        action={async () => {
          "use server";
          const res = await deleteProduct(product_id);
          if (res)
            toast({
              title: "Success",
              description: "Product deleted successfully",
            });
          else
            toast({
              title: "Error",
              description: "Product deletion failed. Please try again.",
              variant: "destructive",
            });
        }}
      >
        <Button type="submit" className="mt-2 sm:mt-0" variant="destructive">
          Delete
        </Button>
      </form>
    </div>
  );
}
