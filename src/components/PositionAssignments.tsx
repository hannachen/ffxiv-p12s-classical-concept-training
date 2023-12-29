import {useEffect, useState} from 'react';
import {Select} from './Form/Select/Select';
import {Option} from './Form/Select/Option';

import cross from '../images/blue-cross.png';
import square from '../images/purple-square.png';
import circle from '../images/orange-circle.png';
import triangle from '../images/green-triangle.png';

const defaultAssignments = {
  first: 'cross',
  second: 'square',
  third: 'circle',
  fourth: 'triangle',
};

export default function PositionAssignments() {
  const [assignments, setAssignments] = useState(defaultAssignments);
  const columns: any = ['first', 'second', 'third', 'fourth'];
  const options: any = {
    cross: 'Blue',
    square: 'Purple',
    circle: 'Orange',
    triangle: 'Green',
  };

  useEffect(() => {
    console.log(assignments);
  }, [assignments]);

  function onFormReset() {
    setAssignments(defaultAssignments);
  }

  function onColumnChange(event: any) {
    const {name, value} = event.target;
    setAssignments({...assignments, [name]: value});
  }

  function getImage(key: string) {
    switch (key) {
      case 'cross':
        return cross;
      case 'square':
        return square;
      case 'circle':
        return circle;
      case 'triangle':
        return triangle;
    }
  }

  return (
    <form
      onReset={onFormReset}
      className="pt-2 px-5 w-full grid grid-cols-[repeat(4,_1fr)] gap-x-5"
    >
      {columns.map((column: string) => {
        return (
          <Select
            placeholder={defaultAssignments[column]}
            key={`${column}`}
            name={`${column}`}
            selected={assignments[column]}
            defaultValue={defaultAssignments[column]}
            onChange={onColumnChange}
          >
            {Object.keys(options).map((key, index) => {
              return (
                <Option
                  value={key}
                  text={options[key]}
                  key={`first-${index}`}
                  defaultSelected={defaultAssignments[key]}
                  selected={assignments[column] === key}
                >
                  <img src={getImage(key)} height={36} width={36} alt={`${key}`} />
                  {options[key]}
                </Option>
              );
            })}
          </Select>
        );
      })}
      <div className="col-span-4">
        <button type="reset" className="h-9">
          Reset
        </button>
      </div>
    </form>
  );
}
