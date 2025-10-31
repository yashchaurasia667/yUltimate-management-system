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
    <div className='flex flex-row sticky top-0  h-[100px]   items-end justify-between  bg-[#B95F83] p-0 '>
        <div className='mb-4'>
            <Image src='/Logo.png' alt='image' height={70} width={70}></Image>

        </div>
      
       
    
     <div className='mr-14 mt-7 mb-3.5 '>
        
           <SignedOut >
                <SignInButton>
                    <button className='bg-white text-black  p-2 rounded-sm mr-1.5  mb-4 font-mono hover:bg-gray-400'>Login</button>
                </SignInButton>
            </SignedOut> 
           

            <SignedIn>
                <div className='h-[30px] mb-7'>
                    <UserButton appearance={{
                        elements: {
                        userButtonAvatarBox: {
                            width: '48px',
                            height: '48px',
                        },
                        userButtonAvatarImage: {
                            width: '100%',
                            height: '100%',
                            borderRadius: '8px', // optional: round or square
                        },
                        },
                     }}
                   />
                </div>
            </SignedIn>

     </div>
        
      
    </div>
  )
}

export default navbar
function resdirect(arg0: string) {
  throw new Error('Function not implemented.')
}
