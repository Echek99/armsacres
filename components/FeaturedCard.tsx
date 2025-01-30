import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import type { SanityDocument } from "next-sanity"

interface FeaturedCardProps {
    product: SanityDocument;
    imgSize?: number;
}

const FeaturedCard: React.FC<FeaturedCardProps> = ({ product, imgSize }) => {
    return (
        <div className="p-1 relative">
            <Card>
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
                    {product.category.categoryDeal ? (
                        <p className="uppercase text-base break-normal lg:max-w-[70%] md:max-w-[80%] max-w-[90%]">
                            {`${product.category.categoryDeal}`}
                        </p>
                    ) : (
                        <></>
                    )}
                    {product.additionalInfo?.productDeal ? (
                        <p className="uppercase text-base lg:text-lg" >
                            {`X${product.additionalInfo?.productDeal}`}
                        </p>
                    ) : (
                        <></>
                    )}
                    {product.additionalInfo?.strain ?
                        <p className={
                            product.additionalInfo?.strain === 'Sativa' ?
                                'bg-yellow-500 text-white p-1.5 w-min rounded font-bold absolute right-5 bottom-5 z-0 oswald'
                                :
                                'bg-purple-500 text-white p-1.5 w-min rounded font-bold absolute right-5 bottom-5 z-0 oswald'
                        }>
                            {product.additionalInfo.strain}
                        </p>
                        :
                        <></>
                    }
                    <p className="text-md text-gray-500">{product.category.title}</p>
                    <p className="text-lg price">${product.price}</p>
                </CardContent>
            </Card>
        </div>
    )
}

export default FeaturedCard