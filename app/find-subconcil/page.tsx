'use client';

import { useState, useCallback, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import WhoWeAreHero from '@/components/whoWeAreComponents/WhoWeAreHero';
import { client } from '@/sanity/lib/client';
import { subCouncilsQuery } from '@/sanity/lib/queries';

interface SubCouncil {
    id: string;
    _id: string;
    name: string;
    city: string;
    state: string;
    area: string;
    latitude?: number;
    longitude?: number;
    address: string;
    phone?: string;
}

export default function FindSubCouncil() {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    });

    const [searchState, setSearchState] = useState('');
    const [searchCity, setSearchCity] = useState('');
    const [searchArea, setSearchArea] = useState('');
    const [searchName, setSearchName] = useState('');
    const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
    const [subCouncils, setSubCouncils] = useState<SubCouncil[]>([]);
    const [filteredCouncils, setFilteredCouncils] = useState<SubCouncil[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubCouncils = async () => {
            try {
                const data = await client.fetch<SubCouncil[]>(subCouncilsQuery);
                const councilsWithIds = data.map(council => ({
                    ...council,
                    id: council._id,
                }));
                setSubCouncils(councilsWithIds);
                setFilteredCouncils(councilsWithIds);
            } catch (error) {
                console.error('Error fetching sub-councils:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSubCouncils();
    }, []);

    const handleSearch = useCallback(() => {
        const filtered = subCouncils.filter((council) => {
            const matchState = !searchState || council.state.toLowerCase().includes(searchState.toLowerCase());
            const matchCity = !searchCity || council.city.toLowerCase().includes(searchCity.toLowerCase());
            const matchArea = !searchArea || council.area.toLowerCase().includes(searchArea.toLowerCase());
            const matchName = !searchName || council.name.toLowerCase().includes(searchName.toLowerCase());

            return matchState && matchCity && matchArea && matchName;
        });

        setFilteredCouncils(filtered);
    }, [searchState, searchCity, searchArea, searchName, subCouncils]);

    if (!isLoaded || loading) {
        return <div className="w-full h-screen flex items-center justify-center bg-cream">Loading...</div>;
    }

    const defaultCenter = subCouncils.length > 0 && subCouncils[0].latitude && subCouncils[0].longitude
        ? { lat: subCouncils[0].latitude, lng: subCouncils[0].longitude }
        : { lat: 40.7128, lng: -74.006 };

    return (
        <div className="bg-cream">
            <WhoWeAreHero
                title="Find Our Sub-Council"
                description="Locate a Knights of St. Mulumba sub-council near you. Connect with a community dedicated to faith, service, and brotherhood."
            />

            {/* Search Section */}
            <section className="max-w-6xl mx-auto px-4 py-12">
                <h2 className="font-serif text-5xl text-foreground mb-6 text-center">
                    Search for a Sub-Council
                </h2>

                <div className="bg-white p-8 rounded-lg shadow-sm mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-forest mb-2">
                                State
                            </label>
                            <input
                                type="text"
                                placeholder="State or City"
                                value={searchState}
                                onChange={(e) => setSearchState(e.target.value)}
                                className="w-full px-4 py-2 border border-border rounded focus:outline-none focus:border-forest"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-forest mb-2">
                                City
                            </label>
                            <input
                                type="text"
                                placeholder="Search by city"
                                value={searchCity}
                                onChange={(e) => setSearchCity(e.target.value)}
                                className="w-full px-4 py-2 border border-border rounded focus:outline-none focus:border-forest"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-forest mb-2">
                                Area
                            </label>
                            <input
                                type="text"
                                placeholder="Search by area"
                                value={searchArea}
                                onChange={(e) => setSearchArea(e.target.value)}
                                className="w-full px-4 py-2 border border-border rounded focus:outline-none focus:border-forest"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-forest mb-2">
                                Sub-Council Name
                            </label>
                            <input
                                type="text"
                                placeholder="Search by name"
                                value={searchName}
                                onChange={(e) => setSearchName(e.target.value)}
                                className="w-full px-4 py-2 border border-border rounded focus:outline-none focus:border-forest"
                            />
                        </div>
                    </div>
                    <div className="w-full mt-8 flex flex-col sm:flex-row gap-4 justify-between">
                        <button
                            onClick={handleSearch}
                            className="w-[300px]  bg-white text-forest border border-forest  py-2 px-6 rounded hover:bg-opacity-90 transition-all"
                        >
                            Use Location
                        </button>
                        <button
                            onClick={handleSearch}
                            className=" w-[300px]  bg-forest text-white  py-2 px-6 rounded hover:bg-opacity-90 transition-all"
                        >
                            Search Sub-Councils
                        </button>

                    </div>
                </div>
            </section>

            {/* Map and Results Section */}
            <section className="max-w-6xl mx-auto px-4 pb-12 mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Map */}
                    <div className="lg:col-span-2 bg-white rounded-lg shadow-sm overflow-hidden">
                        <GoogleMap
                            mapContainerStyle={{
                                width: '100%',
                                height: '100%',
                                minHeight: '500px',
                            }}
                            center={defaultCenter}
                            zoom={10}
                        >
                            {filteredCouncils.filter(c => c.latitude && c.longitude).map((council) => (
                                <Marker
                                    key={council.id}
                                    position={{ lat: council.latitude!, lng: council.longitude! }}
                                    onClick={() => setSelectedMarker(council.id)}
                                    icon={{
                                        path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z',
                                        fillColor: '#1E4D3A',
                                        fillOpacity: 1,
                                        strokeColor: '#ffffff',
                                        strokeWeight: 2,
                                        scale: 2,
                                    }}
                                />
                            ))}

                            {selectedMarker && (
                                <InfoWindow
                                    position={{
                                        lat:
                                            filteredCouncils.find((c) => c.id === selectedMarker)?.latitude || defaultCenter.lat,
                                        lng:
                                            filteredCouncils.find((c) => c.id === selectedMarker)?.longitude || defaultCenter.lng,
                                    }}
                                    onCloseClick={() => setSelectedMarker(null)}
                                >
                                    <div className="p-2 max-w-xs">
                                        {filteredCouncils.find((c) => c.id === selectedMarker) && (
                                            <>
                                                <h3 className="font-bold text-forest">
                                                    {filteredCouncils.find((c) => c.id === selectedMarker)?.name}
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    {filteredCouncils.find((c) => c.id === selectedMarker)?.address}
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </InfoWindow>
                            )}
                        </GoogleMap>
                    </div>

                    {/* Results Sidebar */}
                    <div className="lg:col-span-1 bg-white rounded-lg shadow-sm p-6 max-h-96 overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-forest">
                                {filteredCouncils.length} Result{filteredCouncils.length !== 1 ? 's' : ''}
                            </h3>
                            <button
                                onClick={() => {
                                    setSearchState('');
                                    setSearchCity('');
                                    setSearchArea('');
                                    setSearchName('');
                                    setFilteredCouncils(subCouncils);
                                }}
                                className="text-sm text-forest hover:underline"
                            >
                                Clear Filters
                            </button>
                        </div>

                        {filteredCouncils.length === 0 ? (
                            <p className="text-gray-600 text-center py-4">No sub-councils found. Try adjusting your search.</p>
                        ) : (
                            <div className="space-y-4">
                                {filteredCouncils.map((council) => (
                                    <div
                                        key={council.id}
                                        onClick={() => setSelectedMarker(council.id)}
                                        className={`p-4 border rounded cursor-pointer transition-all ${selectedMarker === council.id
                                            ? 'border-forest bg-muted'
                                            : 'border-border hover:border-forest'
                                            }`}
                                    >
                                        <h4 className="font-semibold text-forest mb-1">{council.name}</h4>
                                        <p className="text-sm text-gray-600 mb-1">{council.address}</p>
                                        <p className="text-sm text-gray-500">
                                            {council.city}, {council.state} {council.area}
                                        </p>
                                        {council.phone && (
                                            <p className="text-sm text-forest font-medium mt-2">{council.phone}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
