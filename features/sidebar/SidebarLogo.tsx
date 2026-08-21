import Image from "next/image";

export const SidebarLogo = () => {
  return (
    <div className="flex items-center px-2 pt-2">
      <Image src="/logo.png" alt="Logo" width={50} height={50} />{" "}
      <span className="font-bold">Word Hub</span>
    </div>
  );
};
