import { DataType } from './constants';
import { useEffect, useState } from 'react';
import { fetchSkill } from '../../api/skillsAPI';
import { fetchIndustrie } from '../../api/industriesAPI';

export const useIndustrie = (): DataType[] => {
  const [data, setData] = useState<DataType[]>([]);

useEffect(() => {
  fetchIndustrie()
    .then(res => {
      const mappedData = res.data.map((item: any) => ({
        key : item.id.toString(), // chuyển id thành key string
        name: item.name
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

export const useSkill = (): DataType[] => {
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [skillRes, industryRes] = await Promise.all([
          fetchSkill(),
          fetchIndustrie()
        ]);

        const industriesMap = industryRes.data.reduce((acc: Record<string, string>, item: any) => {
          acc[item.id] = item.name;
          return acc;
        }, {});

        const mappedData = skillRes.data.map((item: any) => ({
          key: item.id.toString(),
          name: item.name,
          description: item.description,
          status: item.status,
          industryId: item.industryId,
           industryName: industriesMap[item.industryId] || "Không rõ" 
        })).reverse();

        setData(mappedData);
      } catch (err) {
        console.error("Lỗi tải dữ liệu kỹ năng hoặc ngành:", err);
      }
    };

    fetchData();
  }, []);

  return data;
};