type Props = {
  userAvatar: string;
  username: string;
};

const UserProfile = ({ userAvatar, username }: Props) => {
  return (
    <div className="flex sm:flex-col items-center justify-center gap-4">
      <img
        src={userAvatar}
        className="h-20 w-20 lg:h-32 lg:w-32 rounded-full "
        alt="User Avatar"
      />
      <p className="text-xl text-gray-300 font-semibold">{username}</p>
    </div>
  );
};

export default UserProfile;
