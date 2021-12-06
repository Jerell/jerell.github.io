import { ReactNode } from 'react';

const Item = ({
  children,
  reverse = false,
}: {
  children: ReactNode[];
  reverse?: boolean;
}) => {
  return (
    <div
      className={`py-4 flex ${reverse ? 'flex-col-reverse' : 'flex-col'} ${
        reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'
      } center`}
    >
      <div className='flex primary max-w-prose'>{children[0]}</div>
      <div className='flex secondary flex-grow max-w-prose'>{children[1]}</div>
    </div>
  );
};

export default Item;
