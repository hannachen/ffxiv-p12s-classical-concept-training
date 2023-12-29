import cn from 'classnames';
import {Menu} from '@headlessui/react';

export function Option({children, ...props}) {
  return (
    <Menu.Item {...props}>
      {({active}) => (
        <a
          href="#"
          className={cn(
            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
            'w-full group flex items-center px-4 py-2'
          )}
        >
          {children}
        </a>
      )}
    </Menu.Item>
  );
}
