import AuthoriseAccess from "./components/AuthoriseAccess";

export default function Home() {
  return (
    <div className="h-screen w-full text-white flex flex-col justify-start items-center gap-8 pt-40">
      <h1 className="text-4xl font-bold mb-2">Welcome to <span className="text-green-600">Spotify</span> Review</h1>
      <div className="flex flex-col gap-2 text-center text-xl">
        <p>1. Click on <span className="text-green-600">Authorise Access</span></p>
        <p>2. Get your review</p>
        <p>Click on <span className="text-green-600">Help</span> for more</p>
      </div>

      <AuthoriseAccess />
    </div>
  );
}
