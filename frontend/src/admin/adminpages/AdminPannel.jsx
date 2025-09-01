import React, { useState } from 'react'
import AdminTools from '../admincomponents/AdminTools'
import AdminData from '../admincomponents/AdminData'

const AdminPannel = () => {
  const [openSidebar, setOpenSidebar] = useState(false)

  return (
    <>
      <div className="flex w-full h-[100vh] p-2 md:p-5 gap-4 relative">
        
        {/* Sidebar (AdminTools) */}
        <div
          className={`fixed md:static top-0 left-0 h-full bg-white shadow-md z-50 transition-transform duration-300 
          ${openSidebar ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 w-[70%] md:w-[25%]`}
        >
          <AdminTools />
        </div>

        {/* Main Content (AdminData) */}
        <div className="flex-1 h-full border-1 rounded-sm">
          {/* Mobile Toggle Button */}
          <button
            className="md:hidden bg-black text-white px-3 py-2 m-2 rounded"
            onClick={() => setOpenSidebar(!openSidebar)}
          >
            {openSidebar ? 'Close Menu' : 'Open Menu'}
          </button>

          <AdminData />
        </div>
      </div>
    </>
  )
}

export default AdminPannel
