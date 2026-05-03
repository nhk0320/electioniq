import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle, FileText, Vote, Users, MapPin, Calendar, CheckSquare, XCircle } from 'lucide-react';

const VoterGuide = () => {
  const { t } = useLanguage();
  const [showEligibility, setShowEligibility] = useState(false);
  const [dob, setDob] = useState('');
  const [isCitizen, setIsCitizen] = useState(false);
  const [eligibilityResult, setEligibilityResult] = useState(null);

  const checkEligibility = () => {
    if (!dob) return;
    const birthDate = new Date(dob);
    // Assume qualifying date is Jan 1st of the current year
    const currentYear = new Date().getFullYear();
    const qualifyingDate = new Date(currentYear, 0, 1);
    
    let age = qualifyingDate.getFullYear() - birthDate.getFullYear();
    const m = qualifyingDate.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && qualifyingDate.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age >= 18 && isCitizen) {
      setEligibilityResult({ eligible: true, msg: "Great! You are eligible to vote. Please proceed to register." });
    } else if (!isCitizen) {
      setEligibilityResult({ eligible: false, msg: "You must be an Indian citizen to vote." });
    } else {
      setEligibilityResult({ eligible: false, msg: `You will be ${age} years old on Jan 1, ${currentYear}. You must be 18 to vote.` });
    }
  };

  const steps = [
    {
      id: 1,
      title: t('step1Title'),
      desc: t('step1Desc'),
      icon: <CheckCircle className="text-green-500 w-8 h-8 group-hover:scale-110 transition-transform" />,
      image: "https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?q=80&w=1000&auto=format&fit=crop",
      customAction: (
        <button 
          onClick={() => setShowEligibility(!showEligibility)}
          className="inline-block mt-4 px-5 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-green-500/30 hover:-translate-y-0.5 transition-all"
        >
          {t('step1Action')}
        </button>
      )
    },
    {
      id: 2,
      title: t('step2Title'),
      desc: t('step2Desc'),
      icon: <FileText className="text-blue-500 w-8 h-8 group-hover:scale-110 transition-transform" />,
      image: "https://images.unsplash.com/photo-1555848962-6e79363ec58f?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 3,
      title: t('step3Title'),
      desc: t('step3Desc'),
      note: t('step3Note'),
      icon: <MapPin className="text-orange-500 w-8 h-8 group-hover:scale-110 transition-transform" />
    },
    {
      id: 4,
      title: t('step4Title'),
      desc: t('step4Desc'),
      icon: <Vote className="text-purple-500 w-8 h-8 group-hover:scale-110 transition-transform" />,
      image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 5,
      title: t('step5Title'),
      desc: t('step5Desc'),
      icon: <Users className="text-red-500 w-8 h-8 group-hover:scale-110 transition-transform" />
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 animate-fade-in-up">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600">{t('guideTitle')}</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t('guideSubtitle')}</p>
      </div>

      <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-orange-300 before:via-gray-300 before:to-green-300">
        {steps.map((step, index) => (
          <div key={step.id} className={`relative flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group is-active`}>
            <div className={`flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-gray-50 shadow-md shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform duration-300 group-hover:scale-125 group-hover:shadow-xl`}>
              {step.icon}
            </div>
            
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] glass-card p-6 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-t-transparent hover:border-t-orange-500">
              <h3 className="font-bold text-2xl text-gray-800 mb-2">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-4 text-lg">{step.desc}</p>
              
              {step.image && (
                <div className="mb-4 rounded-xl overflow-hidden shadow-md">
                  <img src={step.image} alt={step.title} className="w-full h-auto object-cover max-h-48 hover:scale-105 transition-transform duration-500" onError={(e) => { e.target.style.display = 'none' }} />
                </div>
              )}
              
              {step.note && (
                <div className="bg-orange-50/80 border-l-4 border-orange-500 p-4 mt-4 rounded-r-lg">
                  <p className="text-sm font-medium text-orange-900">{step.note}</p>
                </div>
              )}
              
              {step.customAction && step.customAction}

              {/* Eligibility Checker Expansion */}
              {step.id === 1 && showEligibility && (
                <div className="mt-6 p-5 bg-gray-50 rounded-xl border border-gray-200 shadow-inner animate-fade-in-up">
                  <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2"><Calendar className="w-5 h-5 text-blue-500" /> Eligibility Calculator</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Date of Birth</label>
                      <input 
                        type="date" 
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={isCitizen}
                        onChange={(e) => setIsCitizen(e.target.checked)}
                        className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">I am an Indian Citizen</span>
                    </label>

                    <button 
                      onClick={checkEligibility}
                      className="w-full py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors font-medium"
                    >
                      Calculate
                    </button>

                    {eligibilityResult && (
                      <div className={`p-4 rounded-lg flex items-start gap-3 ${eligibilityResult.eligible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {eligibilityResult.eligible ? <CheckSquare className="w-5 h-5 shrink-0" /> : <XCircle className="w-5 h-5 shrink-0" />}
                        <p className="text-sm font-medium">{eligibilityResult.msg}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VoterGuide;
