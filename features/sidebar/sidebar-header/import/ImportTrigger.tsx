"use client";

import { useRef, useState } from "react";
import { FolderDown } from "lucide-react";
import { toast } from "sonner";

import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { parseImportFile } from "./parseImportFile";
import { useImportDialog } from "./ImportProvider";
import { readJson } from "@/lib/utils/readJson";
import { useCloseSidebarOnClick } from "@/hooks/useCloseSidebarOnClick";

export const ImportTrigger = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [key, setKey] = useState(0);
  const { openImport } = useImportDialog();
  const closeSidebar = useCloseSidebarOnClick();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // Reset input so the same file can be selected again.
    e.target.value = "";
    if (!file) return;

    try {
      const raw = await readJson(file);
      const parsed = parseImportFile(raw);
      closeSidebar();
      openImport(parsed);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to read file.");
    } finally {
      setKey((k) => k + 1);
    }
  };

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        className="cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <FolderDown />
        <span>Import File</span>
      </SidebarMenuButton>

      <input
        key={key}
        ref={fileInputRef}
        type="file"
        accept="application/json"
        className="hidden"
        onChange={handleFileChange}
      />
    </SidebarMenuItem>
  );
};
