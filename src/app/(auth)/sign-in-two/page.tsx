"use client"
import React, { useState } from 'react'
import { useSignIn } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'


export default function page() {
    const { signIn, isLoaded, setActive } = useSignIn();
    const [emailAddress, setEmailAddress] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [pendingVerification, setPendingVerification] = useState(false)
    const [code, setCode] = useState<string>("")
    const [error, setError] = useState<string>("")

    const router = useRouter();

    if (!isLoaded) {
        return <div>Loading...</div>
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!isLoaded) return

        try {
            const attempt = await signIn.create({
                identifier: emailAddress,
                password,
            })

            if (attempt.status === "complete") {
                await setActive({ session: attempt.createdSessionId })
                router.push("/home")
            } else {
                console.log("Error while login", attempt)
                return;
            }
        } catch (error: any) {
            console.log(error)
            setError(error?.errors?.[0]?.message || "Sign in failed")
        }
    }

    const handleGoogleSignIn = async () => {
        try {
            await signIn.authenticateWithRedirect({
                strategy: "oauth_google",
                redirectUrl: "/sso-callback",   // user comes back here
                redirectUrlComplete: "/home",   // after successful login
            })
        } catch (err) {
            console.error("Google Sign-in error:", err)
        }
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 w-[40rem] border border-white p-4"
            >
                <input
                    type="text"
                    placeholder="Email"
                    onChange={(e) => setEmailAddress(e.target.value)}
                    className="px-4 py-2 border border-white rounded-md"
                    value={emailAddress}
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="px-4 py-2 border border-white rounded-md"
                    value={password}
                />
                <div id="clerk-captcha" />
                <button type="submit">Sign In</button>
                <button type='button' onClick={handleGoogleSignIn} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >Google button</button>
                {error && <p className="text-red-500">{error}</p>}
            </form>
        </div>

    )
}
