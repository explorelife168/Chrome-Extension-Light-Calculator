// 內容腳本執行
const $templateInput = document.querySelector("#review-template");
if (!$templateInput) {
  console.log("$templateInput undefined");
}

const buttons = document.querySelectorAll(".number");
if (!buttons) {
  console.log("buttons undefined");
}

const calculateBtn = document.querySelectorAll(".calculate");
if (!calculateBtn) {
  console.log("calculateBtn undefined");
}

const clean = document.querySelector(".clean");
if (!clean) {
  console.log("clean undefined");
}

const equal = document.querySelector(".equal");
if (!equal) {
  console.log("equal undefined");
}

let calculateStatus = "";
let beforeNum = "";
let isFirstInput = true;
let originalColorBtn;

// 數字點擊事件監聽
buttons.forEach((button) => {
  button.addEventListener("click", handleClick);
});

// 檢查輸入是否該忽略
function ShouldIgnoreInput(value) {
  return (
    (value === "." && $templateInput.value.includes(".")) || // 小數點不重複
    (value === "." && $templateInput.value === "") || // 數字起始不為小數點
    (value === "0" && $templateInput.value === "0") // 數字1,2 不為連續00
  );
}

// 重置計算按鈕樣式
function resetCalculateBtnStyles() {
  calculateBtn.forEach((button) => {
    button.style.backgroundColor = "#424242";
  });
}

// 數字點擊事件處理
function handleClick() {
  const value = this.textContent;
  if (ShouldIgnoreInput(value)) return;
  if (value !== "." && $templateInput.value === "0") {
    // 如果為0，輸入數字則會蓋過
    $templateInput.value = value;
  } else {
    $templateInput.value += value;
  }
  isFirstInput = false;
}

//清除點擊事件監聽
clean.addEventListener("click", () => {
  $templateInput.value = "";
  calculateStatus = "";
  beforeNum = "";
  resetCalculateBtnStyles();
});

// 計算符號點擊監聽
calculateBtn.forEach((button) => {
  button.addEventListener("click", handleClickCalculate);
});

// 計算符號點擊事件處理
function handleClickCalculate() {
  if (beforeNum || !$templateInput.value) {
    return;
  } else if (originalColorBtn) {
    originalColorBtn.style.backgroundColor = "#424242";
  }
  this.style.backgroundColor = "#777777";
  originalColorBtn = this;
  calculateStatus = this.textContent;
  beforeNum = $templateInput.value;
  $templateInput.value = "";
}

// 等於符號點擊監聽
equal.addEventListener("click", () => {
  if (!$templateInput.value) {
    return;
  } else if (calculateStatus === "+") {
    $templateInput.value = (
      Number(beforeNum) + Number($templateInput.value)
    ).toFixed(9);
    console.log(typeof $templateInput.value);
  } else if (calculateStatus === "-") {
    $templateInput.value = (
      Number(beforeNum) - Number($templateInput.value)
    ).toFixed(9);
    console.log(typeof $templateInput.value);
  } else if (calculateStatus === "X") {
    $templateInput.value = (
      Number(beforeNum) * Number($templateInput.value)
    ).toFixed(9);
    console.log(typeof $templateInput.value);
  } else if (calculateStatus === "/") {
    $templateInput.value = (
      Number(beforeNum) / Number($templateInput.value)
    ).toFixed(9);
    console.log(typeof $templateInput.value);
  }
  $templateInput.value = parseFloat($templateInput.value);
  calculateStatus = "";
  beforeNum = "";
  resetCalculateBtnStyles();
});

// TODO: version 2.0.0g
// 處理使用者輸入並儲存模板 , DOM監聽事件，取輸入target值，使用 chrome.storage 同步設定
// $templateInput.addEventListener("input", (e) => {
//   const { value } = e.currentTarget;
//   chrome.storage.sync.set({ memoryScreenValue: value });
// });

// // 取得 storage 中的模板 , 因為是非同步所以需要使用async/await
// async function fetchData() {
//   let { memoryScreenValue } = await chrome.storage.sync.get([
//     "memoryScreenValue",
//   ]);
//   $templateInput.value = memoryScreenValue ?? "";
// }

// // 由於每次重新打開 popup，就等同打開新視窗，所以使用 onload 重新取得資料
// window.onload = () => {
//   fetchData();
// };

// keydown clean version 2.0.0
// document.addEventListener("keydown", (event) => {
//   if (event.key === "c" || event.key === "C") {
//     $templateInput.value = "";
//     chrome.storage.sync.set({ memoryScreenValue: $templateInput.value });
//   }
// });
