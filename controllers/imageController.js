const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const storage = require('../config/firebase');

const uploadImage = async (req, res) => {
    try {
        // ... (Your image upload logic from the previous response) ...
        if (!req.file) {
            return res.status(400).json({ message: 'No image file provided' });
        }

        const file = req.file;
        const timestamp = Date.now();
        const storageRef = ref(storage, `ecommerce/${timestamp}-${file.originalname}`);

        const snapshot = await uploadBytes(storageRef, file.buffer, { contentType: file.mimetype });
        const downloadURL = await getDownloadURL(storageRef);

        res.status(200).json({ imageUrl: downloadURL });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    uploadImage
};