import React from 'react'
import AdminTools from '../admincomponents/AdminTools'
import AdminData from '../admincomponents/AdminData'

const AdminPannel = () => {
  return (
    <>
      <div className='flex w-full h-[100vh] p-5 gap-4'>
        <div className='h-full w-[25%] border-1 rounded-sm '><AdminTools /></div> 
        <div className='h-full w-[75%] border-1 rounded-sm'><AdminData /></div>
      </div>


      
    </>
  )
}

export default AdminPannel
