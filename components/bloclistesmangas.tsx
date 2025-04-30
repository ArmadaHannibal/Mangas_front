"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { CheckboxGroup, Checkbox } from "@nextui-org/react";
import { Input, DatePicker, useCheckbox, Chip, VisuallyHidden, tv } from "@nextui-org/react";
import { IoIosBookmark, IoIosEye, IoIosPlayCircle } from "react-icons/io";
import { BsStarFill, BsEyeFill, BsCheckLg, BsChatDots, BsBookmarkFill, BsCalendar4Event, BsChevronDoubleRight, BsChevronDoubleLeft } from "react-icons/bs";
import { PiStarLight } from "react-icons/pi";
import { CheckIcon } from './CheckIcon';
import { Console } from 'console';
import { Button } from "@nextui-org/react";
import "@/app/style/swiperstyle.css";

const normalizeGenres = (genresString: string): Set<string> => {
    const genres = new Set<string>();
    const normalizedGenres = genresString.split('-').map(genre => {
        // Supprimer les espaces autour du genre
        const trimmedGenre = genre.trim();
        // Gérer les préfixes spécifiques
        let normalizedGenre = trimmedGenre.replace(/^(d'|l'|j')/i, '');
        // Convertir en minuscules
        normalizedGenre = normalizedGenre.toLowerCase();
        return normalizedGenre;
    });

    normalizedGenres.forEach(genre => genres.add(genre));
    return genres;
};

export const Bloclistesmangas = ({ mangas, commentaires }) => {
    const genresSet = new Set<string>();

    // Récupérer tous les genres uniques à partir des mangas
    mangas.forEach(manga => {
        const genres = normalizeGenres(manga.genre_manga);
        genres.forEach(genre => genresSet.add(genre));
    });

    const [selected, setSelected] = React.useState([]);

    const [selectedGenres, setSelectedGenres] = useState([]);

    const handleCheckboxChange = (event) => {
        const genre = event.target.value;
        if (event.target.checked) {
            setSelectedGenres([...selectedGenres, genre]);
        } else {
            setSelectedGenres(selectedGenres.filter((g) => g !== genre));
        }
    };

    const filterDivsByGenre = (genreList) => {
        const divs = document.querySelectorAll('.elementListesMangas');
        const padition = document.querySelector('.contentPagination');

        if (genreList.length === 0) {
            divs.forEach((div) => {
                div.style.display = 'block';
                padition.style.display = 'block';
            });
        } else {
            divs.forEach((div) => {
                const divGenre = div.getAttribute('data-genre');
                if (divGenre) {

                    const divGenreArray = divGenre.split('-');
                    const shouldShow = genreList.some((genre) => divGenreArray.includes(genre));
                    div.style.display = shouldShow ? 'block' : 'none';
                    padition.style.display = shouldShow ? 'block' : 'none';
                }
            });
        }
    };

    useEffect(() => {
        filterDivsByGenre(selectedGenres);
    }, [selectedGenres]);

    const variants = ["underlined"];

    const [selectedDate, setSelectedDate] = useState(null);

    const [searchTitle, setSearchTitle] = useState('');

    // Fonction pour formater la date au format JJ/MM/AAAA
    const formatDate = (date) => {
        if (!(date instanceof Date)) return '';
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Fonction pour filtrer les éléments par date
    const filterDivsByDate = (date) => {
        const divs = document.querySelectorAll('.elementListesMangas');
        const padition = document.querySelector('.contentPagination');
        if (!date) {
            divs.forEach((div) => {
                div.style.display = 'block';
                padition.style.display = 'block';
            });
        } else {
            let formattedDate = ""
            if (date) {
                if (date.month < 10) {
                    if (date.day < 10) {
                        formattedDate = `0${date.day}/0${date.month}/${date.year}`;
                    } else {
                        formattedDate = `${date.day}/0${date.month}/${date.year}`;
                    }
                } else {
                    if (date.day < 10) {
                        formattedDate = `0${date.day}/${date.month}/${date.year}`;
                    } else {
                        formattedDate = `${date.day}/${date.month}/${date.year}`;
                    }
                }
            }

            divs.forEach((div) => {
                const divDate = div.getAttribute('data-date');
                if (divDate) {
                    const [year, month, day] = divDate.split('-');
                    const divFormattedDate = `${day}/${month}/${year}`;
                    console.log(formattedDate);
                    console.log(divFormattedDate);

                    div.style.display = divFormattedDate === formattedDate ? 'block' : 'none';
                    padition.style.display = divFormattedDate === formattedDate ? 'block' : 'none';
                }
            });
        }
    };

    // Fonction pour filtrer les éléments par titre
    const filterDivsByTitle = (title) => {
        const divs = document.querySelectorAll('.elementListesMangas');
        const padition = document.querySelector('.contentPagination');
        const searchTitleLower = title.toLowerCase();
        divs.forEach((div) => {
            const divTitle = div.getAttribute('data-titre');
            if (divTitle) {
                const divTitleLower = divTitle.toLowerCase();
                div.style.display = divTitleLower.includes(searchTitleLower) ? 'block' : 'none';
                padition.style.display = divTitleLower.includes(searchTitleLower) ? 'block' : 'none';
            }
        });
    };

    useEffect(() => {
        filterDivsByDate(selectedDate);
    }, [selectedDate]);

    useEffect(() => {
        filterDivsByTitle(searchTitle);
    }, [searchTitle]);

    const checkbox = tv({
        slots: {
            base: "border-default hover:bg-default-200",
            content: "text-default-500"
        },
        variants: {
            isSelected: {
                true: {
                    base: "border-warning bg-warning-500 hover:bg-warning-500 hover:border-warning-500",
                    content: "text-warning-foreground pl-1"
                }
            },
            isFocusVisible: {
                true: {
                    base: "outline-none ring-2 ring-focus ring-offset-2 ring-offset-background",
                }
            }
        }
    })

    const {
        children,
        isSelected,
        isFocusVisible,
        getBaseProps,
        getLabelProps,
        getInputProps,
    } = useCheckbox({
        defaultSelected: false,
    })

    const styles = checkbox({ isSelected, isFocusVisible })

    const [currentPage, setCurrentPage] = useState(1);
    const mangasPerPage = 12;

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

    if (document.getElementById('page')) {
        const pageElement = document.getElementById('page');
        if (pageElement) {
            // Debug log to verify state change
            console.log("Current Page:", currentPage);
            pageElement.innerText = `Page ${currentPage}`;
        }
    }

    return (
        <div className='mx-auto' style={{ maxWidth: '79rem', }}>
            <div className='flex flex-row space-x-5'>
                <div className='w-3 h-9 bg-blue-700'></div>
                <h2 className='text-2xl font-bold mb-5 elmentborder'>Liste des Mangas</h2>
            </div>
            <div>
                <div className='flex' style={{ gap: '4rem', }}>
                    <div style={{ width: '19rem', height: '32rem', borderRadius: '15px', padding: '1rem', boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px', }}>
                        <div className='mb-4'>
                            <div className='font-semibold'>Filtre : </div>
                        </div>
                        <div className='mb-4'>
                            <div className='font-semibold'>Titre : </div>
                            <div>
                                <div className="w-full flex flex-col gap-4">
                                    {variants.map((variant) => (
                                        <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                            <Input type="text" variant={variant} label="Recherche" value={searchTitle} onChange={(e) => setSearchTitle(e.target.value.toLowerCase())} placeholder="Saisir le titre d'un manga" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='mb-4'>
                            <div>Genres : </div>
                            <div className='mt-2 scrollGenre' style={{ height: '13rem', overflowY: 'scroll', overflowX: 'hidden', width: '14rem', }}>
                                <div className="flex flex-col gap-3">
                                    <CheckboxGroup
                                        color="warning"
                                        value={selected}
                                        onValueChange={setSelected}
                                    >
                                        {Array.from(genresSet).map((genre, index) => (
                                            <Checkbox key={index} value={genre} onChange={handleCheckboxChange}>{genre}</Checkbox>
                                        ))}
                                    </CheckboxGroup>
                                </div>
                            </div>
                        </div>
                        <div className='mb-4'>
                            <div>Date : </div>
                            <div>
                                <DatePicker onChange={(date) => setSelectedDate(date)} className="max-w-[284px]" />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col' style={{ width: '80rem', }}>
                        <div className="grid grid-cols-3 gap-3" >
                            {currentMangas.length === 0 ? (
                                <div>Aucun manga disponible pour le moment.</div>
                            ) : (
                                currentMangas.map(manga => {
                                    const mangaCommentListe = commentaires.find(comment => comment.manga === manga.id);
                                    const maxElementsListeMangas = 5;
                                    const nombreListeMangas = mangaCommentListe ? mangaCommentListe.notecomment : 0;
                                    // Générer les éléments en fonction de maxElementsListeMangas
                                    const elementsListeMangas = [];
                                    for (let i = 0; i < maxElementsListeMangas; i++) {
                                        if (i < nombreListeMangas) {
                                            elementsListeMangas.push(<div key={i} className="normal-element"><BsStarFill className='text-yellow-500 w-4 h-4' /></div>);
                                        } else {
                                            elementsListeMangas.push(<div key={i} className="extra-element"><PiStarLight className='w-4 h-4' /></div>);
                                        }
                                    }
                                    const genres = manga.genre_manga
                                        .toLowerCase() // Mettre en minuscules
                                        .replace(/(?:d'|l'|j'|t')/g, '') // Supprimer d', l', j', t'
                                        .replace(/\s+/g, '') // Remplacer les espaces par des tirets
                                    return (
                                        <Card key={manga.id}
                                            data-genre={genres}
                                            data-date={manga.publication_date}
                                            data-titre={manga.title}
                                            className="py-4 elementListesMangas">
                                            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                                <div className='flex flex-row space-x-2 items-center'>
                                                    <div><BsEyeFill /></div>
                                                    <div className="text-tiny uppercase font-bold">{manga.vue_manga}</div>
                                                </div>
                                                <div className="flex space-x-3 rounded-lg px-2 py-1 text-tiny pl-0" color="default">
                                                    {elementsListeMangas}
                                                </div>
                                                {manga.title.length > 18 ? (
                                                    <h4 className="font-bold text-large">{manga.title.slice(0, 20)}...</h4>
                                                ) : (
                                                    <h4 className="font-bold text-large">{manga.title}</h4>
                                                )}
                                            </CardHeader>
                                            <CardBody className="overflow-visible py-2">
                                                <Image
                                                    alt="Card background"
                                                    className="object-cover rounded-xl"
                                                    src={`http://127.0.0.1:8000${manga.cover_image}`}
                                                    width={2000}
                                                    height={2000}
                                                />
                                            </CardBody>
                                        </Card>
                                    );
                                })
                            )}
                        </div>
                        <div className="flex contentPagination flex-row space-x-5 justify-end mx-auto pagination mt-5 items-center font-medium" style={{ maxWidth: '77rem' }}>
                            <Button color={currentPage === 1 ? 'default' : 'warning'} onClick={handlePrevPage} disabled={currentPage === 1}>
                                <BsChevronDoubleLeft />
                            </Button>
                            <span id='page'></span>
                            <Button color={currentPage === Math.ceil(mangas.length / mangasPerPage) ? 'default' : 'warning'} onClick={handleNextPage}
                                disabled={currentPage === Math.ceil(mangas.length / mangasPerPage)}>
                                <BsChevronDoubleRight />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
