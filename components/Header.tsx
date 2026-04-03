import Image from "next/image";

const Header = () => {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-0">
      <Image src="/logo.svg" alt="Pexels Clone Logo" width={64} height={64} />
    </header>
  );
};

export default Header;
