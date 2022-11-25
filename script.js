window.addEventListener("load", function () {
  const buttons = document.querySelectorAll(".margarita");
  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      runCopyFunction(button.textContent);
    });
  });
});

async function runCopyFunction(buttonText) {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: copyToClickBoard,
    args: [buttonText],
  });
}

const copyToClickBoard = function (buttonText) {
  const date = document.querySelector(".g3").getAttribute("title");
  const fullName = document.querySelector(".gD").getAttribute("name");
  const domainName = document.querySelector(".gD").getAttribute("email");
  const arr = document.querySelectorAll(".a3s.aiL");
  const len = arr.length - 2;
  const lastEmailContent = arr[len].children[0].textContent;
  const conversationURL = document.location.href;
  // Creating the textfield from where we will execute the copy commmand
  var textArea = document.createElement("textarea");
  textArea.value =
    date +
    "\t" +
    fullName +
    "\t" +
    domainName +
    "\t" +
    buttonText +
    "\t" +
    lastEmailContent +
    "\t" +
    "\t" +
    conversationURL;

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand("copy");
    var msg = successful ? "successful" : "unsuccessful";
    console.log(msg);
  } catch (err) {
    console.error("Error");
  }

  document.body.removeChild(textArea);
};
