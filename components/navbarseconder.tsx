import { IoIosPerson } from "react-icons/io";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";

import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import { Image } from "@nextui-org/react";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import '../app/style/swiperstylebottom.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import { cn } from "@/utils/cn";

export const Navbarsecond = ({ mangas }) => {

    const categoryAll = mangas.filter(manga =>
        manga.categorie_manga === 'Manga' ||
        manga.categorie_manga === 'Anime' ||
        manga.categorie_manga === 'Novels'
    );
    const categoryMangas = mangas.filter(manga => manga.categorie_manga === 'Manga');
    const categoryanime = mangas.filter(manga => manga.categorie_manga === 'Anime');
    const categorylnove = mangas.filter(manga => manga.categorie_manga === 'Novels');


    let tabs = [
        {
            id: "tous",
            label: "Tous",
            content: {
                id: 'TousAnnime',
                contentContent: categoryAll.length !== 0 ? (
                    categoryAll.map(manga => (
                        <SwiperSlide><div key={manga.id}>
                            <div className="max-w-xs w-full">
                                <div
                                    className="card"
                                >
                                    <style jsx>{`
                                        .card {
                                            width: 100%;
                                            cursor: pointer;
                                            overflow: hidden;
                                            position: relative;
                                            height: 24rem; /* 96 * 0.25rem */
                                            border-radius: 0.375rem; /* 0.375rem is the default border-radius for rounded-md in Tailwind */
                                            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-xl */
                                            margin-left: auto;
                                            margin-right: auto;
                                            display: flex;
                                            flex-direction: column;
                                            justify-content: flex-end;
                                            padding: 1rem; /* p-4 */
                                            border: 1px solid transparent;
                                            border-color: #1a1a1a; /* dark:border-neutral-800 */
                                            background-image: url('http://127.0.0.1:8000${manga.cover_image}');
                                            background-size: cover;
                                            transition: all 0.5s;
                                            background-repeat: no-repeat;
                                            background-position: center;
                                        }
                                        .card::before {
                                            content: '';
                                            background-image: url('http://127.0.0.1:8000${manga.image_content_1}');
                                            position: fixed;
                                            top: 0;
                                            right: 0;
                                            bottom: 0;
                                            left: 0;
                                            opacity: 0;
                                            z-index: -1;
                                        }
                                        .card:hover {
                                            background-image: url('http://127.0.0.1:8000${manga.image_content_1}');
                                        }
                                    `}</style>
                                    <div className="text relative z-50">
                                        {manga.title.length > 18 ? (
                                            <h2 className='font-bold text-lg md:text-xl text-gray-50 relative text-left'>{manga.title.slice(0, 20)}...</h2>
                                        ) : (
                                            <h2 className='font-bold text-lg md:text-xl text-gray-50 relative text-left'>{manga.title}</h2>
                                        )}
                                        {manga.description.length > 50 ? (
                                            <p className='font-normal text-sm text-left text-gray-50 relative my-4'>{manga.description.slice(0, 150)}...</p>
                                        ) : (
                                            <p className='font-normal text-sm text-left text-gray-50 relative my-4'>{manga.description}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div></SwiperSlide>
                    ))
                ) : (
                    <p>Aucun élément trouvé pour Tous</p>
                )
            }
        },
        {
            id: "mangas",
            label: "Mangas",
            content: {
                id: 'MangasAnime',
                contentContent: categoryMangas.length !== 0 ? (
                    categoryMangas.map(manga => (
                        <SwiperSlide><div key={manga.id}>
                            <div className="max-w-xs w-full">
                                <div
                                    className="card"
                                >
                                    <style jsx>{`
                                        .card {
                                            width: 100%;
                                            cursor: pointer;
                                            overflow: hidden;
                                            position: relative;
                                            height: 24rem; /* 96 * 0.25rem */
                                            border-radius: 0.375rem; /* 0.375rem is the default border-radius for rounded-md in Tailwind */
                                            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-xl */
                                            margin-left: auto;
                                            margin-right: auto;
                                            display: flex;
                                            flex-direction: column;
                                            justify-content: flex-end;
                                            padding: 1rem; /* p-4 */
                                            border: 1px solid transparent;
                                            border-color: #1a1a1a; /* dark:border-neutral-800 */
                                            background-image: url('http://127.0.0.1:8000${manga.cover_image}');
                                            background-size: cover;
                                            transition: all 0.5s;
                                            background-repeat: no-repeat;
                                            background-position: center;
                                        }
                                        .card::before {
                                            content: '';
                                            background-image: url('http://127.0.0.1:8000${manga.image_content_1}');
                                            position: fixed;
                                            top: 0;
                                            right: 0;
                                            bottom: 0;
                                            left: 0;
                                            opacity: 0;
                                            z-index: -1;
                                        }
                                        .card:hover {
                                            background-image: url('http://127.0.0.1:8000${manga.image_content_1}');
                                        }
                                    `}</style>
                                    <div className="text relative z-50">
                                        {manga.title.length > 18 ? (
                                            <h2 className='font-bold text-lg md:text-xl text-gray-50 relative text-left'>{manga.title.slice(0, 20)}...</h2>
                                        ) : (
                                            <h2 className='font-bold text-lg md:text-xl text-gray-50 relative text-left'>{manga.title}</h2>
                                        )}
                                        {manga.description.length > 50 ? (
                                            <p className='font-normal text-sm text-left text-gray-50 relative my-4'>{manga.description.slice(0, 150)}...</p>
                                        ) : (
                                            <p className='font-normal text-sm text-left text-gray-50 relative my-4'>{manga.description}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div></SwiperSlide>
                    ))
                ) : (
                    <p>Aucun élément trouvé pour Tous</p>
                )
            }
        },
        {
            id: "anime",
            label: "Anime",
            content: {
                id: 'Animeanime',
                contentContent: categoryanime.length !== 0 ? (
                    categoryanime.map(manga => (
                        <SwiperSlide><div key={manga.id}>
                            <div className="max-w-xs w-full">
                                <div
                                    className="card"
                                >
                                    <style jsx>{`
                                        .card {
                                            width: 100%;
                                            cursor: pointer;
                                            overflow: hidden;
                                            position: relative;
                                            height: 24rem; /* 96 * 0.25rem */
                                            border-radius: 0.375rem; /* 0.375rem is the default border-radius for rounded-md in Tailwind */
                                            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-xl */
                                            margin-left: auto;
                                            margin-right: auto;
                                            display: flex;
                                            flex-direction: column;
                                            justify-content: flex-end;
                                            padding: 1rem; /* p-4 */
                                            border: 1px solid transparent;
                                            border-color: #1a1a1a; /* dark:border-neutral-800 */
                                            background-image: url('http://127.0.0.1:8000${manga.cover_image}');
                                            background-size: cover;
                                            transition: all 0.5s;
                                            background-repeat: no-repeat;
                                            background-position: center;
                                        }
                                        .card::before {
                                            content: '';
                                            background-image: url('http://127.0.0.1:8000${manga.image_content_1}');
                                            position: fixed;
                                            top: 0;
                                            right: 0;
                                            bottom: 0;
                                            left: 0;
                                            opacity: 0;
                                            z-index: -1;
                                        }
                                        .card:hover {
                                            background-image: url('http://127.0.0.1:8000${manga.image_content_1}');
                                        }
                                    `}</style>
                                    <div className="text relative z-50">
                                        {manga.title.length > 18 ? (
                                            <h2 className='font-bold text-lg md:text-xl text-gray-50 relative text-left'>{manga.title.slice(0, 20)}...</h2>
                                        ) : (
                                            <h2 className='font-bold text-lg md:text-xl text-gray-50 relative text-left'>{manga.title}</h2>
                                        )}
                                        {manga.description.length > 50 ? (
                                            <p className='font-normal text-sm text-left text-gray-50 relative my-4'>{manga.description.slice(0, 150)}...</p>
                                        ) : (
                                            <p className='font-normal text-sm text-left text-gray-50 relative my-4'>{manga.description}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div></SwiperSlide>
                    ))
                ) : (
                    <p>Aucun élément trouvé pour Tous</p>
                )
            }
        },
        {
            id: "novels",
            label: "Novels",
            content: {
                id: 'NovelsAnime',
                contentContent: categorylnove.length !== 0 ? (
                    categorylnove.map(manga => (
                        <SwiperSlide><div key={manga.id}>
                            <div className="max-w-xs w-full">
                                <div
                                    className="card"
                                >
                                    <style jsx>{`
                                        .card {
                                            width: 100%;
                                            cursor: pointer;
                                            overflow: hidden;
                                            position: relative;
                                            height: 24rem; /* 96 * 0.25rem */
                                            border-radius: 0.375rem; /* 0.375rem is the default border-radius for rounded-md in Tailwind */
                                            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-xl */
                                            margin-left: auto;
                                            margin-right: auto;
                                            display: flex;
                                            flex-direction: column;
                                            justify-content: flex-end;
                                            padding: 1rem; /* p-4 */
                                            border: 1px solid transparent;
                                            border-color: #1a1a1a; /* dark:border-neutral-800 */
                                            background-image: url('http://127.0.0.1:8000${manga.cover_image}');
                                            background-size: cover;
                                            transition: all 0.5s;
                                            background-repeat: no-repeat;
                                            background-position: center;
                                        }
                                        .card::before {
                                            content: '';
                                            background-image: url('http://127.0.0.1:8000${manga.image_content_1}');
                                            position: fixed;
                                            top: 0;
                                            right: 0;
                                            bottom: 0;
                                            left: 0;
                                            opacity: 0;
                                            z-index: -1;
                                        }
                                        .card:hover {
                                            background-image: url('http://127.0.0.1:8000${manga.image_content_1}');
                                        }
                                    `}</style>
                                    <div className="text relative z-50">
                                        {manga.title.length > 18 ? (
                                            <h2 className='font-bold text-lg md:text-xl text-gray-50 relative text-left'>{manga.title.slice(0, 20)}...</h2>
                                        ) : (
                                            <h2 className='font-bold text-lg md:text-xl text-gray-50 relative text-left'>{manga.title}</h2>
                                        )}
                                        {manga.description.length > 50 ? (
                                            <p className='font-normal text-sm text-left text-gray-50 relative my-4'>{manga.description.slice(0, 150)}...</p>
                                        ) : (
                                            <p className='font-normal text-sm text-left text-gray-50 relative my-4'>{manga.description}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div></SwiperSlide>
                    ))
                ) : (
                    <p className="text-white">Aucun élément trouvé pour Tous</p>
                )
            }
        }
    ];



    return (
        <div className="flex w-full flex-col navbottom mb-20">
            <Tabs aria-label="Dynamic tabs" items={tabs} className="">
                {(item) => (
                    <Tab key={item.id} title={item.label}>
                        <Card>
                            <CardBody>
                                <Swiper
                                    slidesPerView={1}
                                    spaceBetween={10}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    breakpoints={{
                                        '@0.00': {
                                            slidesPerView: 1,
                                            spaceBetween: 10,
                                        },
                                        '@0.75': {
                                            slidesPerView: 2,
                                            spaceBetween: 20,
                                        },
                                        '@1.00': {
                                            slidesPerView: 3,
                                            spaceBetween: 40,
                                        },
                                        '@1.50': {
                                            slidesPerView: 4,
                                            spaceBetween: 50,
                                        },
                                    }}
                                    autoplay={{
                                        delay: 2500,
                                        disableOnInteraction: false,
                                    }}
                                    modules={[Autoplay, Pagination, Navigation]}
                                    className="mySwiper"
                                    key={item.content.id}
                                >
                                    {item.content.contentContent}
                                </Swiper>
                            </CardBody>
                        </Card>
                    </Tab>
                )}
            </Tabs>
        </div>
    )
}