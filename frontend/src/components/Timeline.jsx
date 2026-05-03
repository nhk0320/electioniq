import React, { useState } from 'react';
import { Calendar, Users, Megaphone, CheckCircle2, Vote, Building2 } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Voter Registration",
    icon: <Users size={24} />,
    color: "bg-blue-100 text-blue-600 border-blue-500",
    description: "The first step is registering to vote. Each state has its own deadlines and rules for registration.",
    details: "You must be a U.S. citizen, meet your state's residency requirements, and be 18 years old on or before Election Day. Many states allow online registration, while others require paper forms."
  },
  {
    id: 2,
    title: "Primaries & Caucuses",
    icon: <Megaphone size={24} />,
    color: "bg-red-100 text-red-600 border-red-500",
    description: "States hold primaries or caucuses to help political parties choose their presidential nominees.",
    details: "In a primary, people vote by secret ballot. In a caucus, local party members gather to discuss candidates and vote publicly. These events determine how many delegates each candidate gets."
  },
  {
    id: 3,
    title: "National Conventions",
    icon: <Building2 size={24} />,
    color: "bg-blue-100 text-blue-600 border-blue-500",
    description: "Political parties hold conventions to officially nominate their candidates for President and Vice President.",
    details: "During conventions, delegates from all states vote to confirm their party's choice. The nominated presidential candidate also officially announces their running mate (Vice President)."
  },
  {
    id: 4,
    title: "General Election Campaign",
    icon: <Calendar size={24} />,
    color: "bg-red-100 text-red-600 border-red-500",
    description: "Candidates campaign nationwide to win the support of the general public.",
    details: "This phase includes presidential debates, campaign rallies, and extensive advertising. Candidates focus heavily on 'swing states' where the race is expected to be close."
  },
  {
    id: 5,
    title: "Election Day",
    icon: <Vote size={24} />,
    color: "bg-blue-100 text-blue-600 border-blue-500",
    description: "Voters across the country cast their ballots for President on the Tuesday after the first Monday in November.",
    details: "When citizens vote, they are actually voting for a slate of electors who have pledged to support that candidate in the Electoral College."
  },
  {
    id: 6,
    title: "Electoral College",
    icon: <CheckCircle2 size={24} />,
    color: "bg-red-100 text-red-600 border-red-500",
    description: "Electors cast the official votes for President in December. A candidate needs 270 electoral votes to win.",
    details: "Each state gets a certain number of electors based on its representation in Congress. The candidate who wins the popular vote in a state usually wins all of that state's electoral votes."
  }
];

const Timeline = () => {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">The Path to the Presidency</h2>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Timeline Visualization */}
        <div className="md:w-1/3 relative">
          <div className="absolute left-6 top-6 bottom-6 w-1 bg-gray-200 rounded-full hidden md:block"></div>
          
          <div className="space-y-4 relative">
            {steps.map((step) => (
              <div 
                key={step.id}
                className={`flex items-center gap-4 cursor-pointer p-3 rounded-xl transition-all duration-300
                  ${activeStep === step.id ? 'bg-gray-50 scale-105 shadow-sm' : 'hover:bg-gray-50'}`}
                onClick={() => setActiveStep(step.id)}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 border-2 z-10 transition-colors duration-300
                  ${activeStep === step.id ? step.color : 'bg-white text-gray-400 border-gray-300'}`}
                >
                  {step.icon}
                </div>
                <div className="flex-1">
                  <h3 className={`font-bold transition-colors duration-300 ${activeStep === step.id ? 'text-gray-900' : 'text-gray-500'}`}>
                    {step.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Step Details */}
        <div className="md:w-2/3 bg-gray-50 rounded-xl p-8 border border-gray-100 flex flex-col justify-center min-h-[300px]">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className={`transition-all duration-500 transform ${activeStep === step.id ? 'opacity-100 translate-y-0 block' : 'opacity-0 translate-y-4 hidden'}`}
            >
              <div className="inline-block p-3 rounded-full mb-4 shadow-sm bg-white">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${step.color.replace('border-', '')}`}>
                  {step.icon}
                </div>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Step {step.id}: {step.title}</h2>
              
              <div className="h-1 w-20 bg-blue-600 rounded-full mb-6"></div>
              
              <p className="text-xl text-gray-700 mb-6 leading-relaxed font-medium">
                {step.description}
              </p>
              
              <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-2 uppercase tracking-wider text-sm">Deep Dive</h4>
                <p className="text-gray-600 leading-relaxed">
                  {step.details}
                </p>
              </div>
              
              <div className="mt-8 flex justify-between">
                <button 
                  onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
                  disabled={activeStep === 1}
                  className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous Step
                </button>
                <button 
                  onClick={() => setActiveStep(Math.min(steps.length, activeStep + 1))}
                  disabled={activeStep === steps.length}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  Next Step
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
