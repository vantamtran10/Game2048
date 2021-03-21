<template>
  <div class="container">
    <User :score="score" @playGame="playGame"></User>
    <div class="justify-content-md-cente p-5">
      <button style="width: 150px;" type="submit" class="btn btn-primary" @click="init" v-show="isShow">Play again?</button>
    </div>
    <canvas ref='canvas' width="400px" height="400px"></canvas>
  </div>
</template>

<script>
import User from "@/components/User";

export default {
  name: 'GameBoard',
  data() {
    let myGrids = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
    return {
      grid: myGrids,
      vueCanvas: null,
      context: null,
      hasChange: false,
      score: 0,
      check: 0,
      disabled: false,
      isShow: false
    };
  },
  mounted() {
  },
  methods: {
    init(){
        this.isShow = false;
        this.disabled = true;
        this.$refs.canvas.setAttribute('class', 'canvas');
        this.$data.vueCanvas = this.$refs.canvas;
        this.$data.context = this.$refs.canvas.getContext("2d");
        this.grid =[
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ];
        this.score = 0;
    },
    playGame(){
        this.init();
        this.generateNumber();
        this.generateNumber();
        this.draw();
        window.addEventListener('keydown', this.handleKey);
    }
    ,
    draw(){
        this.context.clearRect(0,0, 400, 400);
        this.vueCanvas.width = 400;
        this.vueCanvas.height = 400;
        this.context.clearRect(0, 0, 400, 400);

        for (let i = 1; i < 4; i++) {
            for (let j = 1; j < 4; j++) {
                this.context.beginPath();
                this.context.moveTo(i * 100, 0);
                this.context.lineTo(i * 100, 400);
                this.context.moveTo(0, i * 100);
                this.context.lineTo(400, i * 100);
                this.context.strokeStyle = '#ffffff';
                this.context.stroke();
            }
        }

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.grid[i][j] == 2) {
                    let grd2 = this.context.createRadialGradient(238, 50, 10, 238, 50, 300);
                    grd2.addColorStop(0, "#81ffe4");
                    this.context.fillStyle = grd2;
                    this.context.fillRect(j * 100 + 1, i * 100 + 1, 99, 99);
                } else if (this.grid[i][j] == 4) {
                    let grd4 = this.context.createRadialGradient(238, 50, 10, 238, 50, 300);
                    grd4.addColorStop(0, "#4ed3a2");
                    this.context.fillStyle = grd4;
                    this.context.fillRect(j * 100 + 1, i * 100 + 1, 99, 99);
                } else if (this.grid[i][j] == 8) {
                    let grd8 = this.context.createRadialGradient(238, 50, 10, 238, 50, 300);
                    grd8.addColorStop(0, "#4de9e7");
                    this.context.fillStyle = grd8;
                    this.context.fillRect(j * 100 + 1, i * 100 + 1, 99, 99);
                } else if (this.grid[i][j] == 16) {
                    let grd16 = this.context.createRadialGradient(238, 50, 10, 238, 50, 300);
                    grd16.addColorStop(0, "#a8ff78");
                    grd16.addColorStop(1, "#78ffd6");
                    this.context.fillStyle = grd16;
                    this.context.fillRect(j * 100 + 1, i * 100 + 1, 99, 99);
                } else if (this.grid[i][j] == 32) {
                    this.context.fillStyle = '#39c1ff';
                    this.context.fillRect(j * 100 + 1, i * 100 + 1, 98, 98);
                } else if (this.grid[i][j] == 64) {
                    this.context.fillStyle = '#dc3545';
                    this.context.fillRect(j * 100 + 1, i * 100 + 1, 98, 98);
                } else if (this.grid[i][j] >= 128) {
                    this.context.fillStyle = '#fd7e14';
                    this.context.fillRect(j * 100 + 1, i * 100 + 1, 98, 98);
                }

                if (this.grid[i][j] != 0){
                    this.context.font = '50px Arial';
                    this.context.fillStyle = '#000000';
                    this.context.textAlign = 'center';
                    this.context.fillText(this.grid[i][j], j * 100 + 50, i * 100 + 70);
                }

            }
        }
    },
    generateNumber() {
        let arr = [];
          for (let i = 0; i < 4; i++) {
              for (let j = 0; j < 4; j++) {
                  if (this.grid[i][j] == 0) {
                    arr.push({ x: i, y: j });
                  }
              }
          }
          if (arr.length > 0) {
              let randomCell = arr[Math.random() * arr.length >> 0];
              this.grid[randomCell.x][randomCell.y] = 2;
          }
    },
    checkDifferent(arr1, arr2) {
        for (let i = 0; i < 4; i++) {
            if (arr1[i] != arr2[i]) {
              this.hasChange = true;
            }
        }
    },
    isGameOver(){
        let arr = [];
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            if (this.grid[i][j] == 0) {
              arr.push({ x: i, y: j });
            }
          }
        }
        if (arr.length > 0) {
          this.check = 0;
        }else{
          this.check += 1;
        }


    },
    moveLeftOrUp(row){       // if grid[i][j] != 0, we push first, =0 we push later.
        let arr = [];
        for (let i=0; i<4;i++){
            if (row[i] != 0){
              arr.push(row[i]);
            }
        }
        for (let j=arr.length; j<4; j++){
            arr.push(0);
        }
        return arr;
    },
    moveRightOrDown(row){  // if grid[i][j] is 0, we push first, !=0 we push later.
        let arr = [];
        for (let i=0; i<4;i++){
            if (row[i] == 0){
              arr.push(row[i]);
            }
        }
        for (let i=0; i<4;i++){
            if (row[i] != 0){
              arr.push(row[i]);
            }
        }
        return arr;
    },
    handleKey(e) {
        let keyCode = e.keyCode || e.which;

        if (keyCode === 37){
            for (let i = 0; i < 4; i++) {
                let arr = this.grid[i];
                this.grid[i] = this.moveLeftOrUp(this.grid[i]);
                    for (let j = 0; j < 3; j++) {
                        if (this.grid[i][j] == this.grid[i][j + 1]) {
                          this.grid[i][j] += this.grid[i][j + 1];
                          this.score += this.grid[i][j];
                          this.grid[i][j + 1] = 0;
                        }
                    }
                this.grid[i] = this.moveLeftOrUp(this.grid[i]);
                this.checkDifferent(arr, this.grid[i]);
            }

        } else if (keyCode === 38){ // up
            for (let i = 0; i < 4; i++) {
                let arr = [];
                for (let j = 0; j < 4; j++) {
                    arr.push(this.grid[j][i]);
                }
                let arr1 = arr;
                arr = this.moveLeftOrUp(arr);
                for (let m = 0; m < 3; m++) {
                    if (arr[m] == arr[m + 1]) {
                      arr[m] += arr[m + 1];
                      this.score += arr[m];
                      arr[m + 1] = 0;
                    }
                }
                arr = this.moveLeftOrUp(arr);
                for (let m = 0; m < 4; m++) {
                    this.grid[m][i] = arr[m];
                }
                this.checkDifferent(arr, arr1);
            }
        } else if(keyCode === 39){
            for (let i = 0; i < 4; i++) {
                let arr = this.grid[i];
                this.grid[i] = this.moveRightOrDown(this.grid[i]);
                for (let j = 3; j > 0; j--) {
                    if (this.grid[i][j] == this.grid[i][j - 1]) {
                      this.grid[i][j] += this.grid[i][j - 1];
                      this.score += this.grid[i][j];
                      this.grid[i][j - 1] = 0;
                    }
                }
                this.grid[i] = this.moveRightOrDown(this.grid[i]);
                this.checkDifferent(arr, this.grid[i]);
            }

        } else if(keyCode === 40){
            for (let i = 0; i < 4; i++) {
                let arr = [];
                    for (let j = 0; j < 4; j++) {
                        arr.push(this.grid[j][i]);
                    }
                    let arr1 = arr;
                    arr = this.moveRightOrDown(arr);
                    for (let m = 3; m > 0; m--) {
                        if (arr[m] == arr[m - 1]) {
                          arr[m] += arr[m - 1];
                          this.score += arr[m];
                          arr[m - 1] = 0;
                        }
                    }
                arr = this.moveRightOrDown(arr);
                for (let m = 0; m < 4; m++) {
                    this.grid[m][i] = arr[m];
                }
                this.checkDifferent(arr, arr1);
            }
        }
      if (this.hasChange) {
          this.generateNumber();
      }
      this.draw();
      this.isGameOver();
      if (this.check > 5){
        window.alert('You lose the game');
        this.isShow = true;
      }
    }
  },
  components: {
    User
  }
}

</script>

<style scoped>
.canvas {
  border: 1px solid black;
  background: white;
}

</style>