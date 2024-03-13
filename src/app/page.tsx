export default function Home() {
  return (
    <div className="h-screen w-full text-white flex flex-col justify-start items-center gap-8 pt-40">
      <h1 className="text-4xl font-bold mb-2">Welcome to Spotify Review</h1>
      <div className="text-center text-xl">
        <p>1. Click on Authorise Access</p>
        <p>2. Get your review</p>
        <p>Click on Help for more</p>
      </div>

      <div className="bg-green-600 h-12 w-40 flex items-center justify-center rounded-2xl mt-20 hover:bg-green-500 cursor-pointer">
        <p className="font-semibold">Authorise Access</p>
      </div>
    </div>
  );
}
