var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 110;
var CLOUD_Y = 250;
var GAP = 50;
var FONT_HEIGHT = 20;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;

var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var message = function(ctx, x, y, font, color) {
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.textBaseline = 'hanging';
    ctx.fillText('Ура вы победли!', x, y);
    ctx.fillText('список результатов:', x, y+FONT_HEIGHT);
};

//Функция поиска максимального элемента массива
var getMaxElement = function (arr) {
  return arr.reduce(function (p, v) {
    return ( p > v ? p : v );
  });
}

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X, 20, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X-10, 10, '#FFF')
  message(ctx, CLOUD_X+10, 30, '16px PT Mono', '#000');

  ctx.fillStyle = '#000';

  var maxTime = Math.round(getMaxElement(times));

  for (var i = 0; i < names.length; i++) {
    //   MAX_BAR      BAR-HEIGHT
    // ---------- = ------------
    //   BAR[I]           X
    //

    // X = (BAR_HEIGHT * BAR[I]) / MAX_BAR

    ctx.fillStyle = '#000';
    ctx.fillText(names[i], CLOUD_X+20+(BAR_WIDTH+GAP)*i, CLOUD_Y);

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'red';
    }
    else {
      ctx.fillStyle = 'hsl(240, '+Math.floor(Math.random() * 101)+'%, 50%)';
    }

    ctx.fillRect(CLOUD_X+20+(BAR_WIDTH+GAP)*i, CLOUD_Y-FONT_HEIGHT-((BAR_HEIGHT * Math.round(times[i])) / maxTime), BAR_WIDTH, (BAR_HEIGHT * Math.round(times[i])) / maxTime);
  }
/*
  ctx.fillText(playerName, CLOUD_X+(BAR_WIDTH+GAP)*playerIndex, CLOUD_Y);
  ctx.fillRect(CLOUD_X+(BAR_WIDTH+GAP)*playerIndex, CLOUD_Y-FONT_HEIGHT-BAR_HEIGHT, BAR_WIDTH, BAR_HEIGHT);

  ctx.fillStyle = 'red';
  ctx.fillText('Иван', CLOUD_X+(BAR_WIDTH+GAP)*1, CLOUD_Y);
  ctx.fillRect(CLOUD_X+(BAR_WIDTH+GAP)*1, CLOUD_Y-FONT_HEIGHT-BAR_HEIGHT, BAR_WIDTH, BAR_HEIGHT);

  ctx.fillStyle = 'blue';
  ctx.fillText('Юлия', CLOUD_X+(BAR_WIDTH+GAP)*2, CLOUD_Y);
  ctx.fillRect(CLOUD_X+(BAR_WIDTH+GAP)*2, CLOUD_Y-FONT_HEIGHT-BAR_HEIGHT, BAR_WIDTH, BAR_HEIGHT);

  ctx.fillStyle = 'pink';
  ctx.fillText('Гадя', CLOUD_X+(BAR_WIDTH+GAP)*3, CLOUD_Y);
  ctx.fillRect(CLOUD_X+(BAR_WIDTH+GAP)*3, CLOUD_Y-FONT_HEIGHT-BAR_HEIGHT, BAR_WIDTH, BAR_HEIGHT);*/
}
