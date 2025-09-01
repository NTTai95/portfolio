import React, { JSX } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Hàm trích xuất tên file từ URL
export const getFileName = (url: string): string => {
    return url.substring(url.lastIndexOf('/') + 1);
};

// Lấy tên file gốc (bỏ timestamp)
export const getOriginalFileName = (fileName: string): string => {
    return fileName.substring(16);
};

// Kiểm tra file có thể xem trực tiếp trên trình duyệt
export const isViewableInBrowser = (fileName: string): boolean => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    return [
        'jpg', 'jpeg', 'png', 'gif', 'webp',
        'pdf',
        'txt', 'csv', 'json',
        'mp4', 'webm', 'ogg',
        'mp3', 'wav'
    ].includes(extension || '');
};

// Lấy icon tương ứng với loại file (trả về React Element dùng được trong React Native)
export const getFileIcon = (fileName: string): JSX.Element => {
    const extension = fileName.split('.').pop()?.toLowerCase();

    switch (extension) {
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
        case 'webp':
            return <MaterialCommunityIcons name="file-image" size={24} color="#3B82F6" />; // Blue
        case 'pdf':
            return <MaterialCommunityIcons name="file-pdf-box" size={24} color="#EF4444" />; // Red
        case 'doc':
        case 'docx':
            return <MaterialCommunityIcons name="file-word" size={24} color="#2563EB" />; // Blue
        case 'xls':
        case 'xlsx':
            return <MaterialCommunityIcons name="file-excel" size={24} color="#16A34A" />; // Green
        case 'zip':
        case 'rar':
        case '7z':
            return <MaterialCommunityIcons name="folder-zip" size={24} color="#FACC15" />; // Yellow
        case 'mp4':
        case 'webm':
        case 'mov':
            return <MaterialCommunityIcons name="file-video" size={24} color="#8B5CF6" />; // Purple
        case 'mp3':
        case 'wav':
            return <MaterialCommunityIcons name="file-music" size={24} color="#F97316" />; // Orange
        default:
            return <MaterialCommunityIcons name="file" size={24} color="#60A5FA" />; // Default Blue
    }
};
