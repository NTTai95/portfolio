// Helper hiển thị giới tính
export const genderToLabel = (gender: boolean) => {
  return gender ? "Nam" : "Nữ";
};

// Helper hiển thị vai trò
export const roleToLabel = (role: string) => {
  return role === "Freelancer" ? "Người làm việc" : "Nhà tuyển dụng";
};

// Tô sáng keyword trong văn bản
export const getHighlightedText = (
  text: string,
  keyword: string,
  style?: React.CSSProperties
) => {
  if (!keyword) return text;

  const normalizedText = removeVietnameseTones(text);
  const normalizedKeyword = removeVietnameseTones(keyword.toLowerCase());
  const regex = new RegExp(`(${normalizedKeyword})`, 'gi');

  const parts = normalizedText.split(regex);

  return (
    <>
      {parts.map((part, i) => {
        if (
          removeVietnameseTones(part).toLowerCase() === normalizedKeyword
        ) {
          const startIdx = parts.slice(0, i).join('').length;
          const originalPart = text.substr(startIdx, part.length);

          return (
            <span key={i} style={style ?? { backgroundColor: 'yellow' }}>
              {originalPart}
            </span>
          );
        } else {
          const startIdx = parts.slice(0, i).join('').length;
          const originalPart = text.substr(startIdx, part.length);
          return <span key={i}>{originalPart}</span>;
        }
      })}
    </>
  );
};

// Xóa dấu tiếng Việt
const removeVietnameseTones = (str: string): string => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
};

export default removeVietnameseTones;

// Format chuẩn hóa cho moment
function uppercaseDate(format: string): string {
  return format
    .replace(/dd/g, "DD")
    .replace(/mm/g, "MM")
    .replace(/yyyy/g, "YYYY")
    .replace(/yy/g, "YY");
}
