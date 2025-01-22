import Image from "next/image"

const ReferralProgram = () => {
    return (
        <article className="mb-20 px-5 sm:px-10 lg:px-20 max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl mt-16 mb-5 oswald text-center">Did you know about our referral program?</h2>
            <div className="flex flex-wrap justify-center items-center m-5">
                <p className="text-xl max-w-md text-center sm:text-left oswald mb-10 font-light">
                    For every 3 new customers that you bring, 
                    you will receive up to <span className="font-bold">$200</span> worth of Product of your choice! 
                    It’s our way of saying thank you for spreading the word!
                </p>
                <Image
                    src="/referral-program.png"
                    alt="Refer and Earn"
                    width={650}
                    height={200}
                    className="rounded-3xl shadow-lg"
                />
            </div>
        </article>
    )
}

export default ReferralProgram