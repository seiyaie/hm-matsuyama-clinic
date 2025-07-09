import { switchLogo } from "../utility/switch-logo.js";

// Intersection Observerでヘッダーの画面上部固定配置とロゴの切り替えを制御
export const intersectionObserver = () => {
    // querySelectors
    const kv = document.querySelector(".js-top-kv");
    const header = document.querySelector(".js-header");

    // それぞれの要素がない場合returnする
    if (!kv || !header) return;

    // slideDown keyframes
    const slideDownKeyframes = {
        // transform: ["translateY(-100%)", "translateY(0)"],
        transform: "translateY(64rem)"
    };

    // closing keyframes
    const slideUpKeyframes = {
        transform: "translateY(0)",
    };

    // animation options
    const animationOptions = {
        duration: 100,
        easing: "linear",
        fill: "forwards",
    };

    // functions

    const handleIntersection = (entries) => {
        entries.forEach((entry) => {
            if (header.classList.contains("is-menu-open")) return;

            if (entry.isIntersecting) {
                const closeAnimation = header.animate(slideUpKeyframes, animationOptions);
                closeAnimation.onfinish = () => {
                    switchLogo(true); // kvが表示されたらロゴを白に切り替え
                    header.classList.remove("is-fixed");
                };
            } else if (!entry.isIntersecting) {
                switchLogo(false); // kvが画面外に出たらロゴを青に切り替え
                header.classList.add("is-fixed");
                header.animate(slideDownKeyframes, animationOptions);
            }
        });
    };

    const observer = new IntersectionObserver(handleIntersection);

    observer.observe(kv);
};
