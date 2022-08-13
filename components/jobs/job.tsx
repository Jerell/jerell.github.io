import { DisplayText } from '../DisplayText';
import Item from '../item';
import { IJobContent } from './content';
import JobSubsection from './subsection';

export default function Job({ job }: { job: IJobContent }) {
  return (
    <Item>
      <div className='flex space-x-8'>
        <DisplayText>{job.company}</DisplayText>
      </div>
      <div className='m-4 mt-1 flex flex-col space-y-4'>
        <p className='text-xl'>
          {job.title} | <span className='italic text-sm'>{job.year}</span>
        </p>
        <p>{job.description}</p>
        {job.subsections.map((s, i) => (
          <JobSubsection key={i} {...s} />
        ))}
      </div>
    </Item>
  );
}
