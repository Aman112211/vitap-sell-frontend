import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../api/auth'
import { useAuth } from '../context/AuthContext'
import styles from './AuthPage.module.css'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) {
      setError('Please fill in all fields.')
      return
    }
    setLoading(true)
    try {
      await loginUser(form)
      // Store user info (email as identifier until JWT is added)
      login({ email: form.email })
      navigate('/')
    } catch (err) {
      setError(err.message || 'Invalid credentials. Try again.')
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
            The campus marketplace<br />built for <em>students</em>.
          </div>
          <ul className={styles.perks}>
            <li><span className={styles.dot} />Buy & sell within campus — fast.</li>
            <li><span className={styles.dot} />Textbooks, gadgets, notes & more.</li>
            <li><span className={styles.dot} />Peer-verified sellers only.</li>
          </ul>
          <div className={styles.statsRow}>
            <div className={styles.stat}>
              <span className={styles.statNum}>1.2k+</span>
              <span className={styles.statLabel}>listings</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>800+</span>
              <span className={styles.statLabel}>students</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>4.8★</span>
              <span className={styles.statLabel}>avg rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className={styles.right}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <p className={styles.cardEyebrow}>Welcome back</p>
            <h1 className={styles.cardTitle}>Sign in</h1>
          </div>

          {error && <div className={styles.errorBox}>{error}</div>}

          <form onSubmit={handleSubmit} className={styles.form}>
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
              <label className={styles.label}>Password</label>
              <input
                className={styles.input}
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? 'Signing in…' : 'Sign in →'}
            </button>
          </form>

          <p className={styles.switchText}>
            Don't have an account?{' '}
            <Link to="/register" className={styles.switchLink}>
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
