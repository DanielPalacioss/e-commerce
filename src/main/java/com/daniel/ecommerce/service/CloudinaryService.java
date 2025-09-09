package com.daniel.ecommerce.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.daniel.ecommerce.exception.FileUploadException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public CloudinaryService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    private Map<String, String> doUpload(MultipartFile file) throws IOException {
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(),
                ObjectUtils.asMap("folder", "products"));

        Map<String, String> result = new HashMap<>();
        result.put("url", uploadResult.get("secure_url").toString());
        result.put("publicId", uploadResult.get("public_id").toString());
        return result;
    }

    public Map<String, String> uploadFile(MultipartFile file) {
        try {
            return doUpload(file);
        } catch (Exception e) {
            throw new FileUploadException("Error uploading file");
        }
    }

    public Map<String, String> replaceFile(String oldPublicId, MultipartFile file) {
        try {
            if (oldPublicId != null && !oldPublicId.isBlank()) {
                cloudinary.uploader().destroy(oldPublicId, ObjectUtils.emptyMap());
            }
            return doUpload(file);
        } catch (Exception e) {
            throw new FileUploadException("Error uploading file");
        }
    }

}
