import cn from 'classnames';

import check from '../images/076574_hr1.png';
import cross from '../images/076575_hr1.png';

export const enum Result {
  Correct = 'correct',
  Incorrect = 'incorrect',
}

interface ResultProps {
  result?: Result;
}

export function Results({result}: ResultProps) {
  return (
    <div
      className={cn(
        'dark-bg',
        'absolute top-0 right-0 bottom-0 left-0 bg-blend-darken z-10 flex justify-center items-center',
        result !== undefined ? 'opacity-100 visible' : 'opacity-0 hidden'
      )}
    >
      <div className="pb-6">
        {result === Result.Correct && (
          <div className="flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-neutral-50">Correct!</span>
            <img src={check} className="w-[150px]" alt="Green checkmark" />
          </div>
        )}
        {result === Result.Incorrect && (
          <div className="flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-neutral-50">Wrong!</span>
            <img src={cross} className="w-[150px]" alt="Red cross" />
          </div>
        )}
      </div>
    </div>
  );
}
