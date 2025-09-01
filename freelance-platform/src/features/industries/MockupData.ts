import { DataType } from './constants';
import { useEffect, useState } from 'react';
import { fetchIndustrie } from '../../api/industriesAPI';

export const useIndustrie = (): DataType[] => {
  const [data, setData] = useState<DataType[]>([]);

useEffect(() => {
  fetchIndustrie()
    .then(res => {
      const mappedData = res.data.map((item: any) => ({
        key : item.id.toString(), // chuyển id thành key string
        name: item.name,
        description: item.description,
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