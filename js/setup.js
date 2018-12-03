'use strict';

// Удаляет класс карты
var setup = document.querySelector('.setup');
setup.classList.remove('hidden');

// Удаляет класс с блока похожих персонажей
var setupSimilar = document.querySelector('.setup-similar');
setupSimilar.classList.remove('hidden');

var WIZARDS_QUANTITY = 4;

var dataBase = {
  names: [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ],

  sernames: [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ],

  coatColors: [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ],

  eyesColors: [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ]
};

var getRandomIndex = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

// Функция создания массива объектов
var generateObjects = function (dataArr, quantity) {
  var list = [];
  for (var i = 0; i < quantity; i++) {
    var object = {
      name: dataBase.names[getRandomIndex(dataBase.names)] + ' ' + dataBase.sernames[getRandomIndex(dataBase.sernames)],
      coatColor: dataBase.coatColors[getRandomIndex(dataBase.coatColors)],
      eyesColor: dataBase.eyesColors[getRandomIndex(dataBase.eyesColors)]
    };
    list.push(object);
  }
  return list;
};

// Функция отрисовки похожих элементов
var renderSimilarElements = function (dataArr, targetList, templateId, templateClass) {
  // Куда вставлять похожие элементы
  var similarElements = document.querySelector(targetList);
  // Переменная для хранения элемента из шаблона
  var similarElementTamplate = document.querySelector(templateId)
    .content
    .querySelector(templateClass);

  // Отрисовка похожих элементов
  var fragmentSimilarElements = document.createDocumentFragment();
  for (var i = 0; i < dataArr.length; i++) {
    var similarElement = similarElementTamplate.cloneNode(true);
    var wizarsName = similarElement.querySelector('.setup-similar-label');
    wizarsName.textContent = dataArr[i].name;
    var wizardCoat = similarElement.querySelector('.wizard-coat');
    wizardCoat.style.fill = dataArr[i].coatColor;
    var wizardEyes = similarElement.querySelector('.wizard-eyes');
    wizardEyes.style.fill = dataArr[i].eyesColor;
    fragmentSimilarElements.appendChild(similarElement);
  }
  // Добавляет фрагмент с похожими элементами в заданный список
  similarElements.appendChild(fragmentSimilarElements);
};

// Создание массива объектов
var objects = generateObjects(dataBase, WIZARDS_QUANTITY);

// Отрисовка похожих элементов на странице
renderSimilarElements(objects, '.setup-similar-list', '#similar-wizard-template', '.setup-similar-item');
