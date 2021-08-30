// const path = require("path");
// const fs = require("browserify-fs");
// const xlsx = require("xlsx");
// const async = require("async");

import path from "path";
import fs from "fs";
import xlsx from "xlsx";
import async from "async";


export const startProccess = () => {
  arrayForWork.forEach((value) => {
    // здесь VALUE - C:\Users\Admin\Desktop\APPS\NodeApp\files\amocrm_export_leads_2021-08-12.xlsx
    getNumbers(value).forEach((number) => {
      // eslint-disable-next-line
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
};

// async.queue - cоздает объект очереди с указанным параллелизмом. Задачи, добавленные в очередь, обрабатываются параллельно (до ограничения параллелизма). Если все рабочие процессы выполняются, задача ставится в очередь до тех пор, пока один из них не станет доступным. Как только работник завершает задачу, вызывается обратный вызов этой задачи.
// здесь функци переданная первым параметром это worker - асинхронная функция для обработки задачи в очереди. Если вы хотите обрабатывать ошибки отдельной задачи, передайте обратный вызов q.push (). Вызывается с помощью (задача, обратный вызов).
// число переданное вторым параметром - целое число, определяющее, сколько рабочих функций должно выполняться параллельно. Если этот параметр не указан, по умолчанию для параллелизма устанавливается значение 1. Если для параллелизма установлено значение 0, выдается ошибка.
var q = async.queue(function (name, callback) {
  callback();
}, 256);

// получает путь к файлу
function getPath(pathtoFile) {
  // присваевается путь к директории где лежит файл, папка 'files'
  const dir = path.join(__dirname, `${pathtoFile}/`);
  // к каждому имени файла подставляем путь к директории
  const arrayPathToFiles = fs.readdirSync(dir).map((value) => {
    return path.join(dir, value);
  });
  return arrayPathToFiles;
}

function getNumbers(pathToFile) {
  // одновременно разбивает строку по пробелу и запятой
  const re = /[, ]/g;
  // буквы где угодно в строке
  const reString = /[a-zА-Я]/gi;
  // везде где в строке есть эти символы
  const replacer = new RegExp("[- ()]", "g");

  const arrayForMap = xlsx.readFile(pathToFile).Strings;

  const arrayMap = arrayForMap.reduce((acc, value) => {
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

// arrayForWork это массив с строкой которая является путем к xlsx файлу => тот что ниже value

// TODO: эта функция не используется???
// readfile функция применяется для асинхронного чтения файла. Первый и второй параметр функции опять же соответственно путь к файлу и кодировка. А в качестве третьего параметра передается функция обратного вызова, которая выполняется после завершения чтения. Первый параметр этой функции хранит информацию об ошибке при наличии, а второй - собственно считанные данные.
// eslint-disable-next-line
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
