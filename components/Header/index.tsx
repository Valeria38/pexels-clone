import Image from "next/image";
import Link from "next/link";
import logoSrc from "@/assets/logo.svg";

const Header = () => {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-0 md:px-4 py-0">
      <Link href={"/"}>
        <Image
          src={logoSrc}
          loading="eager"
          alt="Pexels Clone Logo"
          sizes="64px"
        />
      </Link>
    </header>
  );
};

export default Header;
