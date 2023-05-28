import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  return (
    <header className="py-2.5 px-10 bg-white drop-shadow-lg">
      <button
        className="text-xlarge font-bold text-primary select-none"
        onClick={() => router.push("/")}
      >
        CodifyAI
      </button>
    </header>
  );
};

export default Header;
