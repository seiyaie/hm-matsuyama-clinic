import { switchViewport } from "./utility/switch-viewport.js";
import { hamburgerMenu } from "./component/hamburger-menu.js";
import { intersectionObserver } from "./component/intersection-observer.js";
import { entryButtonLinearGradient } from "./utility/linear-gradient.js";

// 画面の幅に応じてビューポートの設定を切り替え
switchViewport();
window.addEventListener("resize", switchViewport);

// スクロールに応じてentryボタンのグラデーションを変える
entryButtonLinearGradient();

hamburgerMenu();
intersectionObserver();
