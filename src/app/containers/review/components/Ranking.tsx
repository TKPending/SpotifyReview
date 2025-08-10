type Props = {
  ranking: number;
};

const Ranking = ({ ranking }: Props) => {
  return (
    <div className="w-12 h-12 flex items-center justify-center bg-green-600 rounded-lg">
      <p className="text-white text-3xl">{ranking}</p>
    </div>
  );
};

export default Ranking;
