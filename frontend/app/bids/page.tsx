import { ProductDialog } from "@/components/product/product-dialog";
import { getProductsWithBids } from "@/lib/actions";

export default async function Bids() {
  const res = await getProductsWithBids();
  const products: any[] = res.data || [];
  if (!res.errors) {
  };
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl p-3 w-full font-bold">My Bids</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* {res.errors && <p>{res.errors}</p>} */}
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
              userBid={product.user_bid_amount}
            />
          ))}
      </div>
    </div>
  );
}
