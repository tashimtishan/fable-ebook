import Banner from "@/components/Banner";
import FeaturedEbooks from "@/components/home/FeaturedEbooks";
import Genres from "@/components/home/Genres";
import TopWriters from "@/components/home/TopWriters";

export default function Homepage() {
  return (
    <div className="flex flex-col flex-1 justify-center dark:bg-black">
      <Banner></Banner>
       <FeaturedEbooks></FeaturedEbooks>
       <TopWriters></TopWriters>
       <Genres></Genres>
    </div>
  );
}
