import { Wrapper } from 'components/Wrapper';
import './style/reset.css';
import './style/core.css';
import { useEffect, useState } from 'react';
import { Header } from 'components/Header';
import { useToggle } from './hooks/useToggle';
import { CreateNewHabitModal } from 'components/CreateNewHabitModal';
import { HabitDetailsModal } from 'components/HabitDetailsModal';
import { getHabitsWithCompletions } from './api/habit';
import { HabitElement } from 'components/HabitElement';
import { HabitWithCompletions } from './types/types';

function App() {
  const [windowWidth, setWindowWidth] = useState(window?.innerWidth || 0);
  const [habits, setHabits] = useState<HabitWithCompletions[]>([]);

  const {
    open: openCreateHabitModal,
    close: closeCreateHabitModal,
    isOpen: isCreateHabitModalOpen,
  } = useToggle();

  const {
    open: openHabitDetailsModal,
    close: closeHabitDetailsModal,
    isOpen: isHabitDetailsModalOpen,
  } = useToggle();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window?.innerWidth ?? 0);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const currentDate = new Date();
    const currentISO = currentDate.toISOString();

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    const sixMonthsAgoISO = sixMonthsAgo.toISOString();

    getHabitsWithCompletions(sixMonthsAgoISO, currentISO).then((res) => {
      setHabits(res);
    });
  }, []);

  return (
    <Wrapper>
      <Header addButtonHandler={openCreateHabitModal} />
      {habits.map((habit) => (
        <HabitElement
          key={habit.id}
          habit={habit}
          elementsCount={calculateElementsCount(windowWidth) * 7}
          openHabitDetailsModal={openHabitDetailsModal}
        />
      ))}

      <CreateNewHabitModal
        isOpen={isCreateHabitModalOpen}
        close={closeCreateHabitModal}
      />
      <HabitDetailsModal
        isOpen={isHabitDetailsModalOpen}
        close={closeHabitDetailsModal}
      />
    </Wrapper>
  );
}

export default App;

const calculateElementsCount = (windowWidth: number) => {
  const contentWrapperPadding = 32;
  const habitContainerPadding = 16;
  const contentWidth =
    windowWidth < 768
      ? windowWidth - contentWrapperPadding - habitContainerPadding
      : 768 - contentWrapperPadding - habitContainerPadding;
  const elementsWithGapCount = (contentWidth - (contentWidth % 14)) / 14;
  return contentWidth % 14 < 10
    ? elementsWithGapCount
    : elementsWithGapCount + 1;
};
