# AI-Powered Media SaaS – Image & Video Management Platform


[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Website Preview

## Overview

This AI-powered SaaS application enables users to easily resize images for social media platforms and upload/manage videos with cloud-based storage. Built with Next.js, Prisma, and Neon DB, integrated with Cloudinary for media hosting, and secured using Clerk authentication, it provides a seamless and efficient way to optimize and manage content.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Setup](#project-setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication:** Secure login and sign-up powered by Clerk (supports email/password and Google OAuth).
- **Image Resizing for Social Media:**
  - Predefined formats:
    - Instagram Square (1:1) → `1080 × 1080`
    - Instagram Portrait (4:5) → `1080 × 1350`
    - Twitter Post (16:9) → `1200 × 675`
    - Twitter Header (3:1) → `1500 × 500`
    - Facebook Cover (205:78) → `820 × 312`
  - Ensures platform-ready images with correct aspect ratios.
- **Video Upload & Management:**
  - Upload videos securely to **Cloudinary**.
  - Hover previews for quick video review.
  - Download option for original files.
- **Database Integration:** Video metadata (ID, title, Cloudinary public ID, duration, size, etc.) stored in **Neon PostgreSQL** using Prisma ORM.
- **AI-Powered Enhancements (extendable):** Future-ready to support smart transformations, compression, or AI-based image/video improvements.

## Technologies Used

- **Next.js 14 (App Router):** Frontend framework for building the UI and handling routes.
- **React:** Component-based UI library for building interactive features.
- **Tailwind CSS:** Utility-first CSS framework for responsive styling.
- **DaisyUI:** Tailwind CSS component library for prebuilt, customizable UI components.
- **Clerk:** Authentication and user management (email/password + Google OAuth).
- **Cloudinary:** Image and video storage, optimization, and delivery (with hover previews).
- **Prisma ORM:** Database toolkit for schema modeling and queries.
- **Neon PostgreSQL:** Cloud database to store video metadata and user info.
- **TypeScript:** Type-safe development for scalability and fewer runtime errors.

## Project Setup

### Getting Started

Follow the steps below to set up and run the application on your local machine:

1. **Clone the Repository**

```bash
git clone https://github.com/Avijit200318/AI-Power-SAAS-Aplication.git
```

2. **Add all the .env variables**
- Make sure to update the values (Clerk Authentication, Cloudinary
, etc.) inside both .env files according to .env.txt file local setup or environment.

3. **Install Dependencies**
```bash
npm install
```

4. **Prisma Setup**
```bash
npx prisma migrate dev
npx prisma generate
```

5. **Run the Development Server**
```bash
npm run dev
```
This starts the frontend server on http://localhost:3000


## Usage

### For Image Resizing

1. **Upload an Image** from your device.  
2. **Choose a Format** from presets like:  
   - Instagram Square (1:1)  
   - Instagram Portrait (4:5)  
   - Twitter Post (16:9)  
   - Twitter Header (3:1)  
   - Facebook Cover (205:78)  
3. **Preview the Resized Image** directly in the app.  
4. **Download the Image** in your desired format.  

---

### For Video Management

1. **Upload a Video** (stored securely on Cloudinary).  
2. **Preview the Video** with hover-based playback.  
3. **View Metadata** such as title, duration, original size, and compressed size (fetched via Prisma + NeonDB).  
4. **Download the Video** in `.mp4` format.  

---

### Authentication

- **Sign Up / Sign In** using Clerk authentication.  
- Supports **Email/Password** and **Google Authentication**.  
- Only authenticated users can upload and manage media.  

## Backend Documentation  
- 📄 [Click Here](https://github.com/Avijit200318/AI-Power-SAAS-Aplication/blob/main/src/app/api/readme.md) for backend API documentation.  

## Contributing

Contributions are welcome! Whether you're fixing a bug, enhancing features, or suggesting improvements, feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for full details.

