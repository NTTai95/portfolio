import { JSX } from 'react';

//Types
export type ActionCellProps = {
    id: number
}

//Table Columns
export type ColumnsType = {
    jobPostName: string,
    author: string,
    reason: string,
    reporter: string,
    datePosted: string,
    key: number
}

export type TableColumnType = {
    title: string,
    dataIndex: string,
    key: string,
    render?: (_: any, record: ColumnsType) => JSX.Element
}