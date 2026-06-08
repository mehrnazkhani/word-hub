export const AppMainContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative w-full flex-1 overflow-y-auto">{children}</main>
  );
};
