import Link from 'next/link';
import { ReactNode } from 'react';

export interface ISubsection {
  heading: string;
  content: (string | ReactNode)[] | string;
  tags: string[];
  link?: string;
}

export default function JobSubsection({
  heading,
  content,
  tags,
  link,
}: ISubsection) {
  return (
    <div className='subsection' key={heading}>
      <div className='flex flex-row gap-1 items-center'>
        <p className='text-lg'>
          {link ? (
            <Link href={link}>
              <a>
                <span>{heading}</span>
              </a>
            </Link>
          ) : (
            heading
          )}
        </p>
        {tags.length ? (
          <p className='text-xs italic pt-1'>{tags.join(', ')}</p>
        ) : null}
      </div>
      {typeof content === 'string' ? (
        <p className='text-sm'>{content}</p>
      ) : (
        <ul className='list-disc flex flex-col space-y-2 text-sm'>
          {content.map((subContentItem, i) => (
            <li key={i}>
              <p>{subContentItem}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
