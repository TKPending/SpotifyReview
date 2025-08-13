type Props = {
  ranking: number;
};

const Ranking = ({ ranking }: Props) => {
  return (
    <div className="p-2 px-4 flex items-center justify-center">
      <p className="text-green-600 font-semibold text-lg md:text-xl">
        {ranking}
      </p>
    </div>
  );
};

export default Ranking;
