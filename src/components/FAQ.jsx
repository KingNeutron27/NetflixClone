import { useState } from "react"
import { FiPlus } from "react-icons/fi";
import { HiMinus } from "react-icons/hi";

function FAQ() {
  const [currentIndex, setCurrentIndex] = useState(null)

  const handleClick = (index) => {
    if (currentIndex === index) {
      setCurrentIndex(null)
    } else {
      setCurrentIndex(index)
    }
  }

  const FAQ = [
    {
      id: 1,
      question: 'What is Netflix?',
      answer: "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices. You can watch as much as you want, whenever you want without a single commercial – all for one low monthly price. There's always something new to discover and new TV shows and movies are added every week!"
    },
    {
      id: 2,
      question: 'How much does Netflix cost?',
      answer: "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₦2,500 to ₦8,500 a month. No extra costs, no contracts."
    },
    {
      id: 3,
      question: 'Where can I watch?',
      answer: "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles. You can also download your favorite shows with the iOS or Android app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere."
    },
    {
      id: 4,
      question: 'How do I cancel?',
      answer: "Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime."
    },
    {
      id: 5,
      question: 'What can I watch on Netflix?',
      answer: "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want."
    },
    {
      id: 6,
      question: 'Is Netflix good for kids?',
      answer: "The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space. Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don't want kids to see."
    },
  ]
  
  return (
    <div className="flex gap-3 flex-col max-w-full lg:max-w-6xl mx-auto px-2 sm:px-4 lg:px-6 mt-5">
      {FAQ.map((singleQuestion) => {
        const isOpen = currentIndex === singleQuestion.id

        return (
          <div key={singleQuestion.id} className="mb-3 bg-gray-600 text-white rounded-lg overflow-hidden">
            <button 
              className="w-full text-left text-sm sm:text-base lg:text-lg flex justify-between items-center px-4 sm:px-6 py-4 cursor-pointer hover:bg-gray-700 transition-colors duration-200 font-semibold" 
              onClick={() => handleClick(singleQuestion.id)}
            >
              <span className="pr-4">{singleQuestion.question}</span>
              {isOpen 
                ? (<HiMinus className="text-base sm:text-lg lg:text-xl flex-shrink-0" />) 
                : (<FiPlus className="text-base sm:text-lg lg:text-xl flex-shrink-0" />)
              }
            </button>
            {isOpen && (
              <div className="border-t-2 border-white">
                <p className="text-sm sm:text-base px-4 sm:px-6 py-4 sm:py-5 leading-relaxed">
                  {singleQuestion.answer}
                </p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
export default FAQ
