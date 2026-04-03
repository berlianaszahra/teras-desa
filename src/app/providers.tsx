'use client';

import { AuthProvider } from '@/lib/auth-context';

// Wrapper client-side untuk AuthProvider agar bisa dipakai di root layout (Server Component)
export default function Providers({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
