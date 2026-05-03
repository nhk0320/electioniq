import React, { useState } from 'react';
import { Calendar, Users, Megaphone, CheckCircle2, Vote, Building2 } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Voter Registration",
    icon: <Users size={24} />,
    color: "bg-orange-100 text-orange-600 border-orange-500",
    description: "The first step is getting your name on the electoral roll. The Election Commission of India (ECI) manages this process.",
    details: "You must be an Indian citizen, at least 18 years old on the qualifying date (usually Jan 1), and a resident of the polling area. You can apply for a Voter ID (EPIC) online via the NVSP portal or physically through a Booth Level Officer (BLO)."
  },
  {
    id: 2,
    title: "Election Notification",
    icon: <Megaphone size={24} />,
    color: "bg-green-100 text-green-600 border-green-500",
    description: "The ECI announces the election schedule and implements the Model Code of Conduct (MCC).",
    details: "Once the dates are announced, the MCC comes into force to ensure free and fair elections. It sets guidelines for political parties and candidates, preventing the ruling party from using government resources for campaigning."
  },
  {
    id: 3,
    title: "Nomination of Candidates",
    icon: <Building2 size={24} />,
    color: "bg-orange-100 text-orange-600 border-orange-500",
    description: "Candidates file their nomination papers with the Returning Officer.",
    details: "Political parties distribute 'tickets' to their chosen candidates. Independent candidates can also file nominations. Candidates must declare their assets, criminal background, and educational qualifications."
  },
  {
    id: 4,
    title: "Election Campaign",
    icon: <Calendar size={24} />,
    color: "bg-green-100 text-green-600 border-green-500",
    description: "Candidates and parties campaign to win over voters in their constituencies.",
    details: "Campaigning includes rallies, door-to-door canvassing, and media advertisements. The campaign officially ends 48 hours before the start of polling (the 'silence period') to give voters time to think."
  },
  {
    id: 5,
    title: "Polling Day",
    icon: <Vote size={24} />,
    color: "bg-orange-100 text-orange-600 border-orange-500",
    description: "Voters cast their votes using Electronic Voting Machines (EVMs) at designated polling booths.",
    details: "Voters verify their identity and press the button next to their chosen candidate's symbol on the EVM. A Voter Verifiable Paper Audit Trail (VVPAT) machine prints a slip allowing the voter to verify their vote was recorded correctly."
  },
  {
    id: 6,
    title: "Counting & Results",
    icon: <CheckCircle2 size={24} />,
    color: "bg-green-100 text-green-600 border-green-500",
    description: "Votes are counted under tight security, and the results are declagreen.",
    details: "The candidate with the most votes in a constituency is declagreen the winner (First Past the Post system). In a general election, the party or coalition with a majority of seats in the Lok Sabha forms the government."
  }
];

const Timeline = () => {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">The Path to Forming a Government</h2>
      
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
              
              <div className="h-1 w-20 bg-orange-600 rounded-full mb-6"></div>
              
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
                  className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
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
