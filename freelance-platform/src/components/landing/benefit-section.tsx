"use client";
import { Card } from "@/components/ui/card";

const benefits = [
  {
    title: "Đa dạng lĩnh vực",
    desc: "Từ IT, thiết kế, marketing đến dịch thuật, kế toán...",
  },
  {
    title: "Bảo mật & An toàn",
    desc: "Thanh toán qua hệ thống, bảo vệ quyền lợi đôi bên.",
  },
  {
    title: "Hỗ trợ 24/7",
    desc: "Đội ngũ CSKH luôn sẵn sàng giải đáp mọi thắc mắc.",
  },
];

export default function BenefitSection() {
  return (
    <section className="container mx-auto py-16 grid md:grid-cols-3 gap-8">
      {benefits.map((b, i) => (
        <Card key={i} className="p-6 bg-white/80">
          <h3 className="font-semibold text-xl mb-2 text-oxford">{b.title}</h3>
          <p>{b.desc}</p>
        </Card>
      ))}
    </section>
  );
}
