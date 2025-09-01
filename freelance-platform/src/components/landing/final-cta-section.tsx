"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FinalCTASection() {
  return (
    <section className="container mx-auto py-16 text-center">
      <h2 className="text-3xl font-bold text-white mb-4">Sẵn sàng bắt đầu?</h2>
      <Link href="/register">
        <Button size="lg" className="bg-bronze text-white">
          Tham gia ngay
        </Button>
      </Link>
    </section>
  );
}
