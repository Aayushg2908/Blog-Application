import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "title is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    content: {
      type: String,
      required: [true, "description is required"],
    },
    image: {
      type: String,
      required: [true, "image is required"],
    },
    user: {
      type: String,
      required: [true, "user email is required"],
    },
    author: {
      type: String,
    }
  },
  { timestamps: true }
);

const blogModel = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default blogModel;