import { Categories,} from "@/app/(frontend)/lib/taypes";
import CategoryDetailes from "../CategoryDetailes"; 
import { getCategory } from "@/app/(frontend)/lib/services/server/categories.services";
// import { getUser } from "../actions";

const UserDetalies = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  
  const category: Categories =
    (await getCategory(id).then((res) => res.json())) || [];
    
  return (
    <div className="w-full">
      <CategoryDetailes category={category} />
    </div>
  );
};

export default UserDetalies;
