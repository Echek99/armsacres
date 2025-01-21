const Places = () => {
    const places = [
        'Manhattan',
        'Queens',
        'Bronx',
        'Brooklyn',
        'Jersey City',
        'Hoboken',
        'Long Island',
        'Newark',
        'Paterson',
        'Elizabeth',
        'Trenton',
        'Atlantic City'
    ];

    return (
        <div className="container mx-auto p-5 mb-10">
            <h2 className="text-3xl font-bold mb-8 text-center oswald uppercase">We Deliver To</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {places.map((place, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-3 text-center">
                        <p className="text-lg oswald font-thin">{place}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Places;