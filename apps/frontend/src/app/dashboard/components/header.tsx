import { ToggleThemeButton } from "@/components/common/toggle-theme-button";
import { MobileNav } from "./nav";
import UserDropdown from "./user-dropdown";

export default function Header() {
  return (
    <header className="flex h-14 items-center justify-between md:justify-end gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <MobileNav />
      <div className="flex gap-2">
        <ToggleThemeButton variant="ghost" className="rounded-full" />
        <UserDropdown />
      </div>
    </header>
  );
}
