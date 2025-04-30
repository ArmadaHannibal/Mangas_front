"use client";

import React, { useRef, useState, useEffect } from 'react';
import Link from "@nextui-org/link";
import Snippet from "@nextui-org/snippet";
import Code from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import Image from 'next/image';
import axios from 'axios';
import { Navbarsecond } from '@/components/navbarseconder';
import { Blocnewsmangatop } from '../components/blocnewsmangatop';
import { Blocderniertopnote } from '../components/blocderniertopnote';
import { Bloclistecategory } from '../components/bloclistecategory';
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { PiStarLight } from "react-icons/pi";
import { IoCalendarClear } from "react-icons/io5";
import { IoIosBookmark, IoIosEye, IoIosPlayCircle } from "react-icons/io";
import { BsStarFill } from "react-icons/bs";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import "@/app/style/swiperstyle.css";

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function Home() {
  const [mangas, setMangas] = useState([]);
  const [commentaires, setCommentaires] = useState([]);
  const [loading, setLoading] = useState(true);
  const path = require('path');

  useEffect(() => {
    const fetchMangas = async () => {
      try {
        const response = await axios.get('http://localhost:8000/');
        setMangas(response.data.mangas);
        setCommentaires(response.data.commentaires);
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

  const cover_detail = document.querySelectorAll('.cover_detail');

  // if (cover_detail) {
  //   // Parcourir les éléments et les manipuler
  //   cover_detail.forEach((element, index) => {
  //     // Récupérer et manipuler le parent de l'élément
  //     const parent = element.parentElement;

  //     if (parent) {
  //       const parentToparent = parent?.parentElement;
  //       // Récupérer les enfants du parent
  //       const children = parentToparent?.children;

  //       // Vérifier que l'indice 1 existe dans la collection
  //       if (children?.length > 1) {
  //         // Récupérer l'élément à l'indice 1
  //         const zerochild = children[0];
  //         const onechild = children[1];
  //         const secondChild = children[2];

  //         // Récupérer la taille de l'élément
  //         const width = secondChild.offsetWidth;
  //         const height = secondChild.offsetHeight;

  //         element.style.height = `854px`;

  //         // Récupérer tous les enfants h1, p et span sous parentToparent
  //         const elements = onechild?.querySelectorAll('h1, p, span, svg');
  //       }

  //     }

  //   });
  // }

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
          {mangas.map(manga => {
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
                  <div className='relative'><div className='absolute bg-black cover_detail z-40 opacity-40'></div></div>
                  <div className='relative'>
                    <div className='absolute carrestyle z-50 text-white'>
                      <div>
                        {commentaires.length === 0 ? (
                          <div className="flex flex-col space-y-3">
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
                              <div>
                                {manga.title.length > 18 ? (
                                  <h2 className='text-7xl w-full'>{manga.title.slice(0, 20)}...</h2>
                                ) : (
                                  <h2 className='text-7xl w-full'>{manga.title}</h2>
                                )}
                              </div>
                            </div>
                            <div>
                              {manga.description.length > 50 ? (
                                <p className='text-base w-full'>{manga.description.slice(0, 200)}...</p>
                              ) : (
                                <p className='text-base w-full'>{manga.description}</p>
                              )}
                            </div>
                            <div className='flex flex-row mt-4 w-full space-x-1 contentactue items-center'>
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
                              <div className='flex flex-row mt-4 items-center cursor-pointer group btn_voirplus'>
                                <div><IoIosPlayCircle className='w-16 h-16 text-blue-600 group-hover:text-white' /></div>
                                <div className='group-hover:text-blue-600 group-hover:font-medium font-medium'>Voir</div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col space-y-3">
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
                            <div className='flex flex-row mt-4 w-full space-x-1 contentactue items-center'>
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
                              <div className='flex flex-row items-center cursor-pointer group btn_voirplus'>
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

      <Navbarsecond mangas={mangas} />

      <Blocnewsmangatop mangas={mangas} commentaires={commentaires} />

      <Blocderniertopnote mangas={mangas} commentaires={commentaires} />

      <Bloclistecategory mangas={mangas} />
    </section>
  );
}
