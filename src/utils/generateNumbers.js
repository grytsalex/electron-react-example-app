const path = require("path");
const fs = require("fs");
const xlsx = require("xlsx");
const async = require("async");

var q = async.queue(function (name, callback) {
  callback();
}, 256);

function getPath(pathtoFile) {
  const dir = path.join(__dirname, `${pathtoFile}/`);
  const arrayPathToFiles = fs.readdirSync(dir).map((value) => {
    return path.join(dir, value);
  });
  return arrayPathToFiles;
}

function getNumbers(pathToFile) {
  const re = /[, ]/g;
  const reString = /[a-zА-Я]/gi;
  const replacer = new RegExp("[- ()]", "g");
  const doc = xlsx.readFile(pathToFile);
  const arraForMapp = xlsx.readFile(pathToFile).Strings;
  console.log("ArrayForMapp: ", typeof [arraForMapp]);
  const arrayMap = arraForMapp.reduce((acc, value) => {
    const arrayResultOfRe = value["t"].split(re);
    const mapping = arrayResultOfRe.reduce((arr, item) => {
      if (item) {
        if (item.match(reString) == null) {
          item.replace(replacer, "");
          arr.push(item);
        }
      }
      return arr;
    }, []);

    mapping.forEach((finishValue) => {
      acc.push(finishValue.replace(replacer, ""));
    });
    return acc;
  }, []);

  const finishMap = arrayMap.map((value) => {
    return `380${value.substr(-9, 9)}\n`;
  });
  return new Array(...new Set(finishMap));
}

const arrayForWork = getPath("files");

arrayForWork.forEach((value) => {
  getNumbers(value).forEach((number) => {
    if (number.length == 13) {
      q.push(
        number,
        fs.appendFile(
          path.join(__dirname, "number_clear.txt"),
          number,
          "utf-8",
          (err) => {
            if (err) throw err;
          }
        )
      );
    }
  });
});


// TODO: эта функция не используется???
// reafile функция применяется для асинхронного чтения файла. Первый и второй параметр функции опять же соответственно путь к файлу и кодировка. А в качестве третьего параметра передается функция обратного вызова, которая выполняется после завершения чтения. Первый параметр этой функции хранит информацию об ошибке при наличии, а второй - собственно считанные данные.
const read = fs.readFile(
  `${path.join(__dirname, "number_clear.txt")}`, // метод path.join () объединяет все заданные сегменты пути вместе с помощью разделителя, зависящего от платформы, в качестве разделителя, а затем нормализует полученный путь.
  (err, data) => {
    // data - здесь это буфферный обьект(он состоит из байтов)
    if (err) throw err;
    // создание сначала строки из буферного обьекта, а после уже превращение в массив из уникальных данных(номеров)
    const arrayOfUniqueNumbers = new Set(data.toString().split("\n"));
    // каждый номер записывается в файл
    arrayOfUniqueNumbers.forEach((value) => {
      // здесь value это номер
      fs.appendFile(
        // путь к файлу в который происходит запись
        path.join(__dirname, "finish.txt"),
        // значение которое дозаписывается в файл
        `${value}\n`,
        // кодировка
        "utf-8",
        (err) => {
          if (err) throw err;
        }
      );
    });
  }
);
