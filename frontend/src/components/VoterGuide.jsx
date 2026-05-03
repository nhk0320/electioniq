import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle, FileText, Vote, Users, MapPin } from 'lucide-react';

const VoterGuide = () => {
  const { t } = useLanguage();

  const steps = [
    {
      id: 1,
      title: t('step1Title'),
      desc: t('step1Desc'),
      icon: <CheckCircle className="text-green-500 w-8 h-8" />,
      action: t('step1Action'),
      link: 'https://voters.eci.gov.in/'
    },
    {
      id: 2,
      title: t('step2Title'),
      desc: t('step2Desc'),
      icon: <FileText className="text-blue-500 w-8 h-8" />
    },
    {
      id: 3,
      title: t('step3Title'),
      desc: t('step3Desc'),
      note: t('step3Note'),
      icon: <MapPin className="text-orange-500 w-8 h-8" />
    },
    {
      id: 4,
      title: t('step4Title'),
      desc: t('step4Desc'),
      icon: <Vote className="text-purple-500 w-8 h-8" />
    },
    {
      id: 5,
      title: t('step5Title'),
      desc: t('step5Desc'),
      icon: <Users className="text-red-500 w-8 h-8" />
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 animate-fade-in-up">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{t('guideTitle')}</h2>
        <p className="text-lg text-gray-600">{t('guideSubtitle')}</p>
      </div>

      <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
        {steps.map((step, index) => (
          <div key={step.id} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active`}>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-gray-100 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform duration-300 group-hover:scale-125`}>
              {step.icon}
            </div>
            
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-6 rounded-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <h3 className="font-bold text-xl text-gray-800 mb-2">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-3">{step.desc}</p>
              
              {step.note && (
                <div className="bg-orange-50 border-l-4 border-orange-400 p-3 mt-3 rounded">
                  <p className="text-sm text-orange-800">{step.note}</p>
                </div>
              )}
              
              {step.action && (
                <a href={step.link} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  {step.action}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VoterGuide;
