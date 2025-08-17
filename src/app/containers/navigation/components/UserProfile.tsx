import RemoveAccessButton from "@/app/containers/access/components/RemoveAccessButton";

type Props = {
  userAvatar: string;
  username: string;
  handleShowModal: (decision: boolean) => void;
};

const UserProfile = ({ userAvatar, username, handleShowModal }: Props) => {
  return (
    <div className="flex sm:flex-col items-center justify-between px-8 md:px-0 md:justify-center gap-4">
      <div className="p-1 bg-green-600 rounded-full">
        <img
          src={userAvatar}
          className="h-12 w-12 md:h-20 md:w-20 lg:h-32 lg:w-32 rounded-full "
          alt="User Avatar"
        />
      </div>
      <p className="text-base md:text-xl text-white font-semibold">
        {username}
      </p>
      <RemoveAccessButton handleShowModal={handleShowModal} />
    </div>
  );
};

export default UserProfile;
