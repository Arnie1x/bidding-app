import ProductCard from "@/components/product-card";
import { getProducts } from "../lib/data";
import { ProductDialog } from "@/components/product-dialog";

export default async function Dashboard() {
  // const products = await getProducts();

  return (
    <div className="flex flex-col items-center px-2">
      <h1 className="text-2xl p-3 w-full font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <ProductDialog />
        <ProductDialog />
        <ProductDialog />
        <ProductDialog />
        <ProductDialog />
        <ProductDialog />
      </div>
    </div>
  );
}