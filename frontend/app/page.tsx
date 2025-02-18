import { getProducts } from "@/lib/actions";
import { ProductDialog } from "@/components/product/product-dialog";
import { formatDateTime } from "@/app/lib/utils";
import { getSession } from "@/lib/auth";

export default async function Dashboard() {
  const products = await getProducts();

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl p-3 w-full font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products &&
          products.map((product) => (
            <ProductDialog
              key={product.product_id}
              product_id={product.product_id}
              title={product.name}
              description={product.description}
              highestBid={product.highest_bid}
              biddingEndTime={product.bidding_end_time}
              startingPrice={product.starting_price}
            />
          ))}
      </div>
    </div>
  );
}
