import Link from 'next/link';

const TopBar = () => {
  return (
    <header className='bg-j-mint text-j-blue pl-2 h-12 flex items-end'>
      <div className='border-l border-j-blue pl-2 h-full flex flex-col justify-end'>
        <Link href='/'>
          <a>
            <h1 className='font-bold raleway text-xl '>Jerell James</h1>
          </a>
        </Link>
      </div>
    </header>
  );
};

export default TopBar;
