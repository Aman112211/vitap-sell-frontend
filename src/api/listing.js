// Point directly to the backend. If you add a Vite proxy, switch this back to '/listing'.
const BASE = 'http://localhost:8080/listing'

function parseDaysAgo(datetime) {
  if (!datetime) return 0
  const date = new Date(datetime)
  if (Number.isNaN(date.getTime())) return 0
  const diffMs = Date.now() - date.getTime()
  return Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)))
}

function mapListing(apiListing = {}) {
  const title = apiListing.title ?? apiListing.Title ?? 'Untitled listing'
  const conditionRaw = apiListing.condition ?? apiListing.conditon
  const condition = conditionRaw ? conditionRaw.toUpperCase() : 'UNKNOWN'

  const typeRaw = apiListing.type
  const category = typeRaw ? typeRaw.toUpperCase() : 'OTHER'

  const price = Number(apiListing.price ?? 0)
  const seller = apiListing.user?.userName ?? apiListing.user?.name ?? 'Seller'
  const listingId = apiListing.listingId ?? apiListing.id ?? apiListing.listingID ?? apiListing.listing_id
  const daysAgo = parseDaysAgo(apiListing.datetime)

  return {
    id: listingId ?? `${title}-${category}-${apiListing.datetime ?? Date.now()}`,
    title,
    category,
    condition,
    price,
    seller,
    rating: apiListing.user?.rating ?? 4.5,
    description: apiListing.listingDescription ?? apiListing.description,
    daysAgo,
    raw: apiListing,
  }
}

async function fetchJson(url) {
  const res = await fetch(url)
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || `Request failed: ${res.status}`)
  }
  return res.json()
}

export async function fetchListingsByType(type) {
  const data = await fetchJson(`${BASE}/getListingByType?param=${encodeURIComponent(type)}`)
  return Array.isArray(data) ? data.map(mapListing) : []
}

export async function fetchListingsByCondition(condition) {
  const data = await fetchJson(`${BASE}/getListingByCondition?param=${encodeURIComponent(condition)}`)
  return Array.isArray(data) ? data.map(mapListing) : []
}

export async function fetchListingsByUser(userId) {
  const data = await fetchJson(`${BASE}/getListingByUser?param=${encodeURIComponent(userId)}`)
  return Array.isArray(data) ? data.map(mapListing) : []
}

export async function fetchAllListings() {
  const data = await fetchJson(`${BASE}/getListingAll`)
  return Array.isArray(data) ? data.map(mapListing) : []
}
