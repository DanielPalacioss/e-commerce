package com.daniel.ecommerce.shared.cloudinary.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.daniel.ecommerce.shared.exception.custom.FileUploadException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@Service
public class CloudinaryServiceImpl implements CloudinaryService {

    private final Cloudinary cloudinary;

    public CloudinaryServiceImpl(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    public Map<String, String> uploadOrReplaceFile(String oldPublicId, MultipartFile file, String folder) {
        try {
            Map uploadResult;
            if (oldPublicId != null && !oldPublicId.isBlank()) {
                uploadResult = cloudinary.uploader().upload(file.getBytes(),
                        ObjectUtils.asMap("public_id", oldPublicId, "overwrite", true)
                );
            } else {
                uploadResult = cloudinary.uploader().upload(file.getBytes(),
                        ObjectUtils.asMap("folder", folder)
                );
            }
            Map<String, String> result = new HashMap<>();
            result.put("url", uploadResult.get("secure_url").toString());
            result.put("publicId", uploadResult.get("public_id").toString());
            return result;
        } catch (Exception e) {
            throw new FileUploadException("Error uploading file");
        }
    }

}
