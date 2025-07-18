import { switchLogo } from "../utility/switch-logo.js";

export const hamburgerMenu = () => {
    // querySelectors
    const dialog = document.querySelector(".js-dialog");
    const dialogBg = document.querySelector(".js-dialog-bg");
    const menuButton = document.querySelector(".js-menu-button");
    const entryButton = document.querySelector(".js-entry-button");
    const closeButton = document.querySelector(".js-hamburger-close-button");
    const header = document.querySelector(".js-header");

    // それぞれの要素がない場合returnする
    if (!dialog || !dialogBg || !menuButton || !entryButton || !header) return;

    // opening keyframes
    const openingKeyframes = {
        transform: ["translateX(-100%)", "translateX(0)"],
        opacity: [0, 1],
    };

    // closing keyframes
    const closingKeyframes = {
        transform: ["translateX(0)", "translateX(-100%)"],
        opacity: [1, 0],
    };

    // animation options
    const options = {
        duration: 300,
        easing: "ease-in",
        fill: "forwards",
    };

    // スクロール制御 for iOS Safari
    const preventScroll = (e) => e.preventDefault();

    const disableScroll = () => {
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
        document.addEventListener("touchmove", preventScroll, { passive: false });
    };

    const enableScroll = () => {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
        document.removeEventListener("touchmove", preventScroll);
    };

    // functions

    // ハンバーガーメニューopen関数
    const openMenu = () => {
        entryButton.classList.add("is-hidden"); // entryボタン非表示
        menuButton.classList.add("is-active");
        menuButton.querySelector(".js-menu-text").textContent = "CLOSE"; // menuボタンのテキストをcloseにする。
        disableScroll();

        if (header.classList.contains("is-fixed")) {
            header.classList.remove("is-fixed");
            header.classList.add("is-menu-open");
            switchLogo(true); // メニューopen時、kvが画面外にある場合ロゴを青→白に切り替え
        }
        dialog.show();
        dialog.animate(openingKeyframes, options);
    };

    // ハンバーガーメニューclose関数
    const closeMenu = () => {
        entryButton.classList.remove("is-hidden"); // entryボタン表示
        menuButton.classList.remove("is-active");
        menuButton.querySelector(".js-menu-text").textContent = "MENU";
        enableScroll();

        if (header.classList.contains("is-menu-open")) {
            header.classList.add("is-fixed");
            header.classList.remove("is-menu-open");
            switchLogo(false); //メニューclose時、kvが画面外にある場合ロゴを白→青に切り替え
        }

        // アニメーション完了後
        const closingAnim = dialog.animate(closingKeyframes, options);
        closingAnim.onfinish = () => {
            dialog.close();
            document.body.style.overflow = ""; // 背景固定解除
            document.documentElement.style.overflow = "";
        };
    };

    // Add event listeners
    // menuボタンクリックでopen
    menuButton.addEventListener("click", () => {
        const isOpen = dialog.open;
        isOpen ? closeMenu() : openMenu();
    });

    // closeボタンクリックでclose
    closeButton.addEventListener("click", () => {
        closeMenu();
    });

    // メニュー背景クリックでclose
    dialogBg.addEventListener("click", (e) => {
        const isInteractiveElement = e.target.closest("a, button");
        if (!isInteractiveElement) {
            closeMenu();
        }
    });

    // escキータイプでclose
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && dialog.open) {
            closeMenu();
        }
    });
};
