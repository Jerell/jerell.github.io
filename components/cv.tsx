import { DisplayText } from '@/components/DisplayText';
import { jobs } from './jobs/content';
import Job from './jobs/job';

const CV = () => {
  return (
    <div className='flex flex-col'>
      <div className='border-b-4 border-j-yellowred border-dotted'>
        <DisplayText>Experience</DisplayText>
      </div>
      {jobs.map((j, i) => (
        <Job job={j} key={i} />
      ))}
    </div>
  );
};

export default CV;
