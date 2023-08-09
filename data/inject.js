const fs = require('fs');

// Чтение файлов
const file1Content = fs.readFileSync('ttarasenkoart.pictures.json', 'utf8');
const file2Content = fs.readFileSync('links.json', 'utf8');

const file1Array = JSON.parse(file1Content);
const file2Array = JSON.parse(file2Content);

// Обновление массива из первого файла
const updatedArray = file1Array.map(item => {
    const match = file2Array.find(obj => obj.id === parseInt(item.name.split('.')[0]));
    if (match) {
        item.image = match.link;
        item.name = item.name.replace(/^\d+\.\s*/, ''); // Remove leading number and dot
    }
    return item;
});

// Сохранение обновленного массива в файл
fs.writeFileSync('updated_file.json', JSON.stringify(updatedArray, null, 2), 'utf8');