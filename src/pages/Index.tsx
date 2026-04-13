/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Icon from "@/components/ui/icon";

type Tab = "profile" | "subscriptions" | "support";

interface Notification {
  id: number;
  type: "info" | "success" | "warning";
  title: string;
  text: string;
  time: string;
  read: boolean;
}

const NOTIFICATIONS: Notification[] = [
  { id: 1, type: "success", title: "Подписка активирована", text: "Ваш план Премиум продлён на 30 дней.", time: "2 мин назад", read: false },
  { id: 2, type: "warning", title: "Срок оплаты", text: "До следующего списания осталось 5 дней.", time: "1 час назад", read: false },
  { id: 3, type: "info", title: "Новый ответ в поддержке", text: "Менеджер ответил на ваше обращение.", time: "3 часа назад", read: false },
  { id: 4, type: "info", title: "Обновление системы", text: "Плановые работы завершены, всё работает стабильно.", time: "Вчера", read: true },
  { id: 5, type: "success", title: "Данные сохранены", text: "Профиль успешно обновлён.", time: "2 дня назад", read: true },
];

const NOTIF_META = {
  info: { icon: "Info", color: "var(--sky)", bg: "var(--sky-bg)" },
  success: { icon: "CheckCircle", color: "var(--mint)", bg: "var(--mint-bg)" },
  warning: { icon: "AlertTriangle", color: "var(--coral)", bg: "var(--coral-bg)" },
};

