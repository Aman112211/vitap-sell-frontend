import React, { useState } from 'react'
import styles from './ListingCard.module.css'

// Pastel placeholder backgrounds per category
const CATEGORY_COLORS = {
  Books:       { bg: '#fef3ec', accent: '#e85d2f' },
  Electronics: { bg: '#edf0fd', accent: '#2f6de8' },
  Notes:       { bg: '#fdf9ec', accent: '#c9a84c' },
  Clothing:    { bg: '#f0fdf4', accent: '#22c55e' },
  Furniture:   { bg: '#f5f0fd', accent: '#7c3aed' },
  Other:       { bg: '#f5f0e8', accent: '#7a7468' },
}

const CATEGORY_EMOJI = {
  Books:       '📖',
  Electronics: '💻',
  Notes:       '📝',
  Clothing:    '👕',
  Furniture:   '🪑',
  Other:       '📦',
}

const CONDITION_COLORS = {
  'Like New': { bg: '#dcfce7', color: '#15803d' },
  'Good':     { bg: '#fef9c3', color: '#a16207' },
  'Fair':     { bg: '#ffedd5', color: '#c2410c' },
  'Used':     { bg: '#f1f5f9', color: '#475569' },
}

function timeAgo(days) {
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  return `${days}d ago`
}

export default function ListingCard({ listing }) {
  const [saved, setSaved] = useState(false)
  const colors = CATEGORY_COLORS[listing.category] || CATEGORY_COLORS.Other
  const condStyle = CONDITION_COLORS[listing.condition] || {}

  return (
    <div className={styles.card}>
      {/* Image / Placeholder */}
      <div className={styles.imageWrap} style={{ background: colors.bg }}>
        <span className={styles.emoji}>{CATEGORY_EMOJI[listing.category] || '📦'}</span>
        <button
          className={`${styles.saveBtn} ${saved ? styles.saved : ''}`}
          onClick={() => setSaved((s) => !s)}
          aria-label={saved ? 'Unsave' : 'Save'}
        >
          {saved ? '♥' : '♡'}
        </button>
        <span className={styles.categoryBadge} style={{ background: colors.accent }}>
          {listing.category}
        </span>
      </div>

      {/* Body */}
      <div className={styles.body}>
        <div className={styles.topRow}>
          <span
            className={styles.condition}
            style={{ background: condStyle.bg, color: condStyle.color }}
          >
            {listing.condition}
          </span>
          <span className={styles.time}>{timeAgo(listing.daysAgo)}</span>
        </div>

        <h3 className={styles.title}>{listing.title}</h3>

        <div className={styles.footer}>
          <div className={styles.priceWrap}>
            <span className={styles.rupee}>₹</span>
            <span className={styles.price}>{listing.price.toLocaleString('en-IN')}</span>
          </div>

          <div className={styles.sellerWrap}>
            <div className={styles.sellerAvatar}>
              {listing.seller.slice(0, 1)}
            </div>
            <div className={styles.sellerInfo}>
              <span className={styles.sellerName}>{listing.seller}</span>
              <span className={styles.sellerRating}>★ {listing.rating}</span>
            </div>
          </div>
        </div>

        <button className={styles.contactBtn}>Contact seller</button>
      </div>
    </div>
  )
}
