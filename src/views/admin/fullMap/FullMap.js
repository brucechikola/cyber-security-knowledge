import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { IMG_PATH } from 'constants';
import { BsArrowsFullscreen } from 'react-icons/bs'
import { useState } from 'react';
import { RiFullscreenExitLine } from 'react-icons/ri';
import { Unique } from 'functions/common';
import { MdOutlineLocationOn } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { GiCrimeSceneTape, GiChalkOutlineMurder, GiRun, GiPumpkinMask, GiPistolGun, GiDrippingKnife } from 'react-icons/gi'
export function FullMap({ data, onFullScreen }) {
    const icons = {
        GiCrimeSceneTape: <GiCrimeSceneTape size={15} className='text-indigo-800 mr-1' />,
        GiChalkOutlineMurder: <GiChalkOutlineMurder size={15} className='text-indigo-800 mr-1' />,
        GiRun: <GiRun size={15} className='text-indigo-800 mr-1' />,
        GiPumpkinMask: <GiPumpkinMask size={15} className='text-indigo-800 mr-1' />,
        GiPistolGun: <GiPistolGun size={15} className='text-indigo-800 mr-1' />,
        GiDrippingKnife: <GiDrippingKnife size={15} className='text-indigo-800 mr-1' />
    }
    const [fullScreen, setFullScreen] = useState(false)
    const dangerMark = new Icon({
        iconUrl: `${IMG_PATH}mark.png`,
        iconSize: [30, 30]
    })
    const zeroCrimesMark = new Icon({
        iconUrl: `${IMG_PATH}mark2.png`,
        iconSize: [30, 30]
    })
    const { filterDate } = useSelector(state => state.data)
    const position = data?.length > 0 ? [data[0].latitude, data[0].longitude] : [-15.424816976559702, 28.283030439056425]
    const toggleFullScreen = () => {
        setFullScreen(!fullScreen)
        onFullScreen(fullScreen)
    }

    return (
        <div className='w-full h-full bg-white shadow-dark rounded-md relative p-1 bg-slate-100 col-span-2 '>
            <button
                onClick={() => toggleFullScreen()}
                className='w-[170px] h-[30px] hover:bg-indigo-800 text-white font-bold transition duration-500 bg-indigo-900 rounded-md absolute right-[20px] top-[20px] z-[20000] text-[13px] shadow-darker flex items-center justify-center'
            >
                {
                    fullScreen && <>
                        <BsArrowsFullscreen className='mr-2' />
                        View Full Map
                    </>
                }
                {
                    !fullScreen && <>
                        <RiFullscreenExitLine className='mr-2 text-[17px]' />
                        Exit Full Screen
                    </>
                }
            </button>
            <div className='map w-full h-full relative'>
                <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {
                        data?.length > 0 && data.map(l => <Marker key={Unique()} position={[l.latitude, l.longitude]} icon={l.criminal_activities.length > 0 ? dangerMark : zeroCrimesMark} >
                            <Popup>
                                <h4 className='font-semibold flex items-center justify-start'><MdOutlineLocationOn className='mr-1 text-[20px] text-indigo-700' /> {l.location}</h4>
                                <div className='w-[97%] my-3 ml-4 flex items-center justify-between'>
                                    <span className='mr-10 font-semibold'>Total Crimes</span>
                                    <small className='bg-indigo-700 p-3 font-semibold rounded-full w-[20px] h-[20px] flex items-center justify-center text-white'>{l.criminal_activities.length}</small>
                                </div>
                                {
                                    l.criminal_activities.length > 0 && l.criminal_activities.map(ca => (
                                        <div key={Unique()} className='w-[97%] my-2 ml-4 flex-col'>
                                            <span className='mr-5 font- flex items-center justify-start'>{icons[ca.icon]}{ca.description}</span>
                                            <small className='text-indigo-700 ml-5'>{ca.type} | {ca.date} | {ca.time}</small>
                                        </div>
                                    ))
                                }
                                <div className="my-3 w-[97%]  ml-4  flex items-center justify-between">
                                    <small className='my-3'>{l.description}</small>
                                </div>
                                <small className="mt-2 text-red w-full flex items-end text-red-600">{`${filterDate}`.split('GMT')[0]}</small>
                            </Popup>
                        </Marker>
                        )
                    }
                </MapContainer>
            </div>
        </div >
    )
}