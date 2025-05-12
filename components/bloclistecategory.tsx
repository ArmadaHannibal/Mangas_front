import React, { useRef, useState, useEffect } from "react";
import { Image } from "@nextui-org/react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import { PiPlayCircle } from "react-icons/pi";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "../app/style/swiperstylistecategory.css";

// import required modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { register } from "swiper/element/bundle";

register();


export const Bloclistecategory = ({ mangas }) => {

    const [uniqueCategories, setUniqueCategories] = useState([]);
    const [categoryCounts, setCategoryCounts] = useState({});
    const [backgroundImage, setBackgroundImage] = useState("");
    const [CategorieName, setCategorieName] = useState("");
    const [CategorieCount, setCategorieCount] = useState("");

    useEffect(() => {
        const categoriesMap = new Map();
        const counts = {};

        mangas.forEach(manga => {

            if (!categoriesMap.has(manga.categorie_manga)) {
                let path;
                let Coverpath;
                let Categoryname;
                switch (manga.categorie_manga) {
                    case "Manga":
                        path = "./mangas.jpg";
                        Coverpath = "./mangasCovers.jpg";
                        Categoryname = "Manga";
                        break;
                    case "Manhwa":
                        path = "./Manhwa.jpg";
                        Coverpath = "./ManhwaCovers.jpg";
                        Categoryname = "Manhwa";
                        break;
                    case "Novels":
                        path = "./novels.jpg";
                        Coverpath = "./novelsCovers.jpg";
                        Categoryname = "Novels";
                        break;
                    case "Anime":
                        path = "./anime.jpg";
                        Coverpath = "./animeCover.jpg";
                        Categoryname = "Anime";
                        break;
                    case "Comics":
                        path = "comics.jpg";
                        Coverpath = "./comicsCovers.jpg";
                        Categoryname = "Comics";
                        break;
                    case "Doujinshi":
                        path = "Doujinshi.jpg";
                        Coverpath = "./DoujinshiCovers.jpg";
                        Categoryname = "Doujinshi";
                        break;
                    default:
                        path = ``;
                }
                categoriesMap.set(manga.categorie_manga, {
                    name: manga.categorie_manga,
                    path: path,
                    Coverpath: Coverpath,
                    Categoryname: Categoryname
                });
            }

            if (!counts[manga.categorie_manga]) {
                counts[manga.categorie_manga] = 0;
            }
            counts[manga.categorie_manga]++;
        });
        setUniqueCategories(Array.from(categoriesMap.values()));
        setCategoryCounts(counts);
    }, [mangas]);

    const onSlideChange = (e) => {
        
        let currentswiper = document.querySelector(`.listecategory .swiper-slide #swiper${e.activeIndex} img`);
        if (currentswiper) {
            let src = currentswiper.getAttribute("data-name");
            let namecategorie = currentswiper.getAttribute("data-cover");
            let numbercategorie = currentswiper.getAttribute("data-count");
            setBackgroundImage(`url(${src})`);
            setCategorieCount(`${numbercategorie}`);
            setCategorieName(`${namecategorie}`);
        }
    };

    return (
        <div>
            <div className="relative listecategory mb-5">
                <div className="contentBackgroundImg" style={{ backgroundImage }}></div>
                <div className="absolute bg-black contentBackgroundImgsecond"></div>
                <div className="absolute z-30 slidercontent">
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
                        slidesPerView={1}
                        onSlideChange={onSlideChange}
                        className="mySwiper"
                    >
                        {uniqueCategories.map((category, index) => (
                            <SwiperSlide key={index}>
                                <div id={`swiper${index}`} className="relative border-2 border-white" style={{ borderRadius: "15px", }}>
                                    {category.path && (
                                        <Image src={category.path} data-name={category.Coverpath} data-cover={category.Categoryname} data-count={categoryCounts[category.Categoryname]} className="cursor-pointer" width={2000} height={2000} alt={category.path} />
                                    )}
                                    <div className="absolute bgBlackcontentCategorietitle text-white z-30 top-28 left-2 flex flex-row space-x-2 items-center" style={{ width:"32rem", }}>
                                        <div><PiPlayCircle className="w-8 h-8" /></div>
                                        <div className="text-base">{category.Categoryname}</div>
                                    </div>
                                    <div className="absolute bg-black w-56 h-16 top-24 z-20 opacity-80 bgBlackcontentCategorie"></div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className="absolute flex flex-col space-y-5 font-medium text-white z-10 titlecategorie">
                    <div className="flex flex-row space-x-2">
                        <div>Catégorie : </div>
                        <div>{CategorieName}</div>
                    </div>
                    <div className="flex flex-row space-x-2 items-center">
                        <div>Nombre : </div>
                        <div>{CategorieCount}</div>
                        <div><PiPlayCircle className="w-10 h-10" /></div>
                    </div>
                </div>
                <div className="absolute bg-black w-96 h-32 bgBlackContentTitle"></div>
            </div>
        </div >
    )
}