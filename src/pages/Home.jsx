import logo from '../assets/logo.png'
import banner from '../assets/Netflix_banner.png'
import { MdKeyboardArrowRight, MdTv, MdDevices, MdChildCare, MdDownload } from "react-icons/md"
import { logout } from '../Firebase';
import Card from '../components/Card';
import Carousel from '../components/Carousel';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';


function Home() {
  return (
    <>
      <section className='bg-black min-h-screen w-full'>
        <section className="relative min-h-screen text-white p-4 sm:p-6 lg:p-8 bg-cover bg-center bg-no-repeat text-center" style={{backgroundImage: `url(${banner})`}}>
          <div className='absolute inset-0 bg-black opacity-70'></div>
          <div className='z-10 relative h-full flex flex-col pt-5'>
            <nav className='flex justify-between items-center px-4 sm:px-8 lg:px-24'>
              <img src={logo} alt="netflixlogo" className='w-20 sm:w-24 lg:w-32'/>
              <button 
                onClick={() => logout()}
                className='bg-[#e50914] hover:bg-[#d20812] font-semibold text-white px-3 sm:px-4 py-2 text-sm sm:text-base rounded-sm cursor-pointer'>Sign Out</button>
            </nav>
            <div className="max-w-100 sm:max-w-2xl text-center mx-auto mt-16 sm:mt-20 lg:mt-24 px-4">
              <h1 className='text-2xl sm:text-4xl lg:text-6xl font-bold mb-4 leading-tight'>Unlimited movies, TV shows, and more</h1>
              <h3 className='text-base sm:text-xl lg:text-2xl font-bold mb-6 sm:mb-8'>Starts at ₦2,500. Cancel anytime.</h3>
              <p className='text-sm sm:text-base lg:text-lg mb-6'>Ready to watch? Enter your email to create or restart your membership.</p>
              <form className='flex flex-col sm:flex-row justify-center gap-3 items-stretch sm:items-start w-full'>
                <input 
                  type="email" 
                  placeholder='Email address' 
                  className='w-full sm:flex-1 sm:max-w-sm rounded-md px-3 sm:px-5 py-3 border border-white bg-black/50 text-white focus:border-[#e50914] focus:border-2 focus:outline-none text-sm sm:text-base'
                />
                <button className='bg-[#e50914] hover:bg-[#d20812] px-4 sm:px-6 py-3 rounded-md font-bold text-lg sm:text-xl flex items-center justify-center gap-x-2 cursor-pointer whitespace-nowrap'>
                  Get Started <span><MdKeyboardArrowRight /></span>
                </button>
              </form>
            </div>
          </div>
        </section>
        
        <section className='px-4 sm:px-6 lg:px-10'>
          {/* Carousel */}
          <div className='py-6 sm:py-8'>
            <h1 className='font-bold text-white text-xl sm:text-2xl mb-4 px-2'>Trending Movies</h1>
            <Carousel />
          </div>

          {/* Card-Component */}
          <div className='py-6 sm:py-8'>
            <h1 className='font-bold text-xl sm:text-2xl text-white mb-6 px-2'>More Reasons to Join</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6'>
              <Card 
                title='Enjoy on your TV'
                description='Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.'
                icon={<MdTv className='text-4xl'/>}
              />
              <Card 
                title='Download your shows to watch offline'
                description='Save your favorites easily and always have something to watch.'
                icon={<MdDownload className='text-4xl'/>}
              />
              <Card 
                title='Watch everywhere'
                description='Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.'
                icon={<MdDevices className='text-4xl'/>}
              />
              <Card 
                title='Create profiles for kids'
                description='Send kids on adventures with their favorite characters in a space made just for them — free with your membership.'
                icon={<MdChildCare className='text-4xl'/>}
              />
            </div>
          </div>

          {/* FAQ-section */}
          <div className='py-6 sm:py-8'>
            <h1 className='font-bold text-2xl sm:text-3xl text-white mb-6 px-2'>Frequently Asked Questions</h1>
            <FAQ />
          </div>

          {/* Footer-section */}
          <Footer />
        </section>
      </section>
    </>
  )
}

export default Home;