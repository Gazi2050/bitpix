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
