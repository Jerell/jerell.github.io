import { ReactNode } from 'react';
import styles from './job.module.css';

export default function Job({
  company,
  title,
  date,
  children,
}: {
  company: string;
  title: string;
  date: string;
  children?: ReactNode;
}) {
  return (
    <div className={styles.job}>
      <div className='flex flex-row gap-2 items-center'>
        <h3>
          {company} | {title}
        </h3>
        <p>{date}</p>
      </div>

      {children}
    </div>
  );
}
