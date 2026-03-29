import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../api/auth'
import { useAuth } from '../context/AuthContext'
import styles from './AuthPage.module.css'

export default function RegisterPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'buyer',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.userName || !form.email || !form.password || !form.confirmPassword) {
      setError('Please fill in all fields.')
      return
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setLoading(true)
    try {
      const data = await registerUser({
        userName: form.userName,
        email: form.email,
        password: form.password,
        userType: form.userType,
      })
      // Auto-login after register
      login({ email: form.email, userName: form.userName, userId: data.userId })
      navigate('/')
    } catch (err) {
      setError(err.message || 'Registration failed. Email may already be taken.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.root}>
      {/* Left panel */}
      <div className={styles.left}>
        <div className={styles.leftInner}>
          <div className={styles.brand}>
            VITap<span>Sell</span>
          </div>
          <div className={styles.tagline}>
            Join your campus<br /><em>marketplace</em> today.
          </div>
          <ul className={styles.perks}>
            <li><span className={styles.dot} />Free to list. Zero commission.</li>
            <li><span className={styles.dot} />Sell to people you can actually meet.</li>
            <li><span className={styles.dot} />Safe, student-only community.</li>
          </ul>
        </div>
      </div>

      {/* Right panel — form */}
      <div className={styles.right}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <p className={styles.cardEyebrow}>New here?</p>
            <h1 className={styles.cardTitle}>Create account</h1>
          </div>

          {error && <div className={styles.errorBox}>{error}</div>}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <label className={styles.label}>Full Name</label>
              <input
                className={styles.input}
                type="text"
                name="userName"
                placeholder="Arjun Sharma"
                value={form.userName}
                onChange={handleChange}
                autoComplete="name"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Email</label>
              <input
                className={styles.input}
                type="email"
                name="email"
                placeholder="you@vitap.ac.in"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>I want to</label>
              <select
                className={styles.input}
                name="userType"
                value={form.userType}
                onChange={handleChange}
              >
                <option value="buyer">Buy items</option>
                <option value="seller">Sell items</option>
                <option value="both">Buy & Sell</option>
              </select>
            </div>

            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label className={styles.label}>Password</label>
                <input
                  className={styles.input}
                  type="password"
                  name="password"
                  placeholder="Min 6 chars"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Confirm</label>
                <input
                  className={styles.input}
                  type="password"
                  name="confirmPassword"
                  placeholder="Repeat password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
              </div>
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? 'Creating account…' : 'Create account →'}
            </button>
          </form>

          <p className={styles.switchText}>
            Already have an account?{' '}
            <Link to="/login" className={styles.switchLink}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
