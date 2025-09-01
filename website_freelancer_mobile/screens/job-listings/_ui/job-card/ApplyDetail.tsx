// screens/job-listings/_ui/job-card/ApplyDetail.tsx
import { Status } from "@/types/status";
import { formatDate } from '@/utils/date';
import { FontAwesome6 } from "@expo/vector-icons";
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { formatCurrency } from "../format";

const ApplyDetail = ({ job }: { job: any }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const statusMeta = Status.Meta[job.applyStatus.toUpperCase()];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={toggleExpand}
        style={styles.header}
        activeOpacity={0.9}
      >
        <Text style={styles.headerText}>Chi tiết ứng tuyển</Text>
        <View style={[styles.tag, { backgroundColor: statusMeta.color }]}>
          <Text style={styles.tagText}>{statusMeta.label}</Text>
        </View>
        <FontAwesome6
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={16}
          color="white"
          style={styles.chevron}
        />
      </TouchableOpacity>

      {expanded && (
        <View style={styles.content}>
          <View style={styles.grid}>
            {[
              {
                title: 'Giá đề xuất',
                value: formatCurrency(job.bidAmount),
                icon: 'money-bills',
                width: '48%',
              },
              {
                title: 'Giờ đề xuất',
                value: `${job.estimatedHours} giờ`,
                icon: 'clock',
                width: '48%',
              },
              {
                title: 'Ngày ứng tuyển',
                value: formatDate(job.applyCreatedAt, true),
                icon: 'calendar',
                width: '100%',
              }
            ].map((item: any, index) => (
              <View key={index} style={[styles.card, { width: item.width }]}>
                <View style={styles.cardHeader}>
                  <FontAwesome6 name={item.icon} size={16} color="#4f46e5" />
                  <Text style={styles.cardTitle}>{item.title}</Text>
                </View>
                <Text style={styles.cardValue}>{item.value}</Text>
              </View>
            ))}
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Nội dung ứng tuyển</Text>
          <Text style={styles.contentText}>{job.applyContent}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginTop: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#3B82F6',
  },
  headerText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginLeft: 8,
  },
  tagText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 13,
  },
  chevron: {
    marginLeft: 10,
  },
  content: {
    backgroundColor: '#F9FAFB',
    padding: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    color: '#4B5563',
    fontSize: 13,
    marginLeft: 8,
    fontWeight: '500',
  },
  cardValue: {
    color: '#1F2937',
    fontWeight: '600',
    fontSize: 15,
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 16,
  },
  sectionTitle: {
    color: '#111827',
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 12,
  },
  contentText: {
    color: '#4B5563',
    lineHeight: 22,
    fontSize: 15,
  },
});

export default ApplyDetail;