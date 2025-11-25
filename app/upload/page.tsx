"use client";

import { useState, useRef, DragEvent, ChangeEvent, useEffect } from "react";

interface ImageData {
    url: string;
    key: string;
    lastModified?: Date;
    size?: number;
}

const FALLBACK_IMAGES = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400",
    "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400",
    "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=400",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400",
    "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=400",
    "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=400",
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400",
];

export default function ImageGallery() {
    const [images, setImages] = useState<ImageData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>("");
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [notification, setNotification] = useState<{
        type: "success" | "error";
        message: string;
    } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/images");
            const data = await res.json();

            if (data.images && data.images.length > 0) {
                setImages(data.images);
            } else {
                setImages(FALLBACK_IMAGES.map((url, index) => ({
                    url,
                    key: `fallback-${index}`,
                })));
            }
        } catch (error) {
            console.error("Error fetching images:", error);
            setImages(FALLBACK_IMAGES.map((url, index) => ({
                url,
                key: `fallback-${index}`,
            })));
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileSelect = (file: File) => {
        if (file && file.type.startsWith("image/")) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        handleFileSelect(file);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFileSelect(file);
    };

    const uploadImage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedFile) return;

        setIsUploading(true);
        setUploadProgress(0);
        setNotification(null);

        const progressInterval = setInterval(() => {
            setUploadProgress((prev) => {
                if (prev >= 90) {
                    clearInterval(progressInterval);
                    return 90;
                }
                return prev + 10;
            });
        }, 200);

        try {
            const formData = new FormData();
            formData.append("file", selectedFile);

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            clearInterval(progressInterval);
            setUploadProgress(100);

            const data = await res.json();

            if (res.ok) {
                setNotification({
                    type: "success",
                    message: "Image uploaded successfully!",
                });

                await fetchImages();

                setTimeout(() => {
                    setSelectedFile(null);
                    setPreviewUrl("");
                    setUploadProgress(0);
                    setNotification(null);
                    setShowUploadModal(false);
                }, 2000);
            } else {
                throw new Error(data.error || "Upload failed");
            }
        } catch (error) {
            clearInterval(progressInterval);
            setNotification({
                type: "error",
                message: `Upload failed: ${error instanceof Error ? error.message : "Unknown error"}`,
            });
        } finally {
            setIsUploading(false);
        }
    };

    const handleReset = () => {
        setSelectedFile(null);
        setPreviewUrl("");
        setUploadProgress(0);
        setNotification(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-bold text-accent-yellow mb-2">
                            NakTech Gallery
                        </h1>
                        <p className="text-gray-400 text-sm md:text-base">
                            Free stock photos and share your image <span className="font-semibold text-accent-yellow">OPEN SOURCE</span>
                        </p>
                    </div>

                    <div className="flex items-center">
                        <button
                            onClick={() => setShowUploadModal(true)}
                            className="bg-[#FFD300] text-[#10162F] px-8 py-4 font-black uppercase tracking-wider border-2 border-white shadow-[4px_4px_0px_0px_#FFFFFF] hover:translate-y-1 hover:shadow-none active:translate-y-1 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed transition-all whitespace-nowrap flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Upload
                        </button>
                    </div>
                </div>
            </div>

            {isLoading ? (
                <div className="max-w-7xl mx-auto">
                    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                        {[...Array(12)].map((_, i) => {
                            const heights = [250, 300, 350, 280, 320, 270];
                            const height = heights[i % heights.length];
                            return (
                                <div
                                    key={i}
                                    className="break-inside-avoid bg-card-bg rounded-xl overflow-hidden animate-pulse"
                                    style={{ height: `${height}px` }}
                                >
                                    <div className="w-full h-full bg-gray-700" />
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div className="max-w-7xl mx-auto">
                    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                        {images.map((image, index) => (
                            <div
                                key={image.key}
                                className="break-inside-avoid group relative bg-card-bg rounded-xl overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer shadow-lg hover:shadow-accent-yellow/2"
                            >
                                <img
                                    src={image.url}
                                    alt={`Gallery image ${index + 1}`}
                                    className="w-full h-auto object-cover"
                                    loading="lazy"
                                />

                                <div className="absolute top-3 right-3 bg-accent-yellow text-background px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                    Free
                                </div>

                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                    <div className="w-full">
                                        <div className="flex items-center justify-between">


                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={async (e) => {
                                                        e.stopPropagation();
                                                        try {
                                                            const response = await fetch(image.url);
                                                            const blob = await response.blob();
                                                            const url = window.URL.createObjectURL(blob);
                                                            const a = document.createElement('a');
                                                            a.href = url;
                                                            a.download = `image-${index + 1}.jpg`;
                                                            document.body.appendChild(a);
                                                            a.click();
                                                            window.URL.revokeObjectURL(url);
                                                            document.body.removeChild(a);
                                                        } catch (error) {
                                                            console.error('Download failed:', error);
                                                        }
                                                    }}
                                                    className="bg-accent-yellow/20 backdrop-blur-sm text-accent-yellow px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-accent-yellow/30 transition-colors flex items-center gap-1"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                    </svg>
                                                    Download
                                                </button>

                                                <button
                                                    onClick={() => window.open(image.url, "_blank")}
                                                    className="bg-accent-mint/20 backdrop-blur-sm text-accent-mint px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-accent-mint/30 transition-colors"
                                                >
                                                    View
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {showUploadModal && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-[fade-in_0.2s_ease-out]">
                    <div className="bg-card-bg rounded-2xl max-w-xl w-full max-h-[85vh] overflow-y-auto border-2 border-accent-yellow/20 shadow-2xl shadow-accent-yellow/10 animate-[fade-in-up_0.3s_ease-out]">
                        {/* Header with accent border */}
                        <div className="sticky top-0 bg-gradient-to-r from-card-bg to-card-bg border-b-2 border-accent-yellow/30 p-5 flex items-center justify-between z-10">
                            <div>
                                <h2 className="text-2xl font-bold text-accent-yellow mb-1">Upload Public Image</h2>
                                <p className="text-gray-400 text-sm">Share your images with the community</p>
                            </div>
                            <button
                                onClick={() => {
                                    setShowUploadModal(false);
                                    handleReset();
                                }}
                                className="text-gray-400 hover:text-accent-yellow hover:bg-accent-yellow/10 p-2 rounded-lg transition-all duration-200"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={uploadImage} className="p-5">
                            {/* Warning Message */}
                            <div className="mb-5 bg-orange-500/10 border-2 border-orange-500/50 rounded-lg p-4 animate-[fade-in_0.3s_ease-out]">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-orange-500/20 rounded-lg flex-shrink-0">
                                        <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-orange-400 font-bold text-base mb-1.5">Public Upload Warning</h3>
                                        <p className="text-orange-300/90 text-sm leading-relaxed">
                                            <strong>Do not upload sensitive or private data!</strong> All images uploaded here are <strong>publicly accessible</strong> to anyone.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Upload Area */}
                            <div
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                                className={`
                                    relative border-3 border-dashed  p-10 text-center cursor-pointer
                                    transition-all duration-300 ease-out
                                    ${isDragging
                                        ? "border-accent-mint bg-accent-mint/10 scale-[1.02] shadow-lg shadow-accent-mint/20"
                                        : "border-gray-600 hover:border-accent-yellow hover:bg-accent-yellow/5 hover:shadow-lg"
                                    }
                                `}
                            >
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    name="file"
                                    accept="image/*"
                                    onChange={handleInputChange}
                                    className="hidden"
                                />

                                {!previewUrl ? (
                                    <div className="space-y-4">
                                        {/* Icon with glow effect */}
                                        <div className="flex justify-center">
                                            <div className={`p-3 rounded-xl ${isDragging ? 'bg-accent-mint/20' : 'bg-gray-700/50'} transition-all duration-300`}>
                                                <svg
                                                    className={`w-12 h-12 transition-all duration-300 ${isDragging
                                                        ? "text-accent-mint scale-110"
                                                        : "text-accent-yellow"
                                                        }`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                    />
                                                </svg>
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-xl font-bold text-white mb-2">
                                                {isDragging
                                                    ? "Drop your image here!"
                                                    : "Drag & drop your image"}
                                            </p>
                                            <p className="text-gray-400 text-sm mb-3">
                                                or click to browse your files
                                            </p>
                                            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                                </svg>
                                                <span>Supports: JPG, PNG, GIF, WebP</span>
                                            </div>
                                        </div>

                                        <div className="pt-2">
                                            <button className="bg-[#FFD300] text-[#10162F] px-8 py-4 font-black uppercase tracking-wider border-2 border-white shadow-[4px_4px_0px_0px_#FFFFFF] hover:translate-y-1 hover:shadow-none active:translate-y-1 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed transition-all whitespace-nowrap">Browse Files</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {/* Preview with enhanced styling */}
                                        <div className="relative inline-block">
                                            <div className="absolute -inset-1 bg-gradient-to-r from-accent-yellow via-accent-mint to-accent-blue rounded-2xl blur opacity-30"></div>
                                            <img
                                                src={previewUrl}
                                                alt="Preview"
                                                className="relative max-h-56 rounded-xl shadow-2xl border-2 border-accent-mint/50"
                                            />
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleReset();
                                                }}
                                                className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 hover:scale-110 transition-all duration-200 shadow-xl"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>

                                        {/* File info card */}
                                        <div className="text-left bg-gradient-to-br from-background/80 to-background/50 rounded-lg p-4 border border-accent-yellow/20">
                                            <div className="flex items-start gap-3">
                                                <div className="p-2 bg-accent-yellow/20 rounded-lg">
                                                    <svg className="w-5 h-5 text-accent-yellow" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-xs text-accent-yellow font-semibold mb-1">READY TO UPLOAD</p>
                                                    <p className="text-white font-bold truncate text-base">{selectedFile?.name}</p>
                                                    <p className="text-sm text-gray-400 mt-1">
                                                        {selectedFile && `${(selectedFile.size / 1024).toFixed(2)} KB`}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Progress Bar */}
                            {isUploading && (
                                <div className="mt-5 space-y-2 animate-[fade-in_0.3s_ease-out]">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-300 font-semibold">Uploading your image...</span>
                                        <span className="text-accent-yellow font-bold text-lg">{uploadProgress}%</span>
                                    </div>
                                    <div className="h-3 bg-gray-700 rounded-full overflow-hidden border border-gray-600">
                                        <div
                                            className="h-full bg-gradient-to-r from-accent-yellow to-accent-mint transition-all duration-300 ease-out shadow-lg"
                                            style={{ width: `${uploadProgress}%` }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Notification */}
                            {notification && (
                                <div
                                    className={`mt-5 p-4 rounded-lg border-2 animate-[fade-in_0.3s_ease-out] ${notification.type === "success"
                                        ? "bg-green-500/10 border-green-500 text-green-400"
                                        : "bg-red-500/10 border-red-500 text-red-400"
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        {notification.type === "success" ? (
                                            <div className="p-2 bg-green-500/20 rounded-lg">
                                                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                        ) : (
                                            <div className="p-2 bg-red-500/20 rounded-lg">
                                                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                        )}
                                        <div>
                                            <p className="font-bold text-base mb-1">
                                                {notification.type === "success" ? "Success!" : "Error"}
                                            </p>
                                            <p className="text-sm">{notification.message}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="mt-6 flex gap-3">
                                <button
                                    type="submit"
                                    disabled={!selectedFile || isUploading}
                                    className={`
                                        flex-1 py-3 px-6 rounded-lg font-bold text-base
                                        transition-all duration-300 ease-out
                                        ${selectedFile && !isUploading
                                            ? "bg-accent-yellow text-background hover:bg-accent-yellow/90 hover:scale-[1.02] shadow-xl shadow-accent-yellow/40 hover:shadow-2xl"
                                            : "bg-gray-700 text-gray-500 cursor-not-allowed opacity-50"
                                        }
                                    `}
                                >
                                    {isUploading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Uploading...
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                            </svg>
                                            Upload Public Image
                                        </span>
                                    )}
                                </button>

                                {selectedFile && !isUploading && (
                                    <button
                                        type="button"
                                        onClick={handleReset}
                                        className="px-6 py-3 rounded-lg font-bold text-base bg-gray-700 text-white hover:bg-gray-600 border-2 border-gray-600 hover:border-gray-500 transition-all duration-300 hover:scale-[1.02]"
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
