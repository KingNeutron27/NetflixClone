function Card({title, description, icon}) {
  return (
    <div className="group relative h-48 sm:h-56 md:h-64 lg:h-72 w-full bg-gradient-to-br from-[#2d2d44] via-[#323247] to-[#1a1a2e] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out hover:scale-105 border border-gray-700/50">
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Content container */}
      <div className="relative h-full p-4 sm:p-6 flex flex-col justify-between">
        
        {/* Text content */}
        <div className="space-y-2 sm:space-y-4">
          <h1 className="font-bold text-lg sm:text-xl lg:text-2xl text-white leading-tight group-hover:text-red-100 transition-colors duration-300">
            {title}
          </h1>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
            {description}
          </p>
        </div>
        
        {/* Icon container */}
        <div className="flex justify-end">
          <div className="relative">
            {/* Icon glow background */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-purple-600 rounded-full blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-300 scale-150"></div>
            
            {/* Icon */}
            <div className="relative text-3xl sm:text-4xl lg:text-5xl text-red-400 group-hover:text-red-300 transition-all duration-300 transform group-hover:scale-110">
              {icon}
            </div>
          </div>
        </div>
      </div>
      
      {/* Subtle border gradient */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-red-500/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  )
}

export default Card