import CircleImg from './CircleImg';
import UnstyledLink from './links/UnstyledLink';

const links: {
  href: string;
  label: string;
}[] = [
  { href: 'https://github.com/Jerell', label: 'GitHub' },
  {
    href: 'https://www.linkedin.com/in/jerell-james-831b12158/',
    label: 'LinkedIn',
  },
];

export default function Header() {
  return (
    <header className='flex flex-col items-center p-1 w-full' id='header'>
      <p className='text-xs self-start'>© {new Date().getFullYear()}</p>

      <div className='flex flex-row items-center 2xl:max-w-2xl w-full gap-2'>
        <CircleImg />
        <div className='grow'>
          <UnstyledLink href='/'>
            <h1 className='text-xl'>Jerell James</h1>
          </UnstyledLink>
          <p className='text-2xl'>Software engineer</p>
          <nav className='pb-0.5'>
            <ul className='flex flex-row gap-x-4'>
              {links.map(({ href, label }) => (
                <li key={`${href}${label}`}>
                  <UnstyledLink href={href}>{label}</UnstyledLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
