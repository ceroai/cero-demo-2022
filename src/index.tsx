import React from 'react'
import ReactDOM from 'react-dom/client'
import './reset.css'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router } from 'react-router-dom'
import { setDefaultOptions } from 'date-fns'
import es from 'date-fns/esm/locale/es/index.js'
import { QueryClient, QueryClientProvider } from 'react-query'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

setDefaultOptions({
  locale: es
})

const queryClient = new QueryClient()

root.render(
  <React.StrictMode>
    <Router >
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Router>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
