import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppLoadMore from './App-LoadMore.jsx'
// import AppPagination from './App-Pagination.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppLoadMore />
    {/* <AppPagination /> */}
  </StrictMode>,
)
