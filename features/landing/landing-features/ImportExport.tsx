"use client";

import { CardContent } from "@/components/ui/card";
import { FeatureShowcaseContainer } from "./FeatureShowcaseContainer";
import { Upload, Download, FolderOpen, Folder } from "lucide-react";

const LEFT_ICONS = [
  { size: 26, iconSize: 11, top: 60, left: 75, bg: "bg-accent-foreground/20" },
  { size: 36, iconSize: 15, top: 0, left: 45, bg: "bg-accent-foreground/15" },
  { size: 44, iconSize: 18, top: 45, left: 0, bg: "bg-accent-foreground/10" },
];

const RIGHT_ICONS = [
  { size: 26, iconSize: 11, top: 20, left: 32, bg: "bg-accent-foreground/20" },
  { size: 36, iconSize: 15, top: 60, left: 60, bg: "bg-accent-foreground/15" },
  { size: 44, iconSize: 18, top: 0, left: 90, bg: "bg-accent-foreground/10" },
];

export const ImportExport = () => {
  return (
    <FeatureShowcaseContainer
      index="06 / Import - export"
      title="Share & Import Categories"
      description="Export your word categories and share them with friends, or import categories others have created — learn together and grow your vocabulary as a team"
      position="left"
    >
      <CardContent
        className="group flex h-full w-full items-center justify-center gap-2 px-2 py-2"
        aria-hidden="true"
      >
        {/* Left — Upload / Export */}
        <div className="relative shrink-0" style={{ width: 130, height: 80 }}>
          {LEFT_ICONS.map((ic, i) => (
            <div
              key={i}
              className={`absolute flex items-center justify-center rounded-full transition-colors duration-500 ${ic.bg}`}
              style={{
                width: ic.size,
                height: ic.size,
                top: ic.top,
                left: ic.left,
              }}
            >
              <Upload
                className="text-accent-foreground/50 transition-colors duration-500 group-hover:text-accent-foreground/80"
                style={{ width: ic.iconSize, height: ic.iconSize }}
                strokeWidth={1.5}
              />
            </div>
          ))}
        </div>

        {/* Center — Folder */}
        <div className="relative z-10 size-16 shrink-0">
          <FolderOpen
            className="absolute inset-0 size-16 text-accent-foreground/50 opacity-100 transition-all duration-500 group-hover:opacity-0"
            strokeWidth={1}
          />
          <Folder
            className="absolute inset-0 size-15 text-accent-foreground/60 opacity-0 transition-all duration-500 group-hover:opacity-100"
            strokeWidth={1}
          />
        </div>

        {/* Right — Download / Import */}
        <div className="relative shrink-0" style={{ width: 130, height: 80 }}>
          {RIGHT_ICONS.map((ic, i) => (
            <div
              key={i}
              className={`absolute flex items-center justify-center rounded-full transition-colors duration-500 ${ic.bg}`}
              style={{
                width: ic.size,
                height: ic.size,
                top: ic.top,
                left: ic.left,
              }}
            >
              <Download
                className="text-accent-foreground/50 transition-colors duration-500 group-hover:text-accent-foreground/80"
                style={{ width: ic.iconSize, height: ic.iconSize }}
                strokeWidth={1.5}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </FeatureShowcaseContainer>
  );
};
