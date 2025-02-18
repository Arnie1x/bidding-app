import { Button } from "./ui/button";
import Divider from "./ui/divider";
import ProductCreateDialog from "./product/product-create-dialog";
import { getSession, logout } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Header() {
  // const router = useRouter();
  // const pathName = usePathname();
  let session = await getSession();
  let user = session?.user || {};

  return (
    <header className="sticky top-0 flex w-full justify-between items-center p-5 rounded-xl bg-green-600 my-2 text-white">
      <Link href={"/"}>
        <h1 className="text-2xl font-bold">Bidding App</h1>
      </Link>
      <div className="flex gap-2 items-center h-full">
        {user.name && (
          <>
            <p className="text-sm px-4">Hello, {user.name}</p>
            <Divider orientation="vertical" />
            <form action={
              async () => {
                "use server";
                redirect("/bids");
              }
            }><Button variant="ghost">View Bids</Button></form>
            <Divider orientation="vertical" />
          </>
        )}
        {user.admin_id && (
          <>
            <ProductCreateDialog />
            <Divider orientation="vertical" />
          </>
        )}
        {user.name ? (
          <form
            action={async () => {
              "use server";
              await logout();
              redirect("/signin");
            }}
          >
            <Button type="submit" variant="ghost">
              Sign Out
            </Button>
          </form>
        ) : (
          <form
            action={async () => {
              "use server";
              redirect("/signin");
            }}
          >
            <Button type="submit" variant="ghost">
              Sign In
            </Button>
          </form>
        )}
      </div>
    </header>
  );
}
