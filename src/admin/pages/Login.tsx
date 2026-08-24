import React, { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Eye, EyeOff, ShieldCheck, GraduationCap, Inbox, Layers, ArrowLeft, Loader2 } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { Field, TextInput } from '../components/ui/Field';
import { Button } from '../../components/common/Button';
import { Logo } from '../../components/common/Logo';

const FEATURES = [
  { icon: GraduationCap, text: 'Manage courses, curriculum and batch details' },
  { icon: Layers, text: 'Update career programs and portfolio showcases' },
  { icon: Inbox, text: 'Track and follow up on admissions inquiries' },
];

export const Login: React.FC = () => {
  const { isAuthenticated, isLoading, login } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = (location.state as { from?: string } | null)?.from || '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) return setError('Please enter your email and password.');

    setIsSubmitting(true);
    try {
      const result = await login(email, password);
      if (!result.ok) {
        setError(result.error || 'Unable to sign in.');
        return;
      }
      navigate(redirectTo, { replace: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#FAFAF8]">
      {/* Brand panel */}
      <div className="hidden lg:flex lg:w-[44%] xl:w-[40%] bg-[#17324D] text-white flex-col justify-between p-10 xl:p-14 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="relative">
          <a href="/" className="inline-block group focus:outline-none" aria-label="Navya Ed Tech Home">
            <Logo
              variant="dark"
              size="lg"
              subtitle="Admin Console"
            />
          </a>
        </div>

        <div className="relative space-y-8">
          <div>
            <h1 className="text-3xl xl:text-4xl font-heading font-bold leading-tight tracking-tight">
              Run the academy&apos;s content and admissions from one place.
            </h1>
            <p className="mt-4 text-sm text-[#C4CDD5] leading-relaxed max-w-md">
              The operations console behind navyaedtech.com &mdash; keep course catalogs current,
              publish student work, and respond to admissions inquiries quickly.
            </p>
          </div>

          <ul className="space-y-3.5">
            {FEATURES.map((feature) => (
              <li key={feature.text} className="flex items-center gap-3 text-sm text-[#E5DFD4]">
                <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <feature.icon className="w-4 h-4 text-[#9BBAD4]" />
                </span>
                {feature.text}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative flex items-center gap-2 text-xs text-[#8C9BAE]">
          <ShieldCheck className="w-4 h-4 text-[#718C7A]" />
          <span>Access restricted to authorized Navya Ed Tech staff.</span>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-12">
        <div className="w-full max-w-sm mx-auto">
          <a
            href="/"
            className="lg:hidden inline-flex items-center gap-2 mb-8 text-xs font-medium text-[#5F6670] hover:text-[#171A1F]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to site
          </a>

          <div className="lg:hidden mb-8">
            <Logo
              variant="light"
              size="md"
              subtitle="Admin Sign In"
            />
          </div>

          <h2 className="text-2xl font-heading font-bold text-[#171A1F]">Sign in to Admin</h2>
          <p className="text-sm text-[#5F6670] mt-1.5 mb-7">Enter your credentials to access the console.</p>

          {error && (
            <div className="mb-5 px-4 py-2.5 rounded-lg bg-red-50 border border-red-100 text-xs font-medium text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <Field label="Email Address" htmlFor="email" required>
              <TextInput
                id="email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@navyaedtech.com"
              />
            </Field>

            <Field label="Password" htmlFor="password" required>
              <div className="relative">
                <TextInput
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C939E] hover:text-[#171A1F]"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </Field>

            <Button type="submit" variant="primary" size="md" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sign In'}
            </Button>
          </form>

          <p className="mt-8 text-[11px] text-[#8C939E] text-center leading-relaxed">
            Changes made here are saved directly to the live database and reflect on the site immediately.
          </p>
        </div>
      </div>
    </div>
  );
};
