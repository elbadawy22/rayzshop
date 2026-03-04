import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getProducts } from "../../lib/services/server/products.services";
import { Categories, Products } from "../../lib/taypes";
import SwiperHeroHome from "./SwiperHeroHome";
import { getCategories } from "../../lib/services/server/categories.services";
import CategoriesSwiper from "../puplicUsed/CategoriesSwiper";
import ProductsList from "../puplicUsed/ProductsList";

interface AllProducts extends Products {
  category: Categories;
  image: [
    {
      id: string;
      url: string;
    },
  ];
}

const HomePage = async () => {
  const products: { data: AllProducts[]; count: number } =
    (await getProducts({}).then((res) => res.json())) || [];
  const categories: Categories[] = (await getCategories()) || [];

  return (
    <div className="  w-full ">
      <div className="   overflow-hidden">
        <SwiperHeroHome categories={categories} />
      </div>
      <div>
        <div className="px-5">
          {" "}
          <CategoriesSwiper />
        </div>
        <div className=" py-5 flex justify-center items-center">
          <div className="z-0 md:px-20 ">
            <ProductsList products={products} />
          </div>
          ;
        </div>
      </div>
      <div className="w-full  bg-white shadow-2xl "></div>
      <section className="py-16 bg-linear-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of happy customers and discover your perfect product
            today
          </p>
          <Link
            href="/products"
            className="inline-flex items-center px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition"
          >
            Browse All Products
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
