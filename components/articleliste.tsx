"use client";

import React, { useRef, useState, useEffect } from "react";
import { IoIosBookmark, IoIosEye, IoIosPlayCircle } from "react-icons/io";
import { BsChatDots, BsBookmarkFill, BsCalendar4Event, BsChevronDoubleRight, BsChevronDoubleLeft } from "react-icons/bs";
import { Image } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

export const ArticleListe = ({ mangas, commentaires, vues, favorys }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const mangasPerPage = 4;

    // Calculate the indexes for the current page
    const indexOfLastManga = currentPage * mangasPerPage;
    const indexOfFirstManga = indexOfLastManga - mangasPerPage;
    const currentMangas = mangas.slice(indexOfFirstManga, indexOfLastManga);

    const handleNextPage = () => {
        if (currentPage < Math.ceil(mangas.length / mangasPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    if (document.getElementById("page")) {
        const pageElement = document.getElementById("page");
        if (pageElement) {
            // Debug log to verify state change
            console.log("Current Page:", currentPage);
            pageElement.innerText = `Page ${currentPage}`;
        }
    }



    return (
        <div className="mb-10" style={{ width: "94.9rem", }}>
            <div className="flex flex-col space-y-5">
                {currentMangas.map((manga) => (
                    <div key={manga.id} className="relative">
                        <div className="absolute flex flex-col space-y-5 z-30 text-white" style={{ top: "6rem", left: "3rem" }}>
                            <div className="flex flex-row">
                                {manga.title.length > 18 ? (
                                    <div className="text-3xl w-full">{manga.title.slice(0, 20)}...</div>
                                ) : (
                                    <div className="text-3xl w-full">{manga.title}</div>
                                )}
                                <div className="flex justify-center items-center w-12 h-12" style={{ background: "#E99A50", border: "4px solid #E37006", borderRadius: "50%", }}>
                                    {commentaires.length == 0 ? (
                                        <div className="text-3xl">0</div>
                                    ) : (
                                        <div className="text-3xl">{commentaires.map(commentaire => (commentaire.notecomment))}</div>
                                    )}
                                </div>
                            </div>
                            <div className="text-base" style={{ width: "40rem", }}>
                                {manga.description.length > 50 ? (
                                    <p className="text-base w-full">{manga.description.slice(0, 200)}...</p>
                                ) : (
                                    <p className="text-base w-full">{manga.description}</p>
                                )}
                            </div>
                            <div className="flex flex-row space-x-4">
                                <div className="flex flex-row items-center space-x-2">
                                    <div><BsChatDots className="w-4 h-4" /></div>
                                    <div>
                                        {commentaires.length == 0 ? (0) : (commentaires.map(commentaire => (commentaire.notecomment)))}
                                    </div>
                                </div>
                                <div className="flex flex-row items-center space-x-2">
                                    <div><BsBookmarkFill className="w-4 h-4" /></div>
                                    <div>{favorys.length == 0 ? (0) : (<div></div>)}</div>
                                </div>
                                <div className="flex flex-row items-center space-x-2">
                                    <div><BsCalendar4Event className="w-4 h-4" /></div>
                                    <div>{manga.publication_date}</div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute bg-black z-20 opacity-50" style={{ width: "46.9rem", height: "24rem", }}></div>
                        <div></div>
                        <div style={{ width: "94.9rem", }}>
                            <Image src={`http://127.0.0.1:8000${manga.cover_image}`} className="rounded-md object-cover" style={{ borderRadius: "10px", width: "100%", height: "24rem", }} width={2000} height={2000} alt={manga.title} />
                        </div>
                        <div className="flex flex-col space-y-5 absolute" style={{ left: "71rem", top: "2rem", }}>
                            <div className="relative group cursor-pointer">
                                <div>
                                    <Image src={`http://127.0.0.1:8000${manga.image_content_1}`} className="rounded-md object-cover z-40" style={{ borderRadius: "10px", width: "74%", height: "15rem", }} width={2000} height={2000} alt={manga.title} />
                                </div>
                                <div className="absolute z-50 left-24 top-20">
                                    <IoIosPlayCircle className="w-24 h-24 text-white invisible group-hover:visible" />
                                </div>
                                <div className="absolute z-40 bg-black opacity-40 invisible group-hover:visible" style={{borderRadius: "10px", width: "74%", height: "15rem", top: "0"}}></div>
                            </div>
                            <div className="flex flex-row justify-between w-72">
                                <div>
                                    <Button color="primary" className="z-30">
                                        Details
                                    </Button>
                                </div>
                                <div>
                                    <Button color="primary" className="z-30">
                                        Voir
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex flex-row space-x-5 justify-end mx-auto pagination mt-5 items-center font-medium" style={{ maxWidth: "77rem" }}>
                <Button color={currentPage === 1 ? "default" : "warning"} onClick={handlePrevPage} disabled={currentPage === 1}>
                    <BsChevronDoubleLeft />
                </Button>
                <span id="page"></span>
                <Button color={currentPage === Math.ceil(mangas.length / mangasPerPage) ? "default" : "warning"}  onClick={handleNextPage}
                    disabled={currentPage === Math.ceil(mangas.length / mangasPerPage)}>
                    <BsChevronDoubleRight />
                </Button>
            </div>
        </div>
    )
}