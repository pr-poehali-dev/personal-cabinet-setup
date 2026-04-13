/* eslint-disable @typescript-eslint/no-explicit-any */
import Icon from "@/components/ui/icon";

export type Tab = "profile" | "subscriptions" | "support";

export const NAV_ITEMS: { id: Tab; label: string; icon: string }[] = [
  { id: "profile", label: "Мои данные", icon: "User" },
  { id: "subscriptions", label: "Мои подписки", icon: "CreditCard" },
  { id: "support", label: "Поддержка", icon: "MessageCircle" },
];

interface SidebarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="lk-sidebar">
      <div className="lk-sidebar-logo">
        <div style={{ fontSize: 36 }}>🦕</div>
        <div className="lk-sidebar-brand">Логоша</div>
        <div className="lk-sidebar-tagline">Большой опыт работы<br />в области с детьми</div>
      </div>

      <nav className="lk-nav">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`lk-nav-item${activeTab === item.id ? " active" : ""}`}
          >
            <Icon name={item.icon as any} size={16} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="lk-sidebar-bottom">
        <button className="lk-logout-btn">
          <Icon name="LogOut" size={15} />
          Выйти из аккаунта
        </button>
      </div>
    </aside>
  );
}
