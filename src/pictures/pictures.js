import defaultAvatar from './defaultAvatar.png';
import Resizer from "react-image-file-resizer";

export const resizeImage = (file, maxWidth, maxHeight) =>
    new Promise((resolve) => {
        Resizer.imageFileResizer(
        file,
        maxWidth,
        maxHeight,
        'PNG',
        100,
        0,
        (uri) => {
            resolve(uri);
        },
        'base64'
    );
});

// Example usage

// resizeImage(defaultAvatar, 300, 300).then((resizedImage) => {
//     const defaultAvatarCollection = resizedImage;
// });

export const defaultAvatarCollection = async () => {
    return await resizeImage(defaultAvatar, 300, 300);
}
