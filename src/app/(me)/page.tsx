import PaceJob from './Pace.job';

export default function Home() {
  return (
    <>
      <div className='max-w-2xl w-full flex flex-col gap-4'>
        <section>
          <h2>Experience</h2>
          <PaceJob />
        </section>
      </div>
    </>
  );
}
