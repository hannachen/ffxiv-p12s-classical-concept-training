import {useState} from 'react';
import {Switch} from '@headlessui/react'
import cn from 'classnames';
import {ChevronDownIcon} from '@heroicons/react/20/solid';
import PositionAssignments from './PositionAssignments';
import {useGame, GameStatus} from '../hooks/useGame';
import Debuffs from './Debuffs';

interface ControlsProps {
  onGameStart: (e) => void;
  onGameStop?: (e) => void;
  onGameReset?: (e) => void;
  onOpenHeader?: () => void;
  onCloseHeader?: () => void;
  defaultOpen?: boolean;
}

export default function Settings({
  onGameStart,
  onGameStop = () => {},
  onGameReset = () => {},
  onOpenHeader = () => {},
  onCloseHeader = () => {},
  defaultOpen = false,
}: ControlsProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [openHeader, setOpenHeader] = useState(true);
  const {gameState: {status, debuffs}} = useGame();

  console.log('open?', open);

  function closeDrawer() {
    setOpen(false);
  }

  function openDrawer() {
    setOpen(true);
  }

  function toggleDrawer() {
    setOpen(!open);
  }

  function toggleHeaders() {
    if (openHeader) {
      onCloseHeader();
    } else {
      onOpenHeader();
    }

    setOpenHeader(!openHeader);
  }

  const buttonColor = status === GameStatus.Playing ? 'red' : 'blue';

  const handleButtonClick = (e) => {
    switch (status) {
      case GameStatus.Playing:
        console.log('Stopping...');
        onGameStop(e);
        break;
      case GameStatus.Inactive:
      case GameStatus.ShowResult:
        onGameStart(e);
        break;
      default:
    }
  }

  return (
    <div
      id="controls"
      className={cn(
        'absolute w-full min-h-[165px] backdrop-blur-sm bg-gray-800/60',
        'transition-position duration-300 ease-in-out',
        open ? 'bottom-0' : status === GameStatus.Playing ? '-bottom-[120x]' : '-bottom-[80px]',
      )}>
      <div className="relative mx-auto grid grid-cols-[repeat(12,_1fr)] p-4 pb-[120px] pt-8 max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg">
        <div className="grid col-start-5 col-span-4 justify-center">
          <button
            type="button"
            className={cn(`min-w-[140px] rounded-full border-2 border-${buttonColor}-120 bg-${buttonColor}-700 px-3 py-1.5`,
            'text-[32px] font-normal tracking-normal text-white shadow-sm',
            'absolute -top-14 left-1/2 -translate-x-1/2',
            `hover:bg-${buttonColor}-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-${buttonColor}-700`)}
            onClick={(e) => handleButtonClick(e)}>
            {status === GameStatus.Playing ? 'Stop' : 'Start'}
          </button>
        </div>
        <div className="grid"></div>
        <div className='grid col-span-4'>
          <div className='flex flex-row w-full'>
            <Switch
              checked={openHeader}
              onChange={toggleHeaders}
              className={`${openHeader ? 'bg-teal-600' : 'bg-teal-800'}
                relative flex h-[37px] w-[73px] cursor-pointer rounded-full border-[3px] border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
              >
                <span className="sr-only">Show column symbols</span>
              <span
                aria-hidden="true"
                className={`${openHeader ? 'translate-x-9' : 'translate-x-0'}
                  pointer-events-none inline-block h-[32px] w-[32px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
              />
            </Switch>
            <label className="flex flex-wrap self-center shrink ml-3 text-teal-700 font-semibold text-md">Show symbols</label>
          </div>
        </div>
        <Debuffs {...debuffs} />
        <div id="menuHandle" className="grid col-start-11 col-span-2">
          <button className="bg-slate-200" onClick={toggleDrawer} title="Close settings">
            <ChevronDownIcon
              className={cn(
                'mr-3 h-10 w-10 text-gray-400 group-hover:text-gray-500',
                !open && 'rotate-180'
              )}
              aria-hidden="true"
            />
          </button>
        </div>
        <div
          className={cn(
            'absolute left-0 right-0 col-span-12 bg-sky-300 bottom-0 transform-gpu',
            'transition-[opacity] delay-100 duration-300 ease-in-out]',
            open ? 'opacity-100' : 'opacity-0'
          )}>
          <PositionAssignments />
        </div>
      </div>
    </div>
  );
}
