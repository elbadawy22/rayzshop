"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { motion } from "framer-motion";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Categories } from "../../lib/taypes";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SwiperHeroHome({
  categories,
}: {
  categories: Categories[];
}) {
  // const progressCircle = useRef<SVGSVGElement>(null);
  // const progressContent = useRef<HTMLSpanElement>(null);
  const onAutoplayTimeLeft = (_s: any, time: number, progress: number) => {
    // if (progressCircle.current) {
    //   progressCircle.current.style.setProperty('--progress', String(1 - progress));
    // }
    // if (progressContent.current) {
    //   progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    // }
  };
  return (
    <>
      <Swiper
        // spaceBetween={30}
        // centeredSlides={true}
        autoplay={{
          delay: 2500,
          // disableOnInteraction: false,
        }}
        // pagination={{
        //   clickable: true,
        // }}
        // navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className=""
      >
        {categories?.map((category, i) => (
          <SwiperSlide
            key={category.id}
            className=" flex flex-col pt-20  mb-15  gap-10   "
          >
 
            <div className="w-full  gap-5  overflow-hidden flex flex-col md:flex-row justify-center md:gap-15 items-center  ">
              <div className="  flex  items-center px-5  text-3xl font-bold">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + 2.8 * i }}
                >
                  <h1 className="flex flex-col tracking-widest ">
                    <span className="text-slate-700 wrap-normal">
                      Start Shopping With Different Countries
                    </span>
                    <span className="text-slate-900">{category.name}</span>
                  </h1>
                </motion.div>
              </div>
              <div className="flex flex-col  justify-center items-center w-full max-w-150 ">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + (3 * i - i / 10) }}
                  className="w-full flex justify-center "
                >
                  <Image
                    src={category.images[0]?.url}
                    alt={category.images[0]?.id}
                    width={250}
                    height={250}
                    className="md:max-w-100 max-w-80  "
                  />
                </motion.div>
              </div>
            </div> 
            <div className="w-full   ">
              <Link
                href="/products"
                className="flex  text-blue-500 hover:text-blue-300 justify-center items-center font-bold"
              >
                <span>View All Products</span>{" "}
                <span>
                  <ArrowRight className="w-5" />
                </span>{" "}
              </Link>
            </div>
          </SwiperSlide>
        ))}

        {/* <div className="autoplay-progress" slot="container-end"> */}
        {/* <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg> */}
        {/* <span ref={progressContent}></span> */}
        {/* </div> */}
      </Swiper>
    </>
  );
}
