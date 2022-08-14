import { Dispatch, SetStateAction, useState } from 'react';

function Star({
  value,
  selectedRating,
  hover,
  click,
}: {
  value: number;
  selectedRating: number;
  hover: (n: number) => void;
  click: (n: number) => void;
}) {
  return (
    <input
      type='radio'
      className={`bg-j-yellowred h-8 w-8 cursor-pointer appearance-none ${
        selectedRating >= value ? 'opacity-1' : 'opacity-50'
      }`}
      onMouseOver={() => hover(value)}
      onClick={() => click(value)}
    />
  );
}

export default function Rating({ update }: { update: (n: number) => void }) {
  const [rating, setRating] = useState<number>(-1);
  const [hover, setHover] = useState<number>(10);
  const [displayHovered, setDisplayHovered] = useState<boolean>(false);

  const ratings = ['Not good', "Could've been better", 'OK', 'Good', 'Great'];

  function hoverRating(n: number) {
    setHover(n);
  }
  function clickRating(n: number) {
    setRating(n);
    update(n);
  }

  function toggleDisplayHover() {
    setDisplayHovered(!displayHovered);
  }

  const displayValue = displayHovered ? hover : rating;

  const displayText = () => {
    if (displayHovered) return ratings[hover];
    if (rating < 0) return 'Select your rating';
    return ratings[rating];
  };

  return (
    <fieldset className='flex flex-row items-center gap-1'>
      <div
        className='grid grid-cols-5 gap-1'
        onMouseEnter={toggleDisplayHover}
        onMouseLeave={toggleDisplayHover}
      >
        {ratings.map((r, i) => (
          <Star
            value={i}
            key={r}
            selectedRating={displayValue}
            hover={hoverRating}
            click={clickRating}
          />
        ))}
      </div>
      <p>{displayText()}</p>
    </fieldset>
  );
}
