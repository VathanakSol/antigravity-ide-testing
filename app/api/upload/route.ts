import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuid } from "uuid";

export async function POST(req: Request) {
    const form = await req.formData();
    const file = form.get("file") as File;

    const ext = file.name.split(".").pop();
    const key = `uploads/${uuid()}.${ext}`;

    // Convert File → Buffer
    const arrayBuf = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuf);

    // R2 client
    const s3 = new S3Client({
        region: "auto",               // R2 always uses "auto"
        endpoint: process.env.R2_ENDPOINT,  // e.g. https://<accountid>.r2.cloudflarestorage.com
        forcePathStyle: true,
        credentials: {
            accessKeyId: process.env.R2_ACCESS_KEY!,
            secretAccessKey: process.env.R2_SECRET_KEY!,
        },
    });

    // Upload (NO ACL allowed on R2)
    await s3.send(
        new PutObjectCommand({
            Bucket: process.env.R2_BUCKET!,
            Key: key,
            Body: buffer,
            ContentType: file.type,
        })
    );

    // Build Public URL (R2.dev or custom domain)
    const publicUrl = `${process.env.R2_PUBLIC_URL}/${key}`;

    return Response.json({
        url: publicUrl,
        key,
    });
}
