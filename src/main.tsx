import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

import './styles/tokens.css'
import './styles/reset.css'
import './styles/type.css'

const container = document.getElementById('root')
if (!container) throw new Error('#root is missing from index.html')

const firstPathSegment = window.location.pathname.split('/').filter(Boolean)[0] ?? ''
const basename = ['en', 'he'].includes(firstPathSegment) ? '' : firstPathSegment ? `/${firstPathSegment}` : ''

createRoot(container).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
