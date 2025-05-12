"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  GithubIcon,
  SearchIcon,
  Logo,
} from "@/components/icons";
import { IoIosPerson } from "react-icons/io";

import { useAuth } from "@/app/contexts/authContext";

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User, AvatarIcon } from "@nextui-org/react";
import { InputFile } from "@/components/ui/input";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";

// import { Label } from "@/components/ui/label"

export const Navbar = () => {
  const { user, logout } = useAuth();
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Vérifie si l'on est bien dans un environnement navigateur
    if (typeof window !== "undefined") {
      const usernameActive = sessionStorage.getItem("username");
      setUsername(usernameActive || ""); // Met à jour le state avec la valeur de sessionStorage, ou une chaîne vide si elle est nulle
    }
  }, []); // Le tableau de dépendances vide signifie que ce code ne s'exécute qu'une fois, au montage du composant

  const [avatarSrc, setAvatarSrc] = useState(null);
  const inputFileRef = useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = React.useState("opaque")

  const handleClick = (action) => () => {
    if (action === "blur") {
      // Ajoutez ici le code pour effectuer l'action "blur"
      setBackdrop(action)
      onOpen();
    }
  };

  const handleAvatarClick = () => {
    inputFileRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  const siteUrl = {
    accueil: {
      title: "Accueil",
      path: "/"
    },
    apropos: {
      title: "A propos",
      path: "/about"
    },
    mangas: {
      title: "Mangas",
      path: "/mangas"
    },
    actualites: {
      title: "Actualités",
      path: "/actualite"
    },
    contact: {
      title: "Contact",
      path: "/contact"
    },
  }

  console.log("username")
  console.log(username)

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">ACME</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {/* {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))} */}
          {Object.entries(siteUrl).map(([key, item]) => (
            <NavbarItem key={key}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item.path}
              >
                {item.title}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                  <ModalBody>
                    <div className="flex items-center justify-center">
                      <Avatar
                        {...(avatarSrc ? { src: avatarSrc } : { icon: <AvatarIcon /> })}
                        className="w-32 h-32 cursor-pointer"
                        classNames={{
                          base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
                          icon: "text-black/80",
                        }}
                        onClick={handleAvatarClick}
                      />
                    </div>
                    <InputFile
                      id="picture"
                      type="file"
                      ref={inputFileRef}
                      style={{ display: "none" }} // Masquer l'élément input
                      onChange={handleFileChange}
                      accept="image/*"
                    />

                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={onClose}>
                      Action
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
          {username == "" ? (
            <Button
              // isExternal
              as={Link}
              className="text-sm font-normal text-default-600 bg-default-100"
              href={"/connexion"}
              startContent={<IoIosPerson className="text-blue-600" />}
              variant="flat"
            >
              connexion
            </Button>
          ) : (
            <Dropdown placement="bottom-start">
              <DropdownTrigger>
                <User
                  as="button"
                  avatarProps={{
                    isBordered: true,
                    src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                  }}
                  className="transition-transform"
                  description={`@${username}`}  // Utilisation correcte des accolades et template string
                  name={username}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-bold">Connecté en tant que</p>
                  <p className="font-bold">{`@${username}`}</p>
                </DropdownItem>
                <DropdownItem key="settings">
                  My Settings
                </DropdownItem>
                <DropdownItem key="modif_avatar" onClick={handleClick("blur")}>Modifier l'avatar</DropdownItem>
                <DropdownItem key="analytics">
                  Analytics
                </DropdownItem>
                <DropdownItem key="system">System</DropdownItem>
                <DropdownItem key="configurations">Configurations</DropdownItem>
                <DropdownItem key="help_and_feedback">
                  Help & Feedback
                </DropdownItem>
                <DropdownItem key="logout" color="danger">
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
