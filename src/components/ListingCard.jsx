import React, { useState } from 'react'
import styles from './ListingCard.module.css'

// Pastel placeholder backgrounds per category
const CATEGORY_COLORS = {
  BOOKS:       { bg: '#fef3ec', accent: '#e85d2f' },
  ELECTRONICS: { bg: '#edf0fd', accent: '#2f6de8' },
  NOTES:       { bg: '#fdf9ec', accent: '#c9a84c' },
  CLOTHING:    { bg: '#f0fdf4', accent: '#22c55e' },
  FURNITURE:   { bg: '#f5f0fd', accent: '#7c3aed' },
  PRODUCT:     { bg: '#f5f0fd', accent: '#2f6de8' },
  OTHER:       { bg: '#f5f0e8', accent: '#7a7468' },
}

const CATEGORY_EMOJI = {
  BOOKS:       '📖',
  ELECTRONICS: '💻',
  NOTES:       '📝',
  CLOTHING:    '👕',
  FURNITURE:   '🪑',
  PRODUCT:     '💻',
  OTHER:       '📦',
}

const CONDITION_COLORS = {
  'LIKE NEW': { bg: '#dcfce7', color: '#15803d' },
  'GOOD':     { bg: '#fef9c3', color: '#a16207' },
  'FAIR':     { bg: '#ffedd5', color: '#c2410c' },
  'USED':     { bg: '#f1f5f9', color: '#475569' },
  'UNKNOWN':  { bg: '#e5e7eb', color: '#374151' },
}

function timeAgo(days) {
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  return `${days}d ago`
}

export default function ListingCard({ listing }) {
  const [saved, setSaved] = useState(false)
  const categoryKey = listing.category?.toString().toUpperCase() || 'OTHER'
  const colors = CATEGORY_COLORS[categoryKey] || CATEGORY_COLORS.OTHER
  const condKey = listing.condition?.toString().toUpperCase() || 'UNKNOWN'
  const condStyle = CONDITION_COLORS[condKey] || CONDITION_COLORS.UNKNOWN
  const sellerName = listing.seller || 'Seller'
  const priceValue = Number.isFinite(listing.price) ? listing.price : 0
  const timeLabel = Number.isFinite(listing.daysAgo) ? timeAgo(listing.daysAgo) : 'Recently'

  return (
    <div className={styles.card}>
      {/* Image / Placeholder */}
      <div className={styles.imageWrap} style={{ background: colors.bg }}>
        <span className={styles.emoji}>{CATEGORY_EMOJI[categoryKey] || '📦'}</span>
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
          <span className={styles.time}>{timeLabel}</span>
        </div>

        <h3 className={styles.title}>{listing.title}</h3>

        <div className={styles.footer}>
          <div className={styles.priceWrap}>
            <span className={styles.rupee}>₹</span>
            <span className={styles.price}>{priceValue.toLocaleString('en-IN')}</span>
          </div>

          <div className={styles.sellerWrap}>
            <div className={styles.sellerAvatar}>
              {sellerName.slice(0, 1)}
            </div>
            <div className={styles.sellerInfo}>
              <span className={styles.sellerName}>{sellerName}</span>
              {listing.rating && <span className={styles.sellerRating}>★ {listing.rating}</span>}
            </div>
          </div>
        </div>

        <button className={styles.contactBtn}>Contact seller</button>
      </div>
    </div>
  )
}
