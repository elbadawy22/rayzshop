import { Categories, Products,} from "@/app/(frontend)/lib/taypes";
import ProductDetailes from "../ProductDetailes"; 
import { getProduct } from "@/app/(frontend)/lib/services/server/products.services";
// import { getUser } from "../actions";

const UserDetalies = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  
  const product: Products =
    (await getProduct(id).then((res) => res.json())) || [];
    
  return (
    <div className="w-full">
      <ProductDetailes product={product} />
    </div>
  );
};

export default UserDetalies;
