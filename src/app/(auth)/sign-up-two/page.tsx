"use client"
import React, { useState } from 'react'
import { useSignUp } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import Link from 'next/link'


export default function page() {
  const {signUp, isLoaded, setActive} = useSignUp();
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string>("");

  const router = useRouter();

  if(!isLoaded){
    return <div>Loading...</div>
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // we already prevent this but still add this 
    if(!isLoaded) return;

    try {
      await signUp.create({
        emailAddress,
        password
      });

      // since clerk is a saas applicaiton we did't loose the user
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code"
        // strategy: "email_link"
        // we can either use code or link to verify user
      });

      setPendingVerification(true);

    } catch (error: any) {
      console.log(JSON.stringify(error, null, 2));
      setError(error.errors[0].message);
      // see clerk error docs
    }
  }

  const onPressVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({code});

      if(completeSignUp.status !== "complete"){
        console.log(JSON.stringify(completeSignUp, null, 2));
        return;
      }

      if(completeSignUp.status === "complete"){
        await setActive({session: completeSignUp.createdSessionId});
        router.push("/home");
      }
    } catch (error: any) {
      console.log(JSON.stringify(error, null, 2));
      setError(error.errors[0].message);
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signUp.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/home"
      })
    } catch (error) {
      console.error("Google Sign-in error:", error)
    }
  }

  return (
    <div>
      {!pendingVerification ?
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-[40rem] border border-white'>
        <input type="text" placeholder='Email' onChange={(e) => setEmailAddress(e.target.value)} className='px-4 py-2 border border-white rounded-md' value={emailAddress}/>
        <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} className='px-4 py-2 border border-white rounded-md' value={password} />
        <div id="clerk-captcha" />
        <button>Submit</button>
        <button type='button' onClick={handleGoogleSignIn} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >Google button</button>
      </form>
      :
      <form onSubmit={onPressVerify} className='flex flex-col gap-4 w-[40rem] border border-white'>
        <input type="text" placeholder='Verification Code' onChange={(e) => setCode(e.target.value)} className='px-4 py-2 border border-white rounded-md' value={code} />
        <button>Submit</button>
      </form>
    }
    </div>
  )
}
