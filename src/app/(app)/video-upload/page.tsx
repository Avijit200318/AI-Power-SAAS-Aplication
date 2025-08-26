"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function page() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isUploading, setIsSetUploading] = useState<boolean>(false);
  const [error, setError] = useState(false);

  const router = useRouter();
  // file max size is 60mb
  const MAX_FILE_SIZE = 60 * 1024 * 1024

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!file) return;

    if(file.size > MAX_FILE_SIZE){
      console.error("File size is too large");
      return;
    }

    setIsSetUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("originalSize", file.size.toString());

    try{
      const res = await axios.post("/api/video-upload", formData);
      if(res.data.success === false){
        console.log("Video uploading Error: ", res.data);
        return;
      }

      router.push("/");
    }catch(error){
      console.log("Error while video uploading: ", error);
    }finally{
      setIsSetUploading(false);
    }
  }

  return (
    <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Upload Video</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="textarea textarea-bordered w-full"
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Video File</span>
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="file-input file-input-bordered w-full"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isUploading || file? false : true}
            >
              {isUploading ? "Uploading..." : "Upload Video"}
            </button>
          </form>
        </div>

  )
}
