// import React, { useRef, useState } from "react";
// Import Swiper React components
"use client"
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import "./styles.css";
import Image from "next/image";

export default function ImageSwiper({
  images,
}: {
  images: { id: string; url: string }[];
}) {
  return (
    <>
      <Swiper className="mySwiper  ">
        {images.map((img) => (
          <SwiperSlide>
            <Image
              className="   h-auto   transition-all duration-200 overflow-hidden cursor-pointer "
              width={250}
              height={250}
              src={img.url}
              alt={img.id}
              loading="eager"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
