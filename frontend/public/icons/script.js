import fs from 'fs';
import path from 'path';

// Получаем все SVG файлы в текущей директории
const currentDir = process.cwd();
const files = fs
  .readdirSync(currentDir)
  .filter((file) => path.extname(file).toLowerCase() === '.svg');

files.forEach((file) => {
  const filePath = path.join(currentDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Получаем имя файла без расширения
  const fileName = path.basename(file, '.svg');

  // Регулярное выражение для поиска открывающего тега svg с атрибутами
  // Ищем <svg ... > или <svg ... />
  const svgTagRegex = /<svg([^>]*)>/;
  const match = content.match(svgTagRegex);

  if (match) {
    let attributes = match[1];
    let hasId = /id\s*=\s*["'][^"']*["']/.test(attributes);
    let modified = false;

    // 1. Добавляем id, если его нет
    if (!hasId) {
      attributes = attributes.trim();
      if (attributes && !attributes.endsWith('/')) {
        attributes = ` ${attributes} `;
      }
      attributes = `${attributes} id="${fileName}"`;
      modified = true;
    }

    // 2. Удаляем width и height атрибуты
    const widthRegex = /width\s*=\s*["'][^"']*["']\s*/g;
    const heightRegex = /height\s*=\s*["'][^"']*["']\s*/g;

    const newAttributes = attributes
      .replace(widthRegex, '')
      .replace(heightRegex, '')
      .trim();

    if (newAttributes !== attributes) {
      modified = true;
    }

    // Если были изменения, заменяем тег
    if (modified) {
      const newSvgTag = `<svg${newAttributes ? ' ' + newAttributes : ''}>`;
      content = content.replace(svgTagRegex, newSvgTag);

      // Записываем изменения обратно в файл
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(
        `✅ Обработан: ${file} (id: "${fileName}", удалены width/height)`,
      );
    } else {
      console.log(`⏭️ Без изменений: ${file}`);
    }
  } else {
    console.log(`⚠️ Не найден тег <svg> в файле: ${file}`);
  }
});

console.log(`\n📁 Обработано файлов: ${files.length}`);
