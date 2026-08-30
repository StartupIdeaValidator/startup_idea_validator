import { useState, useRef } from "react";
import {
  User, Key, CreditCard, Mail, AtSign, Globe, Lock,
  Shield, Eye, EyeOff, Check, Upload, Trash2, ChevronDown,
  Plus, Copy, Trash, AlertCircle, Zap, Clock,
} from "lucide-react";

import { ImageWithFallback } from "@/app/components/ImageWithFallback";

type Tab = "profile" | "apikeys" | "billing";

// ─── Shared input primitives ───────────────────────────────────────────────────

const fieldBase = "w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all duration-150 focus:border-[#4f6ef7]/60";
const fieldStyle = { background: "#0d0d13", border: "1px solid rgba(255,255,255,0.1)" };

function SectionCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl p-6 ${className ?? ""}`}
      style={{ background: "#14141a", border: "1px solid rgba(255,255,255,0.07)" }}>
      {children}
    </div>
  );
}

// ─── Profile Tab ──────────────────────────────────────────────────────────────

function ProfileTab() {
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [bio, setBio] = useState("AI startup enthusiast & product strategist. Building the next wave of validated ideas with LaunchPilot.");
  const [firstName, setFirstName] = useState("Sarah");
  const [lastName, setLastName] = useState("Chen");
  const [handle, setHandle] = useState("sarahchen");
  const [timezone, setTimezone] = useState("(UTC-8) Pacific Standard Time");
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const timezones = [
    "(UTC-12:00) International Date Line West",
    "(UTC-8) Pacific Standard Time",
    "(UTC-7) Mountain Standard Time",
    "(UTC-6) Central Standard Time",
    "(UTC-5) Eastern Standard Time",
    "(UTC+0) Greenwich Mean Time",
    "(UTC+1) Central European Time",
    "(UTC+3) Moscow Standard Time",
    "(UTC+5:30) India Standard Time",
    "(UTC+8) China Standard Time",
    "(UTC+9) Japan Standard Time",
  ];

  return (
    <div className="flex flex-col gap-5">

      {/* Row 1: Photo + Personal Info */}
      <div className="grid grid-cols-[260px_1fr] gap-5">

        {/* Profile Photo */}
        <SectionCard>
          <h3 className="text-sm font-semibold text-white mb-5">Profile Photo</h3>

          {/* Avatar */}
          <div className="flex justify-center mb-5">
            <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-[#4f6ef7]/30">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80"
                alt="Sarah Chen profile photo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Drop zone */}
          <div
            className="rounded-xl p-4 flex flex-col items-center gap-1 cursor-pointer transition-all duration-150"
            style={{
              background: dragging ? "rgba(79,110,247,0.1)" : "#0d0d13",
              border: `1px dashed ${dragging ? "rgba(79,110,247,0.6)" : "rgba(255,255,255,0.12)"}`,
            }}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={() => setDragging(false)}
            onClick={() => fileRef.current?.click()}
          >
            <Upload className="w-5 h-5 mb-1" style={{ color: "#4f6ef7" }} />
            <p className="text-xs text-center" style={{ color: "#8888a0" }}>
              Drag &amp; drop or{" "}
              <span className="text-[#4f6ef7] font-medium cursor-pointer hover:underline">browse</span>
            </p>
            <p className="text-[10px]" style={{ color: "#555570" }}>PNG, JPG up to 5MB</p>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" />
          </div>

          {/* Remove */}
          <button
            className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 hover:bg-white/5"
            style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.45)" }}
          >
            <Trash2 className="w-3.5 h-3.5" /> Remove Photo
          </button>
        </SectionCard>

        {/* Personal Information */}
        <SectionCard>
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-semibold text-white">Personal Information</h3>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
              style={{ background: "rgba(34,197,94,0.12)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.22)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" /> Verified
            </span>
          </div>

          <div className="flex flex-col gap-4">
            {/* Name row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "#8888a0" }}>First Name</label>
                <input className={fieldBase} style={fieldStyle}
                  value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "#8888a0" }}>Last Name</label>
                <input className={fieldBase} style={fieldStyle}
                  value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#8888a0" }}>Email Address</label>
              <div className="relative">
                <input className={fieldBase + " pr-10"} style={fieldStyle}
                  defaultValue="sarah.chen@launchpilot.io" type="email" />
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#4f6ef7" }} />
              </div>
            </div>

            {/* Handle */}
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#8888a0" }}>Display Handle</label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-sm font-medium select-none" style={{ color: "#8888a0" }}>@</span>
                <input className={fieldBase + " pl-8"} style={fieldStyle}
                  value={handle} onChange={(e) => setHandle(e.target.value)} />
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#8888a0" }}>Bio</label>
              <textarea className={fieldBase} style={{ ...fieldStyle, resize: "none" }} rows={3}
                value={bio} onChange={(e) => setBio(e.target.value)} />
            </div>

            {/* Timezone */}
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#8888a0" }}>Timezone</label>
              <div className="relative">
                <select
                  className={fieldBase + " pr-10 appearance-none cursor-pointer"}
                  style={fieldStyle}
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                >
                  {timezones.map((tz) => (
                    <option key={tz} value={tz} style={{ background: "#14141a" }}>{tz}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: "#555570" }} />
              </div>
            </div>
          </div>

          {/* Save */}
          <div className="flex justify-end mt-5 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <button
              className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-150 hover:brightness-110 active:scale-95"
              style={{ background: "linear-gradient(135deg,#5a78f8 0%,#4060e8 100%)", boxShadow: "0 4px 16px rgba(79,110,247,0.35)" }}
            >
              Save Changes
            </button>
          </div>
        </SectionCard>
      </div>

      {/* Row 2: Security */}
      <SectionCard>
        <h3 className="text-sm font-semibold text-white mb-1">Security</h3>
        <p className="text-xs mb-5" style={{ color: "#8888a0" }}>Manage your password and two-factor authentication</p>

        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "#8888a0" }}>Current Password</label>
            <div className="relative">
              <input className={fieldBase + " pr-10"} style={fieldStyle}
                type={showCurrentPw ? "text" : "password"} defaultValue="••••••••••••" />
              <button onClick={() => setShowCurrentPw((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors hover:text-white"
                style={{ color: "#555570" }}>
                {showCurrentPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "#8888a0" }}>New Password</label>
            <div className="relative">
              <input className={fieldBase + " pr-10"} style={fieldStyle}
                type={showNewPw ? "text" : "password"} placeholder="Enter new password" />
              <button onClick={() => setShowNewPw((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors hover:text-white"
                style={{ color: "#555570" }}>
                {showNewPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* 2FA */}
        <div className="flex items-center justify-between px-4 py-4 rounded-xl"
          style={{ background: "#0d0d13", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(79,110,247,0.15)", border: "1px solid rgba(79,110,247,0.25)" }}>
              <Shield className="w-4 h-4 text-[#7a9bff]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Two-Factor Authentication</p>
              <p className="text-xs mt-0.5" style={{ color: "#8888a0" }}>Add an extra layer of security</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
              style={{ background: "rgba(34,197,94,0.12)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.22)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" /> Enabled
            </span>
            <button
              className="px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-150 hover:bg-white/10"
              style={{ border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.6)" }}
            >
              Manage
            </button>
          </div>
        </div>

        <div className="flex justify-end mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <button
            className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-150 hover:brightness-110 active:scale-95"
            style={{ background: "linear-gradient(135deg,#5a78f8 0%,#4060e8 100%)", boxShadow: "0 4px 16px rgba(79,110,247,0.35)" }}
          >
            Update Password
          </button>
        </div>
      </SectionCard>

      {/* Footer */}
      <div className="flex items-center justify-between py-2">
        <p className="text-xs" style={{ color: "#444460" }}>LaunchPilot &copy; 2025</p>
        <div className="flex items-center gap-4">
          {["Privacy", "Terms", "Support"].map((l) => (
            <button key={l} className="text-xs transition-colors hover:text-white" style={{ color: "#444460" }}>{l}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── API Keys Tab ─────────────────────────────────────────────────────────────

const initialKeys = [
  { id: 1, name: "Production Key", prefix: "lp_live_sk_••••••••••••••••••••4f7a", created: "Jun 1, 2025", lastUsed: "Today", usage: 4820, limit: 10000 },
  { id: 2, name: "Development Key", prefix: "lp_test_sk_••••••••••••••••••••9c2d", created: "May 15, 2025", lastUsed: "2 hours ago", usage: 1240, limit: 5000 },
  { id: 3, name: "Analytics Plugin", prefix: "lp_live_sk_••••••••••••••••••••2b8e", created: "Apr 22, 2025", lastUsed: "Yesterday", usage: 320, limit: 2000 },
];

function ApiKeysTab() {
  const [keys, setKeys] = useState(initialKeys);
  const [showNew, setShowNew] = useState(false);
  const [newName, setNewName] = useState("");
  const [copied, setCopied] = useState<number | null>(null);

  function handleCreate() {
    if (!newName.trim()) return;
    setKeys([...keys, {
      id: Date.now(), name: newName.trim(),
      prefix: `lp_live_sk_••••••••••••••••••••${Math.random().toString(36).slice(2, 6)}`,
      created: "Today", lastUsed: "Never", usage: 0, limit: 5000,
    }]);
    setNewName(""); setShowNew(false);
  }

  function handleCopy(id: number) {
    setCopied(id);
    setTimeout(() => setCopied(null), 1800);
  }

  return (
    <div className="flex flex-col gap-5">
      <SectionCard>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-sm font-semibold text-white mb-1">API Keys</h3>
            <p className="text-xs" style={{ color: "#8888a0" }}>Manage keys used to authenticate with the LaunchPilot API</p>
          </div>
          <button
            onClick={() => setShowNew(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:brightness-110 active:scale-95"
            style={{ background: "linear-gradient(135deg,#5a78f8 0%,#4060e8 100%)", boxShadow: "0 4px 14px rgba(79,110,247,0.35)" }}
          >
            <Plus className="w-4 h-4" /> Create Key
          </button>
        </div>

        {showNew && (
          <div className="flex items-center gap-3 mb-4 p-4 rounded-xl"
            style={{ background: "#0d0d13", border: "1px solid rgba(79,110,247,0.25)" }}>
            <input className={fieldBase + " flex-1"} style={fieldStyle}
              placeholder="Key name (e.g. Staging Key)"
              value={newName} onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()} autoFocus />
            <button onClick={handleCreate}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white hover:brightness-110"
              style={{ background: "linear-gradient(135deg,#5a78f8,#4060e8)" }}>
              Generate
            </button>
            <button onClick={() => setShowNew(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-white/5 transition-colors"
              style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.45)" }}>
              Cancel
            </button>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {keys.map((key) => (
            <div key={key.id} className="rounded-xl p-4 flex flex-col gap-3"
              style={{ background: "#0d0d13", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white mb-1">{key.name}</p>
                  <code className="text-xs font-mono" style={{ color: "#8888a0" }}>{key.prefix}</code>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => handleCopy(key.id)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all hover:bg-white/10"
                    style={{ border: "1px solid rgba(255,255,255,0.1)", color: copied === key.id ? "#4ade80" : "rgba(255,255,255,0.5)" }}>
                    {copied === key.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied === key.id ? "Copied" : "Copy"}
                  </button>
                  <button onClick={() => setKeys(keys.filter((k) => k.id !== key.id))}
                    className="p-2 rounded-lg transition-all hover:bg-red-500/10 hover:text-red-400"
                    style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.35)" }}>
                    <Trash className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1.5 text-xs" style={{ color: "#666680" }}>
                  <Clock className="w-3 h-3" /> Created {key.created}
                </div>
                <div className="flex items-center gap-1.5 text-xs" style={{ color: "#666680" }}>
                  <Zap className="w-3 h-3" /> Last used {key.lastUsed}
                </div>
                <div className="flex-1" />
                <div className="flex items-center gap-2">
                  <div className="w-24 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.07)" }}>
                    <div className="h-full rounded-full" style={{
                      width: `${Math.min(100, (key.usage / key.limit) * 100)}%`,
                      background: "linear-gradient(90deg,#4f6ef7,#6a8eff)",
                    }} />
                  </div>
                  <span className="text-xs" style={{ color: "#666680" }}>{key.usage.toLocaleString()}/{key.limit.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 rounded-xl flex items-start gap-3"
          style={{ background: "rgba(79,110,247,0.06)", border: "1px solid rgba(79,110,247,0.18)" }}>
          <AlertCircle className="w-4 h-4 text-[#7a9bff] flex-shrink-0 mt-0.5" />
          <p className="text-xs leading-relaxed" style={{ color: "#8888a0" }}>
            Keep your API keys secret. Never share them in public repositories or client-side code.
            If a key is compromised, revoke it immediately and generate a new one.
          </p>
        </div>
      </SectionCard>

      {/* Footer */}
      <div className="flex items-center justify-between py-2">
        <p className="text-xs" style={{ color: "#444460" }}>LaunchPilot &copy; 2025</p>
        <div className="flex items-center gap-4">
          {["Privacy", "Terms", "Support"].map((l) => (
            <button key={l} className="text-xs transition-colors hover:text-white" style={{ color: "#444460" }}>{l}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Billing Tab ──────────────────────────────────────────────────────────────

function BillingTab() {
  const invoices = [
    { date: "Jul 1, 2025", amount: "$49.00", status: "Paid" },
    { date: "Jun 1, 2025", amount: "$49.00", status: "Paid" },
    { date: "May 1, 2025", amount: "$49.00", status: "Paid" },
    { date: "Apr 1, 2025", amount: "$29.00", status: "Paid" },
  ];

  return (
    <div className="flex flex-col gap-5">
      {/* Current Plan */}
      <SectionCard>
        <h3 className="text-sm font-semibold text-white mb-5">Current Plan</h3>
        <div className="flex items-center justify-between p-5 rounded-xl mb-4"
          style={{ background: "linear-gradient(135deg, rgba(79,110,247,0.12) 0%, rgba(79,110,247,0.05) 100%)", border: "1px solid rgba(79,110,247,0.25)" }}>
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-lg font-bold text-white">Pro Plan</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ background: "rgba(79,110,247,0.2)", color: "#7a9bff", border: "1px solid rgba(79,110,247,0.3)" }}>
                Active
              </span>
            </div>
            <p className="text-xs" style={{ color: "#8888a0" }}>$49/month · Renews Aug 1, 2025</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-white">$49</p>
            <p className="text-xs mt-0.5" style={{ color: "#8888a0" }}>per month</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: "Research Credits", value: "1,240 / 5,000" },
            { label: "Team Seats", value: "8 / 10" },
            { label: "Reports", value: "42 generated" },
          ].map((stat) => (
            <div key={stat.label} className="px-4 py-3.5 rounded-xl"
              style={{ background: "#0d0d13", border: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="text-sm font-bold text-white">{stat.value}</p>
              <p className="text-xs mt-0.5" style={{ color: "#666680" }}>{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white hover:brightness-110 transition-all"
            style={{ background: "linear-gradient(135deg,#5a78f8,#4060e8)", boxShadow: "0 4px 14px rgba(79,110,247,0.32)" }}>
            Upgrade Plan
          </button>
          <button className="px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-white/5 transition-colors"
            style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}>
            Cancel Subscription
          </button>
        </div>
      </SectionCard>

      {/* Payment Method */}
      <SectionCard>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-semibold text-white">Payment Method</h3>
          <button className="flex items-center gap-1.5 text-xs font-medium transition-colors hover:text-white"
            style={{ color: "#4f6ef7" }}>
            <Plus className="w-3.5 h-3.5" /> Add Method
          </button>
        </div>
        <div className="flex items-center justify-between p-4 rounded-xl"
          style={{ background: "#0d0d13", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="flex items-center gap-4">
            <div className="w-10 h-7 rounded-md flex items-center justify-center"
              style={{ background: "#1a237e", border: "1px solid rgba(255,255,255,0.1)" }}>
              <span className="text-[10px] font-black text-white tracking-tight">VISA</span>
            </div>
            <div>
              <p className="text-sm font-medium text-white">•••• •••• •••• 4242</p>
              <p className="text-xs mt-0.5" style={{ color: "#8888a0" }}>Expires 09/2027</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ background: "rgba(34,197,94,0.1)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.2)" }}>
            Default
          </span>
        </div>
      </SectionCard>

      {/* Invoices */}
      <SectionCard>
        <h3 className="text-sm font-semibold text-white mb-5">Billing History</h3>
        <div className="flex flex-col divide-y" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          {invoices.map((inv, i) => (
            <div key={i} className="flex items-center justify-between py-3.5">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(79,110,247,0.1)" }}>
                  <CreditCard className="w-3.5 h-3.5 text-[#4f6ef7]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Pro Plan</p>
                  <p className="text-xs mt-0.5" style={{ color: "#8888a0" }}>{inv.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-white">{inv.amount}</span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(34,197,94,0.1)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.2)" }}>
                  {inv.status}
                </span>
                <button className="text-xs font-medium transition-colors hover:text-white" style={{ color: "#4f6ef7" }}>
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Footer */}
      <div className="flex items-center justify-between py-2">
        <p className="text-xs" style={{ color: "#444460" }}>LaunchPilot &copy; 2025</p>
        <div className="flex items-center gap-4">
          {["Privacy", "Terms", "Support"].map((l) => (
            <button key={l} className="text-xs transition-colors hover:text-white" style={{ color: "#444460" }}>{l}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

const TABS: { id: Tab; icon: React.ElementType; label: string }[] = [
  { id: "profile", icon: User, label: "Profile" },
  { id: "apikeys", icon: Key, label: "API Keys" },
  { id: "billing", icon: CreditCard, label: "Billing" },
];

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>("profile");

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: "#0a0a0e" }}>

      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 flex-shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div>
          <h1 className="text-2xl font-bold text-white leading-none">Settings</h1>
          <p className="text-xs mt-1.5" style={{ color: "#8888a0" }}>Manage your account, API keys, and billing</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors hover:bg-white/10"
            style={{ border: "1px solid rgba(255,255,255,0.09)", color: "#8888a0" }}>
            <svg viewBox="0 0 24 24" fill="none" className="w-4.5 h-4.5" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-[#4f6ef7]/30 cursor-pointer">
            <ImageWithFallback src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80" alt="Sarah Chen" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      <div className="px-8 py-6 flex flex-col gap-5">

        {/* Tab bar */}
        <div className="flex items-center gap-1"
          style={{ background: "#14141a", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "14px", padding: "5px", width: "fit-content" }}>
          {TABS.map(({ id, icon: Icon, label }) => {
            const active = tab === id;
            return (
              <button key={id} onClick={() => setTab(id)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
                style={{
                  background: active ? "rgba(79,110,247,0.18)" : "transparent",
                  color: active ? "#7a9bff" : "rgba(255,255,255,0.45)",
                  border: active ? "1px solid rgba(79,110,247,0.25)" : "1px solid transparent",
                }}>
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        {tab === "profile" && <ProfileTab />}
        {tab === "apikeys" && <ApiKeysTab />}
        {tab === "billing" && <BillingTab />}
      </div>
    </div>
  );
}
