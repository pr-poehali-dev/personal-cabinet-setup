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
  { id: 1, type: "success", title: "Подписка активирована", text: "Ваш план Pro успешно продлён на 30 дней.", time: "2 мин назад", read: false },
  { id: 2, type: "warning", title: "Срок оплаты", text: "До следующего списания осталось 5 дней.", time: "1 час назад", read: false },
  { id: 3, type: "info", title: "Новый ответ в поддержке", text: "Менеджер ответил на ваш тикет #1042.", time: "3 часа назад", read: false },
  { id: 4, type: "info", title: "Обновление системы", text: "Плановые работы завершены, всё работает стабильно.", time: "Вчера", read: true },
  { id: 5, type: "success", title: "Данные сохранены", text: "Профиль успешно обновлён.", time: "2 дня назад", read: true },
];

const NOTIF_ICONS = {
  info: { icon: "Info", color: "text-blue-500", bg: "bg-blue-50" },
  success: { icon: "CheckCircle", color: "text-green-500", bg: "bg-green-50" },
  warning: { icon: "AlertTriangle", color: "text-amber-500", bg: "bg-amber-50" },
};

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(NOTIFICATIONS);
  const [profileData, setProfileData] = useState({
    name: "Алексей Смирнов",
    email: "a.smirnov@example.com",
    phone: "+7 (999) 123-45-67",
    city: "Москва",
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id: number) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  };

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "profile", label: "Мои данные", icon: "User" },
    { id: "subscriptions", label: "Подписки", icon: "CreditCard" },
    { id: "support", label: "Поддержка", icon: "MessageCircle" },
  ];

  return (
    <div className="page-bg">
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="px-6 py-5 flex items-center justify-between max-w-5xl mx-auto">
          <div className="flex items-center gap-3">
            <div
              className="avatar-gradient"
              style={{ width: 44, height: 44, fontSize: 18 }}
            >
              АС
            </div>
            <div>
              <div
                className="font-bold text-gray-800"
                style={{ fontFamily: "'Golos Text', sans-serif", fontSize: 16 }}
              >
                {profileData.name}
              </div>
              <div className="text-xs text-gray-500">Личный кабинет</div>
            </div>
          </div>

          {/* Notification bell */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen((v) => !v)}
              className="relative p-3 rounded-2xl transition-all"
              style={{
                background: notifOpen
                  ? "rgba(102,126,234,0.12)"
                  : "rgba(255,255,255,0.7)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.5)",
              }}
            >
              <Icon name="Bell" size={22} className="text-gray-600" />
              {unreadCount > 0 && (
                <span className="notif-badge">{unreadCount}</span>
              )}
            </button>

            {notifOpen && (
              <div className="notif-panel">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                  <span
                    className="font-bold text-gray-800"
                    style={{ fontFamily: "'Golos Text', sans-serif", fontSize: 16 }}
                  >
                    Уведомления
                  </span>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-xs font-semibold"
                      style={{ color: "#667eea" }}
                    >
                      Прочитать все
                    </button>
                  )}
                </div>
                <div style={{ maxHeight: 360, overflowY: "auto" }}>
                  {notifications.map((n) => {
                    const meta = NOTIF_ICONS[n.type];
                    return (
                      <div
                        key={n.id}
                        onClick={() => markRead(n.id)}
                        className="flex gap-3 px-5 py-4 cursor-pointer transition-all"
                        style={{
                          background: n.read ? "transparent" : "rgba(102,126,234,0.04)",
                          borderBottom: "1px solid rgba(0,0,0,0.04)",
                        }}
                      >
                        <div
                          className={`${meta.bg} ${meta.color} rounded-xl flex items-center justify-center flex-shrink-0`}
                          style={{ width: 36, height: 36 }}
                        >
                          <Icon name={meta.icon as any} size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <span
                              className="font-semibold text-gray-800 text-sm"
                              style={{ fontFamily: "'Golos Text', sans-serif" }}
                            >
                              {n.title}
                            </span>
                            {!n.read && (
                              <span
                                className="flex-shrink-0 rounded-full mt-1"
                                style={{
                                  width: 7,
                                  height: 7,
                                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                                }}
                              />
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                            {n.text}
                          </p>
                          <span className="text-xs text-gray-400 mt-1 block">
                            {n.time}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Main */}
        <main className="px-6 pb-12 max-w-5xl mx-auto">
          {/* Tabs */}
          <div className="glass-card p-2 flex gap-1 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setNotifOpen(false);
                }}
                className={`tab-item${activeTab === tab.id ? " active" : ""}`}
              >
                <Icon name={tab.icon as any} size={17} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="animate-fade-in" key={activeTab}>
            {activeTab === "profile" && (
              <ProfileTab data={profileData} setData={setProfileData} />
            )}
            {activeTab === "subscriptions" && <SubscriptionsTab />}
            {activeTab === "support" && <SupportTab />}
          </div>
        </main>
      </div>

      {notifOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setNotifOpen(false)}
        />
      )}
    </div>
  );
}

