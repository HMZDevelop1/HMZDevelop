import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

const CurrencyContext = createContext()

const CURRENCIES = {
  CAD: { symbol: 'CAD', label: 'Canadian Dollar', flag: '🇨🇦' },
  USD: { symbol: 'USD', label: 'US Dollar', flag: '🇺🇸' },
  EUR: { symbol: 'EUR', label: 'Euro', flag: '🇪🇺' },
  MAD: { symbol: 'MAD', label: 'Moroccan Dirham', flag: '🇲🇦' },
}

const STORAGE_KEY = 'hmz-currency'
const RATES_CACHE_KEY = 'hmz-rates-cache'
const CACHE_DURATION = 60 * 60 * 1000

function getStoredCurrency() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && CURRENCIES[stored]) return stored
  } catch {}
  return 'CAD'
}

function getCachedRates() {
  try {
    const cached = JSON.parse(localStorage.getItem(RATES_CACHE_KEY))
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.rates
    }
  } catch {}
  return null
}

function storeRates(rates) {
  try {
    localStorage.setItem(RATES_CACHE_KEY, JSON.stringify({ rates, timestamp: Date.now() }))
  } catch {}
}

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState(getStoredCurrency)
  const [rates, setRates] = useState(getCachedRates)
  const [loading, setLoading] = useState(!getCachedRates())
  const [lastUpdated, setLastUpdated] = useState(null)

  const fetchRates = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch('https://api.frankfurter.app/latest?from=CAD')
      const data = await res.json()
      if (data && data.rates) {
        const newRates = { CAD: 1, ...data.rates }
        setRates(newRates)
        storeRates(newRates)
        setLastUpdated(new Date(data.date))
      }
    } catch (err) {
      console.warn('Currency fetch failed, using fallback rates')
      const fallback = { CAD: 1, USD: 0.74, EUR: 0.68, MAD: 7.3 }
      setRates(fallback)
      storeRates(fallback)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const cached = getCachedRates()
    if (!cached) {
      fetchRates()
    }
    const interval = setInterval(fetchRates, CACHE_DURATION)
    return () => clearInterval(interval)
  }, [fetchRates])

  const switchCurrency = useCallback((newCurrency) => {
    if (CURRENCIES[newCurrency]) {
      setCurrency(newCurrency)
      try { localStorage.setItem(STORAGE_KEY, newCurrency) } catch {}
    }
  }, [])

  const convertPrice = useCallback((cadPrice) => {
    if (!rates || typeof cadPrice !== 'number') return cadPrice
    const converted = cadPrice * (rates[currency] || 1)
    return Math.round(converted)
  }, [rates, currency])

  const formatPrice = useCallback((cadPrice) => {
    if (cadPrice === null || cadPrice === undefined) return 'Custom Quote'
    const converted = convertPrice(cadPrice)
    return `$${converted} ${currency}`
  }, [convertPrice, currency])

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        currencies: CURRENCIES,
        rates,
        loading,
        lastUpdated,
        switchCurrency,
        convertPrice,
        formatPrice,
        refreshRates: fetchRates,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  )
}

export const useCurrency = () => useContext(CurrencyContext)
