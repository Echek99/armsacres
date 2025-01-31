import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import type { SanityDocument } from "next-sanity"

interface FeaturedCardProps {
    product: SanityDocument;
    imgSize?: number;
}

const FeaturedCard: React.FC<FeaturedCardProps> = ({ product, imgSize }) => {
    let stockStatus = null;

    // Only calculate status for specific categories
    if (product.category.title === 'Ounces' || product.category.title === "Eighths") {
        const createdAt = new Date(product._createdAt);
        const updatedAt = product._updatedAt ? new Date(product._updatedAt) : null;
        const productDate = updatedAt && updatedAt > createdAt ? updatedAt : createdAt;
        const now = new Date();
        const diffDays = (now.getTime() - productDate.getTime()) / (1000 * 3600 * 24);


        if (diffDays <= 7) {
            stockStatus = <p className="uppercase text-base absolute top-3 right-3 bg-[#90d200] p-1 rounded-lg">In Stock</p>;
        } else if (diffDays > 7 && diffDays < 14) {
            stockStatus = <p className="uppercase text-base absolute top-5 right-5 bg-[#f8e00d] p-1 rounded-lg">Low Stock</p>;
        } else {
            stockStatus = <p className="uppercase text-base absolute top-3 right-3 bg-[#FF7E7E] p-1 rounded-lg text-white">Sold Out</p>;
        }
    }

    return (
        <div className="p-1 relative w-full h-full">
            <Card className="w-full h-full">
                <CardContent className="text-left flex aspect-square justify-center p-2 flex-col oswald z-10">
                    <Link href={`/${product.category.slug.current}/${product.slug.current}`} className="font-bold">
                        <Image
                            src={product.imageUrl}
                            width={imgSize}
                            height={imgSize}
                            alt={`${product.title} Strain`}
                            className="mx-auto"
                        />
                        {product.title} 
                    </Link>
                    {product.category.categoryDeal && (
                        <p className="uppercase text-base break-normal lg:max-w-[75%] md:max-w-[80%] max-w-[85%]">
                            {product.category.categoryDeal}
                        </p>
                    )}
                    {product.additionalInfo?.productDeal && (
                        <p className="uppercase text-base lg:text-lg">
                            X{product.additionalInfo.productDeal}
                        </p>
                    )}
                    {stockStatus}
                    {product.additionalInfo?.strain && (
                        <p className='italic text-black underline p-1.5 w-min rounded font-bold absolute right-5 bottom-5 z-0 oswald'>
                            {product.additionalInfo.strain}
                        </p>
                    )}
                    <p className="text-md text-gray-500">{product.category.title}</p>
                    <p className="text-lg price">${product.price}</p>
                </CardContent>
            </Card>
        </div>
    )
}

export default FeaturedCard