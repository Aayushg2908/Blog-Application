"use client";
import Image from "next/image";
import React, { useState, ChangeEvent, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CldUploadButton } from "next-cloudinary";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";

const CreateBlog = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const blog = {
        title,
        description,
        content,
        image,
        user: session?.user?.email,
        author: session?.user?.name,
      };

      const response = await axios.post("/api/create-blog", blog);

      if (response.data.status === 409) {
        toast.error("Please fill all fields");
      } else {
        toast.success("Blog created successfully");
        router.push("/blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      variants={{
        hidden: { opacity: 0, scale: 0.6 },
        visible: { opacity: 1, scale: 1 },
      }}
    >
      <div className="m-20 w-auto flex justify-center items-center">
        <Card className="w-[600px] p-5">
          <CardHeader className="text-center">
            <CardTitle>Create Your Blog</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-6">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter the Title"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    type="text"
                    id="description"
                    name="description"
                    placeholder="Enter a small Description"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Content</Label>
                  <Textarea
                    id="content"
                    name="content"
                    placeholder="Enter the main Content"
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                <div className="space-y-4 w-full flex flex-col justify-center items-center">
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={(result: any) => setImage(result.info.secure_url)}
                    uploadPreset="grwkis5v"
                  >
                    <div
                      className="
                            p-4 
                            border-4 
                            border-dashed
                            border-primary/10 
                            rounded-lg 
                            hover:opacity-75 
                            transition 
                            flex 
                            flex-col 
                            space-y-2 
                            items-center 
                            justify-center
                        "
                    >
                      <div className="relative h-40 w-40">
                        <Image
                          fill
                          alt="Upload"
                          src={image || "/placeholder.svg"}
                          className="rounded-lg object-cover"
                        />
                      </div>
                      <h3>Upload Image</h3>
                    </div>
                  </CldUploadButton>
                </div>
                <Button type="submit">Create Blog</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default CreateBlog;
