# Introducing **bitpix**: Simplify Image Uploads with Seamless Base64 Encoding

Need to upload images to your web application but hate the hassle of dealing with complex URL structures or server-side image handling? Stop worrying about complicated workflows! **bitpix** is here to make your life easier. It converts any image to Base64 format, compresses it to ensure fast performance, and maintains quality — all with an easy-to-use function. No more worrying about image size or file types — **bitpix** has you covered.

Whether you're building a dynamic web app or a quick image uploader for a client, **bitpix** lets you focus on what matters by handling image conversion and compression in one streamlined package.

## Demo
Check out the [demo](https://bitpix-demo1.surge.sh).


## Core Function: `convertImageToBase64`

At the heart of **bitpix** is its main function, `convertImageToBase64`, which efficiently converts and compresses images to Base64, ensuring they are under the 5MB size limit. This function returns both the Base64 string and an error if the image exceeds the limit.

### Function Signature:

```ts
convertImageToBase64(file: File): Promise<{ base64: string | null, error: string | null }>
```

### Parameters:
- **file**: The image file the user uploads (supports all common types: JPEG, PNG, GIF, etc.).

### Returns:
- **base64**: A Base64 encoded string that can be used in image tags (`<img src="..." />`), sent to a server, or stored.
- **error**: If the image exceeds 5MB, an error string is returned, and the conversion is aborted.

### Features:
- **All Image Formats**: Accepts all image types (JPEG, PNG, GIF, etc.).
- **File Size Limit**: Automatically rejects files larger than 5MB, giving you the control to handle these errors in your app.
- **Compression**: Compresses the image efficiently to ensure it's within the size limits while maintaining high quality.
- **Error Handling**: Ensures smooth error handling with a friendly error message when something goes wrong.

---

## Simple JSX Example

Here’s how you can use **bitpix** in a simple React component to handle image uploads and display a Base64-encoded version of the image:

```jsx
import React, { useState } from 'react';
import { convertImageToBase64 } from 'bitpix'; // Import the bitpix package

const ImageUploader = () => {
    const [base64Image, setBase64Image] = useState(null);
    const [error, setError] = useState(null);

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        
        if (file) {
            const { base64, error } = await convertImageToBase64(file);

            if (error) {
                setError(error);
                setBase64Image(null);
            } else {
                setBase64Image(base64);
                setError(null);
            }
        }
    };

    return (
        <div>
            <h2>Upload an Image</h2>
            <input type="file" onChange={handleImageUpload} accept="image/*" />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {base64Image && (
                <div>
                    <h3>Base64 Encoded Image:</h3>
                    <img src={base64Image} alt="Uploaded" style={{ maxWidth: '100%' }} />
                    <textarea value={base64Image} readOnly rows="10" style={{ width: '100%' }} />
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
```

### Explanation:
- **Image Input**: Users can select an image from their device using the file input.
- **Image Conversion**: The selected image is converted to Base64 using the `convertImageToBase64` function.
- **Display**: The Base64 string is displayed both as an image preview and as plain text in a `textarea`.
- **Error Handling**: If the image exceeds 5MB, an error message is shown.

---

## Why Choose **bitpix**?

**bitpix** is perfect for developers who want:
- **Efficiency**: Convert and compress images in a single function.
- **Compatibility**: Handle all image types (JPEG, PNG, GIF, etc.).
- **Error Management**: Easily manage oversized files with built-in error handling.
- **Simplicity**: A clean API that integrates smoothly into any React or JavaScript project.

No more worrying about oversized image uploads or complex image handling — **bitpix** takes care of it all!

---

## Contributing to **bitpix**

We welcome contributions from the open-source community! To contribute, follow these steps:

### 1. Fork the Repository
Start by forking the **bitpix** repository on GitHub.

```bash
git clone https://github.com/your-username/bitpix.git
```

### 2. Create a New Branch
Make a new branch for your feature or fix.

```bash
git checkout -b feature-name
```

### 3. Make Your Changes
Implement your changes and ensure your code is clean and well-structured.

### 4. Commit Your Changes
Write meaningful commit messages and commit your changes.

```bash
git add .
git commit -m "Add new feature"
```

### 5. Push to Your Fork
Push your changes to your forked repository.

```bash
git push origin feature-name
```

### 6. Submit a Pull Request
Submit a pull request to the original **bitpix** repository and explain your changes in detail.

We’ll review your changes and work together to improve **bitpix**!

---

## Summary

**bitpix** is your go-to solution for image uploads in web applications. With its efficient compression, file size management, and simple API, **bitpix** takes the hassle out of image handling so you can focus on building better apps.