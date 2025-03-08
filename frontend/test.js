function generateHabitHistoryByQuantity(quantity) {
  const completion_frequency = 3;
  const habitItems = [];

  for (let i = 0; i < quantity; i++) {
    let id = i;
    const completion_count = getRandomNumber(0, completion_frequency);

    const daysFromToday = i * 1000 * 60 * 60 * 24;
    const date = new Date(new Date() - daysFromToday)
      .toISOString()
      .slice(0, 10);

    habitItems.push({
      id,
      date,
      completion_count,
      completion_frequency,
    });
  }

  return habitItems;
}

// Использование

function getRandomNumber(start, end) {
  return Math.floor(Math.random() * (end - start + 1)) + start;
}

import fs from 'fs';
function saveArrayToArrayFile(arr, filename) {
  // Проверка, если necesarios, чтобы файл уже не существовал
  if (fs.existsSync(filename)) {
    const answer = confirm(
      `Такой файл уже существует. Вы хотите перезаписать его?`
    );
    if (!answer) {
      return console.log(
        'Отменено. Пожалуйста, удалите файл или используйте другой имя.'
      );
    }
  }

  // Обработка массива в формате JSON
  const jsonString = JSON.stringify(arr, null, 2); // синтаксисᶦ窠_4 позволяет🤔 проверять практическую единицу для отображения-indentation`

  // Сохранение в файл
  fs.writeFile(filename, jsonString, 'utf8', (err) => {
    if (err) {
      console.error('Ошибка при сохранении файла:', err);
      return;
    }
    console.log('JSON массив успешно сохранен в файлPermissionsPath');
  });
}

saveArrayToArrayFile(
  generateHabitHistoryByQuantity(700),
  'habitHistoryMock.json'
);
