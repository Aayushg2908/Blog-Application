"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get("/api/get-all-blogs")
      .then((response) => {
        setBlogs(response.data.blogs);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="text-transparent text-center m-9 bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        <h1 className="font-bold text-4xl">
          Welcome to Blogger! The Best Blogging Platform!!
        </h1>
      </div>
      <div className="mx-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 pb-10">
        {blogs.map((item: any) => (
          <motion.div
            key={item._id}
            initial="hidden"
            whileInView="visible"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4 }}
            variants={{
              hidden: { opacity: 0, scale: 0.6 },
              visible: { opacity: 1, scale: 1 },
            }}
          >
            <Card
              key={item._id}
              className="rounded-xl cursor-pointer hover:opacity-75 transition shadow-xl shadow-slate-600 hover:shadow-lg hover:shadow-slate-200"
            >
              <Link href={`/blogs/${item._id}`}>
                <CardHeader className="flex items-center justify-center text-center text-muted-foreground">
                  <div className="relative w-32 h-32">
                    <Image
                      src={item.image}
                      fill
                      className="rounded-xl object-cover"
                      alt="Character"
                    />
                  </div>
                  <p className="font-bold">{item.title}</p>
                  <p className="text-xs">{item.description}</p>
                </CardHeader>
                <CardFooter className="flex flex-col items-center justify-center text-xs text-muted-foreground">
                  <p className="lowercase mb-2">owner @{item.author}</p>
                  <p className="lowercase">click for more info</p>
                </CardFooter>
              </Link>
            </Card>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default BlogsPage;
