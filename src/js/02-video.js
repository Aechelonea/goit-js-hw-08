import Player from '@vimeo/player';

const throttle = require('lodash.throttle');

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

if (load('videoplayer-current-time') != undefined) {
  player.setCurrentTime(load('videoplayer-current-time'));
}

player.on(
  'timeupdate',
  throttle(currentTime => {
    save('videoplayer-current-time', currentTime.seconds);
  }, 1000)
);
