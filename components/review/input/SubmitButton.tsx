export default function SubmitButton({
  submit,
  disabled,
  submitted,
}: {
  submit: () => void;
  disabled: boolean;
  submitted: boolean;
}) {
  function handleClick(e: any) {
    e.preventDefault();
    if (disabled) return;
    submit();
  }

  const displayText = submitted ? 'Submission received' : 'Submit';

  return (
    <button
      onClick={(e) => handleClick(e)}
      className={`py-1 bg-j-magenta text-white  ${
        disabled
          ? 'cursor-default opacity-75'
          : 'opacity-90 cursor-pointer hover:opacity-100'
      }`}
      disabled={disabled}
    >
      {displayText}
    </button>
  );
}
