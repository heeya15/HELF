package com.aisher.helf.api.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
@Service
public interface S3FileUploadService {
    String upload(MultipartFile uploadFile) throws IOException;
    void deleteFile(String fileName);
    void uploadOnS3(final String findName, final File file);
}
