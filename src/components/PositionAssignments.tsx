import {useEffect, useState} from 'react';
import cn from 'classnames';
import {Select} from './Form/Select/Select';
import {useForm} from 'react-hook-form';
import {Option} from './Form/Select/Option';

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
      className="p-2 px-10 w-full grid grid-cols-[repeat(4,_1fr)] gap-x-5">
      {columns.map((column: string) => {
        return (
          <Select
            placeholder={defaultAssignments[column]}
            key={`${column}`}
            name={`${column}`}
            selected={assignments[column]}
            defaultValue={defaultAssignments[column]}
            onChange={onColumnChange}>
            {Object.keys(options).map((key, index) => {
              return (
                <Option
                  value={key}
                  text={options[key]}
                  key={`first-${index}`}
                  defaultSelected={defaultAssignments[key]}>
                  {({active}) => (
                    <a
                      href="#"
                      className={cn(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'group flex items-center px-4 py-2 text-sm'
                      )}>
                      {options[key]}
                    </a>
                  )}
                </Option>
              );
            })}
          </Select>
        );
      })}
      <div className="col-span-4">
        <button type="reset" className='h-9'>Reset</button>
      </div>
    </form>
  );
}
