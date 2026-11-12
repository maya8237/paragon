import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { BASE, BASENAME } from './lib/base'

import './styles/tokens.css'
import './styles/reset.css'
import './styles/type.css'

/*
 * The site used to route after the `#` (`/#/en/about`). Those links are out
 * there in bookmarks and messages, so turn one into its real address before
 * the router reads the URL.
 */
if (window.location.hash.startsWith('#/')) {
  window.history.replaceState(null, '', BASE + window.location.hash.slice(2))
}

const container = document.getElementById('root')
if (!container) throw new Error('#root is missing from index.html')

/*
 * Every page arrives already rendered by the build (scripts/prerender.ts), so
 * search engines and AI tools read it without running JavaScript. The app
 * then renders over it; the markup is the same, so nothing visibly changes.
 */
createRoot(container).render(
  <StrictMode>
    <BrowserRouter basename={BASENAME}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
