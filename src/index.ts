const MAX_SIZE_MB = 5 * 1024 * 1024; // 5 MB in bytes
const MAX_DIMENSION = 1024; // Max width or height in pixels

/**
 * Converts a Blob object to a base64 string.
 * @param blob - The Blob object to convert.
 * @returns A promise that resolves with the base64-encoded string.
 */
const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = () => reject('Error converting blob to base64.');
        reader.readAsDataURL(blob);
    });
};

/**
 * Loads an image from a file.
 * @param file - The image file to load.
 * @returns A promise that resolves with the loaded HTMLImageElement.
 */
const loadImage = (file: File): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        const img = new Image();

        reader.onload = () => {
            img.src = reader.result as string;
        };

        img.onload = () => resolve(img);
        img.onerror = () => reject('Error loading image.');
        reader.readAsDataURL(file);
    });
};

/**
 * Compresses an image and returns it as a Blob.
 * @param img - The HTMLImageElement to compress.
 * @param fileType - The MIME type of the image file (e.g., 'image/jpeg').
 * @param quality - The quality of the compression, ranging from 0.0 to 1.0.
 * @returns A promise that resolves with the compressed image Blob.
 */
const compressImage = (img: HTMLImageElement, fileType: string, quality: number): Promise<Blob> => {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const { width, height } = adjustDimensions(img.width, img.height);
        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
            if (blob) resolve(blob);
            else throw new Error('Error compressing image.');
        }, fileType, quality);
    });
};

/**
 * Adjusts image dimensions to fit within the maximum allowed size while maintaining aspect ratio.
 * @param width - The original width of the image.
 * @param height - The original height of the image.
 * @returns An object containing the adjusted width and height.
 */
const adjustDimensions = (width: number, height: number): { width: number; height: number } => {
    const aspectRatio = width / height;

    if (width > height && width > MAX_DIMENSION) {
        width = MAX_DIMENSION;
        height = width / aspectRatio;
    } else if (height > width && height > MAX_DIMENSION) {
        height = MAX_DIMENSION;
        width = height * aspectRatio;
    }

    return { width, height };
};

/**
 * Converts an image file to a base64 string and compresses it if necessary.
 * @param file - The image file to convert and compress.
 * @param quality - The quality of the image compression, ranging from 0.0 to 1.0.
 * @returns A promise that resolves with an object containing the base64 string and any error message.
 */
export const convertToBase64AndCompress = async (
    file: File,
    quality: number = 0.8
): Promise<{ base64: string; error: string | null }> => {
    if (!file.type.startsWith("image/")) {
        return { base64: "", error: "Invalid file type. Only images are allowed." };
    }

    if (file.size > MAX_SIZE_MB) {
        return { base64: "", error: "File size exceeds 5 MB." };
    }

    try {
        const img = await loadImage(file);
        const compressedBlob = await compressImage(img, file.type, quality);
        const base64String = await blobToBase64(compressedBlob);
        return { base64: base64String, error: null };
    } catch (error) {
        return { base64: "", error: error instanceof Error ? error.message : "An error occurred during conversion." };
    }
};