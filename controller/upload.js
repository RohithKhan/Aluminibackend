import dotenv from "dotenv";
dotenv.config();
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage"



console.log("Bucket name", process.env.AWS_BUCKET_NAME)

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

const uploadfiletos3 = async (file) => {
    try {
        console.log("Uploading file:", file);  //

        const upload = new Upload({
            client: s3,
            params: {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: `uploads/${file.originalname}`,
                Body: file.buffer,
                contentType: file.mimetype,
            },
        })

        const result = await upload.done();
        console.log("File uploaded successfully:", result.Location);
        return result.Location;
    } catch (error) {
        console.error("Error uploading to S3:", error);
        throw error;
    }
}

export default uploadfiletos3;

