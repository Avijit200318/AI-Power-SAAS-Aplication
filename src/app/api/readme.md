# API Documentation
## Endpoint: `/api/videos`

### Description
This endpoint retrieves a list of all videos from the database(postgresql), ordered by their creation date in descending order (newest first).

### Method
`GET`

### Authentication
❌ No authentication required.

### Request Body
No request body is required for this endpoint.


### Example Response
The response will be a JSON object with the following fields:

- `success` **(boolean)**: Indicates whether the request was successful (`true`) or not (`false`).  
- `videos` **(array)**: A list of video objects containing the following properties:  
  - `id` **(string)**: Unique identifier for the video.  
  - `title` **(string)**: Title of the video.  
  - `description` **(string, optional)**: Description of the video.  
  - `publicId` **(string)**: Cloud storage/public identifier for the video.  
  - `originalSize` **(string)**: Original file size of the uploaded video.  
  - `compressedSize` **(string)**: Compressed file size of the video.  
  - `duration` **(string)**: Duration of the video.  
  - `createdAt` **(string – ISO date)**: Date when the video was created.  
  - `updatedAt` **(string – ISO date)**: Date when the video was last updated.  
- `message` **(string)** *(only in case of error)*: Error description.  

#### Success Example:
```json
{
  "success": true,
  "videos": [
    {
      "id": "ckz123abc456",
      "title": "Intro to Prisma",
      "description": "This is a tutorial about Prisma ORM",
      "publicId": "videos/intro_prisma_123",
      "originalSize": "50MB",
      "compressedSize": "15MB",
      "duration": "10:35",
      "createdAt": "2025-08-16T10:15:30.000Z",
      "updatedAt": "2025-08-16T10:15:30.000Z"
    },
    {
      "id": "ckz456def789",
      "title": "Next.js with Prisma",
      "description": null,
      "publicId": "videos/nextjs_prisma_456",
      "originalSize": "120MB",
      "compressedSize": "40MB",
      "duration": "25:10",
      "createdAt": "2025-08-15T08:20:10.000Z",
      "updatedAt": "2025-08-15T08:22:55.000Z"
    }
  ]
}
```

---

## Endpoint: `/api/image-upload`

### Description
This endpoint allows an authenticated user to upload files (images, videos, or other supported formats) to **Cloudinary**.  
The uploaded files are stored inside the folder `Next-cloudinary-images` and can be accessed using the returned `publicId`.

### Method
`POST`

### Authentication
✅ Authentication required (Clerk).

### Request Body
The request must be sent as `multipart/form-data` with the following field:

- `file` **(File)**: The file to be uploaded. (Required)

### Example Response
The response will be a JSON object with the following fields:

- `success` **(boolean)**: Indicates whether the request was successful (`true`) or not (`false`).  
- `publicId` **(string)**: The unique Cloudinary `public_id` assigned to the uploaded file.  
- `message` **(string)** *(only in case of error)*: Description of the error.  

#### Success Example:
```json
{
  "success": true,
  "publicId": "Next-cloudinary-images/sample_image_123"
}
```

---

## Endpoint: `/api/video-upload`

### Description
This endpoint allows an authenticated user to upload a video file to **Cloudinary**.  
The uploaded video is stored inside the `Next-cloudinary-videos` folder in Cloudinary, and its metadata (title, description, sizes, duration, etc.) is stored in a **PostgreSQL** database via **Prisma**.

### Method
`POST`

### Authentication
✅ Authentication required (Clerk).

### Request Body
The request must be sent as `multipart/form-data` with the following fields:

- `file` **(File)**: The video file to be uploaded. (Required)  
- `title` **(string)**: The title of the video. (Optional but recommended)  
- `description` **(string)**: A description of the video. (Optional)  
- `originalSize` **(string)**: The original file size of the video. (Required for metadata tracking).  

### Example Response
The response will be a JSON object with the following fields:

- `success` **(boolean)**: Indicates whether the request was successful.  
- `video` **(object)**: The created video record stored in the database, with the following fields:
  - `id` **(string)**: Unique identifier of the video in the database.  
  - `title` **(string)**: Title of the video.  
  - `description` **(string, optional)**: Description of the video.  
  - `publicId` **(string)**: Cloudinary `public_id` for accessing the video.  
  - `originalSize` **(string)**: Original file size (provided by client).  
  - `compressedSize` **(string)**: The size of the video after Cloudinary compression (in bytes).  
  - `duration` **(number)**: Duration of the video in seconds.  
  - `createdAt` **(string – ISO date)**: Timestamp when the video was created.  
  - `updatedAt` **(string – ISO date)**: Timestamp when the video was last updated.  

#### Success Example:
```json
{
  "success": true,
  "video": {
    "id": "clzy789xyz123",
    "title": "Next.js Upload Demo",
    "description": "This is a demo video upload using Cloudinary + Prisma",
    "publicId": "Next-cloudinary-videos/sample_video_456",
    "originalSize": "120MB",
    "compressedSize": "45000000",
    "duration": 125,
    "createdAt": "2025-08-26T10:15:30.000Z",
    "updatedAt": "2025-08-26T10:15:30.000Z"
  }
}
```
---

