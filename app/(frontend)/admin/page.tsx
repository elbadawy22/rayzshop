import { getUsers } from "../lib/services/server/users.services";
import UsersCharts from "./components/UsersCharts";
import { getOrdrs } from "../lib/services/server/orders.services";
import OrdersCharts from "./components/OrdersCharts";
import { getProducts } from "../lib/services/server/products.services";
import ProductCategory from "./components/ProductCategory";
import { getCategories } from "../lib/services/server/categories.services";
import OrderChartColor from "./components/OrderChartColor";
import UserChartColor from "./components/UserChartColor";
import SalesOverviewChart from "./components/SalesOverviewChart";
import { redirect, RedirectType } from "next/navigation";
import { getCurrentUser } from "../lib/auth/currentUser";
import { UserProfile } from "../lib/taypes";

export default async function page() {
  const user: UserProfile = await getCurrentUser();

  if (user?.role === "ADMIN") {
  } else {
    return redirect("/unauthorized", "replace" as RedirectType);
  }
  const users = await getUsers().then((res) => res.json());
  const orders = await getOrdrs().then((res) => res.json());
  const products = await getProducts({}).then((res) => res.json());
  const categories = await getCategories();
  return (
    <div className=" ">
      <h1 className="font-bold text-2xl py-3 px-2 text-slate-800">
        {" "}
        Admin Dashboard
      </h1>
      <div className="px-3 pb-5 gap-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <UserChartColor charts={users.chart} />
        </div>
        <div>
          <SalesOverviewChart />
        </div>
        <div>
          <OrderChartColor order={orders.charts} />
        </div>
      </div>
      <div className="px-3 md:px-5 lg:px-8">
        <p className="text-xl font-bold w-full px-5 text-slate-700">Users:</p>
        <UsersCharts charts={users.chart} />
      </div>
      <div className="px-3 md:px-5 lg:px-8">
        <p className="text-xl font-bold w-full px-5 text-slate-700"> Orders:</p>
        <OrdersCharts charts={orders.charts} count={orders.count} />
      </div>
      <div className="px-3 md:px-5 lg:px-8">
        <p className="text-xl font-bold w-full px-5 text-slate-700">
          {" "}
          Categories & Products:
        </p>
        <ProductCategory
          product={products.count}
          category={categories.length}
        />
      </div>
    </div>
  );
}
