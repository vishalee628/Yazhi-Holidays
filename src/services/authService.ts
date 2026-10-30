const AUTH_KEY = 'yazhi_admin_session';

export interface AdminUser {
  email: string;
  name: string;
  role: 'SuperAdmin' | 'TravelSpecialist';
  token: string;
}

export const checkAdminAuth = (): AdminUser | null => {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const adminLogin = (email: string, pass: string): { success: boolean; message: string; user?: AdminUser } => {
  // Demo admin credentials:
  // Email: admin@yazhiholidays.com
  // Pass: Yazhi@Luxury2026 or admin123
  const normalizedEmail = email.trim().toLowerCase();
  if (
    (normalizedEmail === 'admin@yazhiholidays.com' && (pass === 'Yazhi@Luxury2026' || pass === 'admin123')) ||
    (normalizedEmail === 'admin' && pass === 'admin')
  ) {
    const user: AdminUser = {
      email: normalizedEmail,
      name: 'Yazhi Senior Concierge',
      role: 'SuperAdmin',
      token: 'jwt_mock_token_' + Date.now()
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    return { success: true, message: 'Authentication successful', user };
  }
  return { success: false, message: 'Invalid administrative credentials. Use admin@yazhiholidays.com / Yazhi@Luxury2026' };
};

export const adminLogout = (): void => {
  localStorage.removeItem(AUTH_KEY);
};