const NAV_ITEMS: { id: Tab; label: string; icon: string }[] = [
  { id: "profile", label: "Мои данные", icon: "User" },
  { id: "subscriptions", label: "Мои подписки", icon: "CreditCard" },
  { id: "support", label: "Поддержка", icon: "MessageCircle" },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(NOTIFICATIONS);
  const [profileData, setProfileData] = useState({
    name: "Мария Иванова",
    email: "ivanova@example.ru",
    phone: "+7 (999) 123-45-67",
  });

  const unreadCount = notifications.filter((n) => !n.read).length;
  const markAllRead = () => setNotifications((p) => p.map((n) => ({ ...n, read: true })));
  const markRead = (id: number) => setNotifications((p) => p.map((n) => n.id === id ? { ...n, read: true } : n));

  const pageTitles: Record<Tab, string> = {
    profile: "Личный кабинет",
    subscriptions: "Личный кабинет",
    support: "Личный кабинет",
  };

  return (
    <div className="lk-layout">
      {/* ── Sidebar ── */}
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
              onClick={() => { setActiveTab(item.id); setNotifOpen(false); }}
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

      {/* ── Main ── */}
      <div className="lk-main">
        {/* Header */}
        <header className="lk-header">
          <span className="lk-header-title">{pageTitles[activeTab]}</span>
          <div className="lk-header-right">
            {/* Bell */}
            <div className="relative">
              <button className="lk-bell-btn" onClick={() => setNotifOpen((v) => !v)}>
                <Icon name="Bell" size={20} />
                {unreadCount > 0 && <span className="lk-notif-badge">{unreadCount}</span>}
              </button>

              {notifOpen && (
                <div className="notif-panel">
                  <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
                    <span style={{ fontFamily: "'Golos Text'", fontWeight: 700, fontSize: 15, color: "#1A1A1A" }}>
                      Уведомления
                    </span>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllRead}
                        style={{ fontSize: 12, fontWeight: 600, color: "var(--orange)", fontFamily: "'Golos Text'" }}
                      >
                        Прочитать все
                      </button>
                    )}
                  </div>
                  <div style={{ maxHeight: 340, overflowY: "auto" }}>
                    {notifications.map((n) => {
                      const m = NOTIF_META[n.type];
                      return (
                        <div
                          key={n.id}
                          onClick={() => markRead(n.id)}
                          className="flex gap-3 px-5 py-3.5 cursor-pointer"
                          style={{
                            background: n.read ? "transparent" : "rgba(245,130,13,0.03)",
                            borderBottom: "1px solid #F5F5F5",
                          }}
                        >
                          <div
                            className="rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ width: 34, height: 34, background: m.bg, color: m.color }}
                          >
                            <Icon name={m.icon as any} size={15} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <span style={{ fontWeight: 600, fontSize: 13, color: "#1A1A1A", fontFamily: "'Golos Text'" }}>
                                {n.title}
                              </span>
                              {!n.read && (
                                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--orange)", flexShrink: 0, marginTop: 4, display: "block" }} />
                              )}
                            </div>
                            <p style={{ fontSize: 12, color: "#888", marginTop: 2, lineHeight: 1.4 }}>{n.text}</p>
                            <span style={{ fontSize: 11, color: "#BBBBBB", marginTop: 3, display: "block" }}>{n.time}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* User */}
            <button className="lk-user-btn">
              <div className="lk-user-avatar">
                {profileData.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
              </div>
              <div className="lk-user-info">
                <div className="lk-user-name">{profileData.name}</div>
                <div className="lk-user-email">{profileData.email}</div>
              </div>
              <Icon name="ChevronDown" size={14} style={{ color: "#AAA", marginLeft: 2 }} />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="lk-content animate-fade-in" key={activeTab}>
          {activeTab === "profile" && <ProfileTab data={profileData} setData={setProfileData} />}
          {activeTab === "subscriptions" && <SubscriptionsTab />}
          {activeTab === "support" && <SupportTab />}
        </main>

        {/* Footer */}
        <footer className="lk-footer">
          <span>© 2024 Логоша. Все права защищены.</span>
          <div className="flex gap-6">
            <a href="#">Условия использования</a>
            <a href="#">Политика конфиденциальности</a>
            <a href="#">Контакты</a>
          </div>
          <div className="flex gap-3">
            {["🎵", "✈️", "▶️"].map((ico, i) => (
              <span key={i} style={{ fontSize: 16, cursor: "pointer", opacity: 0.7 }}>{ico}</span>
            ))}
          </div>
        </footer>
      </div>

      {notifOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════
   PROFILE TAB
═══════════════════════════════════════ */
function ProfileTab({
  data,
  setData,
}: {
  data: { name: string; email: string; phone: string };
  setData: (d: any) => void;
}) {
  const [form, setForm] = useState(data);
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);

  return (
    <>
      <h1 className="lk-page-title">Мои данные</h1>

      <div className="grid gap-6" style={{ gridTemplateColumns: "1fr 1fr" }}>
        {/* Personal data */}
        <div className="lk-card">
          <div className="space-y-4">
            <div>
              <label className="lk-label">ФИО</label>
              <input
                className="lk-input"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className="lk-label">E-mail</label>
              <div className="relative">
                <input
                  className="lk-input"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={{ paddingRight: 36 }}
                />
                <Icon name="ChevronDown" size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="lk-label">Телефон</label>
              <input
                className="lk-input"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button className="btn-coral" style={{ fontSize: 14, padding: "10px 20px" }} onClick={() => setForm(data)}>Отменить</button>
            <button className="btn-orange" onClick={() => setData(form)}>Сохранить</button>
          </div>
        </div>

        {/* Password */}
        <div className="lk-card">
          <h2 style={{ fontFamily: "'Golos Text'", fontWeight: 700, fontSize: 17, color: "#1A1A1A", marginBottom: 20 }}>
            Изменение пароля
          </h2>
          <div className="space-y-4">
            <div>
              <label className="lk-label">Новый пароль</label>
              <div className="relative">
                <input
                  className="lk-input"
                  type={showPw ? "text" : "password"}
                  placeholder="Новый пароль"
                  style={{ paddingRight: 40 }}
                />
                <button
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  type="button"
                >
                  <Icon name={showPw ? "EyeOff" : "Eye"} size={16} />
                </button>
              </div>
            </div>
            <div>
              <label className="lk-label">Повторите пароль</label>
              <div className="relative">
                <input
                  className="lk-input"
                  type={showPw2 ? "text" : "password"}
                  placeholder="Повторите пароль"
                  style={{ paddingRight: 40 }}
                />
                <button
                  onClick={() => setShowPw2((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  type="button"
                >
                  <Icon name={showPw2 ? "EyeOff" : "Eye"} size={16} />
                </button>
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button className="btn-coral" style={{ fontSize: 14, padding: "10px 20px" }}>Отменить</button>
            <button className="btn-orange">Сохранить</button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════
   SUBSCRIPTIONS TAB
═══════════════════════════════════════ */
function SubscriptionsTab() {
  const features = [
    { icon: "BookOpen", title: "Доступ ко всем материалам", desc: "Более 1000+ упражнений" },
    { icon: "Gamepad2", title: "Игры и интерактивы", desc: "Развивающие игры для детей" },
    { icon: "Cloud", title: "100 ГБ облачного хранилища", desc: "Для ваших файлов и проектов" },
    { icon: "Infinity", title: "Безлимитный доступ", desc: "Без ограничений по времени" },
    { icon: "Zap", title: "Приоритетная поддержка", desc: "Быстрый ответ на ваши вопросы" },
    { icon: "RefreshCw", title: "Регулярные обновления", desc: "Новый контент каждую неделю" },
  ];

  const altPlans = [
    { name: "Пробный", desc: "Попробуйте бесплатно" },
    { name: "Доверяю", desc: "Стандартный доступ" },
  ];

  return (
    <>
      <div className="flex items-start justify-between mb-2">
        <div>
          <h1 className="lk-page-title">Мои подписки</h1>
          <p className="lk-page-subtitle">Управляйте своими подписками и тарифами</p>
        </div>
        <button className="btn-mint" style={{ fontSize: 13, padding: "9px 16px" }}>
          <Icon name="Receipt" size={14} />
          История платежей
        </button>
      </div>

      {/* Hero subscription card */}
      <div className="sub-hero">
        <div className="sub-hero-top">
          <div className="sub-hero-left">
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", marginBottom: 4 }}>Текущий тариф</div>
            <div className="flex items-center gap-10 mb-2">
              <span className="sub-plan-name">Премиум</span>
              <span className="sub-badge">АКТИВЕН</span>
            </div>
            <div className="sub-price">450 ₽ <span>/ месяц</span></div>
            <div className="sub-desc">Оптимальный доступ ко всем<br />возможностям платформы</div>
          </div>

          <div className="sub-hero-right">
            {[
              { icon: "Calendar", label: "Дата начала", value: "11 апреля 2026" },
              { icon: "CalendarCheck", label: "Дата окончания", value: "11 июня 2026" },
              { icon: "Clock", label: "Дней осталось", value: "30 дней" },
            ].map((item) => (
              <div key={item.label} className="sub-meta-item">
                <div style={{ color: "rgba(255,255,255,0.8)" }}>
                  <Icon name={item.icon as any} size={18} />
                </div>
                <div>
                  <div className="sub-meta-label">{item.label}</div>
                  <div className="sub-meta-value">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sub-hero-bottom">
          <div className="flex items-center justify-between mb-2">
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.85)" }}>Ваш доступ активен ещё 30 дней</span>
            <span style={{ fontSize: 13, fontWeight: 700 }}>75%</span>
          </div>
          <div className="lk-progress-track">
            <div className="lk-progress-fill" style={{ width: "75%" }} />
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="lk-card mb-6">
        <h2 style={{ fontFamily: "'Golos Text'", fontWeight: 700, fontSize: 18, color: "#1A1A1A", marginBottom: 16 }}>
          Возможности тарифа
        </h2>
        <div className="feature-grid">
          {features.map((f) => (
            <div key={f.title} className="feature-item">
              <div className="feature-icon">
                <Icon name={f.icon as any} size={16} />
              </div>
              <div>
                <div className="feature-title">{f.title}</div>
                <div className="feature-desc">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Manage */}
      <div className="lk-card">
        <h2 style={{ fontFamily: "'Golos Text'", fontWeight: 700, fontSize: 18, color: "#1A1A1A", marginBottom: 4 }}>
          Управление подпиской
        </h2>
        <p style={{ fontSize: 14, color: "#999", marginBottom: 20 }}>Вы можете изменить тариф или способ оплаты</p>
        <div className="flex gap-3">
          <button className="btn-orange">
            <Icon name="RotateCcw" size={15} />
            Продлить подписку
          </button>
          <button className="btn-lavender">
            <Icon name="ArrowLeftRight" size={15} />
            Сменить тариф
          </button>
        </div>

        {/* Alt plans */}
        <div
          className="mt-6 pt-5"
          style={{ borderTop: "1px solid #F0F0F0" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Icon name="Info" size={14} className="text-blue-400" />
            <span style={{ fontSize: 13, color: "#555", fontFamily: "'Golos Text'" }}>
              Хотите попробовать другой тариф?
            </span>
            <span style={{ fontSize: 12, color: "#999" }}>
              Вы можете в любой момент перейти на другой тариф. Изменения вступят в силу в начале следующего расчётного периода.
            </span>
          </div>
          <div className="flex gap-3 flex-wrap">
            {altPlans.map((p, i) => (
              <button
                key={p.name}
                className={i % 2 === 0 ? "btn-lavender" : "btn-mint"}
                style={{ fontSize: 13, padding: "9px 18px" }}
              >
                Перейти на «{p.name}»
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════
   SUPPORT TAB
═══════════════════════════════════════ */
function SupportTab() {
  const [message, setMessage] = useState("");
  const [charCount, setCharCount] = useState(0);

  const faqs = [
    "Как изменить тариф?",
    "Как отменить подписку?",
    "Не проходит оплата",
    "Как восстановить пароль?",
    "Смотреть все вопросы",
  ];

  const contacts = [
    {
      icon: "MessageSquare",
      bg: "var(--sky-bg)",
      color: "var(--sky)",
      title: "Онлайн-чат",
      sub: "Мы онлайн с 9:00 до 20:00",
    },
    {
      icon: "Mail",
      bg: "var(--peach-bg)",
      color: "var(--orange)",
      title: "Email",
      sub: "support@logosha.ru",
    },
    {
      icon: "Phone",
      bg: "var(--mint-bg)",
      color: "var(--mint)",
      title: "Телефон",
      sub: "+7 (123) 456-78-90",
    },
  ];

  return (
    <>
      <div className="flex items-start justify-between mb-2">
        <div>
          <h1 className="lk-page-title">Поддержка</h1>
          <p className="lk-page-subtitle">Мы всегда готовы помочь вам</p>
        </div>
      </div>

      {/* Value props */}
      <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
        {[
          { icon: "Zap", color: "var(--sky)", bg: "var(--sky-bg)", title: "Быстрый ответ", desc: "Ответим в течение 24 часов", accent: "card-accent-sky" },
          { icon: "Shield", color: "var(--orange)", bg: "var(--peach-bg)", title: "Надёжно", desc: "Ваши данные под защитой", accent: "card-accent-orange" },
          { icon: "Heart", color: "var(--coral)", bg: "var(--coral-bg)", title: "С заботой", desc: "Каждый запрос важен для нас", accent: "card-accent-coral" },
        ].map((item) => (
          <div key={item.title} className={`lk-card flex flex-col items-center text-center gap-2 py-6 ${item.accent}`}>
            <div
              style={{ width: 52, height: 52, borderRadius: 14, background: item.bg, color: item.color, display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <Icon name={item.icon as any} size={22} />
            </div>
            <div style={{ fontWeight: 700, fontSize: 15, color: "#1A1A1A", fontFamily: "'Golos Text'" }}>{item.title}</div>
            <div style={{ fontSize: 13, color: "#888" }}>{item.desc}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6" style={{ gridTemplateColumns: "1fr 1fr" }}>
        {/* Contact form */}
        <div>
          <div className="lk-card">
            <h2 style={{ fontFamily: "'Golos Text'", fontWeight: 700, fontSize: 17, color: "#1A1A1A", marginBottom: 20 }}>
              Отправьте нам сообщение
            </h2>
            <div className="space-y-4">
              <div>
                <label className="lk-label">Ваше имя</label>
                <div className="relative">
                  <Icon name="User" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input className="lk-input" placeholder="Введите ваше имя" style={{ paddingLeft: 36 }} />
                </div>
              </div>
              <div>
                <label className="lk-label">Email</label>
                <div className="relative">
                  <Icon name="Mail" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input className="lk-input" placeholder="example@mail.com" style={{ paddingLeft: 36 }} />
                </div>
              </div>
              <div>
                <label className="lk-label">Тема обращения</label>
                <div className="relative">
                  <select className="lk-input appearance-none" style={{ paddingRight: 36 }}>
                    <option value="">Выберите тему</option>
                    <option>Вопрос по тарифу</option>
                    <option>Техническая проблема</option>
                    <option>Оплата</option>
                    <option>Другое</option>
                  </select>
                  <Icon name="ChevronDown" size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="lk-label">Сообщение</label>
                <textarea
                  className="lk-input resize-none"
                  rows={4}
                  placeholder="Опишите вашу проблему или вопрос..."
                  style={{ paddingLeft: 14 }}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    setCharCount(e.target.value.length);
                  }}
                  maxLength={1000}
                />
                <div style={{ textAlign: "right", fontSize: 12, color: "#BBBB", marginTop: 4 }}>
                  {charCount}/1000
                </div>
              </div>
              <div
                className="flex items-center gap-3 p-3 rounded-xl cursor-pointer"
                style={{ border: "1.5px dashed #E0E0E0", color: "#AAA" }}
              >
                <Icon name="Paperclip" size={15} />
                <span style={{ fontSize: 13 }}>Прикрепить файл <span style={{ color: "#CCC" }}>(не более 10 МБ)</span></span>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button className="btn-orange flex-1">
                <Icon name="Send" size={15} />
                Отправить сообщение
              </button>
              <button className="btn-sky" style={{ fontSize: 14, padding: "10px 18px" }} onClick={() => { setMessage(""); setCharCount(0); }}>
                Очистить
              </button>
            </div>
          </div>
        </div>

        {/* FAQ + contacts */}
        <div className="space-y-4">
          <div className="lk-card">
            <div className="flex items-center justify-between mb-1">
              <h2 style={{ fontFamily: "'Golos Text'", fontWeight: 700, fontSize: 17, color: "#1A1A1A" }}>
                Часто задаваемые вопросы
              </h2>
            </div>
            <div>
              {faqs.map((q, i) => (
                <div key={q} className="faq-item">
                  <span>{i === faqs.length - 1 ? <span style={{ color: "var(--orange)" }}>{q}</span> : q}</span>
                  <Icon name={i === faqs.length - 1 ? "ExternalLink" : "ChevronRight"} size={16} className="text-gray-400 flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>

          <div className="lk-card">
            <h2 style={{ fontFamily: "'Golos Text'", fontWeight: 700, fontSize: 17, color: "#1A1A1A", marginBottom: 14 }}>
              Другие способы связи
            </h2>
            <div className="space-y-3">
              {contacts.map((c) => (
                <div key={c.title} className="contact-card">
                  <div className="contact-icon" style={{ background: c.bg, color: c.color }}>
                    <Icon name={c.icon as any} size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: "#1A1A1A", fontFamily: "'Golos Text'" }}>{c.title}</div>
                    <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{c.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Help banner */}
      <div className="help-banner mt-6">
        <div>
          <div style={{ fontFamily: "'Golos Text'", fontWeight: 800, fontSize: 20, color: "#1A1A1A", marginBottom: 6 }}>
            Мы рады, чтобы помочь!
          </div>
          <div style={{ fontSize: 14, color: "#666" }}>
            Большой опыт работы в области с детьми.<br />
            Напишите нам или позвоните — всегда на связи!
          </div>
        </div>
        <div style={{ fontSize: 64, flexShrink: 0 }}>🦕</div>
      </div>
    </>
  );
}