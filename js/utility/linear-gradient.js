export const entryButtonLinearGradient = () => {
    const entryButton = document.querySelector(".js-entry-button a");
    // entryボタンがない場合return
    if (!entryButton) return;

    let adjustedPercent = 0;

    const updateEntryButtonBackground = (adjustedPercent) => {
        entryButton.style.background = `linear-gradient(180deg,
        #75c2eb ${0 - adjustedPercent}%,
        #43cfcf ${50 - adjustedPercent}%,
        #4bd2d7 ${100 - adjustedPercent}%,
        #43cfcf ${150 - adjustedPercent}%,
        #75c2eb ${200 - adjustedPercent}%)`;
    };

    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

        if (scrollY === 0) {
            entryButton.style.background = `linear-gradient(180deg, #75c2eb 0%, #43cfcf 50%, #4bd2d7 100%, #43cfcf 150%, #75c2eb 200%)`;
            return;
        }

        const scrollPercent = Math.min(scrollY / maxScroll, 1);

        const wave = Math.sin(scrollPercent * Math.PI * 6);
        adjustedPercent = ((wave + 1) / 2) * 100;

        updateEntryButtonBackground(adjustedPercent);
    });
};
