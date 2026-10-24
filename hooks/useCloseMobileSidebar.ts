import { useSidebar } from "@/components/ui/sidebar";

export const useCloseMobileSidebar = () => {
  const { isMobile, setOpenMobile } = useSidebar();

  return () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };
};
