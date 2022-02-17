const modal = document.getElementById("modalBackground");
const body = document.body;
var btnChat = document.getElementById("chatOption");
var btnEmail = document.getElementById("emailOption");
var btnForum = document.getElementById("forumOption");
var btnExpert = document.getElementById("expertsOption");

//Get User Details Function
function getUserDetails() {
  wf_utils.isLoggedIn(function (isLoggedIn) {
    if (isLoggedIn) {
      wf_utils.getUser(function (user) {
        var userEmail = user.email;
        var userFullName = user.fullName;
        var readOnlyFields = true;

        zE("webWidget", "identify", {
          name: userFullName,
          email: userEmail,
        });

        zE("webWidget", "prefill", {
          name: {
            value: userFullName,
            readOnly: readOnlyFields,
          },
          email: {
            value: userEmail,
            readOnly: readOnlyFields,
          },
        });
      });
    }
  });
}

getUserDetails();

// Show and Hide Widget for custom styles
window.addEventListener("DOMContentLoaded", function () {
  /* zE("webWidget", "show");
  zE("webWidget", "open"); */

  // hide widget on page load
  zE("webWidget", "hide");
});

// Get Chat In Progress Status and show Widget
function getChatInProgress() {
  if (btnChat) {
    const isChattingStatus = zE("webWidget:get", "chat:isChatting");
    if (isChattingStatus) {
      document.getElementById("chatInProgress").style.display = "block";
    } else {
      document.getElementById("chatInProgress").style.display = "none";
    }
  }
}

window.addEventListener("load", function () {
  getChatInProgress();
});

//Open Widget Function
function openWidget() {
  modal.style.display = "block";
  body.style.overflow = "hidden";
  zE("webWidget", "show");
  zE("webWidget", "open");
  var desktopWidget = document.getElementById("webWidget");
  if (!desktopWidget) return;
  desktopWidget.style.display = "block";
  var $head = $("#webWidget").contents().find("head");
  $head.append(
    $(
      "\
        <style> \
            @media screen and (min-width: 500px) { \
				/* Widget Border Radius */ \
				body>div>div>div>div>div>div>div, body>div>div>div>div>div>div>div>div>div, body>div>div>div>div>div>div { border-radius: 0 !important; } \
				/* Main Header */ \
				body>div>div>div>div>div>div>div>header>div>h1, body>div>div>div>div>div>div>div>div>div>header>div>h1, body>div>div>div>div>div>div>header>div>h1 { font-size: 38px !important; font-weight: 500 !important; letter-spacing: -0.02em !important; text-align: left !important; margin-left: 5px !important; } \
				/* Sub Header */ \
				body>div>div>div>div>div>div>div>div>div>form>main>div, body>div>div>div>div>div>div>div>form>main>div { color: #000 !important; font-size: 15px !important; line-height: 1.25em !important; margin-bottom: 20px !important; margin-top: 15px !important; } \
				/* Chat Sub Header */ \
				body>div>div>div>div>div>div>div>div>div>div {box-shadow: none !important; border-bottom: 0.0785714rem solid rgb(233, 235, 237) !important;} \
				/* Form Labels */ \
				body>div>div>div>div>div>div>div>form>main>div>div>div>label>div, body>div>div>div>div>div>div>div>form>main>div>div>div>label, body>div>div>div>div>div>div>div>div>div>form>main>div>div>div>label { margin-bottom: 2px !important; font-weight: 500 !important; color: #000 !important; font-size: 16px !important; margin-top: 28px !important; } \
				/* Form Inputs */ \
				body>div>div>div>div>div>div>div>form>main>div>div>div>input { height: 50px !important; margin-bottom: 0 !important; padding-left: 16px !important; border: 1px solid #ddd !important; border-radius: 0px !important; background-color: #fff !important; font-size: 15px !important; } \
				/* Form Inputs Read-Only */ \
				body>div>div>div>div>div>div>div>form>main>div>div>div>input:read-only { background-color: #f3f3f3 !important; } \
				/* Form Textarea */ \
      			body>div>div>div>div>div>div>div>form>main>div>div>div>textarea, body>div>div>div>div>div>div>div>div>div>footer>div>div>textarea, body>div>div>div>div>div>div>div>div>div>form>main>div>div>div>textarea { border-radius: 0 !important; margin-bottom: 12px !important; padding-left: 16px !important; border: 1px solid #ddd !important; border-radius: 0px !important; background-color: #fff !important; font-size: 15px !important; } \
				/* Form Upload */ \
				body>div>div>div>div>div>div>div>form>main>div>div>div>button#dropzone-input { border-radius: 0 !important; margin-top: 10px !important; } \
				/* Form Footer Shadow */ \
      			body>div>div>div>div>div>div>div>form>footer, body>div>div>div>div>div>div>div>div>div>form>footer { box-shadow: none !important; } \
				/* Form Button */ \
				body>div>div>div>div>div>div>div>form>footer>div>button, body>div>div>div>div>div>div>div>div>div>form>footer>div>button { border-radius: 0 !important; height: 50px !important; margin-top: 0px !important; padding-right: 24px !important; padding-left: 24px !important; background-color: #4353ff !important; font-size: 16px !important; font-weight: 500 !important; } \
				/* Form Dropdown */ \
				body>div>div>div>div>div>div>div>form>main>div>div>div>div>div { padding: 17px !important; border-radius: 0 !important; font-size: 15px !important; } \
			} \
        </style> \
        "
    )
  );
}

