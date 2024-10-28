import React from 'react'
import npclogo2 from "../../Images/npclogo2.png"
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
// import LanguageSwitcher from "../../switer"
import i18n from '../../i18n';

const Header = () => {
  const { t } = useTranslation();

  const navigate = useNavigate()

  return (
    <div>
      <div className='sticky top-0 z-50 bg-white '>
        <div className={`h-auto w-full bg-gray-100 flex flex-col sm:flex-row justify-between items-center px-4 py-4  ${i18n.language === 'ar' ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
          {/* Logo and Text */}
          <div
          className={`flex items-center flex-wrap mb-4 sm:mb-0 ${i18n.language === 'ar' ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
            <img onClick={() => navigate('/')} src={npclogo2} className='h-14 sm:h-16 w-auto cursor-pointer' alt='' />
            <div className='text-center px-2 font-sans'>
              <p className='text-secondary font-semibold'>{t('GS1 Saudia Arabia')}</p>
              <p className='text-secondary'>{t('The Global Language of Business')}</p>
            </div>
          </div>

          <div>
            <button className='md:text-2xl text-base bg-primary2 text-white px-5 py-1 font-sans rounded-md transition-transform transform hover:scale-90'>Your One Source of Reliable Data</button>
          </div>
        </div>
      </div>
      {/* End Nav */}
    </div>
  )
}

export default Header