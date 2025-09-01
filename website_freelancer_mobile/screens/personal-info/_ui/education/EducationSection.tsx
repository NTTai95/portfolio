// screens/personal-info/_ui/education/EducationSection.tsx
import { apiDelete, apiPost, apiPut } from '@/api/baseApi';
import { AppDispatch } from '@/store';
import { addMessage } from '@/store/volatile/messageSlice';
import dayjs from 'dayjs';
import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import ProfileContext from '../ProfileContext';
import EducationList from './EducationList';
import EducationModal from './EducationModal';
import { Education } from './types';

const defaultEducation: Education = {
    id: 0,
    schoolName: '',
    degree: '',
    major: '',
    startDate: '',
    endDate: null,
    description: '',
};

export default function EducationsSection({
    educations
}: {
    educations: Education[];
}) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingEdu, setEditingEdu] = useState<Education | null>(null);
    const [formData, setFormData] = useState<Education>({ ...defaultEducation });
    const [loading, setLoading] = useState(false);
    const { reloadData } = useContext(ProfileContext);
    const dispatch = useDispatch<AppDispatch>();

    const showAddModal = () => {
        setEditingEdu(null);
        setFormData({ ...defaultEducation });
        setIsModalVisible(true);
    };

    const showEditModal = (edu: Education) => {
        setEditingEdu(edu);
        setFormData({ ...edu });
        setIsModalVisible(true);
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const payload: any = {
                schoolName: formData.schoolName,
                degree: formData.degree,
                major: formData.major,
                gpa: formData.gpa,
                startDate: dayjs(formData.startDate).format('DD/MM/YYYY'),
                endDate: formData.endDate ? dayjs(formData.endDate).format('DD/MM/YYYY') : null,
                description: formData.description || null,
            };

            if (editingEdu) {
                payload.id = editingEdu.id;
                const response = await apiPut(`profile/education/${editingEdu.id}`, payload);
                dispatch(addMessage({
                    content: (response.data as any).message || 'Cập nhật học vấn thành công',
                    type: 'success',
                    key: "education-update"
                }));
            } else {
                const response = await apiPost('profile/education', payload);
                dispatch(addMessage({
                    content: (response.data as any).message || 'Thêm học vấn thành công',
                    type: 'success',
                    key: "education-add"
                }));
            }

            setIsModalVisible(false);
            reloadData();
        } catch (error: any) {
            console.error('Error saving education:', error);
            const errorMessage = error?.data?.message || 'Đã xảy ra lỗi khi lưu học vấn';
            dispatch(addMessage({
                content: errorMessage,
                type: 'error',
                key: "education-save"
            }));
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await apiDelete(`profile/education/${id}`);
            dispatch(addMessage({
                content: 'Xóa học vấn thành công',
                type: 'success',
                key: "education-delete"
            }));
            reloadData();
        } catch (error) {
            dispatch(addMessage({
                content: 'Đã xảy ra lỗi khi xóa học vấn',
                type: 'error',
                key: "education-delete"
            }));
        }
    };

    return (
        <>
            <EducationList
                educations={educations}
                onAdd={showAddModal}
                onEdit={showEditModal}
                onDelete={handleDelete}
            />

            <EducationModal
                visible={isModalVisible}
                onOk={handleSubmit}
                onCancel={() => setIsModalVisible(false)}
                loading={loading}
                editingEdu={editingEdu}
                formData={formData}
                setFormData={setFormData}
            />
        </>
    );
}