import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-transparent px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[280px_1fr]">
        <Sidebar />
        <div className="space-y-6">
          <Navbar />
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
