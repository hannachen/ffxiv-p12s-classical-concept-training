import cn from 'classnames';
import {Menu} from '@headlessui/react';
import {HeartIcon} from '@heroicons/react/20/solid';

export function Option({children, ...props}) {
  return (
    <Menu.Item>
      {({active}) => (
        <a
          href="#"
          className={cn(
            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
            'group flex items-center px-4 py-2 text-sm'
          )}>
          <HeartIcon
            className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          />
          {children}
        </a>
      )}
    </Menu.Item>
  );
}
