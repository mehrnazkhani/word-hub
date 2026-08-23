import { useSidebar } from "@/components/ui/sidebar";

export const useCloseSidebarOnClick = () => {
  const { isMobile, setOpenMobile } = useSidebar();

  return () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };
};
