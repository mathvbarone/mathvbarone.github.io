/* eslint-env jquery */

const startForm = {
  // EVENTS
  functions: {
    // FORM MSG
    formMsg: (message) => {
      const contact = $(".contact-box");
      let messageText;
      let ajaxStatus;

      if (message === "loading") {
        messageText = `
                      <figure class="is-loading-img">
                        <svg width="66px"  height="66px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-dual-ring" style="background: none;">
                          <circle cx="50" cy="50" ng-attr-r="{{config.radius}}" ng-attr-stroke-width="{{config.width}}" ng-attr-stroke="{{config.c1}}" ng-attr-stroke-dasharray="{{config.dasharray}}" fill="none" stroke-linecap="round" r="40" stroke-width="5" stroke="#fff" stroke-dasharray="62.83185307179586 62.83185307179586" transform="rotate(258 50 50)">
                          <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform>
                          </circle>
                          <circle cx="50" cy="50" ng-attr-r="{{config.radius2}}" ng-attr-stroke-width="{{config.width}}" ng-attr-stroke="{{config.c2}}" ng-attr-stroke-dasharray="{{config.dasharray2}}" ng-attr-stroke-dashoffset="{{config.dashoffset2}}" fill="none" stroke-linecap="round" r="34" stroke-width="5" stroke="#2ab7cd" stroke-dasharray="53.40707511102649 53.40707511102649" stroke-dashoffset="53.40707511102649" transform="rotate(-258 50 50)">
                          <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;-360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform>
                          </circle>
                        </svg>
                      <figure>
                      `;
        ajaxStatus = "loading";
      }

      if (message === "success") {
        messageText = `
                      <div class="success-box">
                        <svg class="checkmark checkmark-success" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                          <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                            <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                        </svg>
                        <strong>Sua mensagem foi enviada!</strong>
                        <div class="column is-narrow has-text-centered">
                          <button type="button" title="retornar" class="button button-custom has-text-centered is-info form-return">Retornar</button>
                        </div>
                      </div>
                      `;
        ajaxStatus = "success";
      }
      if (message === "error") {
        messageText = `
                      <div class="error-box">
                        <svg class="checkmark  checkmark-error" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                          <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                          <path class="checkmark-check" fill="none" d="M16 16 36 36 M36 16 16 36"/>
                        </svg>
                        <strong>Ocorreu um erro :( <br/> Tente novamente mais tarde</strong>
                        <div class="column is-narrow has-text-centered">
                          <button type="button" title="retornar" class="button button-custom has-text-centered is-info form-return">Retornar</button>
                        </div>
                      </div>
                      `;

        ajaxStatus = "error";
      }

      const messageBox = `
                          <div class="message-alert">
                            <div class="is-${ajaxStatus}">${messageText}</div>
                          </div>
                           `;

      return contact.append(messageBox);
    },

    // AFTER MSG
    afterMsg: (e) => {
      e.preventDefault();
      $(".message-alert").hide();
      $("#contact-form").show();
      $(".valid").val("");
    },

    // SEND FORM
    sendform(e) {
      e.preventDefault();
      const contact = $(".contact-box");
      const contactForm = $("#contact-form");

      $.ajax({
        url: "//formspree.io/matheusvbarone@gmail.com",
        method: "POST",
        data: $(this).serialize(),
        dataType: "json",
        beforeSend() {
          contactForm.hide();
          startForm.functions.formMsg("loading");
        },
      })
        .done(() => {
          startForm.functions.formMsg("success");
        })
        .fail(() => {
          startForm.functions.formMsg("error");
        })
        .always(() => {
          contact.find(".is-loading").hide();
          $(".form-return").on("click", startForm.functions.afterMsg);
        });
    },
  },

  // EVENTS
  events: {
    init: () => {
      $(() => {
        const startFunctions = startForm.functions;
        $("#contact-form").on("submit", startFunctions.sendform);
      });
    },
  },
};

// INIT OBJECTS
startForm.events.init();
