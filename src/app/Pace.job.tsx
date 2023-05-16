import Link from 'next/link';
import Job from './Job';
import styles from './job.module.css';

export default function PaceJob() {
  return (
    <Job company='Pace CCS' title='Software engineer' date='2018 - date'>
      <p>
        Leading research and development of a modular fluid dynamics simulator
        and analysis tool.
      </p>

      <ul>
        <li>
          <div className='inline-flex flex-col gap-1'>
            <div className='flex flex-row items-center gap-2'>
              <h4>
                <Link href='https://onepetro.org/BHRICMPT/proceedings-abstract/BHR19/All-BHR19/BHR-2019-023/430'>
                  Icthys LNG Phase 2a FEED
                </Link>
              </h4>
            </div>
            <p>
              Optimization of subsea design using an evolutionary algorithm.
            </p>
          </div>
        </li>

        <li>
          <div className='inline-flex flex-col gap-1'>
            <div className='flex flex-row items-center gap-2'>
              <h4>Digital Twin</h4>
              <p className={styles.tags}>
                Julia, TypeScript, React, Azure, C# .Net, Docker, Terraform,
                CI/CD, GitHub Actions, ZMQ
              </p>
            </div>
            <p>
              Development of a generalized software model for the CCS industry,
              used to investigate the behaviour and evolution of CO2 pipelines
              over time in response to user defined conditions.
            </p>
            <p>
              Published{' '}
              <Link href='https://www.npmjs.com/package/ccs-sim'>ccs-sim</Link>,
              an npm package for simulating the behaviour of fluid in pipelines.
            </p>
          </div>
        </li>

        <li>
          <div className='inline-flex flex-col gap-1'>
            <div className='flex flex-row items-center gap-2'>
              <h4>Timesheets</h4>
              <p className={styles.tags}>
                TypeScript, React, Next.js, NestJS, Docker, Terraform
              </p>
            </div>
            <p>
              Project management web application used by all employees to track
              time spent on different projects. Automated the creation of
              progress reports showing metrics such as planned and actual costs
              and hours.
            </p>
            <p>
              Hosted on an Azure virtual machine using Terraform, Ansible, and
              GitHub Actions.
            </p>
          </div>
        </li>

        <li>
          <div className='inline-flex flex-col gap-1'>
            <div className='flex flex-row items-center gap-2'>
              <h4>Sphering</h4>
              <p className={styles.tags}>TypeScript, React, Next.js</p>
            </div>
            <p>
              Created an online visualisation of a pipeline to show how
              'spheres' are used to flush out the condensation that accumulates
              inside.
            </p>
          </div>
        </li>

        <li>
          <div className='inline-flex flex-col gap-1'>
            <div className='flex flex-row items-center gap-2'>
              <h4>VM monitoring Slack bot</h4>
              <p className={styles.tags}>JavaScript, Azure, Serverless</p>
            </div>
            <p>
              Used Azure Serverless Function Apps to monitor the activity of
              virtual machines and send alerts through Slack.
            </p>
          </div>
        </li>

        <li>
          <div className='inline-flex flex-col gap-1'>
            <div className='flex flex-row items-center gap-2'>
              <h4>cvgen</h4>
              <p className={styles.tags}>TypeScript</p>
            </div>
            <p>
              Development of a cross-platform desktop application that generates
              PDFs in a custom template using YAML input files.
            </p>
          </div>
        </li>
      </ul>
    </Job>
  );
}
