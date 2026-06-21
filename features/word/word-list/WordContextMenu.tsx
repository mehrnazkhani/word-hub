import {
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from "@/components/ui/context-menu";

import { AppIcons } from "@/components/icons";
import categories from "../../../lib/mock-data/categories.json";

export const WordContextMenu = () => {
  return (
    <ContextMenuContent className="space-y-1">
      <ContextMenuGroup className="space-y-1">
        <ContextMenuItem className="cursor-pointer text-xs">
          <AppIcons.EditIcon className="size-3" />
          Edit
        </ContextMenuItem>
        <ContextMenuItem className="cursor-pointer text-xs">
          <AppIcons.CopyIcon className="size-3" />
          Copy
        </ContextMenuItem>
      </ContextMenuGroup>

      <ContextMenuSub>
        <ContextMenuSubTrigger className="text-xs">
          <AppIcons.MoveIcon className="size-3" />
          Move
        </ContextMenuSubTrigger>
        <ContextMenuSubContent>
          <ContextMenuGroup className="max-h-60 space-y-2 overflow-scroll">
            {categories &&
              categories.map((item) => (
                <ContextMenuItem
                  key={item.id}
                  className="cursor-pointer text-xs"
                >
                  {item.categoryName}
                </ContextMenuItem>
              ))}
          </ContextMenuGroup>
        </ContextMenuSubContent>
      </ContextMenuSub>

      <ContextMenuSeparator />

      <ContextMenuGroup>
        <ContextMenuItem
          variant="destructive"
          className="cursor-pointer text-xs"
        >
          <AppIcons.TrashIcon className="size-3" />
          Delete
        </ContextMenuItem>
      </ContextMenuGroup>
    </ContextMenuContent>
  );
};
