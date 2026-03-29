import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import styles from './Navbar.module.css'

const CATEGORIES = ['All', 'Product', 'Books', 'Electronics', 'Notes', 'Clothing', 'Furniture', 'Other']

export default function Navbar({ activeCategory, onCategory }) {
  const { user, logout } = useAuth()
  const [showMenu, setShowMenu] = useState(false)

  const initials = user?.userName
    ? user.userName.slice(0, 2).toUpperCase()
    : user?.email?.slice(0, 2).toUpperCase() ?? 'U'

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        VITap<span>Sell</span>
      </div>

      <div className={styles.catPills}>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={`${styles.catBtn} ${activeCategory === c ? styles.active : ''}`}
            onClick={() => onCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className={styles.right}>
        <button className={styles.sellBtn}>+ List Item</button>
        <div className={styles.avatarWrap}>
          <button
            className={styles.avatar}
            onClick={() => setShowMenu((s) => !s)}
            aria-label="User menu"
          >
            {initials}
          </button>
          {showMenu && (
            <div className={styles.dropdown}>
              <div className={styles.dropUser}>
                <span className={styles.dropName}>{user?.userName ?? user?.email}</span>
                <span className={styles.dropEmail}>{user?.email}</span>
              </div>
              <div className={styles.dropDivider} />
              <button className={styles.dropItem}>My Listings</button>
              <button className={styles.dropItem}>Profile</button>
              <div className={styles.dropDivider} />
              <button className={styles.dropItem} onClick={logout}>
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
