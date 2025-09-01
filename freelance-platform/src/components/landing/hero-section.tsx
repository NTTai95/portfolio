"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="container mx-auto py-20 flex flex-col md:flex-row items-center gap-10">
      <div className="flex-1">
        <h1 className="text-5xl font-bold text-white mb-6">
          Kết nối Freelancer & Doanh nghiệp{" "}
          <span className="text-cyan">Nhanh chóng</span>
        </h1>
        <p className="text-lg text-blueNCS mb-8">
          Sàn tuyển dụng freelancer hiện đại, uy tín, đa lĩnh vực. Đăng dự án,
          nhận việc, xây dựng sự nghiệp tự do!
        </p>
        <div className="flex gap-4">
          <Link href="/register">
            <Button size="lg" className="bg-cyan text-white">
              Đăng ký ngay
            </Button>
          </Link>
          <Link href="/jobs">
            <Button
              variant="outline"
              size="lg"
              className="border-cyan text-cyan"
            >
              Tìm việc
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex-1 flex justify-center">
        <img
          src="/images/hero-freelancer.png"
          alt="Freelancer Hero"
          className="w-96 rounded-xl shadow-lg"
        />
      </div>
    </section>
  );
}
