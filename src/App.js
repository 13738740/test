import React from 'react'
import Nav from './comp/nav'
// Profile will be shown from the header when requested; do not render it here
import {BrowserRouter} from 'react-router-dom'
import Rout from './comp/route'
const App = () => {
  return (
    <main className='column'>
  {/* Profile removed from page root to avoid duplicate display; use header button */}
    <BrowserRouter>
    <Nav />
    <Rout />
    </BrowserRouter>
    
    </main>
  )
}

export default App