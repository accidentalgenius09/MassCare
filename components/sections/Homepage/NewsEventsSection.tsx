'use client';

import TextToSpeechWrapper from '@/components/ui/TextToSpeechWrapper';

const NewsEventsSection = () => {
  const newsItems = [
    {
      title: 'Had a great experience will do again and',
      description: 'Client testimonial about their positive experience with our services.',
      date: '11.07.2025',
      image: 'caregiver-elderly',
      category: 'Client Stories'
    },
    {
      title: 'Lorem Ipsum is simply dummy text of',
      description: 'Latest updates and news from our training academy and care services.',
      date: '10.07.2025',
      image: 'training-update',
      category: 'Training News'
    },
    {
      title: 'New partnership announced with NHS',
      description: 'Exciting new collaboration bringing enhanced care services to the community.',
      date: '09.07.2025',
      image: 'partnership',
      category: 'Partnerships'
    },
    {
      title: 'Summer training programs now available',
      description: 'Comprehensive training programs for healthcare professionals starting this summer.',
      date: '08.07.2025',
      image: 'summer-training',
      category: 'Training Programs'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <TextToSpeechWrapper 
            text="News & Events"
          >
            <h2 className="text-4xl font-bold text-gray-900">
              News & Events
            </h2>
          </TextToSpeechWrapper>
          
          <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1 transition-colors">
            <TextToSpeechWrapper text="Visit our news hub for all updates">
              <span>Visit News Hub</span>
            </TextToSpeechWrapper>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsItems.map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              {/* Image Placeholder */}
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <div className="text-4xl text-gray-400">
                  {item.image === 'caregiver-elderly' && '👵'}
                  {item.image === 'training-update' && '📚'}
                  {item.image === 'partnership' && '🤝'}
                  {item.image === 'summer-training' && '☀️'}
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <TextToSpeechWrapper 
                  text={item.title}
                  className="mb-3"
                >
                  <h3 className="font-semibold text-gray-900 mb-3 leading-tight">
                    {item.title}
                  </h3>
                </TextToSpeechWrapper>
                
                <TextToSpeechWrapper 
                  text={item.description}
                  className="mb-4"
                >
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {item.description}
                  </p>
                </TextToSpeechWrapper>
                
                {/* Date */}
                <div className="flex justify-between items-center">
                  <TextToSpeechWrapper text={`Published on ${item.date}`}>
                    <span className="text-xs text-gray-500">{item.date}</span>
                  </TextToSpeechWrapper>
                  
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1 transition-colors">
                    <TextToSpeechWrapper text={`Read more about ${item.title}`}>
                      <span>Read More</span>
                    </TextToSpeechWrapper>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsEventsSection;
