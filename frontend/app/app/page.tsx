import ProductCard from "@/components/product-card";
import { getProducts } from "../lib/data";
import { ProductDialog } from "@/components/product-dialog";

export default async function Dashboard() {
  const products = await getProducts();

  return (
    <div className="flex flex-col items-center px-2">
      <h1 className="text-2xl p-3 w-full font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* {products.map((product) => (
          <ProductDialog
            key={product.id}
            title={product.title}
            description={product.description}
            highestBid={product.highestBid}
            biddingEndTime={product.biddingEndTime}
            startingPrice={product.startingPrice}
          />
        ))} */}
        <ProductDialog
          title="Product 1"
          description="lorem ipsum dolor sit amet con sectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          highestBid={1000}  // Replace with the actual highest bid
          biddingEndTime="2023-06-30"  // Replace with the actual bidding end time
          startingPrice={50}  // Replace with the actual starting price
        />
      </div>
    </div>
  );
}