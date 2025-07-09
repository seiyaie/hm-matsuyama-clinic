export const switchLogo = (toWhite) => {
  const headerLogo = document.querySelector(".js-header-logo picture");
  const headerLogoImg = headerLogo?.querySelector("img");
  const headerLogoSource = headerLogo?.querySelector("source");

  if (!headerLogoImg || !headerLogoSource) return;

  if (toWhite) {
    headerLogoImg.src = "img/logo-white.svg";
    headerLogoSource.srcset = "img/logo-white-sp.svg";
  } else {
    headerLogoImg.src = "img/logo-blue.svg";
    headerLogoSource.srcset = "img/logo-blue-sp.svg";
  }
};
