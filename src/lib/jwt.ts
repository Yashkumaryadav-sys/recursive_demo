import { JwtPayload, AuthUser, UserRole } from '../types';

const JWT_SECRET = 'CareRoute-AI-India-Secret-Key-2026-NHA-ERSS';

// Base64url encoding and decoding helpers
function base64UrlEncode(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

// HMAC-SHA256 signing using Web Crypto API
async function signHmacSha256(data: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, enc.encode(data));
  const bytes = new Uint8Array(signature);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

// Generate valid RFC 7519 JSON Web Token
export async function generateJwt(
  user: {
    sub: string;
    name: string;
    email: string;
    role: UserRole;
    regNumber?: string;
    nationalHealthId?: string;
    phone?: string;
  },
  expiresInSeconds: number = 86400 // 24 hours
): Promise<string> {
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };

  const now = Math.floor(Date.now() / 1000);
  const payload: JwtPayload = {
    ...user,
    iss: 'CareRoute-AI-India',
    iat: now,
    exp: now + expiresInSeconds,
  };

  const headerB64 = base64UrlEncode(JSON.stringify(header));
  const payloadB64 = base64UrlEncode(JSON.stringify(payload));
  const dataToSign = `${headerB64}.${payloadB64}`;
  const signatureB64 = await signHmacSha256(dataToSign, JWT_SECRET);

  return `${dataToSign}.${signatureB64}`;
}

// Verify JWT signature and expiration
export async function verifyJwt(token: string): Promise<{
  valid: boolean;
  payload?: JwtPayload;
  error?: string;
}> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return { valid: false, error: 'Malformed token structure (must be 3 dot-separated segments)' };
    }

    const [headerB64, payloadB64, signatureB64] = parts;
    const dataToSign = `${headerB64}.${payloadB64}`;
    const expectedSignature = await signHmacSha256(dataToSign, JWT_SECRET);

    if (signatureB64 !== expectedSignature) {
      return { valid: false, error: 'Invalid HMAC-SHA256 signature' };
    }

    const payloadJson = base64UrlDecode(payloadB64);
    const payload: JwtPayload = JSON.parse(payloadJson);

    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      return { valid: false, error: 'Token has expired' };
    }

    return { valid: true, payload };
  } catch (err: any) {
    return { valid: false, error: err.message || 'Token verification failed' };
  }
}

// Decode token components without full verification (for UI inspection)
export function parseJwtParts(token: string): {
  header: Record<string, any>;
  payload: JwtPayload;
  signature: string;
} | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    return {
      header: JSON.parse(base64UrlDecode(parts[0])),
      payload: JSON.parse(base64UrlDecode(parts[1])),
      signature: parts[2],
    };
  } catch {
    return null;
  }
}

// Demo Registered Users for Patient, Doctor, and Admin
export const DEMO_ACCOUNTS: {
  [role in UserRole]: {
    email: string;
    password: string;
    user: Omit<AuthUser, 'token'>;
  };
} = {
  patient: {
    email: 'patient@careroute.in',
    password: 'Patient@123',
    user: {
      id: 'usr_pat_01',
      name: 'Ankur Sharma',
      email: 'patient@careroute.in',
      role: 'patient',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDW1oEQ53ommVAIxu_mc0ntAKMCuLvYFJoFF0Mx4FGrVOHnXDydjQ8ApXq-8TX_2lR5RKlyADLmMlqQ3O3iNJ8z0Audt1iVEJtn47EddMggaWRoWL1LPkQLBHc8KsziDV1fnl0vsb52nWN37KVm7n_65i_fBbBc1V-qmwCek-FZvP70jJxYnDgJAx0fWdrv1pbpnamuQqC1VbQMwWFcxUWypxgixZEs11v5ZmV_3QU0sXZ-xwiIM0h8Bw',
      regNumber: 'ABHA: 91-4821-7749-2018',
      nationalHealthId: '91-4821-7749-2018',
      phone: '+91 98112 34567',
    },
  },
  doctor: {
    email: 'doctor@careroute.in',
    password: 'Doctor@123',
    user: {
      id: 'usr_doc_01',
      name: 'Dr. Ankur Sharma, MD',
      email: 'doctor@careroute.in',
      role: 'doctor',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDW1oEQ53ommVAIxu_mc0ntAKMCuLvYFJoFF0Mx4FGrVOHnXDydjQ8ApXq-8TX_2lR5RKlyADLmMlqQ3O3iNJ8z0Audt1iVEJtn47EddMggaWRoWL1LPkQLBHc8KsziDV1fnl0vsb52nWN37KVm7n_65i_fBbBc1V-qmwCek-FZvP70jJxYnDgJAx0fWdrv1pbpnamuQqC1VbQMwWFcxUWypxgixZEs11v5ZmV_3QU0sXZ-xwiIM0h8Bw',
      regNumber: 'NMC / DMC Reg: 48291-N',
      phone: '+91 98200 12345',
    },
  },
  admin: {
    email: 'admin@careroute.in',
    password: 'Admin@123',
    user: {
      id: 'usr_adm_01',
      name: 'Rajesh Verma',
      email: 'admin@careroute.in',
      role: 'admin',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDmd_7zrgCPP8KzrspQ-A7cJUoqZilqdrvL_Wp0wJ0ooRtuFD8lfd8BbWetrA9QywrJHaZysei5GWW1BpVg29Seiaugpro1u8x5KkICsyC5wC6XnuObgsg8ZQ8HawqBGFTGk8pWcDNBEukYqIpG6gXb5hnAc7hgLOsxPcu3Yysrc9NCsHkmLE-5YdL2FoRf3J-ZgZfgVsfWp_aRFX-J5MYRuNok9nZsPniW18BsdZDT-bCh4ZBjRghgNA',
      regNumber: 'NDHM / ABDM Node Admin #09',
      phone: '+91 11 2345 6789',
    },
  },
};
