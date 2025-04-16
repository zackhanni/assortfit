"use client";

import config from "@/lib/config";
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";

type ImageUploadResponse = {
  filePath: string;
  // Add other properties you expect from the response
};

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }
    const data = await response.json();
    const { signature, expire, token } = data;
    return { token, expire, signature };
  } catch (error) {
    if (error instanceof Error && "message" in error) {
      throw new Error(`Authentication request failed: ${error.message}`);
    }
    throw new Error("Authentication request failed");
  }
};

const ImageUpload = ({
  onFileChange,
}: {
  onFileChange: (filePath: string) => void;
}) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);

  const onError = (error: string | { message: string }) => {
    console.log(error);
    toast(
      "Image upload failed. Your image could not be uploaded. Please try again."
    );
  };
  const onSuccess = (res: ImageUploadResponse) => {
    setFile(res);
    onFileChange(res.filePath);
    toast(`${res.filePath} uploaded successfully!`);
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        className="hidden"
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        fileName="test-upload.png"
      />

      <button
        className="flex min-h-14 w-full items-center justify-center gap-1.5 rounded-md bg-dark-300"
        onClick={(e) => {
          e.preventDefault();

          if (ikUploadRef.current) {
            //@ts-expect-error // adding description to stop error
            ikUploadRef.current?.click();
          }
        }}
      >
        <Image
          src={"/icons/upload.svg"}
          alt="upload-icon"
          width={20}
          height={20}
          className="object-contain"
        />
        <p className="text-base text-light-100">Upload a File</p>

        {file && <p className="mt-1 text-center text-xs">{file.filePath}</p>}
      </button>
      {file && (
        <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={50}
          height={50}
        />
      )}
    </ImageKitProvider>
  );
};

export default ImageUpload;
