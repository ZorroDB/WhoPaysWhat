function handleTabClick(event: Event): void {
    const target = event.target as HTMLElement;

    if (target && target.classList.contains("tab")) {
        document.querySelectorAll(".tab").forEach((tab) => tab.classList.remove("active"));
        document.querySelectorAll(".content").forEach((content) => content.classList.remove("active"));

        const selectedTab = target.getAttribute("data-tab");
        if (selectedTab) {
            target.classList.add("active");
            const contentElement = document.getElementById(selectedTab);
            if (contentElement) {
                contentElement.classList.add("active");
            }
        }
    }
}
const tabs = document.querySelectorAll(".tab");
tabs.forEach((tab) => {
    tab.addEventListener("click", handleTabClick);
});

