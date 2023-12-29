import {useState} from 'react';
import {Switch} from '@headlessui/react';
import {AiOutlineHeatMap} from 'react-icons/ai';
import cn from 'classnames';
import {
  ChevronDownIcon,
  ArrowPathIcon,
  PlayIcon,
  StopIcon,
} from '@heroicons/react/20/solid';
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
  const {
    gameState: {status, debuffs, debug},
  } = useGame();

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

  const buttonColor =
    status === GameStatus.Playing
      ? 'border-pink-400 bg-pink-600 hover:bg-pink-600 focus-visible:outline-pink-700 active:bg-pink-700 shadow-[0_0_45px_-10px_rgb(236_72_153)]'
      : 'border-blue-300 bg-blue-500 hover:bg-blue-600 focus-visible:outline-blue-700 active:bg-blue-700 shadow-[0_0_45px_-10px_rgb(59_130_246)]';

  const handleButtonClick = (e) => {
    switch (status) {
      case GameStatus.Playing:
        console.log('Stopping...');
        onGameReset(e);
        break;
      case GameStatus.Inactive:
      case GameStatus.ShowResult:
        setOpen(false);
        onGameStart(e);
        break;
      default:
    }
  };

  function getButtonCta(status) {
    switch (status) {
      case GameStatus.Playing:
        return (
          <>
            <span className="pl-4 pr-1">Stop</span>
            <StopIcon className="inline-block w-10 mr-2" />
          </>
        );
      case GameStatus.Inactive:
        return (
          <>
            <span className="pl-4 pr-1">Start</span>
            <PlayIcon className="inline-block w-10" />
          </>
        );
      case GameStatus.ShowResult:
        return (
          <>
            <ArrowPathIcon className="inline-block w-8 ml-2" />
            <span className="pl-[4px] pr-4">Restart</span>
          </>
        );
      default:
    }
  }

  return (
    <div
      id="controls"
      className={cn(
        'absolute w-full z-20',
        'transition-position duration-300 ease-in-out',
        open
          ? 'bottom-0'
          : status === GameStatus.Playing
            ? '-bottom-[165px]'
            : '-bottom-[85px]'
      )}
    >
      <div className="relative mx-auto grid grid-cols-[repeat(12,_1fr)] py-5 max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
        <div className="grid col-span-4 justify-center">
          {debug && debuffs && debuffs.number}
          <Debuffs
            {...debuffs}
            className={cn(
              status === GameStatus.Playing || status === GameStatus.ShowResult
                ? 'opacity-100 translate-y-0 visible'
                : 'opacity-0 -translate-y-[155px] hidden'
            )}
          />
        </div>
        <div className="flex col-start-5 col-span-4 justify-center">
          <button
            type="button"
            className={cn(
              buttonColor,
              'min-w-[160px] rounded-full border-4 px-2 py-1.5 flex align-middle items-center justify-center',
              'text-[32px] font-normal tracking-normal text-white leading-snug',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
            )}
            onClick={(e) => handleButtonClick(e)}
          >
            {getButtonCta(status)}
          </button>
        </div>
        <div className="grid"></div>
      </div>
      <div className="w-full min-h-[175px] backdrop-blur-sm bg-gray-800/75">
        <div className="relative mx-auto grid grid-cols-[repeat(12,_1fr)] pb-[125px] pt-8 max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
          <div className="grid col-span-4">
            <div className="flex flex-col w-full md:flex-row items-center md:items-start">
              <label
                className={cn(
                  'flex flex-wrap md:self-center shrink text-pink-400 font-medium text-md',
                  openHeader ? 'opacity-100' : 'opacity-50'
                )}
              >
                <AiOutlineHeatMap
                  size={38}
                  color="#f472b6"
                  className={cn(openHeader ? 'opacity-100' : 'opacity-50')}
                />
                <Switch
                  checked={openHeader}
                  onChange={toggleHeaders}
                  className={cn(
                    openHeader ? 'opacity-100' : 'opacity-50',
                    'bg-pink-400 relative mx-1 flex h-[37px] w-[73px] cursor-pointer rounded-full border-[3px] border-transparent transition-colors duration-200 ease-in-out',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75'
                  )}
                >
                  <span className="sr-only">
                    {openHeader ? 'Hide' : 'Show'} column symbols
                  </span>
                  <span
                    aria-hidden="true"
                    className={`${openHeader ? 'translate-x-9' : 'translate-x-0'}
                  pointer-events-none inline-block h-[32px] w-[32px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                  />
                </Switch>
                <span
                  className={cn(
                    'invisible md:visible self-center text-xl ml-1 text-pink-400',
                    openHeader ? 'opacity-100' : 'opacity-50'
                  )}
                >
                  {openHeader ? 'Hide' : 'Show'} symbols
                </span>
              </label>
            </div>
          </div>
          <div id="menuHandle" className="grid col-start-11 col-span-2">
            <button
              className="bg-slate-200/0 flex justify-end"
              onClick={toggleDrawer}
              title="Close settings"
            >
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
              'absolute rounded-lg left-0 right-0 col-span-12 bg-sky-300 bottom-2.5 z-30',
              'transition-[opacity] delay-100 duration-300 ease-in-out',
              open ? 'opacity-100' : 'opacity-0'
            )}
          >
            <PositionAssignments />
          </div>
        </div>
      </div>
    </div>
  );
}
