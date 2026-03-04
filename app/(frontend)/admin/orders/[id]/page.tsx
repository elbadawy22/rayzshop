import { Orders } from "@/app/(frontend)/lib/taypes";
import UserDetailes from "../OrderDetailes";
import { getOrder } from "@/app/(frontend)/lib/services/server/orders.services";
// import { getUser } from "../actions";

const UserDetalies = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  
  const order: Orders =
    (await getOrder(id).then((res) => res.json())) || [];
    
  return (
    <div className="w-full">
      <UserDetailes order={order} />
    </div>
  );
};

export default UserDetalies;
