import Image from "next/image"

const ReferralProgram = () => {
    return (
        <article className="mb-20 flex flex-col items-center justify-center px-5 sm:px-10 lg:px-20">
            <h2 className="text-4xl mt-16 mb-5 oswald text-center">Did you know about our referral program?</h2>
            <div className="flex flex-wrap justify-center items-center m-5">
                <p className="text-xl max-w-md text-left oswald mb-10 font-light">
                    For every 3 new customers that you bring, 
                    you will receive up to <span className="font-bold">$200</span> worth of Product of your choice! 
                    It’s our way of saying thank you for spreading the word!
                </p>
                <Image
                    src="https://cdn.discordapp.com/attachments/943731493346369576/1327452724580847616/logo_2.png?ex=67831e30&is=6781ccb0&hm=cbb45c46d7f5ce56add7a1e76e2c8c67976b675b00f76edf9534ae39adc7bb32&"
                    alt="Refer and Earn"
                    width={650}
                    height={200}
                    className="rounded-3xl"
                />
            </div>
        </article>
    )
}

export default ReferralProgram