'use strict';

// Окно настройки персонажа
var setup = document.querySelector('.setup');

// Добавление tabIndex иконке персонажа и кнопке закрытия настроек
var setupIcon = document.querySelector('.setup-open-icon');
var setupClose = document.querySelector('.setup-close');
setupIcon.tabIndex = 0;
setupClose.tabIndex = 0;

var openSetupButton = document.querySelector('.setup-open');
var closeSetupButton = setup.querySelector('.setup-close');

// Открытие по клику и закрытие на ESC настроек
openSetupButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  setup.classList.remove('hidden');

  document.addEventListener('keydown', function (evtKey) {
    var setupInput = document.querySelector('.setup-user-name');
    if ((evtKey.keyCode === 27) && !(setupInput === document.activeElement)) {
      setup.classList.add('hidden');
    }
  });
});

// Закрытие настроек
closeSetupButton.addEventListener('click', function () {
  setup.classList.add('hidden');
});

// Открытие настроек на ENTER
document.addEventListener('keydown', function (evt) {
  if ((evt.keyCode === 13) && (setupIcon === document.activeElement)) {
    setup.classList.remove('hidden');
  }
});

// Закрытие настроек по нажатию ENTER, когда крестик в фокусе
document.addEventListener('keydown', function (evt) {
  if ((evt.keyCode === 13) && (setupClose === document.activeElement)) {
    setup.classList.add('hidden');
  }
});

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
  ],

  fireballColors: [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
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

// События
// Изменение персонажа-----------------------

// Функция изменение цвета по клику
var changeColorOnClick = function (parent, changingElement, arr, hiddenInput) {
  var parentElement = document.querySelector(parent);
  var element = parentElement.querySelector(changingElement);
  var input = document.querySelector(hiddenInput);

  element.addEventListener('click', function () {
    if (element.tagName === 'DIV') {
      element.style.background = arr[getRandomIndex(arr)];
      input.value = element.style.background;
    } else {
      element.style.fill = arr[getRandomIndex(arr)];
      input.value = element.style.fill;
    }
  });
};

// Изменение цвета мантии
changeColorOnClick('.setup-wizard', '.wizard-coat', dataBase.coatColors, 'input[name="coat-color"]');
// Изменение цвета глаз
changeColorOnClick('.setup-wizard', '.wizard-eyes', dataBase.eyesColors, 'input[name="eyes-color"]');
// Изменение фаербола
changeColorOnClick('body', '.setup-fireball-wrap', dataBase.fireballColors, 'input[name="fireball-color"]');

// ------------------------------------------

