import React, { useRef, useState, useEffect } from 'react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

interface ImageUploaderProps {
  onImageUpload: (imageUrl: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [image, setImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const cropperRef = useRef<Cropper | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (image && imageRef.current) {
      cropperRef.current = new Cropper(imageRef.current, {
        aspectRatio: 4 / 5,
        viewMode: 1,
        autoCropArea: 1,
        responsive: true,
        zoomable: false,
        scalable: false,
      });
    }

    return () => {
      cropperRef.current?.destroy();
    };
  }, [image]);

  const handleCrop = () => {
    if (cropperRef.current) {
      const croppedCanvas = cropperRef.current.getCroppedCanvas();
      const croppedImage = croppedCanvas.toDataURL();
      setCroppedImage(croppedImage);
      onImageUpload(croppedImage); // Call the parent's callback function
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Upload Product Image</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className={`mb-4 ${croppedImage ? "hidden": ""}`}
      />
      <div className={`image-preview-container w-full pb-[80%] relative bg-gray-100 border border-gray-300 overflow-hidden ${croppedImage ? "hidden": ""}`}>
        { image && <img ref={imageRef} src={image} alt="Preview" className="absolute max-w-none" />}
      </div>
      { !croppedImage && image && (
        <button
          onClick={handleCrop}
          className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
        >
          Crop Image
        </button>
      )}
      {croppedImage && (
        <div className="mt-4">
          <img src={croppedImage} alt="Cropped" className="w-full" />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
