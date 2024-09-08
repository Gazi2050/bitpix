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
