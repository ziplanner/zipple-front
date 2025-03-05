"use client";

import React, { useEffect } from "react";
import MainCarousel from "./content/mainCarousel";
import CategoryList from "./content/category";
import PopularService from "./content/popularService";
import Info from "./content/info";
import MainSection from "./content/mainSection";

const HomePage = () => {
  return (
    <>
      <MainCarousel />
      <MainSection />
      <CategoryList />
      <PopularService />
      <Info />
    </>
  );
};

export default HomePage;
