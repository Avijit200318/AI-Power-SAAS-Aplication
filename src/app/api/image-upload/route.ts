import { NextResponse, NextRequest } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { auth } from '@clerk/nextjs/server';
// we will use this to add restriction

// WE WRITE NEXT_PUBLIC because we may need this to our frontend also
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

interface CloudinaryUploadResult {
     public_id: string;
     [key: string]: any
    //  here key is stirng and rest of the things are any type. because our application is more focussed into public_id
}

export async function POST(request: NextRequest){
    const {userId} = await auth();

    if(!userId) return NextResponse.json({
        success: false,
        message: "Unauthorized"
    }, {status: 401});

    try {
        const formDate = await request.formData();
        // we use formDate because it handles file and json() only handle json strings
        const file = formDate.get("file") as File | null;
        if(!file){
            return NextResponse.json({
            success: false,
            message: "File not found"
            }, {status: 400});
        }

        // file to buffer convertion. so that we can save it anyware
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // now we can save it to cloudinary. We are not going to use upload. instead we will wirte it like so it can handle any file images, videos etc in bigger size file.

        const result = await new Promise<CloudinaryUploadResult>(
            (resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {folder: "Next-cloudinary-images"},
                    (error, result) => {
                        if(error) return reject(error);
                        else return resolve(result as CloudinaryUploadResult);
                        // since typescript thought it not type of cloudinaryUploadResult so we have to write this
                    }
                )
                // once upload end we need to end buffering
                uploadStream.end(buffer);
            }
        )

        return NextResponse.json({
            success: true,
            publicId: result.public_id
        }, {status: 200})
    } catch (error) {
        console.log("Image upload failed", error);
        return NextResponse.json({
            success: false,
            message: "Image upload failed"
        }, {status: 401})
    }
}