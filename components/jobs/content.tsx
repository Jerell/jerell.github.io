import Link from 'next/link';
import { ISubsection } from './subsection';

export interface IJobContent {
  year: string;
  company: string;
  title: string;
  description: string;
  subsections: ISubsection[];
}

export const jobs: IJobContent[] = [
  {
    year: '2018-date',
    company: 'Pace CCS',
    title: 'Software engineer',
    description:
      'Responsible for the development of internal tools and web applications. Primarily using TypeScript, React, NodeJS, and Docker.',
    subsections: [
      {
        heading: 'Timesheets',
        content: [
          'Project management web application used by all employees to track time spent on different projects.',
          'Automated the creation of progress reports showing metrics such as planned and actual costs and hours.',
          'Hosted on an Azure virtual machine using Terraform, Ansible, and GitHub Actions.',
        ],
        tags: [
          'TypeScript',
          'React',
          'Node.js',
          'Docker',
          'Terraform',
          'CI/CD',
          'GitHub Actions',
        ],
      },

      {
        heading: 'Digital Twin',
        content: [
          'Development of a generalized software model for the CCS industry, used to investigate the behaviour and evolution of CO2 pipelines over time in response to user defined conditions.',
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
        tags: [
          'TypeScript',
          'React',
          'Azure',
          'C# .Net Core',
          'Docker',
          'Terraform',
          'CI/CD',
          'GitHub Actions',
        ],
      },

      {
        heading: 'cvgen',
        content:
          'Development of a cross-platform desktop application that generates PDFs in a custom template using YAML input files.',
        tags: ['TypeScript', 'Electron'],
        link: 'https://github.com/Jerell/cvgen',
      },

      {
        heading: 'Icthys LNG Phase 2a FEED',
        content:
          'Optimization of subsea design using an evolutionary algorithm.',
        tags: [],
        link: 'https://onepetro.org/BHRICMPT/proceedings-abstract/BHR19/All-BHR19/BHR-2019-023/430',
      },

      {
        heading: 'HyNet CCS project',
        content:
          'Development of offshore integrated digital twin model with snapshot and life of field modelling, including offshore pipelines, distribution manifold, topsides piping, wellhead chokes, wells, and reservoirs.',
        tags: ['TypeScript', 'React', 'Azure', 'C# .Net Core'],
      },
      {
        heading: 'Sphering',
        content:
          "Created an online visualisation of a pipeline to show how 'spheres' are used to flush out the condensation that accumulates inside.",
        tags: ['TypeScript', 'React', 'NextJS'],
      },

      {
        heading: 'VM monitoring Slack bot',
        content:
          'Used Azure Serverless Function Apps to monitor the activity of virtual machines and send alerts through Slack.',
        tags: ['JavaScript', 'Azure', 'Serverless'],
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
    ],
  },
];
