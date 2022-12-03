import { useState } from "react";
import Slider from "react-slick";
import LinkButton, {  LinkOutsideButton } from "~/components/Buttons/LinkButton";
import PlusIconWhite from "~/components/Icons/PlusIcon";
import { MEDIUM_LINK } from "~/utils/links";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Carousel() {
    const [activeSlide, setActiveSlide] = useState(0);
    let slidz: any;
    const handleClick = (index: number) => {
        setActiveSlide(index);
        slidz.slickGoTo(index);
    }

    

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
       
        arrows: true,
        autoplay: true,
        autoplaySpeed: 2500,
        centerMode: true,
        beforeChange: (current: number, next: number) => { 
            setActiveSlide(next); 
        },
        
    };

    const slides = [
        {
            name: 'project1.png',
            title: 'Speculative trading',
            subtitle: 'Invest in real-word backed assets'
        },
        {
            name: 'project2.png',
            title: 'Greenwashing',
            subtitle: 'Premium, transparent and traceable carbon removal'
        },
        {
            name: 'project3.png',
            title: 'Short-term returns',
            subtitle: 'Earn ongoing high, lasting and transparent yields'
        }

    ];
    
    return (
        <div className="preventOverflow">
            <div id="assets" className="w-11/12 max-w-screen-2xl scroll-mt-12 mx-auto mt-8 lg:mt-12 xl:mt-24">
                
                <Slider ref={slider => (slidz = slider)} {...settings} className="w-10/12  md:mt-8 ">
                    {slides.map((image, index) => (
                        <div key={`image_${index}`} className="px-2  ">
                            <img alt={`Carbonable project ${index}`} onClick={() => handleClick(index)} src={`/assets/images/quest/${image.name}`} className={index === activeSlide ? "rounded-lg brightness-110 cursor-pointer" : "rounded-lg brightness-50 cursor-pointer"} />
                        </div>
                    ))}
                </Slider>
               
                
            </div>
        </div>
    )
}

interface ButtonProps {
    children: React.ReactNode;
    selected: boolean;
    onClick: any;
}

function SliderButton({ children, selected, onClick }: ButtonProps) {
    if (selected) {
        return (
            <>
                <div className="relative w-12 h-12 p-1 bg-carousel-button-border rounded-full z-0 lg:px-3">
                    <div className="absolute z-10 m-[2px] top-0 left-0 font-inter text-beaige bg-[#000000] w-[44px] h-[44px] rounded-full">
                        <div className="bg-carousel-button w-[44px] h-[44px] rounded-full flex items-center justify-center">
                            { children }
                        </div>
                    </div>
                </div>
            </>
        )
    }
    return (
        <div onClick = {() => { onClick(); }} className="font-inter px-3 text-[#272727] cursor-pointer lg:px-6">{ children }</div>
    )
}
