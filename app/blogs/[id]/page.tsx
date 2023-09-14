"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CldUploadButton } from "next-cloudinary";

interface BlogData {
  title: string;
  image: string;
  description: string;
  content: string;
  user: string;
}

const BlogPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const params = useParams();
  const id = params.id;
  const [edit, setEdit] = useState(false);
  const [blog, setBlog] = useState<BlogData | null>(null);
  const [title, setTitle] = useState<string | undefined>("");
  const [description, setDescription] = useState<string | undefined>("");
  const [content, setContent] = useState<string | undefined>("");
  const [image, setImage] = useState<string | undefined>("");

  useEffect(() => {
    axios
      .post("/api/get-blog-by-id", { id })
      .then((response) => {
        setBlog(response.data.blog);
        setTitle(response.data.blog?.title);
        setDescription(response.data.blog?.description);
        setContent(response.data.blog?.content);
        setImage(response.data.blog?.image);
      })
      .catch((error) => {
        console.error("Error fetching blog:", error);
      });
  }, []);

  const handleDelete = async () => {
    try {
      const response = await axios.post("/api/delete-blog", { id });
      if (response.data.status === 200) {
        toast.success("Blog deleted successfully");
      } else {
        toast.error("Error deleting blog:", response.data.error);
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    } finally {
      router.push("/blogs");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const blogs = {
        title,
        description,
        content,
        image,
        id,
      };
      const response = await axios.put("/api/update-blog", blogs);
      if (response.data.status === 409) {
        toast.error("All fields are required");
      } else {
        toast.success("Blog updated successfully");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setEdit(false);
      router.push(`/blogs`);
    }
  };

  if (edit) {
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
              <CardTitle>Update Your Blog</CardTitle>
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
                      value={title}
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
                      value={description}
                      placeholder="Enter a small Description"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Content</Label>
                    <Textarea
                      id="content"
                      name="content"
                      value={content}
                      placeholder="Enter the main Content"
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </div>
                  <div className="space-y-4 w-full flex flex-col justify-center items-center">
                    <CldUploadButton
                      options={{ maxFiles: 1 }}
                      onUpload={(result: any) =>
                        setImage(result.info.secure_url)
                      }
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
                            src={image || "placeholder.svg"}
                            className="rounded-lg object-cover"
                          />
                        </div>
                        <h3>Upload Image</h3>
                      </div>
                    </CldUploadButton>
                  </div>
                  <Button type="submit">Update Blog</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="my-5 flex flex-col justify-center items-center">
      <motion.div
        initial="hidden"
        whileInView="visible"
        whileTap={{ scale: 0.9 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        variants={{
          hidden: { opacity: 0, scale: 0.6 },
          visible: { opacity: 1, scale: 1 },
        }}
      >
        <div className="text-center text-5xl">{blog?.title}</div>
      </motion.div>
      <div className="w-2/3 p-5 my-5 border border-slate-600 rounded-xl text-center h-full flex flex-col items-center justify-center">
        {blog?.user === session?.user?.email && (
          <>
            <div className="flex justify-between gap-5">
              <motion.div
                initial="hidden"
                whileInView="visible"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: 0.1, duration: 0.2 }}
                variants={{
                  hidden: { opacity: 0, scale: 0.6 },
                  visible: { opacity: 1, scale: 1 },
                }}
              >
                <Button
                  onClick={() => setEdit(true)}
                  className="flex gap-1 text-lg"
                  variant="premium"
                >
                  Edit
                  <Pencil />
                </Button>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: 0.1, duration: 0.2 }}
                variants={{
                  hidden: { opacity: 0, scale: 0.6 },
                  visible: { opacity: 1, scale: 1 },
                }}
              >
                <Button
                  onClick={handleDelete}
                  className="flex gap-1 text-lg"
                  variant="premium"
                >
                  Delete
                  <Trash2 />
                </Button>
              </motion.div>
            </div>
            <hr className="w-full border-t border-gray-300 my-4" />
          </>
        )}

        <motion.div
          initial="hidden"
          whileInView="visible"
          whileTap={{ scale: 0.9 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          variants={{
            hidden: { opacity: 0, scale: 0.6 },
            visible: { opacity: 1, scale: 1 },
          }}
        >
          <div className="m-4 text-3xl text-center opacity-50">
            {blog?.description}
          </div>
        </motion.div>
        <div className="m-2 w-2/3 flex flex-col items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            whileTap={{ scale: 0.9 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            variants={{
              hidden: { opacity: 0, scale: 0.6 },
              visible: { opacity: 1, scale: 1 },
            }}
          >
            <Image
              alt="Blog Image"
              src={blog ? blog.image : "placeholder.svg"}
              width={200}
              height={200}
              className="border p-5 rounded-lg object-cover"
            />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            whileTap={{ scale: 0.9 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            variants={{
              hidden: { opacity: 0, scale: 0.6 },
              visible: { opacity: 1, scale: 1 },
            }}
          >
            <div className="text-xl text-center m-5">{blog?.content}</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
