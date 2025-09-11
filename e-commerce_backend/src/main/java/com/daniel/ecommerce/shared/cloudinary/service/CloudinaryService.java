package com.daniel.ecommerce.shared.cloudinary.service;

import com.daniel.ecommerce.shared.cloudinary.enums.CloudinaryFolders;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

public interface CloudinaryService {
    Map<String, String> uploadOrReplaceFile(String oldPublicId, MultipartFile file, String folder);
}
