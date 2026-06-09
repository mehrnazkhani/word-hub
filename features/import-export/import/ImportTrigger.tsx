"use client";

import { useRef, useState } from "react";
import { AppIcons } from "@/components/icons";

import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";

export const ImportTrigger = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [key, setKey] = useState(0);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        className="cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <AppIcons.ImportIcon className="text-app-secondary" />
        <span className="x text-app-primary">Import File</span>
      </SidebarMenuButton>

      <input
        key={key}
        ref={fileInputRef}
        type="file"
        accept="application/json"
        className="hidden"
      />
    </SidebarMenuItem>
  );
};
