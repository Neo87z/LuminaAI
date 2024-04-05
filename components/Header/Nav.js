import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import DashboardItem from "../../data/header.json";

import menuImg from "../../public/images/menu-img/menu-img-2.png";
import { useAppContext } from "@/context/Context";

const Nav = () => {
  const router = useRouter();
  const { showItem, setShowItem } = useAppContext();

  const isActive = (href) => router.pathname === href;

  return (
    <>
     
    </>
  );
};

export default Nav;
