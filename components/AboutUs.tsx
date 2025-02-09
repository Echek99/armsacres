import Image from "next/image";

const AboutUs = () => {
    return (
        <div className="mb-20 px-5 sm:px-10 lg:px-20 max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl mt-16 titles text-center uppercase">About us</h2>
            <p className="italic mb-5 text-lg text-center oswald">The #1 Weed Delivery Service in NYC & NJ</p>
            <div className="flex flex-wrap justify-center items-center m-5 oswald">
                <p className="text-xl max-w-md mb-5 font-light text-center sm:text-left">
                    At <strong>Armsacres</strong>, we specialize in providing top-tier 
                    <strong> weed delivery</strong> services across <strong>New York City and New Jersey</strong>. <br />
                    With over 15 years of experience, we are your trusted source for premium 
                    <strong> cannabis products</strong>. Our collection features a wide selection of high-quality 
                    <strong>strains</strong>, ensuring you get the perfect choice for any occasion. <br />
                    Every product is carefully selected and tested for <strong>potency and purity</strong>, 
                    guaranteeing the best experience possible. Whether you're in <strong>Manhattan, Brooklyn, Queens, 
                    or anywhere in NJ</strong>, enjoy the ease and convenience of having <strong>exceptional weed</strong> 
                    delivered straight to your door. <br />
                    <strong>Armsacres</strong> is where <strong>quality and convenience</strong> meet—your go-to 
                    destination for the best <strong>weed delivery in NYC & NJ</strong>.                
                </p>
                <Image
                    src="/bags-armsacres.png"
                    alt="Armsacres Weed Delivery NYC & NJ - Premium Cannabis Products"
                    width={600}
                    height={200}
                    className="rounded-lg shadow-lg my-5"
                />
            </div>
        </div>
    );
};

export default AboutUs;
