"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { PopupSignIn } from "@/utils/firebase/firebase.util";
import Cookies from "js-cookie";
import { getUserDataFromCookies } from "@/utils/authentication";

type TUserData = {
  uid?: string;
  email?: string | null;
  displayName?: string | null;
};

export default function HomePage() {
  const router = useRouter();

  // Functions
  const handleSignIn = async () => {
    try {
      const result = await PopupSignIn();
      if (result) {
        const data = result.user;
        const userSigned: TUserData = {
          uid: data.uid,
          email: data.email,
          displayName: data.displayName,
        };
        console.log("data: ", data);
        Cookies.set("syncwrite-userData", JSON.stringify(userSigned), {
          expires: 3,
        });
        console.log("cookies created");
        router.push("/my-documents");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const user = getUserDataFromCookies();
    if (user) {
      router.replace("/my-documents");
    } else {
      console.log("No user data found in cookies.");
    }
  }, []);
  return (
    <main className="home-container min-h-dvh flex flex-wrap items-center justify-around bg-coolGray">
      <div className="vertical-text fixed left-0 top-1/2 transform -translate-y-1/2 text-xs italic z-10 hidden lg:block">
        Chaque instant est un rêve tissé de lumière et d&apos;ombre.
      </div>

      <div className="z-10 mt-[15vh] product-name-container">
        <h1 className="font-bold text-center text-5xl mb-3">
          <span className="font-bold text-blue-500">/ </span>SyncWrite
        </h1>
        <p className="text-center text-lg">Collaboration Docs Workspace</p>
      </div>
      <div className="p-3 z-10">
        <Card className="border-none shadow-2xl">
          <CardHeader>
            <CardTitle>Log in</CardTitle>
            <CardDescription>
              Start collaborate with log in or sign up
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="min-w-full justify-start" onClick={handleSignIn}>
              <Image
                className="mr-3"
                src="/assets/logo/Google__Logo.svg"
                alt="Google Logo"
                width={21}
                height={21}
              />
              Log in with Google
            </Button>
          </CardContent>
          <CardFooter className="flex-col">
            <p className="text-sm mb-2">Don&apos;t have an account?</p>
            <Button className="min-w-full justify-start" onClick={handleSignIn}>
              <Image
                className="mr-3"
                src="/assets/logo/Google__Logo.svg"
                alt="Google Logo"
                width={21}
                height={21}
              />
              Sign up with Google
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="hidden absolute w-full h-[15%] bottom-0 left-0 p-4 z-10 xl:block">
        <div className="w-full h-full bg-background rounded-2xl shadow-2xl flex items-center justify-center">
          <div className="w-full flex items-center">
            <div className="flex items-center tagline-container">
              <h3 className="font-bold text-2xl px-12">Create</h3>
              <h3 className="font-bold text-2xl px-12">Sync</h3>
              <h3 className="font-bold text-2xl px-12">Collaborate</h3>
            </div>
            <div>
              <p className="font-semibold text-lg italic">
                Sous la lune brillante, le silence danse avec les étoiles
                éternelles du ciel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
