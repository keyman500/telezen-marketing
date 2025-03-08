"use client";

import { Icons } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import telezenLogo from "../../../../public/telezen-logo.png";

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      setSubmitStatus({
        type: "error",
        message: "Please enter a valid email address",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Thank you for joining our waitlist! We'll be in touch soon.",
        });
        setEmail("");
        // Show success state after a short delay
        setTimeout(() => {
          setIsSuccess(true);
        }, 1500);
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container relative flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[40%] -right-[60%] h-[1000px] w-[1000px] rounded-full bg-primary/5" />
        <div className="absolute -bottom-[30%] -left-[60%] h-[800px] w-[800px] rounded-full bg-primary/5" />
      </div>
      
      {/* Logo and navigation */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-4 sm:top-8 left-4 sm:left-8 z-10"
      >
        <Link href="/" className="flex items-center gap-2">
          <Image src={telezenLogo} alt="Telezen Logo" className="w-auto h-[30px] sm:h-[40px]" />
          <span className="font-bold text-lg sm:text-xl">{siteConfig.name}</span>
        </Link>
      </motion.div>
      
      <div className="w-full max-w-md mx-auto mt-16 sm:mt-0">
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-none shadow-lg">
              <CardHeader className="space-y-2 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <Icons.check className="h-10 w-10 text-green-600" />
                </div>
                <CardTitle className="text-xl sm:text-2xl font-bold">You&apos;re on the list!</CardTitle>
                <CardDescription className="text-muted-foreground text-sm sm:text-base">
                  Thank you for joining our waitlist. We&apos;ll notify you when we&apos;re ready to launch.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4 text-sm">
                  <div className="flex gap-2">
                    <Icons.check className="h-5 w-5 text-primary flex-shrink-0" />
                    <p>We&apos;ve sent a confirmation email to your inbox</p>
                  </div>
                  <div className="flex gap-2">
                    <Icons.check className="h-5 w-5 text-primary flex-shrink-0" />
                    <p>You&apos;ll be among the first to access our platform</p>
                  </div>
                  <div className="flex gap-2">
                    <Icons.check className="h-5 w-5 text-primary flex-shrink-0" />
                    <p>Stay tuned for exclusive updates and offers</p>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-3">
                  <Link
                    href="/"
                    className={buttonVariants({ variant: "default" })}
                  >
                    Return to homepage
                  </Link>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsSuccess(false)}
                  >
                    Add another email
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-none shadow-lg">
              <CardHeader className="space-y-2 text-center">
                <motion.div 
                  className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Icons.logo className="h-10 w-10 text-primary" />
                </motion.div>
                <CardTitle className="text-xl sm:text-2xl font-bold">Join Our Waitlist</CardTitle>
                <CardDescription className="text-muted-foreground text-sm sm:text-base">
                  Be the first to experience our AI-powered call management solution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      className="w-full"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  {submitStatus.type && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className={cn(
                        "p-3 rounded-md text-sm",
                        submitStatus.type === "success"
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-red-50 text-red-700 border border-red-200"
                      )}
                    >
                      {submitStatus.type === "success" ? (
                        <div className="flex items-center gap-2">
                          <Icons.check className="h-4 w-4" />
                          <span>{submitStatus.message}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Icons.warning className="h-4 w-4" />
                          <span>{submitStatus.message}</span>
                        </div>
                      )}
                    </motion.div>
                  )}
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <Icons.spinner className="h-4 w-4 animate-spin" />
                        <span>Submitting...</span>
                      </div>
                    ) : (
                      "Join Waitlist"
                    )}
                  </Button>
                </form>
                
                <div className="mt-8 space-y-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Why join our waitlist?
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-4 text-sm">
                    {[
                      "Early access to our AI call management platform",
                      "Special pricing for early adopters",
                      "Be part of shaping the future of call management"
                    ].map((benefit, index) => (
                      <motion.div 
                        key={index}
                        className="flex gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 + (index * 0.1) }}
                      >
                        <Icons.check className="h-5 w-5 text-primary flex-shrink-0" />
                        <p>{benefit}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* <div className="mt-6 text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link href="/login" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </div> */}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
      
      {/* <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="absolute bottom-4 sm:bottom-8 left-4 right-4 text-center text-xs sm:text-sm text-muted-foreground"
      >
        <p>
          By joining our waitlist, you agree to our{" "}
          <Link href="#" className="text-primary hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </p>
      </motion.div> */}
    </div>
  );
} 