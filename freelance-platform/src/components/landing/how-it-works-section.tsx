"use client";
import { Card } from "@/components/ui/card";

const steps = [
  "Đăng ký tài khoản",
  "Đăng dự án hoặc tìm việc",
  "Kết nối & thương lượng",
  "Hoàn thành & thanh toán",
];

export default function HowItWorksSection() {
  return (
    <section className="container mx-auto py-16">
      <h2 className="text-3xl font-bold text-white mb-8">
        Quy trình hoạt động
      </h2>
      <div className="grid md:grid-cols-4 gap-6">
        {steps.map((s, i) => (
          <Card key={i} className="p-6 bg-white/80 text-center">
            {i + 1}. {s}
          </Card>
        ))}
      </div>
    </section>
  );
}
