package com.freelancer.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

@Service
public class ServiceCloudinary {

    private final Cloudinary cloudinary;

    public ServiceCloudinary(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    // Add this method to handle byte arrays
    public String uploadFile(byte[] fileBytes, String fileName) {
        try {
            Map<String, Object> params = new HashMap<>();
            params.put("public_id", fileName);
            params.put("overwrite", true);

            Map<?, ?> uploadResult = cloudinary.uploader().upload(fileBytes, params);
            return uploadResult.get("secure_url").toString();
        } catch (IOException e) {
            throw new RuntimeException("Upload thất bại: " + e.getMessage());
        }
    }

    // Existing method for MultipartFile
    public String uploadFile(MultipartFile file, String fileName) {
        try {
            return uploadFile(file.getBytes(), fileName);
        } catch (IOException e) {
            throw new RuntimeException("Upload thất bại: " + e.getMessage());
        }
    }

    public String deleteFile(String publicId) {
        try {
            Map<?, ?> result = cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
            return result.get("result").toString();
        } catch (IOException e) {
            throw new RuntimeException("Xoá thất bại: " + e.getMessage());
        }
    }
}
