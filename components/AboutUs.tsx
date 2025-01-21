import Image from "next/image"

const AboutUs = () => {
    return (
        <div className="mb-20 px-5 sm:px-10 lg:px-20">
            <h2 className="text-4xl mt-16 titles text-center lg:text-left uppercase">About us</h2>
            <p className="italic mb-5 text-lg text-center lg:text-left oswald">The #1 Weed Delivery Service in NY & NJ</p>
            <div className="flex flex-wrap justify-center items-center m-5 oswald">
                <p className="text-xl max-w-md mb-5 font-light">
                    At Armsacres, we specialize in providing top-tier weed delivery services across
                    New York and New Jersey. <br />
                    With over 15 years of experience,
                    we are your trusted source for premium cannabis products. <br />
                    Every item in our collection is carefully selected and tested for
                    potency and purity, ensuring the highest quality.
                    Whether you're in the heart of New York or New Jersey, experience the convenience of having exceptional
                    weed delivered right to your door. <br />
                    Armsacres is where quality and convenience meet.
                </p>
                <Image
                    src="https://cdn.discordapp.com/attachments/943731493346369576/1327649669236392088/Pink-Red-Love-Map-Instagram-Post-Square-15-e1710206305166-1024x409.png?ex=6783d59b&is=6782841b&hm=3432b1c20ed6e26af882355caa036d9d0b4154c6aed098220d3dd61b0653d559&"
                    alt="Refer and Earn"
                    width={600}
                    height={200}
                    className="my-5"
                />
            </div>
        </div>
    )
}

export default AboutUs