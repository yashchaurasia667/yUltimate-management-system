"use client"
import React from 'react'
import { redirect } from 'next/navigation'

import Image from 'next/image'

import {
 
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

const rdr =()=>{
  redirect('/')

}

function navbar() {
  return (
    <div className='flex flex-row sticky top-0    items-end justify-end gap-10 bg-black/30 backdrop-blur-xl  p-0 '>
      
       
    
     <div className='mr-14 mt-7 mb-3.5 '>
        
           <SignedOut >
                <SignInButton>
                    <button className='bg-white text-black mt-0.5 p-2 rounded-sm mr-1.5  mb-3.5 font-mono hover:bg-gray-400'>Login</button>
                </SignInButton>
            </SignedOut> 
           

            <SignedIn>
                <UserButton  />
            </SignedIn>

     </div>
        
      
    </div>
  )
}

export default navbar
function resdirect(arg0: string) {
  throw new Error('Function not implemented.')
}
