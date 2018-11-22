'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 110;
var CLOUD_Y = 250;
var COLUMN_GAP = 50;
var GAP = 10;
var FONT_HEIGHT = 20;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var strings = [
  'Ура вы победли!',
  'список результатов:'
];

var message = function (ctx, x, y, font, color, texts) {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textBaseline = 'hanging';

  for (var i = 0; i < texts.length; i++) {
    ctx.fillText(texts[i], x, y + FONT_HEIGHT * i);
  }
};

// Функция поиска максимального элемента массива
var getMaxElement = function (arr) {
  return arr.reduce(function (p, v) {
    return (p > v ? p : v);
  });
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X, 20, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X - 10, 10, '#FFF');
  message(ctx, CLOUD_X + 10, 30, '16px PT Mono', '#000', strings);

  ctx.fillStyle = '#000';

  var maxTime = Math.round(getMaxElement(times));

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], CLOUD_X + 20 + (BAR_WIDTH + COLUMN_GAP) * i, CLOUD_Y);
    ctx.fillText(Math.round(times[i]), CLOUD_X + 20 + (BAR_WIDTH + COLUMN_GAP) * i, CLOUD_Y - FONT_HEIGHT - GAP - ((BAR_HEIGHT * Math.round(times[i])) / maxTime));

    ctx.fillStyle = (names[i] === 'Вы' ? 'red' : 'hsl(240, ' + Math.floor(Math.random() * 101) + '%, 50%)');
    ctx.fillRect(CLOUD_X + 20 + (BAR_WIDTH + COLUMN_GAP) * i, CLOUD_Y - GAP - ((BAR_HEIGHT * Math.round(times[i])) / maxTime), BAR_WIDTH, (BAR_HEIGHT * Math.round(times[i])) / maxTime);
  }
};
