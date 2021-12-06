import { DisplayText } from '@/components/DisplayText';
import Link from 'next/link';
import CircleImg from '@/components/CircleImg';

const IntroCard = () => {
  return (
    <div className='flex space-x-8 items-center'>
      <div className='left'>
        <CircleImg />
      </div>
      <div className='right flex flex-col'>
        <p>Jerell James</p>
        <DisplayText>Software engineer</DisplayText>
        <p>I make software for oil and gas companies.</p>
        <p>
          Take a look at my{' '}
          <Link href='https://github.com/Jerell'>
            <a>
              <span>github</span>
            </a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default IntroCard;
