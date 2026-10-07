import { FloatingActions } from "./floating-actions/FloatingActions";

export const AppMainContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative w-full flex-1 scroll-fade overflow-y-auto">
      {children}
      <FloatingActions />
    </main>
  );
};
