const groupNameKey: string = "myGroupNameKey"; 

function getTripName() {
    const inputUitje: HTMLInputElement | null = document.getElementById("uitjeName") as HTMLInputElement | null;

    if (inputUitje !== null) {
        const tripName: string = inputUitje.value;

        try {
            localStorage.setItem(groupNameKey, tripName);
        } catch (e) {
            console.error("Could not save group name.");
        }
        loadNewField();
    } else {
        console.error("Geen naam gevonden!");
    }
}

function loadNewField() {
    window.location.href = "dashboard.html";
}

function displayGroupName() {
    const storedGroupName = localStorage.getItem(groupNameKey);
    
    if (storedGroupName) {
        document.getElementById("groupNameTitle")!.innerHTML = storedGroupName;
    } else {
        document.getElementById("groupNameTitle")!.innerHTML = "No group name found!";
    }
}

// Function to handle tab switching
function handleTabClick(event: Event): void {
    const target = event.target as HTMLElement; // Type assertion to get the clicked element
  
    if (target && target.classList.contains('tab')) {
      // Remove 'active' class from all tabs and content
      document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
      document.querySelectorAll('.content').forEach(content => content.classList.remove('active'));
  
      // Add 'active' class to the clicked tab and its corresponding content
      const selectedTab = target.getAttribute('data-tab');
      if (selectedTab) {
        target.classList.add('active');
        const contentElement = document.getElementById(selectedTab);
        if (contentElement) {
          contentElement.classList.add('active');
        }
      }
    }
  }
  
  // Add event listeners to tabs
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', handleTabClick);
  });