/* ─── Profile Tab ─── */
function ProfileTab({
  data,
  setData,
}: {
  data: { name: string; email: string; phone: string; city: string };
  setData: (d: any) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(data);

  const handleSave = () => {
    setData(form);
    setEditing(false);
  };

  const fields = [
    { key: "name", label: "Имя и фамилия", icon: "User", placeholder: "Введите имя" },
    { key: "email", label: "Email", icon: "Mail", placeholder: "example@mail.com" },
    { key: "phone", label: "Телефон", icon: "Phone", placeholder: "+7 (___) ___-__-__" },
    { key: "city", label: "Город", icon: "MapPin", placeholder: "Москва" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Avatar card */}
      <div className="glass-card p-8 flex flex-col items-center gap-4 md:col-span-1">
        <div
          className="avatar-gradient"
          style={{ width: 96, height: 96, fontSize: 36 }}
        >
          {data.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
        </div>
        <div className="text-center">
          <div
            className="font-bold text-gray-800 text-xl"
            style={{ fontFamily: "'Golos Text', sans-serif" }}
          >
            {data.name}
          </div>
          <div className="text-sm text-gray-500 mt-1">{data.email}</div>
        </div>
        <div
          className="w-full text-center py-2 px-4 rounded-2xl text-sm font-semibold"
          style={{
            background: "linear-gradient(135deg, rgba(102,126,234,0.1), rgba(240,147,251,0.1))",
            color: "#764ba2",
          }}
        >
          ✦ Pro-аккаунт
        </div>
        <div className="w-full space-y-3 mt-2">
          {[
            { label: "На сервисе", value: "с марта 2024" },
            { label: "Тикетов", value: "3" },
            { label: "Устройств", value: "2" },
          ].map((item) => (
            <div key={item.label} className="flex justify-between text-sm">
              <span className="text-gray-500">{item.label}</span>
              <span className="font-semibold text-gray-700">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Form card */}
      <div className="glass-card p-8 md:col-span-2">
        <div className="flex items-center justify-between mb-6">
          <h2
            className="font-bold text-gray-800 text-xl"
            style={{ fontFamily: "'Golos Text', sans-serif" }}
          >
            Личные данные
          </h2>
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl transition-all"
              style={{ background: "rgba(102,126,234,0.1)", color: "#667eea" }}
            >
              <Icon name="Pencil" size={15} />
              Редактировать
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => { setForm(data); setEditing(false); }}
                className="text-sm font-semibold px-4 py-2 rounded-xl text-gray-500"
                style={{ background: "rgba(0,0,0,0.05)" }}
              >
                Отмена
              </button>
              <button
                onClick={handleSave}
                className="gradient-btn"
                style={{ padding: "8px 20px", fontSize: 14 }}
              >
                Сохранить
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fields.map((f) => (
            <div key={f.key}>
              <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                {f.label}
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Icon name={f.icon as any} size={16} />
                </div>
                <input
                  className="glass-input"
                  style={{ paddingLeft: 40 }}
                  value={form[f.key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  disabled={!editing}
                  placeholder={f.placeholder}
                />
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-6 pt-6"
          style={{ borderTop: "1px solid rgba(102,126,234,0.1)" }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-gray-700 text-sm">Пароль</div>
              <div className="text-xs text-gray-400 mt-0.5">Последнее изменение: 2 месяца назад</div>
            </div>
            <button
              className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl transition-all"
              style={{ background: "rgba(245,87,108,0.08)", color: "#f5576c" }}
            >
              <Icon name="Lock" size={14} />
              Сменить пароль
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Subscriptions Tab ─── */
function SubscriptionsTab() {
  const plans = [
    {
      name: "Базовый",
      price: "Бесплатно",
      period: "",
      features: ["1 проект", "5 ГБ хранилища", "Email поддержка"],
      active: false,
      until: "",
    },
    {
      name: "Pro",
      price: "990 ₽",
      period: "/ месяц",
      features: ["До 10 проектов", "50 ГБ хранилища", "Приоритетная поддержка", "Аналитика"],
      active: true,
      until: "до 13 мая 2026",
    },
    {
      name: "Бизнес",
      price: "2 990 ₽",
      period: "/ месяц",
      features: ["Без лимита проектов", "500 ГБ хранилища", "24/7 поддержка", "API доступ", "Командный кабинет"],
      active: false,
      until: "",
    },
  ];

  const history = [
    { date: "13 апр 2026", amount: "990 ₽", plan: "Pro", status: "Оплачен" },
    { date: "13 мар 2026", amount: "990 ₽", plan: "Pro", status: "Оплачен" },
    { date: "13 фев 2026", amount: "990 ₽", plan: "Pro", status: "Оплачен" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`plan-card ${plan.active ? "active-plan" : "inactive-plan"}`}
          >
            {plan.active && (
              <div
                className="absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full"
                style={{ background: "rgba(255,255,255,0.25)", color: "white" }}
              >
                Активен
              </div>
            )}
            <div
              className={`font-bold text-xl mb-1 ${plan.active ? "text-white" : "text-gray-800"}`}
              style={{ fontFamily: "'Golos Text', sans-serif" }}
            >
              {plan.name}
            </div>
            <div className="flex items-end gap-1 mb-1">
              <span
                className={`text-3xl font-black ${plan.active ? "text-white" : "gradient-text"}`}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {plan.price}
              </span>
              <span className={`text-sm mb-1 ${plan.active ? "text-white/70" : "text-gray-500"}`}>
                {plan.period}
              </span>
            </div>
            {plan.until && (
              <div
                className="text-xs mb-4 px-3 py-1.5 rounded-xl inline-block"
                style={{ background: "rgba(255,255,255,0.2)", color: "white" }}
              >
                Действует {plan.until}
              </div>
            )}
            <div className="space-y-2 my-4">
              {plan.features.map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <Icon
                    name="Check"
                    size={14}
                    className={plan.active ? "text-white" : "text-green-500"}
                  />
                  <span className={`text-sm ${plan.active ? "text-white/90" : "text-gray-600"}`}>
                    {f}
                  </span>
                </div>
              ))}
            </div>
            {plan.active ? (
              <button
                className="w-full mt-2 py-2.5 rounded-xl text-sm font-semibold"
                style={{ background: "rgba(255,255,255,0.2)", color: "white" }}
              >
                Управление подпиской
              </button>
            ) : (
              <button
                className="w-full mt-2 py-2.5 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                  color: "white",
                }}
              >
                Перейти на {plan.name}
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="glass-card p-6">
        <h3
          className="font-bold text-gray-800 mb-4"
          style={{ fontFamily: "'Golos Text', sans-serif", fontSize: 18 }}
        >
          История платежей
        </h3>
        <div className="space-y-3">
          {history.map((h, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 rounded-2xl"
              style={{
                background: "rgba(102,126,234,0.04)",
                border: "1px solid rgba(102,126,234,0.08)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="rounded-xl flex items-center justify-center"
                  style={{ width: 40, height: 40, background: "rgba(102,126,234,0.1)" }}
                >
                  <Icon name="Receipt" size={16} className="text-indigo-500" />
                </div>
                <div>
                  <div className="font-semibold text-gray-700 text-sm">Подписка {h.plan}</div>
                  <div className="text-xs text-gray-400">{h.date}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-gray-800">{h.amount}</span>
                <span className="support-status status-open">{h.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Support Tab ─── */
function SupportTab() {
  const [message, setMessage] = useState("");

  const tickets = [
    {
      id: "#1042",
      subject: "Не работает загрузка файлов",
      status: "pending" as const,
      date: "12 апр 2026",
      lastMessage: "Менеджер ответил: Мы проверяем проблему...",
    },
    {
      id: "#1031",
      subject: "Вопрос по тарификации Pro",
      status: "open" as const,
      date: "5 апр 2026",
      lastMessage: "Вы: Спасибо, всё понял!",
    },
    {
      id: "#1018",
      subject: "Ошибка при оплате",
      status: "closed" as const,
      date: "20 мар 2026",
      lastMessage: "Тикет закрыт. Проблема решена.",
    },
  ];

  const statusLabels = {
    open: { label: "Решён", cls: "status-open" },
    pending: { label: "Ожидает ответа", cls: "status-pending" },
    closed: { label: "Закрыт", cls: "status-closed" },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-4">
        <h2
          className="font-bold text-gray-800 text-xl"
          style={{ fontFamily: "'Golos Text', sans-serif" }}
        >
          Мои обращения
        </h2>
        {tickets.map((t) => {
          const s = statusLabels[t.status];
          return (
            <div
              key={t.id}
              className="glass-card p-5 cursor-pointer hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-gray-400">{t.id}</span>
                    <span className={`support-status ${s.cls}`}>{s.label}</span>
                  </div>
                  <div
                    className="font-semibold text-gray-800 mb-2"
                    style={{ fontFamily: "'Golos Text', sans-serif" }}
                  >
                    {t.subject}
                  </div>
                  <div className="text-sm text-gray-500 truncate">{t.lastMessage}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-xs text-gray-400">{t.date}</div>
                  <Icon name="ChevronRight" size={16} className="text-gray-400 mt-2 ml-auto" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="glass-card p-6 h-fit">
        <h3
          className="font-bold text-gray-800 mb-1"
          style={{ fontFamily: "'Golos Text', sans-serif", fontSize: 17 }}
        >
          Новый тикет
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Опишите проблему — ответим в течение 2 часов
        </p>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
              Тема
            </label>
            <input className="glass-input" placeholder="Кратко опишите тему" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
              Сообщение
            </label>
            <textarea
              className="glass-input resize-none"
              rows={5}
              placeholder="Подробно опишите вашу проблему или вопрос..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ paddingLeft: 16 }}
            />
          </div>
          <button className="gradient-btn w-full flex items-center justify-center gap-2">
            <Icon name="Send" size={16} />
            Отправить обращение
          </button>
        </div>

        <div
          className="mt-5 p-4 rounded-2xl"
          style={{
            background: "rgba(102,126,234,0.06)",
            border: "1px solid rgba(102,126,234,0.1)",
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <Icon name="Clock" size={14} className="text-indigo-400" />
            <span className="text-xs font-semibold text-indigo-600">Время ответа</span>
          </div>
          <div className="text-xs text-gray-500">
            Пн–Пт: <strong>до 2 часов</strong>
            <br />
            Выходные: <strong>до 24 часов</strong>
          </div>
        </div>
      </div>
    </div>
  );
}