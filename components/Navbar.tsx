"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ModeToggle } from "@/components/mode-toggle";
import { useSession, signIn, signOut } from "next-auth/react";

const font = Poppins({ weight: "600", subsets: ["latin"] });

const Navbar = () => {
  const { data: session } = useSession();

  const handleloginwithgoogle = () => {
    signIn("google", { callbackUrl: "https://blog-application-drab.vercel.app/blogs" });
  };

  const handleloginwithgithub = () => {
    signIn("github", { callbackUrl: "https://blog-application-drab.vercel.app/blogs" });
  };

  const handlelogout = () => {
    signOut({ callbackUrl: "http://localhost:3000/" });
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
      variants={{
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      <div className="sticky w-full z-50 flex justify-between items-center py-2 px-4 h-16 border-b border-primary/10 bg-secondary">
        <div className="flex items-center">
          <Link href="/">
            <h1
              className={cn(
                "hidden md:block text-xl md:text-3xl font-bold text-primary",
                font.className
              )}
            >
              Blogger
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-x-5">
          <ModeToggle />
          {session === null ? (
            <>
              <Button onClick={handleloginwithgoogle} size="sm" variant="premium">
                GoogleLogin
              </Button>
              <Button onClick={handleloginwithgithub} size="sm" variant="premium">
                GithubLogin
              </Button>
            </>
          ) : (
            <>
              <Link href="/create-blog">
                <Button size="sm" variant="premium">
                  Create Blog
                </Button>
              </Link>

              <Button onClick={handlelogout} size="sm" variant="premium">
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
