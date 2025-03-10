import { Wrapper } from 'components/Wrapper';
import './style/reset.css';
import './style/core.css';
import { Habit } from 'components/Habit';
import { useEffect, useState } from 'react';
import { Header } from 'components/Header';
import { useToggle } from './hooks/useToggle';
import { CreateNewHabitModal } from 'components/CreateNewHabitModal';
import { HabitDetailsModal } from 'components/HabitDetailsModal';

function App() {
  const [windowWidth, setWindowWidth] = useState(window?.innerWidth || 0);

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

  return (
    <Wrapper>
      <Header addButtonHandler={openCreateHabitModal} />
      <Habit
        elementsCount={calculateElementsCount(windowWidth) * 7}
        openHabitDetailsModal={openHabitDetailsModal}
      />
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

// пишем фронт, просто визуальную часть, без запросов к апи, только интерфейс.На моках
// Сделать модалку с подробностями
// Сделать валидацию полей
// По идее на этом фронтовая часть будет завершена.
