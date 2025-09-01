import { useEffect, useState } from 'react';
import { fetchLanguages } from '../../api/languagesAPI';
import { DataType } from './constants';

export const useLanguages = (): DataType[] => {
  const [data, setData] = useState<DataType[]>([]);

useEffect(() => {
  fetchLanguages()
    .then(res => {
      const mappedData = res.data.map((item: any) => ({
        key: item.id.toString(), // chuyển id thành key string
        iso: item.iso,
        name: item.name,
        status: item.status,
      }))
      .reverse(); 
      setData(mappedData);
    })
    .catch(err => {
      console.error("Lỗi tải dữ liệu:", err);
    });
}, []);


  return data;
};