import { ReactNode } from 'react';

export const DisplayText = ({
  children,
  small = false,
}: {
  children: ReactNode;
  small?: boolean;
}) => {
  return (
    <div
      className={`text-gradient ${
        small ? 'font-light' : 'font-extralight'
      } italic font-sans bg-gradient-to-r from-j-blue to-j-magenta text-${
        small ? 4 : 6
      }xl`}
    >
      <p className='m-0 pb-4'>{children}</p>
    </div>
  );
};
