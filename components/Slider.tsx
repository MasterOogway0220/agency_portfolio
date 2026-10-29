"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";

export default function Slider({ slides }: { slides: { title: string; text: string; color: string }[] }) {
  return (
    <Swiper modules={[FreeMode]} freeMode spaceBetween={24} slidesPerView="auto" className="slider">
      {slides.map((s) => (
        <SwiperSlide key={s.title} className="slide" style={{ background: s.color }}>
          <h3 className="display md">{s.title}</h3>
          <p>{s.text}</p>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
