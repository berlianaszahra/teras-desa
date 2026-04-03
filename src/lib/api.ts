const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

function getToken() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
}

async function request <T>(
    endpoint: string,
    options: RequestInit = {}
) : Promise<T> {
    const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }
  
  const token = getToken()
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(error?.message || `HTTP ${res.status}`)
  }

  return res.json()
}

//auth
export async function register(body: {
  username: string
  name: string
  email: string
  phone_number: string
  password: string
}) {
  return request<{
    data: {
      id: string
      username: string
      name: string
      email: string
      phoneNumber: string
      role: string
    }
  }>('/api/users/register', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export async function login(body: { 
    email: string; password: string 
}) {
  return request<{ 
    data: { token: string } 
    }>('/api/users/login', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}



export async function loginWithGoogle(idToken: string) {
  return request<{ data: { token: string } }>('/api/users/oauth/google', {
    method: 'POST',
    body: JSON.stringify({ idToken }),
  })
}