//Close Widget Function
function closeWidget() {
  modal.style.display = "none";
  body.style.overflow = "auto";
  zE("webWidget", "hide");
}

//On Chat End
function endChat() {
  if (btnChat) {
    zE("webWidget", "chat:end");
    getChatInProgress();
  }
}

//Email Things
if (btnEmail) {
  //Click Email button to show widget with specific form and hide chat + Analytics
  btnEmail.addEventListener("click", function () {
    endChat();
    zE("webWidget", "updateSettings", {
      webWidget: {
        chat: {
          suppress: true,
        },
        contactForm: {
          ticketForms: customForm,
          selectTicketForm: { "*": "Choose a request type:" },
          fields: [{ id: "subject", prefill: { "*": customSubject } }],
        },
      },
    });
    getUserDetails();
    openWidget();
    gtag("event", "contact_email");
  });
}

//Other Email Analytics
zE("webWidget:on", "userEvent", function (event) {
  if (event.action === "Contact Form Submitted") {
    gtag("event", "zd_form_submitted");
  }
});

//Chat things
if (btnChat) {
  //Show chat status
  zE("webWidget:on", "chat:status", function (status) {
    console.log("This chat session is now", status);
    var chatStatusLabel = document.getElementById("chatStatusLabel");
    if (status == "online") {
      btnChat.style.pointerEvents = "auto";
      btnChat.removeAttribute("aria-disabled");
      chatStatusLabel.style.display = "none";
    } else if (status == "offline") {
      btnChat.style.pointerEvents = "none";
      btnChat.setAttribute("aria-disabled", "true");
      chatStatusLabel.style.display = "block";
    } else if (status == "away") {
      btnChat.style.pointerEvents = "none";
      btnChat.setAttribute("aria-disabled", "true");
      chatStatusLabel.style.display = "block";
    }
  });

  //Click Chat button to show widget with specific form and hide email + Analytics
  btnChat.addEventListener("click", function () {
    zE("webWidget", "updateSettings", {
      webWidget: {
        chat: {
          suppress: false,
        },
      },
    });

    zE("webWidget", "chat:addTags", customTagIssue, customTagType);
    openWidget();
    gtag("event", "contact_chat");
  });

  //On first chat, set label, reset authentication + Analytics
  zE("webWidget:on", "chat:start", function () {
    getChatInProgress();
    gtag("event", "zd_chat_started");
    getUserDetails();
  });

  //On chat end, remove label + Analytics
  zE("webWidget:on", "chat:end", function () {
    getChatInProgress();
    gtag("event", "zd_chat_ended");
  });

  //Other Chat Analytics
  zE("webWidget:on", "userEvent", function (event) {
    if (event.action === "Chat Served by Operator") {
      gtag("event", "zd_chat_served");
    }
  });
}

//Forum Button
if (btnForum) {
  btnForum.addEventListener("click", function () {
    gtag("event", "contact_forum");
  });
}

//Experts Button
if (btnExpert) {
  btnExpert.addEventListener("click", function () {
    gtag("event", "contact_experts");
  });
}

//Widget Close when modal clicked or Escape key pressed
if (modal) {
  modal.addEventListener("click", function (e) {
    e.stopPropagation();
    closeWidget();
  });
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      closeWidget();
    }
  });
}

//Widget Close when close button clicked
zE("webWidget:on", "close", function () {
  closeWidget();
});

//Google Analytics Tracking for Article Links
[...document.querySelectorAll(".linkarticle")].forEach(function (item) {
  item.addEventListener("click", function () {
    gtag("event", "click_article");
  });
});

//Solved Button
var clickSolution = document.getElementById("clickSolution");
if (clickSolution) {
  clickSolution.addEventListener("click", function () {
    gtag("event", "click_solution");
  });
}
