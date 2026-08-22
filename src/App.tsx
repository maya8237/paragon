import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { LangProvider, isLang, preferredLang } from './i18n/LangContext'
import { Header, Footer } from './components/Chrome'

import Home from './pages/Home'
import About from './pages/About'
import Scm from './pages/Scm'
import GlobalTrade from './pages/GlobalTrade'
import Ocean from './pages/Ocean'
import Air from './pages/Air'
import DropShipments from './pages/DropShipments'
import Charter from './pages/Charter'
import Logistics from './pages/Logistics'
import Tracking from './pages/Tracking'
import Nippon from './pages/Nippon'
import Contact from './pages/Contact'
import Accessibility from './pages/Accessibility'
import NotFound from './pages/NotFound'

/**
 * Scrolls to the top on route change, but leaves in-page anchors alone so
 * `/en/about#certifications` still lands on the certifications block. The
 * explicit offset avoids native hash scrolling landing at the wrong position
 * when a routed page finishes laying out after the browser handles the hash.
 */
function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      let frame = window.requestAnimationFrame(() => {
        frame = window.requestAnimationFrame(() => {
          const target = document.getElementById(hash.slice(1))
          if (!target) return
          const headerOffset = document.querySelector('header')?.getBoundingClientRect().height ?? 0
          const targetTop = target.getBoundingClientRect().top + window.scrollY
          window.scrollTo({ top: Math.max(0, targetTop - headerOffset - 16), behavior: 'auto' })
        })
      })
      return () => window.cancelAnimationFrame(frame)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

function Shell() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="scm" element={<Scm />} />
          <Route path="global-trade">
            <Route index element={<GlobalTrade />} />
            <Route path="ocean" element={<Ocean />} />
            <Route path="air" element={<Air />} />
            <Route path="drop-shipments" element={<DropShipments />} />
            <Route path="charter" element={<Charter />} />
          </Route>
          <Route path="logistics" element={<Logistics />} />
          <Route path="tracking" element={<Tracking />} />
          <Route path="nippon" element={<Nippon />} />
          <Route path="contact" element={<Contact />} />
          <Route path="accessibility" element={<Accessibility />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

/**
 * Reads `:lang` off the URL — the URL is the single source of truth for
 * language. A path that does not start with a known language (a bare
 * `/contact`, or an old bookmark) is re-homed under the visitor's preferred
 * language with the rest of the path intact.
 */
function LangRoute() {
  const { lang } = useParams()
  const { pathname, search, hash } = useLocation()

  if (!isLang(lang)) {
    return <Navigate to={`/${preferredLang()}${pathname}${search}${hash}`} replace />
  }

  return (
    <LangProvider lang={lang}>
      <Shell />
    </LangProvider>
  )
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Navigate to={`/${preferredLang()}`} replace />} />
        <Route path="/:lang/*" element={<LangRoute />} />
      </Routes>
    </>
  )
}
