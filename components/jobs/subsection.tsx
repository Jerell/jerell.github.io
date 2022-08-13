import Link from 'next/link';
import { ReactNode } from 'react';

export interface ISubsection {
  heading: string;
  content: (string | ReactNode)[] | string;
  tags: string[];
  link?: string;
}

export default function getSubsection(subsection: ISubsection) {
  const content =
    typeof subsection.content === 'string' ? (
      <p className='text-sm'>{subsection.content}</p>
    ) : (
      <ul className='list-disc flex flex-col space-y-2 text-sm'>
        {subsection.content.map((subContentItem, i) => (
          <li key={i}>
            <p>{subContentItem}</p>
          </li>
        ))}
      </ul>
    );

  return (
    <div className='subsection' key={subsection.heading}>
      <p className='text-lg'>
        {subsection.link ? (
          <Link href={subsection.link}>
            <a>
              <span>{subsection.heading}</span>
            </a>
          </Link>
        ) : (
          subsection.heading
        )}
        {subsection.tags.length ? (
          <>
            {' - '}
            <span className='text-sm'>{subsection.tags.join(', ')}</span>
          </>
        ) : null}
      </p>
      {content}
    </div>
  );
}
