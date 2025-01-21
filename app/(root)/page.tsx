import SocialIcons from "@/components/SocialIcons";
import Categories from "@/components/Categories";
import Qualities from "@/components/Qualities";
import ReferralProgram from "@/components/ReferralProgram";
import NewStrainsCarousel from "@/components/NewStrainsCarousel";
import FeaturedProducts from "@/components/FeaturedProducts";
import AboutUs from "@/components/AboutUs";
import Places from "@/components/Places";

export default function Home() {
  return (
    <>
      <section className="relative flex flex-col items-center header-background">
        <div className="header-background">
        </div>
          <h1 className="uppercase text-center text-6xl font-bold mt-20 titles">
            <span className="">Armsacres</span> <br />#1 Weed Delivery <br /> IN NYC and NJ
          </h1>
        <p className="text-black text-3xl mt-10 mb-0 oswald">Call or Text to Order:</p>
        <a href="tel:13479354383" target="_blank" rel="noopener noreferrer" className="text-black text-3xl my-3 oswald">
          +1 (347) 935-4383
        </a>
        <SocialIcons />
      </section>
      <section className="flex flex-col items-center">
        <Qualities /> 
        <Categories />
        <ReferralProgram />
        <NewStrainsCarousel />
        <AboutUs />
        <FeaturedProducts />
        <Places />
      </section>
    </>
  );
}
