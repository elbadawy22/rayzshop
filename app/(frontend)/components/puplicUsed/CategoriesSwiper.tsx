"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Iport Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./styles.css";
// import required modules
import { FreeMode, Pagination } from "swiper/modules";
import Image from "next/image";
import { Categories } from "../../lib/taypes";
import { useAuth } from "../../providers/AuthProvider";
import Link from "next/link";

export default function CategoriesSwiper() {
  const { category } = useAuth();

  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={90}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {category && category?.length > 0 ? (
          category?.map((res: Categories) => (
            <SwiperSlide key={res.id} className="py-5">
              <Link
                href={`/products?categoryId=${res.id}`}
                className="justify-center items-center px-8 py-5 hover:scale-108 transition-all duration-300 shadow rounded-b-md flex flex-col gap-4 "
              >
                <div className=" text-4xl w-20 h-20 rounded-full flex justify-center items-center ">
                  <Image
                    className="w-full"
                    src={res.images[0]?.url}
                    alt={res.images[0]?.id}
                    width={50}
                    height={50}
                  />
                </div>{" "}
                {/** Image */}
                <p className=" text-xs sm:text-sm  w-full  text-black ">
                  {res.name}
                </p>
              </Link>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide> 1 </SwiperSlide>
        )}
      </Swiper>
    </>
  );
}
