// Template Name: Stylen
// Template URL:  https://techpedia.co.uk/template/stylen
// Description: Salon & Spa HTML5 Template
// Version: 1.0.0
(function (window, document, $, undefined) {
  "use strict";
  var Init = {
    i: function (e) {
      Init.s();
      Init.methods();
    },
    s: function (e) {
      (this._window = $(window)),
        (this._document = $(document)),
        (this._body = $("body")),
        (this._html = $("html"));
    },
    methods: function (e) {
      Init.w();
      Init.hidepreloader();
      Init.contactForm();
      Init.quanityHandle();
      Init.BackToTop();
      Init.calendar();
      Init.searchToggle();
      Init.intializeSlick();
      Init.salActivation();
      Init.countdownInit(".countdown", "2023/04/01");
      Init.filtersCollapse();
      Init.billingFields();
      Init.productFilter();
      Init.FormHandler();
      Init.formValidation();
      Init.formWizard();
      Init.paymentMethods();
      Init.timeSelect();
      Init.settings();
    },
    w: function (e) {
      this._window.on("load", Init.l).on("scroll", Init.res);
    },
    hidepreloader: function () {
      setTimeout(() => {
        $("#preloader").hide();
      }, 2000);
    },
    contactForm: function () {
      $(".contact-form").on("submit", function (e) {
        e.preventDefault();
        if ($(".contact-form").valid()) {
          var _self = $(this);
          var _selector = _self.closest("input,textarea");
          _self.closest("div").find("input,textarea").removeAttr("style");
          _self.find(".error-msg").remove();
          _self
            .closest("div")
            .find('button[type="submit"]')
            .attr("disabled", "disabled");
          var data = $(this).serialize();
          $.ajax({
            url: "./assets/mail/contact.php",
            type: "post",
            dataType: "json",
            data: data,
            success: function (data) {
              $(".contact-form").trigger("reset");
              _self.find('button[type="submit"]').removeAttr("disabled");
              if (data.success) {
                document.getElementById("message").innerHTML =
                  "Email Sent Successfully";
              } else {
                document.getElementById("message").innerHTML =
                  "There is an error";
              }
              $("#message").slideDown("slow");
              setTimeout(function () {
                $("#message").slideUp("hide");
              }, 3000);
            },
          });
        } else {
          return false;
        }
      });
    },

    BackToTop: function () {
      var btn = $("#backto-top");
      $(window).on("scroll", function () {
        if ($(window).scrollTop() > 300) {
          btn.addClass("show");
        } else {
          btn.removeClass("show");
        }
      });
      btn.on("click", function (e) {
        e.preventDefault();
        $("html, body").animate(
          {
            scrollTop: 0,
          },
          "300"
        );
      });
    },
    calendar: function () {
      if ($("#calendar").length) {
        $("#calendar").datepicker({
          inline: true,
          firstDay: 1,
          showOtherMonths: true,
        });
      }
    },
    searchToggle: function () {
      var el = $(".search-btn");
      $(el).on("click", function () {
        if ($("#search-form").is(":visible")) {
          $("#search-form").hide("slow");
        } else {
          $("#search-form").show("slow");
        }
      });
    },
    quanityHandle: function () {
      $(".decrement").on("click", function () {
        var qtyInput = $(this).closest(".quantity-wrap").children(".number");
        var qtyVal = parseInt(qtyInput.val());
        if (qtyVal > 0) {
          qtyInput.val(qtyVal - 1);
        }
      });
      $(".increment").on("click", function () {
        var qtyInput = $(this).closest(".quantity-wrap").children(".number");
        var qtyVal = parseInt(qtyInput.val());
        qtyInput.val(parseInt(qtyVal + 1));
      });
    },

    salActivation: function () {
      sal({
        threshold: 0.1,
        once: true,
      });
    },
    intializeSlick: function (e) {
      if ($(".slider").length) {
        $(".slider").slick({
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          arrows: false,
          pauseOnHover: false,
          dots: true,
          autoplaySpeed: 3000,
          fade: true,
          responsive: [
            {
              breakpoint: 991,
              settings: {
                arrows: false,
              },
            },
          ],
        });
      }

      if ($(".partner-slider").length) {
        $(".partner-slider").slick({
          infinite: true,
          slidesToShow: 5,
          slidesToScroll: 1,
          centerMode: true,
          arrows: false,
          centerMode: true,
          autoplay: true,
          autoplaySpeed: 2000,
          responsive: [
            {
              breakpoint: 1199,
              settings: {
                arrows: false,
                slidesToShow: 4,
              },
            },
            {
              breakpoint: 992,
              settings: {
                arrows: false,
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 768,
              settings: {
                arrows: false,
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 492,
              settings: {
                arrows: false,
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 380,
              settings: {
                arrows: false,
                slidesToShow: 1,
              },
            },
          ],
        });
      }

      if ($(".preview-slider").length) {
        $(".preview-slider").slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          fade: true,
          asNavFor: ".preview-slider-nav",
        });
      }
      if ($(".preview-slider-nav").length) {
        $(".preview-slider-nav").slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          asNavFor: ".preview-slider",
          dots: false,
          arrows: true,
          centerMode: false,
          focusOnSelect: true,
          responsive: [
            {
              breakpoint: 990,
              settings: {
                arrows: false,
              },
            },
            {
              breakpoint: 768,
              settings: {
                arrows: false,
                slidesToShow: 2,
              },
            },
          ],
        });
      }
    },

    countdownInit: function (countdownSelector, countdownTime) {
      var eventCounter = $(countdownSelector);
      if (eventCounter.length) {
        eventCounter.countdown(countdownTime, function (e) {
          $(this).html(
            e.strftime(
              " <li>%D<small>d</small></li>\
                <li>%H<small>h</small></li>\
                <li>%M<small>m</small></li>\
                <li>%S<small>s</small></li>"
            )
          );
        });
      }
    },
    filtersCollapse: function () {
      var filters = $(".filters-trigger");
      if (filters.length) {
        filters.on("click", function () {
          if ($(".filters-collapse-mobile").is(":visible")) {
            $(".filters-collapse-mobile").hide("slow");
          } else {
            $(".filters-collapse-mobile").show("slow");
          }
        });
      }
    },
    billingFields: function () {
      var filters = $('input[name="same_billing"]');
      if (filters.length) {
        filters.on("change", function () {
          if ($('input[name="same_billing"]').is(":checked")) {
            $(".billing-details").hide("slow");
          } else {
            $(".billing-details").show("slow");
          }
        });
      }
    },
    paymentMethods: function () {
      $(".payment-box").on("click", function () {
        $(".payment-box").removeClass("active");
        $(this).addClass("active");
      });
    },
    productFilter: function () {
      var filters = $(".modify-all");
      if (filters.length) {
        filters.on("change", function () {
          if ($(".modify-all").is(":checked")) {
            $('input[name="product[]"]').prop("checked", true);
          } else {
            $('input[name="product[]"]').prop("checked", false);
          }
        });
      }

      var filters = $(".filters");
      if (filters.length) {
        $(".filters input").on("change", function () {
          filters.submit();
        });
      }
    },
    FormHandler: function () {
      if ($(".submit-form").length) {
        $(".submit-form").on("submit", function () {
          if ($(".submit-form").valid()) {
            var myModal = new bootstrap.Modal($("#successModal"));
            myModal.toggle();
          }
          return false;
        });
      }
    },
    formValidation: function () {
      if ($("form").length) {
        $("form").validate();
      }
    },
    formWizard: function () {
      if ($("#form-wizard").length) {
        $("#form-wizard").smartWizard({
          theme: "arrows",
        });
      }
    },
    timeSelect: function () {
      if ($(".available-time .btn").length) {
        $(".available-time .btn").on("click", function () {
          $(".available-time .btn").removeClass("active");
          $(this).addClass("active");
        });
      }
    },
    settings: function () {
      $(".settings").on("click", function () {
        $(".setting-box").toggle("slow");
      });

      $(".header-change").on("change", function () {
        var style = $(this).val();
        $(".header").addClass("d-none");
        $(".header.style-" + style).removeClass("d-none");
      });
      $(".footer-change").on("change", function () {
        var style = $(this).val();
        $(".footer").addClass("d-none");
        $(".footer.style-" + style).removeClass("d-none");
      });
      $(".change-color").on("click", function () {
        var color = $(this).data("color");
        $(".color-css").attr("href", color);
      });
      $(".main-wrapper").on("click", function () {
        $(".setting-box").hide("slow");
      });
      $(".header-sticky").on("change", function () {
        var sticky = $(this).val();
        if (sticky == "yes") {
          $(".header").addClass("sticky");
        } else {
          $(".header").removeClass("sticky");
        }
      });
    },
  };
  Init.i();
})(window, document, jQuery);
