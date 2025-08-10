type Props = {
  ranking: number;
};

const Ranking = ({ ranking }: Props) => {
  return (
    <div className="absolute top-5 right-5 p-2 px-4 flex items-center justify-center">
      <p className="text-green-600 font-semibold text-xl">{ranking}</p>
    </div>
  );
};

export default Ranking;
