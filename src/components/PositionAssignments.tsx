import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';

const defaultAssignments = {
  first: 'blue',
  second: 'purple',
  third: 'orange',
  fourth: 'green',
};

export default function PositionAssignments() {
  const {register, handleSubmit, reset} = useForm();
  const [assignments, setAssignments] = useState(defaultAssignments);
  const columns: any = ['first', 'second', 'third', 'fourth'];
  const options: any = {
    blue: 'Blue',
    purple: 'Purple',
    orange: 'Orange',
    green: 'Green',
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

  return (
    <form
      onReset={onFormReset}
      className="py-8 w-full grid grid-cols-[repeat(4,_1fr)_100px] gap-x-3">
      {columns.map((column: string) => {
        return (
          <select
            key={`${column}`}
            name={`${column}`}
            defaultValue={defaultAssignments[column]}
            onChange={onColumnChange}>
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
      <button type="reset">Reset</button>
    </form>
  );
}
