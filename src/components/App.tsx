import Stage from './Stage';
import PositionAssignments from './PositionAssignments';
import Controls from './Controls';

export default function App() {
  return (
    <div className="mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg">
      <PositionAssignments />
      <Controls />
      <Stage />
    </div>
  );
}
