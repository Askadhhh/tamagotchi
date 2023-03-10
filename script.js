"use strict";

const hpBar = document.getElementById("hpBar");
const satietyBar = document.getElementById("satietyBar");
const inputAttack = document.getElementById("inputAttack");
const inputHealth = document.getElementById("inputHealth");
const buttonAttack = document.getElementById("buttonAttack");
const buttonHealth = document.getElementById("buttonHealth");

const user = {
  name: "Игуанадон",
  currentHp: 5000,
  maxHp: 5000,
  speed: 24, // км/ч
  currentSatiety: 80, //0 - 100
  maxSatiety: 100,
  getHungerStatus: function () {
    /* 
    0-33 Очень голоден
    34-66 Голоден
    67-100 Сытый
    */
    if (this.currentSatitety <= 33) {
      return "Очень голоден";
    } else if (this.currentSatitety >= 34 || this.currentSatitety <= 66) {
      return "Голоден";
    } else {
      return "Сытый";
    }
  },
  feed: function (count) {
    this.currentSatitety += count;
    if (this.currentSatiety > this.maxSatiety) {
      this.currentSatiety = this.maxSatiety;
    }
  },
  decreaseSatiety: function (count) {
    this.currentSatiety -= count;
    if (count > this.currentSatiety) {
      this.currentSatiety = 0;
    }
  },
  decreaseHp: function (count) {
    this.currentHp -= count;
    if (count > this.currentHp) {
      this.currentHp = 0;
    }
  },
  increaseHp: function (count) {
    this.currentHp += count;
    if (this.currentHp > this.maxHp) {
      this.currentHp = this.maxHp;
    }
  },
};

hpBar.max = user.maxHp;
hpBar.value = user.currentHp;
satietyBar.max = user.maxSatiety;
satietyBar.value = user.currentSatiety;

buttonAttack.addEventListener("click", function () {
  decreaseHp(Number(inputAttack.value));

  console.log(user.currentHp);
});
buttonHealth.addEventListener("click", function () {
  user.increaseHp(Number(inputHealth.value));
  hpBar.value = user.currentHp;
  grayscale(hpBar.position);

  console.log(user.currentHp);
});

function grayscale(count) {
  document.getElementById("imageIguana").style.filter = `grayscale(${
    100 - count * 100
  }%)`;
}

const timerId = setInterval(function () {
  user.decreaseSatiety(2);
  satietyBar.value = user.currentSatiety;

  if (user.currentHp === 0) {
    decreaseHp(1000);
  } else if (user.currentSatiety < user.maxSatiety / 10) {
    decreaseHp(300);
  } else if (user.currentSatiety < user.maxSatiety / 2) {
    decreaseHp(100);
  }
}, 300);

function decreaseHp(count) {
  user.decreaseHp(count);
  hpBar.value = user.currentHp;
  grayscale(hpBar.position);
}
