import React, { useState, useMemo, useEffect } from 'react'
import Navbar from '../components/Navbar'
import ListingCard from '../components/ListingCard'
import { fetchAllListings, fetchListingsByType } from '../api/listing'
import styles from './HomePage.module.css'

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'price_asc', label: 'Price: Low → High' },
  { value: 'price_desc', label: 'Price: High → Low' },
  { value: 'rating', label: 'Best rated' },
]

const CONDITIONS = ['All', 'Like New', 'Good', 'Fair', 'Used']

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('newest')
  const [condition, setCondition] = useState('All')
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      setError('')
      try {
        const data = activeCategory === 'All'
          ? await fetchAllListings()
          : await fetchListingsByType(activeCategory)
        if (!cancelled) setListings(data)
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to load listings')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [activeCategory])

  const filtered = useMemo(() => {
    let items = listings

    if (activeCategory !== 'All') {
      const catKey = activeCategory.toUpperCase()
      items = items.filter((l) => (l.category ?? '').toString().toUpperCase() === catKey)
    }
    if (condition !== 'All') {
      const condKey = condition.toUpperCase()
      items = items.filter((l) => (l.condition ?? '').toString().toUpperCase() === condKey)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      items = items.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.category.toLowerCase().includes(q)
      )
    }

    switch (sort) {
      case 'price_asc':  return [...items].sort((a, b) => a.price - b.price)
      case 'price_desc': return [...items].sort((a, b) => b.price - a.price)
      case 'rating':     return [...items].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
      default:           return [...items].sort((a, b) => (a.daysAgo ?? 0) - (b.daysAgo ?? 0))
    }
  }, [activeCategory, search, sort, condition, listings])

  return (
    <>
      <Navbar activeCategory={activeCategory} onCategory={setActiveCategory} />

      <main className={styles.main}>
        {/* Hero */}
        <div className={styles.hero}>
          <div className={styles.heroInner}>
            <span className={styles.heroTag}>VIT-AP Campus Only</span>
            <h1>
              Buy & sell anything<br />on <em>campus</em>.
            </h1>
            <p>
              From textbooks to gadgets — find great deals from students
              in your own college.
            </p>
            <div className={styles.heroActions}>
              <button className={styles.heroBtnPrimary}>Browse listings</button>
              <button className={styles.heroBtnSecondary}>Sell something →</button>
            </div>
            <div className={styles.heroStats}>
              <div className={styles.statItem}>
                <span className={styles.statNum}>1.2k+</span>
                <span className={styles.statLabel}>Active listings</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNum}>800+</span>
                <span className={styles.statLabel}>Students</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNum}>₹0</span>
                <span className={styles.statLabel}>Commission</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNum}>4.8★</span>
                <span className={styles.statLabel}>Avg rating</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search + Filter bar */}
        <div className={styles.filterBar}>
          <div className={styles.filterInner}>
            <div className={styles.searchWrap}>
              <span className={styles.searchIcon}>⌕</span>
              <input
                className={styles.searchInput}
                type="text"
                placeholder="Search listings, books, gadgets…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className={styles.conditionPills}>
              {CONDITIONS.map((c) => (
                <button
                  key={c}
                  className={`${styles.pill} ${condition === c ? styles.pillActive : ''}`}
                  onClick={() => setCondition(c)}
                >
                  {c}
                </button>
              ))}
            </div>

            <select
              className={styles.sortSelect}
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Content */}
        <div className={styles.content}>
          <div className={styles.resultsHeader}>
            <span className={styles.resultsCount}>
              {filtered.length} listing{filtered.length !== 1 ? 's' : ''}
              {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
              {search ? ` for "${search}"` : ''}
            </span>
            {loading && <span className={styles.resultsCount}>Loading…</span>}
            {error && <span className={styles.resultsCount} style={{ color: 'red' }}>{error}</span>}
          </div>

          {filtered.length === 0 ? (
            <div className={styles.empty}>
              <span className={styles.emptyIcon}>📭</span>
              <p>No listings match your search.</p>
              <button
                className={styles.clearBtn}
                onClick={() => { setSearch(''); setCondition('All'); setActiveCategory('All') }}
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className={styles.grid}>
              {filtered.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  )
}
