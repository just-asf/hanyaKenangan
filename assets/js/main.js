document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar-coffee");
  const floatingHeader = document.querySelector(".floating-header");
  const navbarCollapse = document.getElementById("navbarUtama");

  if (navbar) {
    const handleNavbarScroll = function () {
      if (window.scrollY > 90) {
        navbar.classList.add("scrolled");
        if (floatingHeader) {
          floatingHeader.classList.add("scrolled");
          floatingHeader.classList.add("scrolled-header");
        }
      } else {
        navbar.classList.remove("scrolled");
        if (floatingHeader) {
          floatingHeader.classList.remove("scrolled");
          floatingHeader.classList.remove("scrolled-header");
        }
      }
    };
    window.addEventListener("scroll", handleNavbarScroll, { passive: true });
    handleNavbarScroll();
  }

  if (navbarCollapse) {
    navbarCollapse.addEventListener("show.bs.collapse", function () {
      if (navbar) navbar.classList.add("menu-open");
      if (floatingHeader) floatingHeader.classList.add("menu-open");
    });

    navbarCollapse.addEventListener("hidden.bs.collapse", function () {
      if (navbar) navbar.classList.remove("menu-open");
      if (floatingHeader) floatingHeader.classList.remove("menu-open");
    });

    const navLinks = document.querySelectorAll(".navbar-coffee .nav-link");
    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        if (navbarCollapse.classList.contains("show") && typeof bootstrap !== "undefined") {
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse);
          bsCollapse.hide();
        }
      });
    });

    document.addEventListener("click", function (e) {
      if (
        navbarCollapse.classList.contains("show") &&
        navbar &&
        !navbar.contains(e.target) &&
        typeof bootstrap !== "undefined"
      ) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse);
        bsCollapse.hide();
      }
    });
  }

  const backToTopBtn = document.getElementById("backToTop");
  if (backToTopBtn) {
    const handleBackToTopScroll = function () {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    };
    window.addEventListener("scroll", handleBackToTopScroll, { passive: true });
    handleBackToTopScroll();

    backToTopBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  const topicRadios = document.querySelectorAll('input[name="topik"]');
  const topicChips = document.querySelectorAll(".topic-chip");
  if (topicRadios.length > 0 && topicChips.length > 0) {
    topicRadios.forEach(function (radio) {
      radio.addEventListener("change", function () {
        topicChips.forEach(function (chip) {
          chip.classList.remove("active");
        });
        const activeLabel = document.querySelector('label[for="' + radio.id + '"]');
        if (activeLabel) {
          activeLabel.classList.add("active");
        }
      });
    });
  }
});
