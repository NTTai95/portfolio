"use client"

import React, { useEffect, useState } from 'react';
import { Table, Input, Button, Modal, Space, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SearchOutlined, EyeOutlined } from '@ant-design/icons';
import type  { JobPost } from './constants';
import { texts } from './constants';
import { mockData } from './MockupData';

const JobPostManagement: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState<JobPost | null>(null);
    const [reason, setReason] = useState('');
    const [textIndex, setTextIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [placeholder, setPlaceholder] = useState("");
    const [data, setData] = useState(mockData);

    useEffect(() => {
        const currentText = texts[textIndex];

        const timeout = setTimeout(() => {
            setPlaceholder(currentText.slice(0, charIndex + 1));
            setCharIndex((prev) => prev + 1);
        }, 100); // thời gian delay giữa mỗi ký tự
        if (charIndex === currentText.length) {
            clearTimeout(timeout);
            // Đợi 2 giây rồi gõ tiếp câu mới
            setTimeout(() => {
                setCharIndex(0);
                setTextIndex((prev) => (prev + 1) % texts.length);
            }, 2000);
        }

        return () => clearTimeout(timeout);
    }, [charIndex, textIndex]);

    const handleHide = (record: JobPost) => {
        setSelectedPost(record);
        setIsModalOpen(true);
    };

    const handleOk = () => {
        if (selectedPost) {
            setData(prev =>
                prev.map(post =>
                    post.id === selectedPost.id
                        ? { ...post, status: 'hidden' }
                        : post
                )
            );
        }
        setIsModalOpen(false);
        setReason('');
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setReason('');
    };

    const columns: ColumnsType<JobPost> = [
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            sorter: (a, b) => a.title.localeCompare(b.title),
            filteredValue: [searchText],
            onFilter: (value, record) => record.title.toLowerCase().includes((value as string).toLowerCase()),
        },
        {
            title: 'Nhà tuyển dụng',
            dataIndex: 'employer',
        },
        {
            title: 'Ngày đăng',
            dataIndex: 'postedDate',
            sorter: (a, b) => new Date(a.postedDate).getTime() - new Date(b.postedDate).getTime(),
        },
        {
            title: 'Lượt xem',
            dataIndex: 'views',
            sorter: (a, b) => a.views - b.views,
            render: views => (
                <span className="flex items-center gap-1">
                    <EyeOutlined /> {views}
                </span>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: status =>
                status === 'active' ? (
                    <Tag className='!text-[18px] !p-1' color="green">Hiển thị</Tag> //do class bị đè nên phải chấm than trước classclass
                ) : (
                    <Tag className='!text-[18px] !p-1' color="red">Đã ẩn</Tag>
                ),
        },
        {
            title: 'Hành động',
            render: (_, record) =>
                record.status === 'active' && (
                    <Button danger onClick={() => handleHide(record)}>
                        Ẩn bài đăng
                    </Button>
                ),
        },
    ];

    return (
        <div className="p-4">
            <div className="mb-4 flex w-1/4 ml-auto border-2 border-blue-400 rounded-md">
                <Input
                    placeholder={placeholder}
                    prefix={<SearchOutlined />}
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    className="border-2 border-green-300 rounded-md"
                />
            </div>
            <Table<JobPost>
                columns={columns}
                dataSource={data}
                rowKey="id"
                pagination={{ pageSize: 5 }}
            />

            <Modal
                title={<p className="text-rose-700">Nhập lý do ẩn bài đăng</p>}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Xác nhận ẩn"
                cancelText="Hủy"
                okButtonProps={{ danger: true }}
            >
                <Input.TextArea
                    rows={4}
                    placeholder="Lý do ẩn bài đăng này..."
                    value={reason}
                    onChange={e => setReason(e.target.value)}
                />
            </Modal>
        </div>
    );
};

export default JobPostManagement;
