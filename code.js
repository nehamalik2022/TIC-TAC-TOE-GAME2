let player1 = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  let player2 = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  let board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  let playerStart = 1;
  let playerTurn = 1;
  
  function isWinner(player) {
    for (let i = 0; i <= 2; i++) {
      if (player[i][0] === 1 && player[i][1] === 1 && player[i][2] === 1) {
        return true;
      }
    }
    for (let i = 0; i <= 2; i++) {
      if (player[0][i] === 1 && player[1][i] === 1 && player[2][i] === 1) {
        return true;
      }
    }
    if (player[0][0] === 1 && player[1][1] === 1 && player[2][2] === 1) {
      return true;
    }
    if (player[0][2] === 1 && player[1][1] === 1 && player[2][0] === 1) {
      return true;
    }
    return false;
  }
  
  function getWinningIndices(player) {
    for (let i = 0; i <= 2; i++) {
      if (player[i][0] === 1 && player[i][1] === 1 && player[i][2] === 1) {
        return [i + "0", i + "1", i + "2"];
      }
    }
    for (let i = 0; i <= 2; i++) {
      if (player[0][i] === 1 && player[1][i] === 1 && player[2][i] === 1) {
        return ["0" + i, "1" + i, "2" + i];
      }
    }
    if (player[0][0] === 1 && player[1][1] === 1 && player[2][2] === 1) {
      return ["00", "11", "22"];
    }
    if (player[0][2] === 1 && player[1][1] === 1 && player[2][0] === 1) {
      return ["02", "11", "20"];
    }
    return undefined;
  }
  
  function isDraw(board) {
    for (let i = 0; i <= 2; i++) {
      for (let j = 0; j <= 2; j++) {
        if (board[i][j] === 0) {
          return false;
        }
      }
    }
    return true;
  }
  
  function initiateTurn(row, column) {
    if (board[row][column] !== 1) {
      let id = "block_" + row + column;
      board[row][column] = 1;
      if (playerTurn === 1) {
        player1[row][column] = 1;
        document.getElementById(id).firstElementChild.style.fontSize = "120px";
        if (isWinner(player1)) {
          increaseScore(1);
          stop(1);
          return;
        }
        if (isDraw(board)) {
          stop(0);
          return;
        }
        updateTurn();
      } else {
        player2[row][column] = 1;
        document.getElementById(id).lastElementChild.style.fontSize = "120px";
        if (isWinner(player2)) {
          increaseScore(2);
          stop(2);
          return;
        }
        if (isDraw(board)) {
          stop(0);
          return;
        }
        updateTurn();
      }
    }
  }
  
  function updateTurn() {
    if (playerTurn === 1) {
      document.getElementsByClassName("player1")[0].style.opacity = "0.5";
      document.getElementsByClassName("player2")[0].style.opacity = "1";
      playerTurn = 2;
    } else {
      document.getElementsByClassName("player2")[0].style.opacity = "0.5";
      document.getElementsByClassName("player1")[0].style.opacity = "1";
      playerTurn = 1;
    }
  }
  
  function stop(winnerPlayerNumber) {
    // 1- Player1, 2- Player2, 0- Draw
    let blocks = document.getElementsByClassName("block");
    for (let i = 0; i < blocks.length; i++) {
      blocks[i].style.pointerEvents = "none";
    }
    if (winnerPlayerNumber === 1) {
      document.getElementById("head").innerHTML = "Player 1 Won!!";
      let winningIndices = getWinningIndices(player1);
      for (let i = 0; i < 3; i++) {
        document.getElementById(
          "block_" + winningIndices[i]
        ).firstElementChild.style.animation = "large-small 1s ease 0s infinite";
      }
    } else if (winnerPlayerNumber === 2) {
      document.getElementById("head").innerHTML = "Player 2 Won!!";
      let winningIndices = getWinningIndices(player2);
      for (let i = 0; i < 3; i++) {
        document.getElementById(
          "block_" + winningIndices[i]
        ).lastElementChild.style.animation = "large-small 1s ease 0s infinite";
      }
    } else {
      document.getElementById("head").innerHTML = "Draw!!";
    }
    document.getElementsByClassName("player1")[0].style.opacity = "1";
    document.getElementsByClassName("player2")[0].style.opacity = "1";
    document.getElementsByClassName("reset-btn")[0].style.animation =
      "translucent-transperent 1s ease 0s infinite";
  }
  
  function reset() {
    player1 = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    player2 = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    board = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    playerTurn = 1;
  
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        document.getElementById(
          "block_" + i + j
        ).firstElementChild.style.animation = "";
        document.getElementById(
          "block_" + i + j
        ).lastElementChild.style.animation = "";
      }
    }
  
    let xMark = document.getElementsByClassName("x-mark");
    for (let i = 0; i < xMark.length; i++) {
      xMark[i].style.fontSize = "0";
    }
    let oMark = document.getElementsByClassName("o-mark");
    for (let i = 0; i < oMark.length; i++) {
      oMark[i].style.fontSize = "0";
    }
  
    let blocks = document.getElementsByClassName("block");
    for (let i = 0; i < blocks.length; i++) {
      blocks[i].style.pointerEvents = "auto";
    }
  
    if (playerStart === 1) {
      document.getElementsByClassName("player1")[0].style.opacity = "0.5";
      playerTurn = 2;
      playerStart = 2;
    } else {
      document.getElementsByClassName("player2")[0].style.opacity = "0.5";
      playerTurn = 1;
      playerStart = 1;
    }
  
    document.getElementsByClassName("reset-btn")[0].style.animation = "";
    document.getElementById("head").innerHTML = "Tic tac toe";
  }
  
  function increaseScore(playerNumber) {
    if (playerNumber === 1) {
      let score = document.getElementById("player1-score");
      score.innerHTML = parseInt(score.innerHTML) + 1;
    } else {
      let score = document.getElementById("player2-score");
      score.innerHTML = parseInt(score.innerHTML) + 1;
    }
  }
  
  function toggleMusic() {
    let audio = document.getElementById("music");
    let toggleBar = document.getElementsByClassName("toggle-bar")[0];
    if (audio.muted) {
      audio.muted = false;
      toggleBar.style.width = "0";
    } else {
      audio.muted = true;
      toggleBar.style.width = "70.71px";
    }
  }
  
  //Audio Context
  let player = document.getElementById("music");
  
  let audioCtx = new AudioContext();
  let music = audioCtx.createMediaElementSource(player);
  let analyser = audioCtx.createAnalyser();
  let speaker = audioCtx.destination;
  
  music.connect(analyser);
  analyser.connect(audioCtx.destination);
  
  analyser.fftSize = 2048;
  
  //Gradient
  let canvas = document.getElementById("myCanvas");
  let canvasWidth = window.innerWidth;
  let canvasHeight = window.innerHeight;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  let canvasContex = canvas.getContext("2d");
  
  function changeColor() {
    let data = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(data);
    let rgbColor = data[0];
    rgbColor = Math.floor(rgbColor / 2);
    rgbColor -= 30;
  
    if (rgbColor > 0 && rgbColor < 255) {
      let gradient = canvasContex.createLinearGradient(0, 0, 0, canvasHeight);
      gradient.addColorStop(0, "rgb(0, 0, 0)");
      gradient.addColorStop(
        1,
        "rgb(" + rgbColor + ", " + rgbColor + ", " + rgbColor + ")"
      );
      canvasContex.fillStyle = gradient;
      canvasContex.fillRect(0, 0, canvasWidth, canvasHeight);
    }
    requestAnimationFrame(changeColor);
  }
  
  changeColor();
  
  addEventListener("resize", function () {
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
  });
  
  function playMusic() {
    document.getElementsByClassName("modal")[0].style.display = "none";
    player.play();
  }
  
  function openEnableMusicModal() {
    document.getElementsByClassName("modal")[0].style.display = "block";
  }
  
  let promise = player.play();
  // Autoplay has been blocked
  promise.catch(openEnableMusicModal);
  
  

    
