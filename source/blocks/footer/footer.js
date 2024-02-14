import createNotificatoin from "../../JS-components/makeNotification";
$(document).ready(function () {
  const chatButton = document.getElementById("chat-button");
  chatButton.addEventListener("click", () => {
    createNotificatoin({
      notificationText: "Чат временно недоступен",
      buttonText: "Понятненько",
    });
  });
});
