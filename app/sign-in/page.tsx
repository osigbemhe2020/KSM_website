"use client";
import { useState,useEffect } from "react";
import { ArrowLeft, LogIn } from "lucide-react";

import { useLogin,useGetMe } from "@/hooks/auth.hook";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify"
import { Input, Button } from "@/components/membersScreens/memberComponents/DetailsCards";
import { PasswordInput } from "@/components/membersScreens/memberComponents/PasswordInput";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, isPending } = useLogin();
  const { data: authData, isLoading } = useGetMe();
  const router = useRouter();
 

  useEffect(() => {
    if (!isLoading && authData?.user) {
      router.push('/member-page'); // already logged in, no need to be here
    }
  }, [authData, isLoading, router]);

  if (isLoading) return null;


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    mutate({ email, password }, {
      onSuccess: (data) => {
        toast.success("Logged in successfully!");
        if (data.user.mustChangePassword) {
          router.push("/member-page/settings");  // ← redirect to change password page
        } else {
          router.push("/member-page");
        }
     },
      onError: (error: { message?: string }) => {
        const message = error?.message || "Login failed. Please try again.";
        toast.error(message);
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
     
      {/* Main */}
      <div className="flex flex-1">
        {/* Left panel */}
        <div className="hidden md:block md:w-1/2 bg-gray-100" />

        {/* Right panel - form */}
        <div className="w-full md:w-1/2 flex items-center justify-start px-8 ">
          <div className="w-[380px]">
            <button onClick={() => router.push('/')} className="flex items-center gap-1 text-sm text-black mb-4">
              <ArrowLeft size={14} />
              Back
            </button>

            <h1 className="text-[49px] leading-[120%] mb-2">Member Portal</h1>
            <p className="text-[16px] mb-10 leading-[120%]">
              Sign in to access your Knights<br />Council account
            </p>

            <form onSubmit={handleSubmit} className="space-y-8">
              <Input
                type="email"
                label="Email Address"
                placeholder="YOU@EXAMPLE.COM"
                value={email}
                onChange={(value) => {
                  if (typeof value === 'string') {
                    setEmail(value);
                  } else {
                    setEmail(value.target.value);
                  }
                }}
              />

              <PasswordInput
                label="Password"
                placeholder="Enter password"
                value={password}
                onChange={(value) => {
                  if (typeof value === 'string') {
                    setPassword(value);
                  } else {
                    setPassword(value.target.value);
                  }
                }}
              />

              <Button
                type="submit"
                disabled={isPending}
                icon={isPending ? null : <LogIn size={16} />}
              >
                {isPending ? "Signing in..." : "Sign In"}
              </Button>
            </form>
            <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Forgot your password?{' '}
              <button
                onClick={() => router.push('/sign-in/forgot-password')}
                className="text-blue-600 hover:text-blue-500 font-medium transition-colors"
              >
                Reset it
              </button>
            </p>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
