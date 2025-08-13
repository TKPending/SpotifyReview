import RemoveAccessButton from "../../access/components/RemoveAccessButton";

type Props = {
  userAvatar: string;
  username: string;
};

const UserProfile = ({ userAvatar, username }: Props) => {
  const test = () => {
    //
  };
  return (
    <div className="flex sm:flex-col items-center justify-between px-8 md:px-0 md:justify-center gap-4">
      <div className="p-1 bg-green-600 rounded-full">
        <img
          src={userAvatar}
          className="h-20 w-20 lg:h-32 lg:w-32 rounded-full "
          alt="User Avatar"
        />
      </div>
      <p className="text-xl text-white font-semibold">{username}</p>
      <RemoveAccessButton handleShowModal={test} />
    </div>
  );
};

export default UserProfile;
