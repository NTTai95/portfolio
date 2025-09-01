"use client"
import React, { useState } from 'react'
import { Dropdown, Modal, Form, Input } from 'antd'
import { MoreOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'
import { ActionCellProps } from './constants'

const ActionCell = ({ id }: ActionCellProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const router = useRouter()

    const handleReject = () => {
        setIsModalOpen(true)
    }

    const handleModalOk = () => {
        setIsModalOpen(false)
    }

    const handleModalCancel = () => {
        setIsModalOpen(false)
    }

    const onViewDetail = () => {
        () => router.push(`/job-post-detail/${id}`)
    }

    return (
        <>
            <Dropdown
                menu={{
                    items: [
                        { key: '1', label: 'Xem chi tiết', onClick: onViewDetail },
                        { key: '2', label: 'Ẩn bài đăng' },
                        { key: '3', label: 'Từ chối', onClick: handleReject }
                    ]
                }}
            >
                <MoreOutlined />
            </Dropdown>

            <Modal
                title="Lý do từ chối"
                open={isModalOpen}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
            >
                <Form>
                    <Form.Item
                        label="Lý do"
                        name="rejectReason"
                        rules={[{ required: true, message: 'Vui lòng nhập lý do từ chối!' }]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default ActionCell;