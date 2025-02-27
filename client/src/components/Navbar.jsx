import React, { useContext, useEffect } from 'react'
import {assets} from '../assets/assets.js'
import { Link } from 'react-router-dom'
import { SignedIn, SignedOut, SignInButton, useClerk, UserButton, useUser } from "@clerk/clerk-react";
import axios from 'axios';
import {AppContext} from '../context/AppContext.jsx'


function Navbar() {
  const { openSignIn } = useClerk();
  const { isSignedIn, user } = useUser();
  const {credit, loadCreditsData} = useContext(AppContext);

  useEffect(()=>{
    if(isSignedIn){
      loadCreditsData();
    }
  }, [isSignedIn, loadCreditsData])

  return (
    <div className="flex items-center justify-between mx-4 py-3 lg:mx-44">
      <Link to="/">
        <img className="w-32 sm:w-44" src={assets.logo} alt="" />
      </Link>
      {isSignedIn ? (
        <div>
          <UserButton />
        </div>
      ) : (
        <button
          onClick={() => openSignIn({})}
          className="bg-zinc-800 text-white flex items-center gap-4 px-4 py-2 sm:px-8 sm:py-3 text-sm rounded-full"
        >
          Get Started <img className="w-3 sm:w-4" src={assets.arrow_icon} />
        </button>
      )}
    </div>
  );
}

export default Navbar;



