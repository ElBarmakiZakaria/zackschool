"use client";

import Homepage from "@/components/Homepage";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";



const Page = () => {

  const { isLoaded, isSignedIn, user } = useUser();

  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      const role = user?.publicMetadata.role;
      if (role) {
        router.push(`/${role}`);
      }
    }
  }, [isLoaded, isSignedIn, user, router]);


  if (!isLoaded) {
    // Show a friendly loading message while user data is being fetched
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-lg font-medium text-gray-700">Loading your account...</p>
        </div>
      </div>
    );
  }

  if (isSignedIn) {
    // This should rarely be visible because of the redirect, but serves as a fallback
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg font-medium text-gray-700">Redirecting...</p>
      </div>
    );
  }


  return (
    <Homepage />
  )

}

export default Page