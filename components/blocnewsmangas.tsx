"use client";

import React, { useRef, useState, useEffect } from "react";
import { BsStarFill } from "react-icons/bs";
import { PiStarLight } from "react-icons/pi";
// Default theme
import "@splidejs/react-splide/css";

// or other themes
import "@splidejs/react-splide/css/skyblue";
import "@splidejs/react-splide/css/sea-green";

// or only core styles
import "@splidejs/react-splide/css/core";
import { LayoutGrid } from "./LayoutGrid";  // Make sure this path is correct

type Card = {
    id: number;
    content: JSX.Element | React.ReactNode | string;
    className: string;
    thumbnail: string;
};

export const Blocnewsmangas = ({ mangas, commentaires }) => {

    const [selected, setSelected] = useState<Card | null>(null);
    const [lastSelected, setLastSelected] = useState<Card | null>(null);

    const handleClick = (card: Card) => {
        setLastSelected(selected);
        setSelected(card);
    };

    const handleOutsideClick = () => {
        setLastSelected(selected);
        setSelected(null);
    };

    const cards: Card[] = mangas.map((manga, index) => {
        const mangaComment = commentaires.find(comment => comment.manga === manga.id);
        const maxElements = 5;
        const nombre = mangaComment ? mangaComment.notecomment : 0;
        // Générer les éléments en fonction de maxElements
        const elements = [];
        for (let i = 0; i < maxElements; i++) {
            if (i < nombre) {
                elements.push(<div key={i} className="normal-element"><BsStarFill className="text-yellow-500 w-4 h-4"/></div>);
            } else {
                elements.push(<div key={i} className="extra-element"><PiStarLight className="w-4 h-4" /></div>);
            }
        }
        return {
            id: manga.id,
            content: (
                <div className="text-white p-4">
                    <div className="flex justify-between">
                        <div>
                            {manga.title.length > 18 ? (
                                <h2 className="text-xl font-medium w-full">{manga.title.slice(0, 20)}...</h2>
                            ) : (
                                <h2 className="text-xl font-medium w-full">{manga.title}</h2>
                            )}
                        </div>
                        <div>
                            {mangaComment ? (
                                <p className="flex flex-row space-x-2">{elements}</p>
                            ) : (
                                <p className="flex flex-row space-x-2">
                                    <PiStarLight className="w-4 h-4" />
                                    <PiStarLight className="w-4 h-4" />
                                    <PiStarLight className="w-4 h-4" />
                                    <PiStarLight className="w-4 h-4" />
                                    <PiStarLight className="w-4 h-4" />
                                </p>
                            )}
                        </div>
                    </div>

                    {manga.description.length > 50 ? (
                        <p className="text-base w-full">{manga.description.slice(0, 305)}...</p>
                    ) : (
                        <p className="text-base w-full">{manga.description}</p>
                    )}
                </div>
            ),
            className: index === 0 ? "row-span-3" : "",
            thumbnail: `http://127.0.0.1:8000${manga.cover_image}`
        };
    });

    return (
        <div>
            <div className="flex flex-row space-x-5">
                <div className="w-3 h-9 bg-blue-700"></div>
                <h2 className="text-2xl font-bold mb-5 elmentborder">Nouveaux Mangas</h2>
            </div>

            <LayoutGrid cards={cards} />

        </div>
    )
}
