import { useState } from 'react';

export default function PositionAssignments() {
  const [assignments, setAssignments] = useState({
      first: 'blue',
      second: 'purple',
      third: 'orange',
      fourth: 'green',
  });
  const columns: any = ['first', 'second', 'third', 'fourth'];
  const options: any = {
    blue: 'Blue',
    purple: 'Purple',
    orange: 'Orange',
    green: 'Green',
  };

  return (
    <form className="w-full grid grid-cols-[repeat(4,_1fr)_300px] gap-x-1">
      {columns.map((column: string) => {
        return (
          <select key={`${column}`}>
            {Object.keys(options).map((key, index) => {
              return (
                <option value={key} key={`first-${index}`}>
                  {options[key]}
                </option>
              );
            })}
          </select>
        );
      })}
      <button>Reset</button>
    </form>
  );
}
