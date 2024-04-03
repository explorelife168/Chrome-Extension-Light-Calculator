// 內容腳本執行

// ----------------------------- input -----------------------------
// 抓ID得到DOM
const $templateInput = document.querySelector("#review-template");

// 處理使用者輸入並儲存模板 , DOM監聽事件，取輸入target值，使用 chrome.storage 同步設定
$templateInput.addEventListener("input", (e) => {
  const { value } = e.currentTarget;
  chrome.storage.sync.set({ memoryScreenValue: value });
});

// 取得 storage 中的模板 , 因為是非同步所以需要使用async/await
async function fetchData() {
  let { memoryScreenValue } = await chrome.storage.sync.get([
    "memoryScreenValue",
  ]);
  $templateInput.value =
    memoryScreenValue !== undefined ? memoryScreenValue : "";
}

// 由於每次重新打開 popup，就等同打開新視窗，所以使用 onload 重新取得資料
window.onload = () => {
  fetchData();
};

// ----------------------------- button input -----------------------------

const buttons = document.querySelectorAll(".number");
// TODO:
// button input
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    $templateInput.value += value;

    chrome.storage.sync.set({ memoryScreenValue: $templateInput.value });
  });
});

// ----------------------------- Memory Clean -----------------------------

// button clean
const clean = document.querySelector(".clean");
clean.addEventListener("click", () => {
  $templateInput.value = "";
  chrome.storage.sync.set({ memoryScreenValue: $templateInput.value });
});

// keydown clean
document.addEventListener("keydown", (event) => {
  if (event.key === "c" || event.key === "C") {
    $templateInput.value = "";
    chrome.storage.sync.set({ memoryScreenValue: $templateInput.value });
  }
});
