'use client';

import TextToSpeechWrapper from '@/components/ui/TextToSpeechWrapper';

const CareerPathwaysSection = () => {
  return (
    <section className="py-16 bg-blue-900 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <TextToSpeechWrapper 
              text="Career Pathways"
              className="mb-4"
            >
              <h2 className="text-4xl font-bold mb-4">
                Career Pathways
              </h2>
            </TextToSpeechWrapper>
            
            <TextToSpeechWrapper 
              text="From Level 2 to Level 5..."
              className="mb-6"
            >
              <p className="text-xl text-blue-200 mb-6">
                From Level 2 to Level 5...
              </p>
            </TextToSpeechWrapper>
            
            <TextToSpeechWrapper 
              text="We offer comprehensive career development opportunities that take you from entry-level positions to senior management roles. Our structured pathways ensure continuous growth and professional advancement."
              className="mb-8"
            >
              <p className="text-blue-100 leading-relaxed mb-8">
                We offer comprehensive career development opportunities that take you from entry-level positions to senior management roles. Our structured pathways ensure continuous growth and professional advancement.
              </p>
            </TextToSpeechWrapper>
            
            {/* Career Progression Points */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <TextToSpeechWrapper text="Structured progression from Level 2 to Level 5 qualifications with clear milestones and support at each stage">
                  <p className="text-blue-100">
                    Structured progression from Level 2 to Level 5 qualifications with clear milestones and support at each stage
                  </p>
                </TextToSpeechWrapper>
              </div>
              
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <TextToSpeechWrapper text="Mentorship programs connecting you with experienced professionals who guide your career development">
                  <p className="text-blue-100">
                    Mentorship programs connecting you with experienced professionals who guide your career development
                  </p>
                </TextToSpeechWrapper>
              </div>
              
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <TextToSpeechWrapper text="Flexible learning options including online courses, workshops, and practical training sessions">
                  <p className="text-blue-100">
                    Flexible learning options including online courses, workshops, and practical training sessions
                  </p>
                </TextToSpeechWrapper>
              </div>
            </div>
            
            {/* CTA Button */}
            <button className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2">
              <TextToSpeechWrapper text="Explore Career opportunities and advancement pathways">
                <span>Explore Career</span>
              </TextToSpeechWrapper>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Right Content - Image */}
          <div className="flex justify-center">
            <div className="bg-blue-800 p-8 rounded-lg">
              <div className="w-80 h-80 bg-blue-700 rounded-lg flex items-center justify-center">
                <div className="text-center text-blue-200">
                  <div className="text-6xl mb-4">🩺</div>
                  <TextToSpeechWrapper text="Professional healthcare training and career development">
                    <p className="text-lg">Professional Healthcare Training</p>
                  </TextToSpeechWrapper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerPathwaysSection;
