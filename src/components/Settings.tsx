import {useState} from 'react';
import cn from 'classnames';
import {Drawer, IconButton, Button} from '@material-tailwind/react';
import PositionAssignments from './PositionAssignments';
import {useDebuffs} from '../hooks/useDebuffs';
import Debuffs from './Debuffs';

interface ControlsProps {
  onStart: (e) => void;
}

export default function Settings({onStart}: ControlsProps) {
  const [open, setOpen] = useState(true);
  const {debuffs} = useDebuffs();

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  console.log('open?', open);

  return (
    <div className="h-20">
      <Drawer
        placeholder=""
        placement="bottom"
        open={open}
        onClose={closeDrawer}
        dismiss={{
          enabled: true,
          escapeKey: true,
          outsidePress: false,
        }}
        size={150}
        overlay={false}
        className="grid grid-cols-[repeat(12,_1fr)] p-4 pb-[75px] max-h-16">
        <Debuffs {...debuffs} />
        <Button
          color="deep-orange"
          placeholder=""
          className="col-start-5 col-span-4 bottom-3 left-3 tracking-wide font-normal text-lg p-1 px-5 rounded-[5px] normal-case"
          onClick={(e) => onStart(e)}>
          Start
        </Button>
        <div id="menuHandle" className="grid col-start-11 col-span-2">
          <IconButton placeholder="">
            <i className="fas fa-heart" />
          </IconButton>
          <button
            className="w-full bg-slate-200"
            onClick={() => setOpen(false)}
            title="Close settings"></button>
        </div>
        <div
          className={cn(
            'absolute bottom-0 left-0 w-full bg-sky-300',
            open ? 'visible opacity-100' : 'hidden opacity-0'
          )}>
          <PositionAssignments />
        </div>
      </Drawer>
    </div>
  );
}
