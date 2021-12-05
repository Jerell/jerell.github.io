export const DisplayText = ({ children }) => {
  return (
    <div className='text-gradient font-extralight italic font-sans bg-gradient-to-r from-j-blue to-j-magenta text-6xl xl:text-7xl 2xl:text-8xl'>
      <p className='m-0 pb-4'>{children}</p>
    </div>
  );
};
