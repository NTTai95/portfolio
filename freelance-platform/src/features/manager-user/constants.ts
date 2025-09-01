
//Types
interface User {
  id: number;
  avatar: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'paused' | 'disabled';
  role: 'Freelancer' | 'Employer';
}

//Convert
const statusColor = {
  active: 'green',
  paused: 'default',
  disabled: 'red'
};

const statusLabel = {
  active: 'Hoạt động',
  paused: 'Tạm ngừng',
  disabled: 'Bị vô hiệu hóa'
};

export { statusColor, statusLabel };
export type { User };