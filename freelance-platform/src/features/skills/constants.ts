
export interface DataType {
  key: string;
  name: string;
  description: string;
  status: 'Hoạt động' | 'Không hoạt động';
  industryId: string;
   industryName?: string;
}

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text' | 'select' | 'industry';
  record: DataType;
  index: number;
}