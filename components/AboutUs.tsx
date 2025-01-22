import Image from "next/image"

const AboutUs = () => {
    return (
        <div className="mb-20 px-5 sm:px-10 lg:px-20 max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl mt-16 titles text-center uppercase">About us</h2>
            <p className="italic mb-5 text-lg text-center oswald">The #1 Weed Delivery Service in NY & NJ</p>
            <div className="flex flex-wrap justify-center items-center m-5 oswald">
                <p className="text-xl max-w-md mb-5 font-light text-center sm:text-left">
                    At Armsacres, we specialize in providing top-tier weed delivery services across
                    New York and New Jersey. <br />
                    With over 15 years of experience,
                    we are your trusted source for premium cannabis products. <br />
                    Every item in our collection is carefully selected and tested for
                    potency and purity, ensuring the highest quality.
                    Whether you`&apos;`re in the heart of New York or New Jersey,
                    experience the convenience of having exceptional
                    weed delivered right to your door. <br />
                    Armsacres is where quality and convenience meet.                </p>
                <Image
                    src="/bags-armsacres.png"
                    alt="Refer and Earn"
                    width={600}
                    height={200}
                    className="rounded-lg shadow-lg my-5"
                />
            </div>
        </div>
    )
}

export default AboutUs


