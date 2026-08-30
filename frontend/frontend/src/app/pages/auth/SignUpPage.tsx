import { useState } from "react";
import { Eye, EyeOff, ArrowRight, Check } from "lucide-react";
import AuthShell from "./AuthShell";
import RocketIcon from "@/app/components/RocketIcon";

const inputBase = "w-full px-4 py-3 rounded-xl text-sm text-white placeholder-[#555570] outline-none transition-all duration-150";
const inputStyle = { background: "#0d0d13", border: "1px solid rgba(255,255,255,0.1)" };
const focusHandlers = {
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => { e.currentTarget.style.border = "1px solid rgba(79,110,247,0.6)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(79,110,247,0.1)"; },
  onBlur:  (e: React.FocusEvent<HTMLInputElement>) => { e.currentTarget.style.border = "1px solid rgba(255,255,255,0.1)"; e.currentTarget.style.boxShadow = "none"; },
};

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block text-sm font-medium text-white mb-2">{children}</label>;
}

function Divider() {
  return (
    <div className="flex items-center gap-3 my-6">
      <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
      <span className="text-xs text-[#555570] font-medium">Or continue with</span>
      <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
    </div>
  );
}

function GoogleButton() {
  return (
    <button
      className="w-full flex items-center justify-center gap-3 py-3 rounded-xl text-sm font-medium text-white transition-all duration-150 hover:bg-white/10 active:scale-95"
      style={{ border: "1px solid rgba(255,255,255,0.12)" }}
    >
      <svg viewBox="0 0 24 24" className="w-4 h-4">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
      Sign up with Google
    </button>
  );
}

function Checkbox({ checked, onChange, children }: { checked: boolean; onChange: (v: boolean) => void; children: React.ReactNode }) {
  return (
    <label className="flex items-start gap-2.5 cursor-pointer select-none">
      <button type="button" onClick={() => onChange(!checked)}
        className="flex-shrink-0 w-4 h-4 rounded flex items-center justify-center transition-all duration-150 mt-0.5"
        style={{ background: checked ? "#4f6ef7" : "transparent", border: checked ? "1px solid #4f6ef7" : "1px solid rgba(255,255,255,0.2)" }}
      >
        {checked && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
      </button>
      <span className="text-sm text-[#9999b0] leading-snug">{children}</span>
    </label>
  );
}

interface SignUpPageProps {
  onGoLanding: () => void;
  onGoSignIn: () => void;
  onSuccess?: () => void;
}

export default function SignUpPage({ onGoLanding, onGoSignIn, onSuccess }: SignUpPageProps) {
  const [name,         setName]         = useState("");
  const [email,        setEmail]        = useState("");
  const [password,     setPassword]     = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed,       setAgreed]       = useState(false);

  return (
    <AuthShell onGoLanding={onGoLanding}>
      <div className="rounded-2xl p-8" style={{ background: "#14141a", border: "1px solid rgba(255,255,255,0.08)" }}>
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(79,110,247,0.15)", border: "1px solid rgba(79,110,247,0.28)" }}>
              <RocketIcon className="w-6 h-6" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1.5">Create your account</h1>
          <p className="text-sm text-[#8888a0]">Start validating your startup ideas with AI</p>
        </div>

        {/* Fields */}
        <div className="flex flex-col gap-4">
          <div>
            <FieldLabel>Full Name</FieldLabel>
            <input className={inputBase} style={inputStyle} type="text" placeholder="Alex Johnson"
              value={name} onChange={(e) => setName(e.target.value)} {...focusHandlers} />
          </div>
          <div>
            <FieldLabel>Email</FieldLabel>
            <input className={inputBase} style={inputStyle} type="email" placeholder="you@example.com"
              value={email} onChange={(e) => setEmail(e.target.value)} {...focusHandlers} />
          </div>
          <div>
            <FieldLabel>Password</FieldLabel>
            <div className="relative">
              <input className={inputBase} style={{ ...inputStyle, paddingRight: "44px" }}
                type={showPassword ? "text" : "password"} placeholder="Create a strong password"
                value={password} onChange={(e) => setPassword(e.target.value)} {...focusHandlers} />
              <button type="button" onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555570] hover:text-[#9999b0] transition-colors">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <Checkbox checked={agreed} onChange={setAgreed}>
            I agree to the{" "}
            <span className="text-[#4f6ef7] cursor-pointer hover:text-[#7a9bff]">Terms of Service</span>
            {" "}and{" "}
            <span className="text-[#4f6ef7] cursor-pointer hover:text-[#7a9bff]">Privacy Policy</span>
          </Checkbox>
        </div>

        <button onClick={onSuccess}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-150 hover:brightness-110 active:scale-95 mt-6"
          style={{ background: "linear-gradient(135deg, #5a78f8 0%, #4060e8 100%)", boxShadow: "0 4px 20px rgba(79,110,247,0.4)" }}>
          Create Account <ArrowRight className="w-4 h-4" />
        </button>

        <Divider />
        <GoogleButton />

        <p className="text-center text-sm text-[#8888a0] mt-6">
          Already have an account?{" "}
          <button onClick={onGoSignIn} className="text-[#4f6ef7] hover:text-[#7a9bff] font-medium transition-colors">Sign In</button>
        </p>
      </div>
    </AuthShell>
  );
}
