import Image from 'next/image';
import me from '@/public/img/mecropblur.jpg';

const CircleImg = () => {
  return (
    <div className='rounded-full h-36 w-36 overflow-hidden'>
      <Image src={me} alt='Picture of Jerell' />
    </div>
  );
};

export default CircleImg;
