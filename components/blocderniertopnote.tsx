import React, { useRef, useState, useEffect } from 'react';
import { Image } from '@nextui-org/react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import { PiPawPrintFill } from "react-icons/pi";
import { SlArrowRight } from "react-icons/sl";
import { Select, SelectItem, Button, DatePicker, Chip } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { SlMagnifier } from "react-icons/sl";
import { IoCalendarClear } from "react-icons/io5";
import { PiStarLight } from "react-icons/pi";
import { IoIosBookmark, IoIosEye, IoIosPlayCircle } from "react-icons/io";
import { BsArrowCounterclockwise, BsStarFill } from "react-icons/bs";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import '../app/style/swiperstylenewandtop.css';

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';


export const Blocderniertopnote = ({ mangas, commentaires }) => {
    const img = document.querySelectorAll('.contentimgtop10');
    const [searchTitle, setSearchTitle] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["mangas"]));
    const [selectedCategorie, setSelectedCategorie] = useState<string[]>([]);

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

    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );


    const [uniqueCategories, setUniqueCategories] = useState([]);

    useEffect(() => {
        const categoriesSet = new Set();
        mangas.forEach(manga => {
            categoriesSet.add(manga.categorie_manga);
        });
        setUniqueCategories([...categoriesSet]);
    }, [mangas]);


    // Fonction pour filtrer les éléments par titre
    const filterDivsByTitle = (title) => {
        const divs = document.querySelectorAll('.elementListesMangas');
        const searchTitleLower = title.toLowerCase();
        divs.forEach((div) => {
            const divTitle = div.getAttribute('data-titre');
            if (divTitle) {
                const divTitleLower = divTitle.toLowerCase();
                div.style.display = divTitleLower.includes(searchTitleLower) ? 'flex' : 'none';
            }
        });
    };

    // Fonction pour filtrer les éléments par date
    const filterDivsByDate = (date) => {
        const divs = document.querySelectorAll('.elementListesMangas');

        if (!date) {
            divs.forEach((div) => {
                div.style.display = 'flex';
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
                    div.style.display = divFormattedDate === formattedDate ? 'flex' : 'none';
                }
            });
        }
    };

    const handleChange = (selected) => {
        const selectedArray = Array.from(selected);
        setSelectedCategorie(selectedArray);
    };

    const allview = () => {
        const divs = document.querySelectorAll('.elementListesMangas');

        if (divs) {
            divs.forEach((div) => {
                div.style.display = 'flex';
            });
        }
    };

    const filterDivsByGenre = (genreList) => {
        const divs = document.querySelectorAll('.elementListesMangas');

        if (genreList.length === 0) {
            divs.forEach((div) => {
                div.style.display = 'flex';
            });
        } else {
            divs.forEach((div) => {
                const divGenre = div.getAttribute('data-genre').toLowerCase();
                if (divGenre) {
                    let Category = genreList[0];
                    const divGenreArray = divGenre.split('-');
                    const shouldShow = divGenreArray.includes(Category);
                    console.log(divGenreArray);
                    console.log(shouldShow);

                    div.style.display = shouldShow ? 'flex' : 'none';
                }
            });
        }
    };

    useEffect(() => {
        filterDivsByTitle(searchTitle);
    }, [searchTitle]);

    useEffect(() => {
        filterDivsByDate(selectedDate);
    }, [selectedDate]);


    useEffect(() => {
        filterDivsByGenre(selectedCategorie);
    }, [selectedCategorie]);


    return (
        <div>
            <div className="flex flex-row justify-between w-full contentglobalderniersortie space-x-5 mb-20">
                <div className='contentone'>
                    <div>
                        <div className='flex justify-between'>
                            <div className='flex flex-row space-x-5'>
                                <div className='w-3 h-9 bg-blue-700'></div>
                                <h2 className='text-2xl font-bold mb-5 elmentborder'>DERNIERS SORTIES</h2>
                            </div>
                            <div>
                                <Button color="primary">
                                    Voir plus
                                </Button>
                            </div>
                        </div>

                        <div className='contentdernierfiltre flex flex-row space-x-4 mb-4'>
                            <div>
                                <div>Titre : </div>
                                <div>
                                    <Input
                                        // label="Search"
                                        isClearable
                                        radius="lg"
                                        classNames={{
                                            label: "text-black/50 dark:text-white/90",
                                            input: [
                                                "bg-transparent",
                                                "text-black/90 dark:text-white/90",
                                                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                                            ],
                                            innerWrapper: "bg-transparent",
                                            inputWrapper: [
                                                "shadow-xl",
                                                "bg-default-200/50",
                                                "dark:bg-default/60",
                                                "backdrop-blur-xl",
                                                "backdrop-saturate-200",
                                                "hover:bg-default-200/70",
                                                "dark:hover:bg-default/70",
                                                "group-data-[focus=true]:bg-default-200/50",
                                                "dark:group-data-[focus=true]:bg-default/60",
                                                "!cursor-text",
                                            ],
                                        }}
                                        value={searchTitle} onChange={(e) => setSearchTitle(e.target.value.toLowerCase())}
                                        placeholder="Type to search..."
                                        startContent={
                                            <SlMagnifier className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                                        }
                                    />

                                </div>
                            </div>
                            <div>
                                <div>Catégorie : </div>
                                <div className='flex flex-row space-x-2'>
                                    <div>
                                        <Select
                                            className="max-w-xs"
                                            defaultSelectedKeys={["cat"]}
                                            // label="Favorite Animal"
                                            placeholder="Select an animal"
                                            startContent={<PiPawPrintFill />}
                                            style={{ width: "14rem", }}
                                            onSelectionChange={handleChange}
                                            selectedKeys={new Set(selectedCategorie)}
                                        >
                                            {uniqueCategories.map((category, index) => (
                                                <SelectItem key={category.toLowerCase()} value={category.toLowerCase()}>{category}</SelectItem>
                                            ))}
                                        </Select>
                                    </div>
                                    <div>
                                        <Button isIconOnly color="default-900" onClick={allview} aria-label="Like">
                                            <BsArrowCounterclockwise />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>Date : </div>
                                <div>
                                    <DatePicker className="max-w-[284px]" onChange={(date) => setSelectedDate(date)} />
                                </div>
                            </div>
                        </div>

                        <div className='newsmanga derniersortie relative'>
                            <div className='flex flex-col space-y-5'>
                                {mangas.map(manga => {
                                    if (manga.id < 10) {
                                        const mangaComment = commentaires.find(comment => comment.manga === manga.id);
                                        const maxElements = 5;
                                        const nombre = mangaComment ? mangaComment.notecomment : 0;
                                        const elements = [];

                                        for (let i = 0; i < maxElements; i++) {
                                            if (i < nombre) {
                                                elements.push(<div key={i} className="normal-element"><BsStarFill className='text-yellow-500 w-5 h-5' /></div>);
                                            } else {
                                                elements.push(<div key={i} className="extra-element"><PiStarLight className='w-5 h-5' /></div>);
                                            }
                                        }

                                        return (
                                            <div key={manga.id}
                                                data-genre={manga.categorie_manga}
                                                data-date={manga.publication_date}
                                                data-titre={manga.title} className='flex flex-row elementListesMangas'>
                                                <div className='relative contentImages'>
                                                    <div className='contentimgtop'>
                                                        <Image src={`http://127.0.0.1:8000${manga.cover_image}`} width={2000} height={2000} alt={manga.title} />
                                                    </div>
                                                </div>
                                                <div className='flex flex-col space-y-2 contentcardlistmangas'>
                                                    <div>
                                                        {manga.title.length > 18 ? (
                                                            <span className='text-sm w-full font-medium'>{manga.title.slice(0, 50)}...</span>
                                                        ) : (
                                                            <span className='text-sm w-full font-medium'>{manga.title}</span>
                                                        )}
                                                    </div>
                                                    <div className='flex justify-between'>
                                                        <div>
                                                            {manga.saison_manga >= 1 ? (
                                                                <span className='text-base'>
                                                                    {manga.saison_manga} {manga.saison_manga > 1 ? ('saisons') : ('saison')}
                                                                </span>
                                                            ) : (
                                                                <span className='text-base'>Film</span>
                                                            )}
                                                        </div>
                                                        <div className='flex flex-row items-center space-x-3'>
                                                            <div><IoIosEye /></div>
                                                            {manga.vue_manga != 0 ? <div className='text-sm'>{manga.vue_manga}</div> : <div className='text-sm'>0</div>}
                                                        </div>
                                                    </div>
                                                    <div className='categorytopenote'>
                                                        <div className='flex flex-row space-x-4'>
                                                            {manga.genre_manga.split(' - ').map((genre, idx) => (
                                                                idx < 4 ? <Chip key={idx} id={idx} color="warning" variant="shadow">{genre}</Chip> : null
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className='flex justify-between'>
                                                        <div className='flex flex-row items-center space-x-3'>
                                                            <div><IoCalendarClear /></div>
                                                            <div className='text-sm'>{manga.publication_date}</div>
                                                        </div>
                                                        <div>
                                                            <div className='flex flex-row space-x-1'>
                                                                {elements}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='flex items-center justify-center borderbgtopnote'></div>
                                            </div>
                                        )
                                    }
                                    return null;
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col space-y-10 contenttwo'>
                    <div className='scrollelemnt'>
                        <div className='flex justify-between'>
                            <div className='flex flex-row space-x-5'>
                                <div className='w-3 h-9 bg-blue-700'></div>
                                <h2 className='text-2xl font-bold mb-5'>TOP 10 NOTES</h2>
                            </div>
                            <div>
                                <Button color="primary">
                                    Voir plus
                                </Button>
                            </div>
                        </div>

                        <div className='contentstopnote'>
                            <div className='grid grid-cols-2 gap-2 pr-2 topnote'>
                                {mangas.map(manga => {
                                    if (manga.id < 5) {
                                        const mangaComment = commentaires.find(comment => comment.manga === manga.id);
                                        const maxElements = 5;
                                        const nombre = mangaComment ? mangaComment.notecomment : 0;
                                        const elements = [];

                                        for (let i = 0; i < maxElements; i++) {
                                            if (i < nombre) {
                                                elements.push(<div key={i} className="normal-element"><BsStarFill className='text-yellow-500 w-5 h-5' /></div>);
                                            } else {
                                                elements.push(<div key={i} className="extra-element"><PiStarLight className='w-5 h-5' /></div>);
                                            }
                                        }
                                        return (
                                            <div key={manga.id} className='relative' style={{ height: '19rem', }}>
                                                <div className='relative' style={{ width: '100%' }}>
                                                    <div>
                                                        <Image src={`http://127.0.0.1:8000${manga.cover_image}`} className='rounded-md object-cover' style={{ borderRadius: '10px', width: '100%', height: '19rem', }} width={2000} height={2000} alt={manga.title} />
                                                    </div>
                                                </div>
                                                <div className='absolute text-white contentstop'>
                                                    <div className='' style={{ width: '100%' }}>
                                                        {manga.title.length > 18 ? (
                                                            <span className='text-lg w-full font-medium'>{manga.title.slice(0, 20)}...</span>
                                                        ) : (
                                                            <span className='text-lg w-full font-medium'>{manga.title}</span>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <div className='flex flex-row space-x-1'>
                                                            {elements}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className='flex flex-row space-x-3 note'>
                                                            <div>Note : </div>
                                                            {commentaires.length === 0 ? (
                                                                <div>0</div>
                                                            ) : (
                                                                <div>{nombre}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='absolute bg-black ' style={{ width: '15.9rem', height: '6rem', top: '13rem', zIndex: '10', opacity: '0.6', borderBottomRightRadius: '10px', borderBottomLeftRadius: '10px' }}></div>
                                            </div>
                                        )
                                    }
                                    return null;
                                })}
                            </div>
                        </div>
                    </div>

                    <div className='scrollelemnt'>
                        <div className='flex justify-between'>
                            <div className='flex flex-row space-x-5'>
                                <div className='w-3 h-9 bg-blue-700'></div>
                                <h2 className='text-2xl font-bold mb-5'>TOP 10 VUES</h2>
                            </div>
                            <div>
                                <Button color="primary">
                                    Voir plus
                                </Button>
                            </div>
                        </div>

                        <div className='contentstopnote'>
                            <div className='grid grid-cols-2 gap-2 pr-2 topnote'>
                                {mangas.map(manga => (
                                    manga.id < 5 ?
                                        <div key={manga.id} className='relative' style={{ height: '19rem', }}>
                                            <div className='relative' style={{ width: '100%' }}>
                                                <div>
                                                    <Image src={`http://127.0.0.1:8000${manga.cover_image}`} className='rounded-md object-cover' style={{ borderRadius: '10px', width: '100%', height: '19rem', }} width={2000} height={2000} alt={manga.title} />
                                                </div>
                                            </div>
                                            <div className='absolute text-white contentstop'>
                                                <div className='' style={{ width: '100%' }}>
                                                    {manga.title.length > 18 ? (
                                                        <span className='text-lg w-full font-medium'>{manga.title.slice(0, 20)}...</span>
                                                    ) : (
                                                        <span className='text-lg w-full font-medium'>{manga.title}</span>
                                                    )}
                                                </div>

                                                <div>
                                                    <div className='flex flex-row items-center space-x-3'>
                                                        <div><IoIosEye /></div>
                                                        {manga.vue_manga != 0 ? <div className='text-sm'>{manga.vue_manga}</div> : <div className='text-sm'>0</div>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='absolute bg-black ' style={{ width: '15.9rem', height: '6rem', top: '13rem', zIndex: '10', opacity: '0.6', borderBottomRightRadius: '10px', borderBottomLeftRadius: '10px' }}></div>
                                        </div>
                                        : null
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}