import Ballerina from '../assets/Ballerina.png';
import F1 from '../assets/F1.png';
import Kayara from '../assets/kayara.png';
import Thunderbolts from '../assets/Thunderbolts.png';
import Jurassic from '../assets/Jurassic world rebirth.png';
import Lilo from '../assets/Lilo and Stitch.png';
import Bring from '../assets/Bring Her Back.png';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import { useState, useEffect } from 'react';


function Caro() {
  const slides = [
    { title: 'Ballerina', image: Ballerina, rank: 1 },
    { title: 'F1', image: F1, rank: 2 },
    { title: 'Kayara', image: Kayara, rank: 3 },
    { title: 'Thunderbolts', image: Thunderbolts, rank: 4 },
    { title: 'Jurassic world: Rebirth', image: Jurassic, rank: 5 },
    { title: 'Lilo and Stitch', image: Lilo, rank: 6 },
    { title: 'Bring Her Back', image: Bring, rank: 7 },
    { title: 'F1', image: F1, rank: 8 },
    { title: 'Thunderbolts', image: Thunderbolts, rank: 9 },
    { title: 'Jurassic world: Rebirth', image: Jurassic, rank: 10 },
  ];
  const [currentItem, setCurrentItem] = useState(0)
  const [itemsToShow, setItemsToShow] = useState(5)

  const nextSlide = () => {
    setCurrentItem((prev) => Math.min(prev + 1, slides.length - itemsToShow))
  }

  const prevSlide = () => {
    setCurrentItem((prev) => Math.max(prev - 1, 0 ))
  }

  const isPrevDisabled = currentItem === 0
  const isNextDisabled = currentItem >= slides.length - itemsToShow

  const visibleSlides = slides.slice(currentItem, slides.length + itemsToShow)

  useEffect(() => {
    const updateItemsToShow = () => {
      if (window.innerWidth < 640) {
        setItemsToShow(2)
      } else if (window.innerWidth > 768) {
        setItemsToShow(3)
      } else if (window.innerWidth > 1024) {
        setItemsToShow(4)
      } else {
        setItemsToShow(5)
      }
    }
    updateItemsToShow()
    window.addEventListener('resize', updateItemsToShow)
    return () => window.removeEventListener('resize', updateItemsToShow)

  }, [])

  // https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg
  
  return (
    <div className="relative flex items-center justify-center px-2">
      <button
        className="absolute bg-slate-500 rounded-full p-2 sm:p-3 text-white left-0 sm:left-2 z-10 hover:bg-slate-600 transition-colors"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <MdArrowBack className="text-lg sm:text-xl" />
      </button>

      <div className="flex items-center gap-2 sm:gap-3 overflow-hidden mx-8 sm:mx-12 lg:mx-16">
        {visibleSlides.map((movie, i) => (
          <div>
            <img src={`${movie.poster_path}`} alt="" />
          </div>
        ))}
      </div>

      <button
        className="absolute bg-slate-500 rounded-full p-2 sm:p-3 text-white right-0 sm:right-2 z-10 hover:bg-slate-600 transition-colors"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <MdArrowForward className="text-lg sm:text-xl" />
      </button>
    </div>
  )
}

export default Caro
