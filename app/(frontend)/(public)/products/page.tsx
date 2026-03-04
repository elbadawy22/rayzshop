import { getProducts } from "../../lib/services/server/products.services";
import ProductsList from "../../components/puplicUsed/ProductsList";
import { Categories, Products, SearchParamsProducts } from "../../lib/taypes";
import FilteringProducts from "./FilteringProducts";
import CategoriesSwiper from "../../components/puplicUsed/CategoriesSwiper";

interface testAny extends Products {
  category: Categories;
  image: [
    {
      id: string;
      url: string;
    },
  ];
}
const ProductsPage = async ({
  searchParams,
}: {
  [key: string]: string | string[];
}) => {
  const params = (await searchParams) as SearchParamsProducts;

  const products: { data: testAny[]; count: number } =
    (await getProducts(params).then((res) => res.json())) || [];
  return (
    <>
      <div className="   bg-white   flex flex-col justify-center items-center ">
        <div className="md:mt-5 flex flex-col justify-center items-center gap-5 w-full">
          <div className="w-full flex justify-center">
            <CategoriesSwiper />
          </div>
          <div className="flex flex-col md:flex-row  md:w-[95%] ">
            <FilteringProducts />
            <div className="z-0">
              <ProductsList products={products} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
