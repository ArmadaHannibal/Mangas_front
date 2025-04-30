import React, { useRef, useState } from 'react';
import { Image } from '@nextui-org/react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import { PiStarLight } from "react-icons/pi";
import { SlArrowRight } from "react-icons/sl";
import { BsStarFill } from "react-icons/bs";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import '../app/style/swiperstylenewandtop.css';

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';

export const Blocnewsmangatop = ({ mangas, commentaires }) => {
    const img = document.querySelectorAll('.contentimgtop10');

    if (img) {
        // Parcourir les éléments et les manipuler

        img.forEach((parentElement) => {
            // Récupérer les enfants du parent
            const children = parentElement.children;

            for (let i = 0; i < children.length; i++) {
                const childElement = children[i];

                const parent = childElement.parentElement;
                const parenttoparent = parent?.parentElement?.querySelector('.contentdetailtop10');
                parenttoparent.style.height = `${childElement.offsetHeight}px`;
            }
        });
    }

    return (
        <div>
            <div className="flex flex-row justify-between w-full contentglobal space-x-5 mb-20">
                <div>
                    <div>
                        <div className='flex flex-row space-x-5'>
                            <div className='w-3 h-9 bg-blue-700'></div>
                            <h2 className='text-2xl font-bold mb-5 elmentborder'>DERNIERS MANGA</h2>
                        </div>
                        <div className='newsmanga relative'>

                            <Swiper
                                navigation={true}
                                spaceBetween={30}
                                centeredSlides={true}
                                // autoplay={{
                                //     delay: 2500,
                                //     disableOnInteraction: false,
                                // }}
                                modules={[Autoplay, Pagination, Navigation]}
                                className="mySwiper">
                                {mangas.map(manga => {
                                    const mangaComment = commentaires.find(comment => comment.manga === manga.id);
                                    const maxElements = 5;
                                    const nombre = mangaComment ? mangaComment.notecomment : 0;
                                    const elements = [];

                                    for (let i = 0; i < maxElements; i++) {
                                        if (i < nombre) {
                                            elements.push(<div key={i} className="normal-element"><BsStarFill className='text-yellow-500 w-5 h-5' /></div>);
                                        } else {
                                            elements.push(<div key={i} className="extra-element"><PiStarLight className='w-5 h-5 text-white' /></div>);
                                        }
                                    }
                                    return (
                                        <SwiperSlide key={manga.id} id={manga.id}>
                                            <div>
                                                <Image src={`http://127.0.0.1:8000${manga.cover_image}`} width={2000} height={2000} alt={manga.title} />
                                            </div>
                                            <div className='absolute z-50 flex justify-between w-3/4 items-center bottom-2 left-20'>
                                                <div className='flex flex-col justify-start space-y-2'>
                                                    <div>
                                                        {manga.title.length > 18 ? (
                                                            <span className='text-2xl w-full text-white font-medium'>{manga.title.slice(0, 20)}...</span>
                                                        ) : (
                                                            <span className='text-2xl w-full text-white font-medium'>{manga.title}</span>
                                                        )}
                                                    </div>
                                                    <div className='text-left'>
                                                        {manga.saison_manga >= 1 ? (
                                                            <span className='text-base text-white text-start'>
                                                                {manga.saison_manga} {manga.saison_manga > 1 ? ('saisons') : ('saison')}
                                                            </span>
                                                        ) : (
                                                            <span className='text-base text-white'>Film</span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className='flex flex-row space-x-2'>
                                                    {elements}
                                                </div>
                                            </div>
                                            <div className='absolute bg-black bgcontentbottom'></div>
                                        </SwiperSlide>
                                    )
                                })}
                                <div className='absolute bg-black btnnextcoverleft'></div>
                                <div className='absolute bg-black btnnextcoverright'></div>
                            </Swiper>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='scrollelemnt'>
                        <div className='flex flex-row space-x-5'>
                            <div className='w-3 h-9 bg-blue-700'></div>
                            <h2 className='text-2xl font-bold mb-5'>TOP 10 NOTES</h2>
                        </div>
                        <div className='contenttopnotes'>
                            <div className='flex flex-col space-y-5 contenttop10 pr-2'>
                                {mangas.map(manga => (
                                    <div key={manga.id} className='flex flex-row'>
                                        <div className='relative' style={{ width: '36%' }}>
                                            <div className='contentimgtop10'>
                                                <Image src={`http://127.0.0.1:8000${manga.cover_image}`} style={{ borderRadius: 0, width: '100%', }} width={2000} height={2000} alt={manga.title} />
                                            </div>
                                            <div className='absolute contentdetailtop10'></div>
                                        </div>
                                        <div className='flex items-center bg-black text-white' style={{ width: '100%', paddingLeft: '1.5rem', paddingRight: '1rem' }}>
                                            {manga.title.length > 18 ? (
                                                <span className='text-lg w-full font-medium'>{manga.title.slice(0, 50)}...</span>
                                            ) : (
                                                <span className='text-lg w-full font-medium'>{manga.title}</span>
                                            )}
                                        </div>
                                        <div className='flex items-center justify-center' style={{ background: '#00386C', width: '3rem', }}>
                                            <SlArrowRight className='w-6 h-6 font-medium text-white' />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}