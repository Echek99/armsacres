const NewProductSection = () => {
    return (
        <section className="py-12 px-6 text-center">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-4 oswald uppercase">
                    Coming Soon: <br />
                    <span className="italic font-normal">Fryd 2G Donut</span>
                </h2>
                <p className="text-xl max-w-md text-center oswald mb-10 font-light">
                    Get ready for the next level of vaping. The <span className="font-semibold">Fryd 2G Donut</span> is on its way! Stay tuned for the drop.
                </p>
                <div className="flex justify-center">
                    <img
                        src="/fryddonutsbanner.png"
                        alt="Fryd 2G Donut Coming Soon"
                        className="w-full max-w-md rounded-lg shadow-lg"
                    />
                </div>
            </div>
        </section>
    );
};

export default NewProductSection;
