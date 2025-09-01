"use client";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const freelancers = [
  { name: "Nguyễn Văn A", skill: "Web Developer", rating: 5, jobs: 50 },
  { name: "Trần Thị B", skill: "UI/UX Designer", rating: 4.8, jobs: 40 },
  { name: "Lê Văn C", skill: "Content Writer", rating: 4.9, jobs: 60 },
  { name: "Phạm Thị D", skill: "Mobile Dev", rating: 5, jobs: 35 },
];

export default function FeaturedFreelancers() {
  return (
    <section className="container mx-auto py-16">
      <h2 className="text-3xl font-bold text-white mb-8">Freelancer nổi bật</h2>
      <div className="grid md:grid-cols-4 gap-6">
        {freelancers.map((f, i) => (
          <Card key={i} className="p-4 flex flex-col items-center bg-white/90">
            <Avatar className="w-20 h-20 mb-3" />
            <h4 className="font-semibold text-lg">{f.name}</h4>
            <Badge className="bg-cyan text-white mt-2 mb-2">{f.skill}</Badge>
            <p className="text-sm text-gray-600">
              {Array(Math.round(f.rating)).fill("⭐").join("")} ({f.jobs}+ dự
              án)
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
