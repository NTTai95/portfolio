package com.freelancer.service;

import java.io.InputStream;
import java.util.concurrent.TimeUnit;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import io.minio.BucketExistsArgs;
import io.minio.GetPresignedObjectUrlArgs;
import io.minio.MakeBucketArgs;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import io.minio.RemoveObjectArgs;
import io.minio.errors.MinioException;
import io.minio.http.Method;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ServiceFileStorage {

    private final MinioClient minioClient;

    @Value("${cloudfly.bucket}")
    private String bucket;

    public ServiceFileStorage(MinioClient minioClient) {
        this.minioClient = minioClient;
    }

    /**
     * Kiểm tra và tạo bucket nếu chưa tồn tại
     */
    @PostConstruct
    public void initBucket() {
        try {
            boolean exists =
                    minioClient.bucketExists(BucketExistsArgs.builder().bucket(bucket).build());
            if (!exists) {
                minioClient.makeBucket(MakeBucketArgs.builder().bucket(bucket).build());
                log.info("Bucket '{}' đã được tạo.", bucket);
            } else {
                log.info("Bucket '{}' đã tồn tại.", bucket);
            }
        } catch (Exception e) {
            log.error("Không thể khởi tạo bucket '{}': {}", bucket, e.getMessage(), e);
        }
    }

    /**
     * Upload file với tên tùy chọn. Nếu file đã tồn tại trên bucket thì sẽ bị ghi đè.
     *
     * @param file MultipartFile
     * @param fileName Tên file muốn lưu (có thể kèm path, ví dụ: folder1/myfile.txt)
     * @return Tên file đã lưu
     * @throws Exception Nếu upload thất bại
     */
    @Value("${cloudfly.endpoint}")
    private String endpoint;

    public String uploadFileWithName(MultipartFile file, String fileName) throws Exception {
        try (InputStream inputStream = file.getInputStream()) {
            minioClient.putObject(PutObjectArgs.builder().bucket(bucket).object(fileName)
                    .stream(inputStream, file.getSize(), -1).contentType(file.getContentType())
                    .build());

            log.info("File '{}' đã được upload lên bucket '{}' (ghi đè nếu đã tồn tại)", fileName,
                    bucket);

            String fileUrl = String.format("%s/%s/%s", endpoint, bucket, fileName);
            return fileUrl;

        } catch (MinioException e) {
            log.error("MinioException khi upload: {}", e.getMessage(), e);
            throw new Exception("Upload thất bại: " + e.getMessage(), e);
        } catch (Exception e) {
            log.error("Exception khi upload: {}", e.getMessage(), e);
            throw new Exception("Upload thất bại: " + e.getMessage(), e);
        }
    }

    /**
     * Xoá file theo tên hoặc đường dẫn (object key).
     *
     * @param fileName Tên file hoặc đường dẫn (ví dụ: folder1/myfile.txt)
     * @throws Exception Nếu xoá thất bại
     */
    public void deleteFile(String fileName) throws Exception {
        try {
            minioClient.removeObject(
                    RemoveObjectArgs.builder().bucket(bucket).object(fileName).build());
            log.info("File '{}' đã được xoá khỏi bucket '{}'", fileName, bucket);
        } catch (MinioException e) {
            log.error("MinioException khi xoá: {}", e.getMessage(), e);
            throw new Exception("Xoá thất bại: " + e.getMessage(), e);
        } catch (Exception e) {
            log.error("Exception khi xoá: {}", e.getMessage(), e);
            throw new Exception("Xoá thất bại: " + e.getMessage(), e);
        }
    }

    public String generatePresignedUploadUrl(String objectName, int expiryMinutes)
            throws Exception {
        try {
            String url = minioClient.getPresignedObjectUrl(GetPresignedObjectUrlArgs.builder()
                    .bucket(bucket).object(objectName).method(Method.PUT) // PUT để upload
                    .expiry(expiryMinutes, TimeUnit.MINUTES).build());
            log.info("Presigned URL được tạo cho '{}': {}", objectName, url);
            return url;

        } catch (Exception e) {
            log.error("Lỗi khi tạo presigned URL: {}", e.getMessage(), e);
            throw new Exception("Không tạo được presigned URL: " + e.getMessage(), e);
        }
    }
}
