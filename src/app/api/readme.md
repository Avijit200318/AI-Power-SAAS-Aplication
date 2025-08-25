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

---

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
