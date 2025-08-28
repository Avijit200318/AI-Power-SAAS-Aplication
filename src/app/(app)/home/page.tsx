"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { VideoCard } from '@/components/VideoCard'
import axios from 'axios'
import { Video } from '@/types/video'

export default function page() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVideos = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/videos");
      console.log("response of video fetching: ", response.data)
      if(Array.isArray(response.data.videos)){
        setVideos(response.data.videos);
      } else{
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.log("Failed to fetch videos", error);
      setError("Failed to fetch videos");
    } finally{
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  // when the page render useCallback avoid to create a differnt fetchVideo function. but this function did't call the fetchVideos function. useEffect help it to run. but if we did't use the useCallback() then it will became an infinite loop of function running.

  const handleDownload = useCallback((url: string, title: string) => {
      const link = document.createElement("a");
      link.href = url;
      // download file name
      link.setAttribute("download", `${title}.mp4`);
      link.setAttribute("target", "_blank");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  }, []);

    if(loading){
      return <div>loading...</div>
    }

  return (
    <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Videos</h1>
          {videos.length === 0 ? (
            <div className="text-center text-lg text-gray-500">
              No videos available
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {
                videos.map((video) => (
                    <VideoCard
                        key={video.id}
                        video={video}
                        onDownload={handleDownload}
                    />
                ))
              }
            </div>
          )}
        </div> 
  )
}
