import React, { useState, useMemo } from 'react'
import Navbar from '../components/Navbar'
import ListingCard from '../components/ListingCard'
import styles from './HomePage.module.css'

// ── Mock listings (replace with real API fetch later) ──────────────────────
const MOCK_LISTINGS = [
  { id: 1, title: 'Engineering Mathematics – Kreyszig', category: 'Books', price: 320, condition: 'Good', seller: 'Riya M.', rating: 4.8, image: null, tags: ['maths', 'sem3'], daysAgo: 1 },
  { id: 2, title: 'Dell XPS 13 Charger (65W)', category: 'Electronics', price: 850, condition: 'Like New', seller: 'Aarav K.', rating: 4.9, image: null, tags: ['laptop', 'dell'], daysAgo: 2 },
  { id: 3, title: 'Data Structures Notes – Handwritten', category: 'Notes', price: 80, condition: 'Good', seller: 'Priya S.', rating: 4.6, image: null, tags: ['dsa', 'cs'], daysAgo: 0 },
  { id: 4, title: 'Blue Noise-Cancelling Headphones', category: 'Electronics', price: 1200, condition: 'Used', seller: 'Dhruv T.', rating: 4.5, image: null, tags: ['audio', 'work'], daysAgo: 3 },
  { id: 5, title: 'Fluid Mechanics – Frank White', category: 'Books', price: 400, condition: 'Fair', seller: 'Nandini V.', rating: 4.7, image: null, tags: ['mech', 'sem4'], daysAgo: 5 },
  { id: 6, title: 'Study Desk Lamp (USB)', category: 'Furniture', price: 250, condition: 'Like New', seller: 'Kiran P.', rating: 4.9, image: null, tags: ['lamp', 'room'], daysAgo: 1 },
  { id: 7, title: 'VIT AP Hoodie – L size', category: 'Clothing', price: 550, condition: 'Good', seller: 'Sneha R.', rating: 4.3, image: null, tags: ['hoodie', 'merch'], daysAgo: 4 },
  { id: 8, title: 'Casio FX-991EX Scientific Calculator', category: 'Electronics', price: 600, condition: 'Like New', seller: 'Rohan G.', rating: 4.8, image: null, tags: ['calc', 'exams'], daysAgo: 0 },
  { id: 9, title: 'Operating Systems – Galvin 10e', category: 'Books', price: 380, condition: 'Good', seller: 'Meera L.', rating: 4.6, image: null, tags: ['os', 'cs'], daysAgo: 6 },
  { id: 10, title: 'Mini Fridge (45L)', category: 'Furniture', price: 3500, condition: 'Used', seller: 'Arjun S.', rating: 4.4, image: null, tags: ['fridge', 'room'], daysAgo: 7 },
  { id: 11, title: 'Thermodynamics Lab Notes', category: 'Notes', price: 60, condition: 'Good', seller: 'Farhan A.', rating: 4.5, image: null, tags: ['thermo', 'mech'], daysAgo: 2 },
  { id: 12, title: 'Rain Jacket – M size', category: 'Clothing', price: 700, condition: 'Like New', seller: 'Ishaan B.', rating: 4.7, image: null, tags: ['rain', 'jacket'], daysAgo: 3 },
]

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

  const filtered = useMemo(() => {
    let items = MOCK_LISTINGS

    if (activeCategory !== 'All') {
      items = items.filter((l) => l.category === activeCategory)
    }
    if (condition !== 'All') {
      items = items.filter((l) => l.condition === condition)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      items = items.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.category.toLowerCase().includes(q) ||
          l.tags.some((t) => t.includes(q))
      )
    }

    switch (sort) {
      case 'price_asc':  return [...items].sort((a, b) => a.price - b.price)
      case 'price_desc': return [...items].sort((a, b) => b.price - a.price)
      case 'rating':     return [...items].sort((a, b) => b.rating - a.rating)
      default:           return [...items].sort((a, b) => a.daysAgo - b.daysAgo)
    }
  }, [activeCategory, search, sort, condition])

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
