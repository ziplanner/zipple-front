"use client";

import CategoryList from "./(home)/home/content/category";
import MainCarousel from "./(home)/home/content/mainCarousel";
import MainSection from "./(home)/home/content/mainSection";
import PopularService from "./(home)/home/content/popularService";
import Info from "./(home)/home/content/info";

export default function Home() {
  return (
    <>
      <MainCarousel />
      <MainSection />
      <CategoryList />
      <PopularService />
      <Info />
    </>
  );
}
