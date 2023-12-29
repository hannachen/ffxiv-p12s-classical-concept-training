import {Fragment, useState} from 'react';
import {Menu, Transition} from '@headlessui/react';
import {ChevronDownIcon} from '@heroicons/react/20/solid';

export function Select({children, ...props}) {
  const [selectedOption, setSelectedOption] = useState(props.defaultValue);

  function getSelectedValue() {
    const selectedValue = children.find((child) => {
      if (child.props.value.toLowerCase() === selectedOption) {
        return child.props.value;
      }
    });

    console.log('selectedValue', selectedValue);
    return selectedValue;
  }

  const selectedValue = getSelectedValue();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full items-center justify-center gap-x-1.5 rounded-md bg-white text-md font-normal text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {selectedValue || 'Options'}
          <ChevronDownIcon
            className="absolute right-5 -mr-1 h-5 w-5 justify-self-end text-gray-400"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute bottom-1 left-2 z-1000 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">{children}</div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
