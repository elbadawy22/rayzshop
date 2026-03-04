import { UsersDots } from "@/app/(frontend)/lib/taypes";
import UserDetailes from "../UserDetailes";
import { getUser } from "@/app/(frontend)/lib/services/server/users.services";
// import { getUser } from "../actions";

const UserDetalies = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  
  const user: UsersDots =
    (await getUser(id).then((res) => res.json())) || [];
    
  return (
    <div className="w-full">
      <UserDetailes user={user} />
    </div>
  );
};

export default UserDetalies;
