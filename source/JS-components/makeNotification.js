export default function makeNotification({
  notificationText = "кнопка нажата",
  buttonText = "Хорошо",
}) {
  const notificationBG = document.createElement("div");
  notificationBG.style.position = "fixed";
  notificationBG.style.width = "100vw";
  notificationBG.style.height = "100vh";
  notificationBG.style.bottom = "0px";
  notificationBG.style.left = "0px";
  notificationBG.style.backgroundColor = "rgba(185, 185, 185, 0.7)";
  notificationBG.style.display = "flex";
  notificationBG.style.alignItems = "center";
  notificationBG.style.justifyContent = "center";
  notificationBG.addEventListener("click", closeNotification);

  const documentBodyPositionValueBeforeClickButton =
    document.body.style.position;
  document.body.style.position = "relative";
  document.body.appendChild(notificationBG);

  const notificationContainer = document.createElement("p");
  notificationContainer.style.textAlign = "center";
  notificationContainer.style.width = "200px";
  notificationContainer.style.backgroundColor = "white";
  notificationContainer.style.padding = "15px";
  notificationContainer.style.borderRadius = "15px";
  notificationContainer.style.fontSize = "18px";
  notificationContainer.style.fontWeight = "900";
  notificationBG.appendChild(notificationContainer);

  const notificationTextContainer = document.createElement("p");
  notificationTextContainer.textContent = notificationText;
  notificationTextContainer.style.marginBottom = "10px";
  notificationContainer.appendChild(notificationTextContainer);

  const notificationCloseButton = document.createElement("button");
  notificationCloseButton.classList.add("link");
  notificationCloseButton.textContent = buttonText;
  notificationContainer.appendChild(notificationCloseButton);

  function closeNotification() {
    document.body.style.position = documentBodyPositionValueBeforeClickButton;
    notificationBG.remove();
    notificationCloseButton.removeEventListener("click", closeNotification);
  }
}
