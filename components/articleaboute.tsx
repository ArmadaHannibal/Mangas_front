"use client";

import React, { useRef, useState, useEffect } from 'react';
import { IoIosBookmark, IoIosEye, IoIosPlayCircle } from "react-icons/io";
import { Image } from '@nextui-org/react';

export const ArticleAboute = ({ mangas }) => {

    return (
        <div className='mx-auto mb-10' style={{ maxWidth: '77rem' }}>
            {mangas.map((manga) => (
                manga.id < 2 ?
                    <div key={manga.id} className='relative'>
                        <div className='absolute z-20' style={{width: '16rem', height: '15rem', borderRadius: '10px', border: '2rem solid rgb(181 181 181 / 50%)', left: '27rem', top: '0.9rem'}}></div>
                        <div className='absolute z-20 cursor-pointer group' style={{left: '31.5rem', top: '5rem',}}><IoIosPlayCircle className='w-24 h-24 text-blue-600 group-hover:text-gray-500' /></div>

                        <div className='flex flex-row space-x-24'>
                            <div className='flex flex-col space-y-5'>
                                <div className='flex flex-col space-y-2'>
                                    {manga.title.length > 18 ? (
                                        <div className='text-4xl w-full'>{manga.title.slice(0, 20)}...</div>
                                    ) : (
                                        <div className='text-4xl w-full'>{manga.title}</div>
                                    )}
                                    <div>
                                        <div style={{ width: '8rem', height: '0.5rem', backgroundColor: '#06A1E3' }}></div>
                                    </div>
                                </div>

                                <div>
                                    <div>
                                        {manga.description.length > 50 ? (
                                            <p className='text-base w-full'>{manga.description.slice(0, 200)}...</p>
                                        ) : (
                                            <p className='text-base w-full'>{manga.description}</p>
                                        )}
                                    </div>
                                    <div className='flex justify-end mt-3'>
                                        <div style={{ width: '11rem', height: '0.3rem', backgroundColor: '#06A1E3' }}></div>
                                    </div>
                                </div>

                            </div>
                            <div style={{ width: '129rem' }}>
                                <Image src={`http://127.0.0.1:8000${manga.cover_image}`} className='rounded-md object-cover' style={{ borderRadius: '0', width: '100%', height: '19rem', }} width={2000} height={2000} alt={manga.title} />
                            </div>
                        </div>
                    </div>
                    : null
            ))}
        </div>
    )
}