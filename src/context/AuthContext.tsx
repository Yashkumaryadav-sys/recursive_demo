import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthUser, UserRole } from '../types';
import { generateJwt, verifyJwt, DEMO_ACCOUNTS } from '../lib/jwt';
import { PATIENT_AVATAR } from '../data/mockData';

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<{ success: boolean; error?: string }>;
  registerPatient: (
    name: string,
    email: string,
    password: string,
    nationalHealthId: string,
    phone?: string
  ) => Promise<{ success: boolean; error?: string }>;
  updateNationalHealthId: (newId: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  switchRole: (role: UserRole) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_STORAGE_KEY = 'careroute_jwt_token_india';
const REGISTERED_PATIENTS_KEY = 'careroute_registered_patients_india';

// Helper to format National Health ID (12 to 14 digits)
export function formatNationalHealthId(input: string): string {
  const digits = input.replace(/\D/g, '');
  if (digits.length === 14) {
    return `${digits.slice(0, 2)}-${digits.slice(2, 6)}-${digits.slice(6, 10)}-${digits.slice(10, 14)}`;
  } else if (digits.length === 12) {
    return `${digits.slice(0, 4)}-${digits.slice(4, 8)}-${digits.slice(8, 12)}`;
  }
  return input.trim();
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize session on mount: Restore if active token, otherwise user starts at login page
  useEffect(() => {
    async function restoreSession() {
      try {
        const savedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
        if (savedToken) {
          const result = await verifyJwt(savedToken);
          if (result.valid && result.payload) {
            const role = result.payload.role;
            const demo = DEMO_ACCOUNTS[role];

            // Check if saved user is a registered patient or demo account
            let avatar = demo?.user.avatar || PATIENT_AVATAR;
            let nationalHealthId = result.payload.nationalHealthId || demo?.user.nationalHealthId || '91-4821-7749-2018';

            setUser({
              id: result.payload.sub,
              name: result.payload.name,
              email: result.payload.email,
              role: result.payload.role,
              avatar: avatar,
              nationalHealthId: nationalHealthId,
              regNumber: result.payload.regNumber || (nationalHealthId ? `ABHA: ${nationalHealthId}` : demo?.user.regNumber),
              phone: result.payload.phone || demo?.user.phone || '+91 98112 34567',
              token: savedToken,
            });
            setToken(savedToken);
            setIsLoading(false);
            return;
          }
        }
        // No saved token -> user is logged out and sees Login page
        setUser(null);
        setToken(null);
      } catch (err) {
        console.error('Session restoration error:', err);
        setUser(null);
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    }

    restoreSession();
  }, []);

  const login = async (
    email: string,
    password: string,
    role: UserRole
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      const trimmedEmail = email.toLowerCase().trim();
      const demoAccount = DEMO_ACCOUNTS[role];

      // Check standard demo accounts first
      if (trimmedEmail === demoAccount.email.toLowerCase()) {
        if (password !== demoAccount.password) {
          setIsLoading(false);
          return { success: false, error: `Invalid password for ${role}. Demo password is: ${demoAccount.password}` };
        }

        const newToken = await generateJwt({
          sub: demoAccount.user.id,
          name: demoAccount.user.name,
          email: demoAccount.user.email,
          role: role,
          nationalHealthId: demoAccount.user.nationalHealthId,
          regNumber: demoAccount.user.regNumber,
          phone: demoAccount.user.phone,
        });

        localStorage.setItem(TOKEN_STORAGE_KEY, newToken);
        const authUser: AuthUser = {
          ...demoAccount.user,
          token: newToken,
        };

        setUser(authUser);
        setToken(newToken);
        setIsLoading(false);
        return { success: true };
      }

      // If patient, also check user-created / registered profiles in localStorage
      if (role === 'patient') {
        const stored = localStorage.getItem(REGISTERED_PATIENTS_KEY);
        if (stored) {
          try {
            const registeredList = JSON.parse(stored);
            const found = registeredList.find(
              (p: any) => p.email.toLowerCase().trim() === trimmedEmail
            );

            if (found) {
              if (found.password !== password) {
                setIsLoading(false);
                return { success: false, error: 'Invalid password for this registered patient account.' };
              }

              const formattedId = formatNationalHealthId(found.nationalHealthId);
              const newToken = await generateJwt({
                sub: found.id,
                name: found.name,
                email: found.email,
                role: 'patient',
                nationalHealthId: formattedId,
                regNumber: `ABHA: ${formattedId}`,
                phone: found.phone || '+91 98112 34567',
              });

              localStorage.setItem(TOKEN_STORAGE_KEY, newToken);
              const authUser: AuthUser = {
                id: found.id,
                name: found.name,
                email: found.email,
                role: 'patient',
                avatar: PATIENT_AVATAR,
                nationalHealthId: formattedId,
                regNumber: `ABHA: ${formattedId}`,
                phone: found.phone || '+91 98112 34567',
                token: newToken,
              };

              setUser(authUser);
              setToken(newToken);
              setIsLoading(false);
              return { success: true };
            }
          } catch (e) {
            console.error('Error reading registered patients:', e);
          }
        }
      }

      // If neither demo nor registered
      setIsLoading(false);
      return {
        success: false,
        error: `Account not found for ${role}. You can use demo credentials (${demoAccount.email}) or create a new profile.`,
      };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err.message || 'Login failed' };
    }
  };

  const registerPatient = async (
    name: string,
    email: string,
    password: string,
    nationalHealthId: string,
    phone: string = '+91 98112 34567'
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      // Validate National Health ID (12 to 14 digits)
      const digitsOnly = nationalHealthId.replace(/\D/g, '');
      if (digitsOnly.length < 12 || digitsOnly.length > 14) {
        setIsLoading(false);
        return {
          success: false,
          error: `National Health ID Card must contain 12 to 14 digits (you entered ${digitsOnly.length} digits). Example: 91-4821-7749-2018 or 14 digits.`,
        };
      }

      const formattedHealthId = formatNationalHealthId(nationalHealthId);
      const newId = `usr_pat_${Date.now()}`;

      // Save to registered list
      const stored = localStorage.getItem(REGISTERED_PATIENTS_KEY);
      let registeredList: any[] = [];
      if (stored) {
        try {
          registeredList = JSON.parse(stored);
        } catch {
          registeredList = [];
        }
      }

      const newRecord = {
        id: newId,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        nationalHealthId: formattedHealthId,
        phone: phone.trim(),
      };

      // Filter out duplicates with same email
      registeredList = registeredList.filter((p) => p.email !== newRecord.email);
      registeredList.push(newRecord);
      localStorage.setItem(REGISTERED_PATIENTS_KEY, JSON.stringify(registeredList));

      // Generate verified JWT
      const newToken = await generateJwt({
        sub: newId,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        role: 'patient',
        nationalHealthId: formattedHealthId,
        regNumber: `ABHA: ${formattedHealthId}`,
        phone: phone.trim(),
      });

      localStorage.setItem(TOKEN_STORAGE_KEY, newToken);
      const authUser: AuthUser = {
        id: newId,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        role: 'patient',
        avatar: PATIENT_AVATAR,
        nationalHealthId: formattedHealthId,
        regNumber: `ABHA: ${formattedHealthId}`,
        phone: phone.trim(),
        token: newToken,
      };

      setUser(authUser);
      setToken(newToken);
      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err.message || 'Profile formation failed' };
    }
  };

  const updateNationalHealthId = async (newId: string): Promise<{ success: boolean; error?: string }> => {
    if (!user) return { success: false, error: 'No active session' };
    const digitsOnly = newId.replace(/\D/g, '');
    if (digitsOnly.length < 12 || digitsOnly.length > 14) {
      return {
        success: false,
        error: `National Health ID Card must contain 12 to 14 digits (you entered ${digitsOnly.length} digits).`,
      };
    }

    const formattedId = formatNationalHealthId(newId);
    const newToken = await generateJwt({
      sub: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      nationalHealthId: formattedId,
      regNumber: `ABHA: ${formattedId}`,
      phone: user.phone,
    });

    localStorage.setItem(TOKEN_STORAGE_KEY, newToken);
    const updatedUser: AuthUser = {
      ...user,
      nationalHealthId: formattedId,
      regNumber: `ABHA: ${formattedId}`,
      token: newToken,
    };
    setUser(updatedUser);
    setToken(newToken);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setUser(null);
    setToken(null);
  };

  const switchRole = async (role: UserRole) => {
    const demo = DEMO_ACCOUNTS[role];
    await login(demo.email, demo.password, role);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        isLoading,
        login,
        registerPatient,
        updateNationalHealthId,
        logout,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
