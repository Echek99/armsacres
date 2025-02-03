import React from "react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import FeaturedCard from "./FeaturedCard"
import { client } from "@/sanity/lib/client";
import { EIGHTHS_OUNCES_QUERY } from "@/sanity/lib/queries";
import { type SanityDocument } from "next-sanity";


const options = { next: { revalidate: 1800 } };

const NewStrainsCarousel = async () => {

    const products = await client.fetch<SanityDocument[]>(EIGHTHS_OUNCES_QUERY, {}, options);

    return (
        <Carousel className="mx-10 my-5 relative carousel-container" opts={{loop: true,}}>
            <h3 className="links text-5xl text-center max-w-full mercadillo titles uppercase">New Strains Every Week!</h3>
            <CarouselContent className="max-w-min">
                {products.map((strain) => (
                    <CarouselItem key={strain._id} className="pl-1 basis-2/2 md:basis-2/2 lg:basis-3/3 max-w-[300px] min-h-[100%]">
                        <FeaturedCard product={strain} imgSize={250} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}

export default NewStrainsCarousel