import { MdKeyboardArrowRight } from "react-icons/md"

function Footer() {
  return (
    <footer className="text-gray-400 px-4 sm:px-6 lg:px-10 pb-10">
      <div className="flex flex-col">
        <div className="flex items-center flex-col mb-8">
          <h2 className="text-sm sm:text-base py-3 text-white text-center max-w-lg">
            Ready to watch? Enter your email to create or restart your membership.
          </h2>
          <form className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 items-stretch sm:items-start w-full max-w-2xl">
            <input 
              type="email" 
              placeholder='Email address' 
              className='flex-1 rounded-md px-3 sm:px-5 py-3 border border-white bg-black/50 text-white focus:border-[#56a150] focus:border-2 focus:outline-none text-sm sm:text-base'
            />
            <button className='bg-[#e50914] hover:bg-[#d20812] px-4 sm:px-6 py-3 rounded-md font-bold text-lg sm:text-xl flex items-center justify-center gap-x-2 cursor-pointer whitespace-nowrap text-white'>
              Get Started <span><MdKeyboardArrowRight /></span>
            </button>
          </form>
        </div>
        
        <div className="mb-6">
          <p className="underline text-sm sm:text-base hover:text-white cursor-pointer">
            Questions? Contact us.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 underline mb-8">
        <ul className="space-y-2">
          <li className='text-xs sm:text-sm hover:text-white cursor-pointer'>FAQ</li>
          <li className='text-xs sm:text-sm hover:text-white cursor-pointer'>Investor Relations</li>
          <li className='text-xs sm:text-sm hover:text-white cursor-pointer'>Privacy</li>
          <li className='text-xs sm:text-sm hover:text-white cursor-pointer'>Speed Test</li>
        </ul>
        <ul className="space-y-2">
          <li className='text-xs sm:text-sm hover:text-white cursor-pointer'>Help Center</li>
          <li className='text-xs sm:text-sm hover:text-white cursor-pointer'>Jobs</li>
          <li className='text-xs sm:text-sm hover:text-white cursor-pointer'>Cookie Preferences</li>
          <li className='text-xs sm:text-sm hover:text-white cursor-pointer'>Legal Notices</li>
        </ul>
        <ul className="space-y-2">
          <li className='text-xs sm:text-sm hover:text-white cursor-pointer'>Account</li>
          <li className='text-xs sm:text-sm hover:text-white cursor-pointer'>Ways to Watch</li>
          <li className='text-xs sm:text-sm hover:text-white cursor-pointer'>Corporate Information</li>
          <li className='text-xs sm:text-sm hover:text-white cursor-pointer'>Only on Netflix</li>
        </ul>
        <ul className="space-y-2">
          <li className='text-xs sm:text-sm hover:text-white cursor-pointer'>Media Center</li>
          <li className='text-xs sm:text-sm hover:text-white cursor-pointer'>Terms of Use</li>
          <li className='text-xs sm:text-sm hover:text-white cursor-pointer'>Contact Us</li>
        </ul>
      </div>

      <div className="space-y-4">
        <select className="rounded-md border-2 border-gray-600 bg-black text-white px-3 sm:px-5 py-2 text-sm sm:text-base">
          <option value="English">English</option>
          <option value="Hausa">Hausa</option>
          <option value="Igbo">Igbo</option>
          <option value="Yoruba">Yoruba</option>
        </select>
        <p className="text-xs sm:text-sm">Netflix Nigeria</p>
        <p className="text-xs sm:text-sm leading-relaxed">
          This page is protected by Google reCAPTCHA to ensure you're not a bot. 
          <a href="#" className="text-blue-500 underline hover:text-blue-400 ml-1">Learn more.</a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
