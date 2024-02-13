$(document).ready(function () {
  const chatButton = document.getElementById("chat-button");
  chatButton.addEventListener("click", () => {
    const notification = document.createElement("div");
    notification.style.position = "absolute";
    notification.style.backgroundColor = "rgba(185, 185, 185,0.6)";
    notification.style.top = "0";
    // notification.style.right = "0";
    notification.style.width = "100%";
    notification.style.height = "100%";

    document.body.appendChild(notification);
  });
});
