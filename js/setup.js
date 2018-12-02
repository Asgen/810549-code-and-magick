'use strict';

// Удаляет класс карты
var setup = document.querySelector('.setup');
setup.classList.remove('hidden');

// Удаляет класс с блока похожих персонажей
var setupSimilar = document.querySelector('.setup-similar');
setupSimilar.classList.remove('hidden');

var dataBase = [
  [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ],

  [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ],

  [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ],

  [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ]
];

var getRandomIndex = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

var WIZARDS_QUANTITY = 4;
var NAMES = dataBase[0];
var SERNAMES = dataBase[1];
var COAT_COLORS = dataBase[2];
var EYES_COLORS = dataBase[3];

// Функция создания массива объектов
var generateObjects = function (dataArr, quantity) {
  var list = [];
  for (var i = 0; i < quantity; i++) {
    var object = {
      name: NAMES[getRandomIndex(NAMES)] + ' ' + SERNAMES[getRandomIndex(SERNAMES)],
      coatColor: COAT_COLORS[getRandomIndex(COAT_COLORS)],
      eyesColor: EYES_COLORS[getRandomIndex(EYES_COLORS)]
    };
    list.push(object);
  }
  return list;
};

// Функция добавление текстового содержимого элементу родителя
var addTextContent = function (parent, elementClass, text) {
  var element = parent.querySelector(elementClass);
  element.textContent = text;
};

// Функция изменения FILL элемента родителя
var changeFill = function (parent, elementClass, color) {
  var element = parent.querySelector(elementClass);
  element.style.fill = color;
};

// Функция отрисовки похожих элементов
var renderSimilarElements = function (dataArr, targetList, templateId, templateClass) {
  // Куда вставлять Волшебников
  var similarElements = document.querySelector(targetList);
  // Переменная для хранения элемента из шаблона
  var similarElementTamplate = document.querySelector(templateId)
    .content
    .querySelector(templateClass);

  // Отрисовка Меток на карте
  var fragmentSimilarElements = document.createDocumentFragment();
  for (var i = 0; i < dataArr.length; i++) {
    var similarElement = similarElementTamplate.cloneNode(true);
    addTextContent(similarElement, '.setup-similar-label', dataArr[i].name);
    changeFill(similarElement, '.wizard-coat', dataArr[i].coatColor);
    changeFill(similarElement, '.wizard-eyes', dataArr[i].eyesColor);
    fragmentSimilarElements.appendChild(similarElement);
  }
  // Добавляет фрагмент с метками в список меток
  similarElements.appendChild(fragmentSimilarElements);
};

// Создание массива объектов
var objects = generateObjects(dataBase, WIZARDS_QUANTITY);

// Отрисовка похожих элементов на странице
renderSimilarElements(objects, '.setup-similar-list', '#similar-wizard-template', '.setup-similar-item');
