const BASE = '/users'

export async function registerUser({ userName, email, password, userType }) {
  const res = await fetch(`${BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userName, email, password, userType }),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || 'Registration failed')
  }
  return res.json()
}

export async function loginUser({ email, password }) {
  const res = await fetch(`${BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || 'Login failed')
  }
  // API currently returns plain text "login successful"
  // Once you add JWT, parse res.json() here instead
  const text = await res.text()
  return { message: text }
}
