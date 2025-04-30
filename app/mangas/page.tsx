"use client";

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { PiStarLight } from "react-icons/pi";
import { IoCalendarClear } from "react-icons/io5";
import { IoIosBookmark, IoIosEye, IoIosPlayCircle } from "react-icons/io";
import { Blocnewsmangas } from "@/components/blocnewsmangas";
import { Bloclistesmangas } from "@/components/bloclistesmangas";
import { BsStarFill } from "react-icons/bs";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import "@/app/style/swiperstyle.css";

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

type Card = {
  id: number;
  title: string;
  description: string;
  publication_date: string;
  cover_image: string;
  className: string;
  content: JSX.Element | React.ReactNode | string;
};

export default function BlogPage() {
  const [mangas, setMangas] = useState([]);
  const [commentaires, setCommentaires] = useState([]);
  const [favorys, setFavory] = useState([]);
  const [vues, setVue] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMangas = async () => {
      try {
        const response = await axios.get('http://localhost:8000/');
        setMangas(response.data.mangas);
        setCommentaires(response.data.commentaires);
        setFavory(response.data.favory);
        setVue(response.data.vue);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching manga list:', error);
      }
    };
    fetchMangas();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="flex flex-col items-center justify-center gap-4">
      {mangas.length === 0 ? (
        <div>Aucun manga disponible pour le moment.</div>
      ) : (
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper mb-6"
        >
          {mangas.map((manga) => {
            const mangaComment = commentaires.find(comment => comment.manga === manga.id);
            const maxElements = 5;
            const nombre = mangaComment ? mangaComment.notecomment : 0;
            const elements = [];

            for (let i = 0; i < maxElements; i++) {
              if (i < nombre) {
                elements.push(<div key={i} className="normal-element"><BsStarFill className='text-yellow-500 w-8 h-8' /></div>);
              } else {
                elements.push(<div key={i} className="extra-element"><PiStarLight className='w-8 h-8' /></div>);
              }
            }

            return (
              <SwiperSlide key={manga.id} id={manga.id.toString()}>
                <div className='contentImg'>
                  <div className='relative'>
                    <div className='absolute bg-black cover_detail z-40 opacity-40'></div>
                  </div>
                  <div className='relative'>
                    <div className='absolute carrestyle z-50 text-white'>
                      <div>
                        {commentaires.length === 0 ? (
                          <div className="flex flex-col">
                            <div>
                              <h1>0</h1>
                            </div>
                            <div className='flex flex-row space-x-1'>
                              <PiStarLight className='w-8 h-8' />
                              <PiStarLight className='w-8 h-8' />
                              <PiStarLight className='w-8 h-8' />
                              <PiStarLight className='w-8 h-8' />
                              <PiStarLight className='w-8 h-8' />
                            </div>
                            <div>
                              {manga.title.length > 18 ? (
                                <h2 className='text-7xl w-full'>{manga.title.slice(0, 20)}...</h2>
                              ) : (
                                <h2 className='text-7xl w-full'>{manga.title}</h2>
                              )}
                            </div>
                            <div>
                              {manga.description.length > 50 ? (
                                <p className='text-base w-full'>{manga.description.slice(0, 200)}...</p>
                              ) : (
                                <p className='text-base w-full'>{manga.description}</p>
                              )}
                            </div>
                            <div className='flex flex-row mt-5 w-full space-x-1 contentactue items-center'>
                              <div className='flex flex-row items-center'>
                                <div><IoCalendarClear /></div>
                                <div className='text-sm'>{manga.publication_date}</div>
                              </div>
                              <div className='flex flex-row items-center'>
                                <div><IoIosBookmark /></div>
                                <div className='text-sm'>0</div>
                              </div>
                              <div className='flex flex-row items-center'>
                                <div><IoIosEye /></div>
                                <div className='text-sm'>0</div>
                              </div>
                            </div>
                            <div>
                              <div className='flex flex-row mt-5 items-center cursor-pointer group btn_voirplus'>
                                <div><IoIosPlayCircle className='w-16 h-16 text-blue-600 group-hover:text-white' /></div>
                                <div className='group-hover:text-blue-600 group-hover:font-medium font-medium'>Voir</div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col">
                            <div>
                              <h1>{nombre}</h1>
                            </div>
                            <div className='flex flex-row space-x-1'>
                              {elements}
                            </div>
                            <div>
                              {manga.title.length > 18 ? (
                                <h2 className='text-7xl w-full'>{manga.title.slice(0, 20)}...</h2>
                              ) : (
                                <h2 className='text-7xl w-full'>{manga.title}</h2>
                              )}
                            </div>
                            <div>
                              {manga.description.length > 50 ? (
                                <p className='text-base w-full'>{manga.description.slice(0, 200)}...</p>
                              ) : (
                                <p className='text-base w-full'>{manga.description}</p>
                              )}
                            </div>
                            <div className='flex flex-row mt-5 w-full space-x-1 contentactue items-center'>
                              <div className='flex flex-row items-center'>
                                <div><IoCalendarClear /></div>
                                <div className='text-sm'>{manga.publication_date}</div>
                              </div>
                              <div className='flex flex-row items-center'>
                                <div><IoIosBookmark /></div>
                                <div className='text-sm'>0</div>
                              </div>
                              <div className='flex flex-row items-center'>
                                <div><IoIosEye /></div>
                                <div className='text-sm'>0</div>
                              </div>
                            </div>
                            <div>
                              <div className='flex flex-row mt-5 items-center cursor-pointer group btn_voirplus'>
                                <div><IoIosPlayCircle className='w-16 h-16 text-blue-600 group-hover:text-white' /></div>
                                <div className='group-hover:text-blue-600 group-hover:font-medium font-medium'>Voir</div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <Image src={`http://127.0.0.1:8000${manga.cover_image}`} width={2000} height={2000} alt={manga.title} />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}

      <Blocnewsmangas mangas={mangas} commentaires={commentaires} />
      <Bloclistesmangas mangas={mangas} commentaires={commentaires} />
    </section>
  );
}
