import BalloonScene from '@/components/plot/three/balloon/BalloonScene';

export default function BalloonPage() {
  return (
    <div className='max-w-2xl w-full flex flex-col gap-4'>
      <section className='h-64'>
        <h2>Balloons</h2>
        <div className='h-full'>
          <BalloonScene />
        </div>
      </section>
    </div>
  );
}
