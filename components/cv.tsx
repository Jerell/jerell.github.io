import { DisplayText } from '@/components/DisplayText';
import Item from '@/components/item';
import Link from 'next/link';
import { ReactNode } from 'react';

interface ISubsection {
  heading: string;
  content: (string | ReactNode)[] | string;
  tags: string[];
  link?: string;
}

interface IJobContent {
  year: string;
  company: string;
  title: string;
  description: string;
  subsections: ISubsection[];
}

const jobs: IJobContent[] = [
  {
    year: '2018-date',
    company: 'Pace CCS',
    title: 'Software engineer',
    description:
      'Responsible for the development of internal tools and web applications. Primarily using React, NodeJS (Express), Azure Pipelines and Docker.',
    subsections: [
      {
        heading: 'Timesheets',
        content: [
          'Project management web application used by all employees to track time spent on different projects.',
          'Automated the creation of progress reports showing metrics such as planned and actual costs and hours.',
          'Hosted on an Azure virtual machine.',
        ],
        tags: ['JavaScript', 'React', 'Node.js', 'Docker'],
      },
      {
        heading: 'VM monitoring Slack bot',
        content:
          'Used Azure Serverless Function Apps to monitor the activity of virtual machines and send alerts through Slack.',
        tags: ['JavaScript', 'Azure', 'Serverless'],
      },
      {
        heading: 'cvgen',
        content:
          'Development of a cross-platform desktop application that generates PDFs in a custom template using YAML input files.',
        tags: ['TypeScript', 'Electron'],
        link: 'https://github.com/Jerell/cvgen',
      },
      {
        heading: 'Adaptive grid',
        content:
          'Used Python to parse, manipulate and build output/input files for OLGA simulations. This project aimed to reduce simulation run times by running sequential simulations focused on a moving area of interest, rather than simulating an entire pipeline in high detail.',
        tags: ['Python'],
      },
      {
        heading: 'Master Document Register',
        content:
          'Built a web application used for monitoring the issue status of project deliverables. Involved manipulating Excel files and using the Google Drive API.',
        tags: ['JavaScript', 'React'],
      },
      {
        heading: 'Icthys PNG Phase 2a FEED',
        content:
          'Optimization of subsea design using an evolutionary algorithm.',
        tags: [],
        link: 'https://onepetro.org/BHRICMPT/proceedings-abstract/BHR19/All-BHR19/BHR-2019-023/430',
      },
      {
        heading: 'HyNet CCS project',
        content:
          'Development of offshore integrated digital twin model with snapshot and life of field modelling, including offshore pipelines, distribution manifold, topsides piping, wellhead chokes, wells, and reservoirs.',
        tags: ['TypeScript', 'React', 'Azure', 'C#'],
      },
      {
        heading: 'Digital Twin',
        content: [
          'Development of 12 modules to support delivery of generalized digital twin product for the CCS industry.',
          <>
            Published{' '}
            <Link href='https://www.npmjs.com/package/ccs-sim'>
              <a>
                <span>ccs-sim</span>, an npm package for simulating the
                behaviour of fluid in pipelines.
              </a>
            </Link>
          </>,
        ],
        tags: ['TypeScript', 'React', 'Azure', 'C#'],
      },
      {
        heading: 'Sphering',
        content:
          'Created an online visualisation of a pipeline to show how ‘spheres’ are used to flush out the condensation that accumulates inside.',
        tags: ['TypeScript', 'React', 'NextJS'],
      },
    ],
  },
];

const Job = ({ job }: { job: IJobContent }) => {
  function getSubsection(subsection: ISubsection) {
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

  return (
    <Item>
      <div className='flex space-x-8'>
        <DisplayText small>{job.company}</DisplayText>
      </div>
      <div className='m-4 mt-1 flex flex-col space-y-4'>
        <p className='text-xl'>
          {job.title} | <span className='italic text-sm'>{job.year}</span>
        </p>
        <p>{job.description}</p>
        {job.subsections.map((s) => getSubsection(s))}
      </div>
    </Item>
  );
};

const CV = () => {
  return (
    <div className='flex flex-col'>
      <div className='border-b-4 border-j-yellowred border-dotted'>
        <DisplayText small>Experience</DisplayText>
      </div>
      {jobs.map((j, i) => (
        <Job job={j} key={i} />
      ))}
    </div>
  );
};

export default CV;
