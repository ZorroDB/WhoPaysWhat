import { getNames } from '.';
import { addPerson } from './DOMManipulation';
import { addMemberToGroup, CreateGroup, formatCurrency, Group, Payment, saveGroupToLocalStorage } from './utils';

document.addEventListener("DOMContentLoaded", () => {
    const eventSubmitBtn: HTMLElement | null = document.getElementById("planTrip");
    const addPersonBtn: HTMLElement | null = document.getElementById("addPerson");
    const saveGroupBtn: HTMLElement | null = document.getElementById("saveGroup");

    if (addPersonBtn) {
        addPersonBtn.addEventListener("click", addPerson);
    }
    if (eventSubmitBtn) {
        eventSubmitBtn.addEventListener("click", getTripName);
    }
    if (saveGroupBtn) {
        saveGroupBtn.addEventListener("click", saveGroup);
    }

    const groupId = localStorage.getItem('currentGroupId');
    if (groupId) {
        loadPayments(parseInt(groupId));

        const paymentForm = document.getElementById('paymentForm') as HTMLFormElement;

        if (paymentForm) {
            paymentForm.addEventListener('submit', function (event) {
                event.preventDefault();

                const payerSelect = document.getElementById('peopleInGroup') as HTMLSelectElement;
                const dateInput = document.getElementById('date') as HTMLInputElement;
                const descriptionInput = document.getElementById('description') as HTMLInputElement;
                const amountInput = document.getElementById('amount') as HTMLInputElement;

                const groupId = localStorage.getItem('currentGroupId');
                if (!groupId) return;

                const payment: Payment = {
                    name: payerSelect.value,
                    date: new Date(dateInput.value),
                    description: descriptionInput.value,
                    payments: parseFloat(amountInput.value)
                };

                addPayment(parseInt(groupId), payment);
                paymentForm.reset();
            });
        } else {
            console.error("Payment form not found.");
        }
    };

    const tabElements: NodeListOf<HTMLLIElement> = document.querySelectorAll('.tab');
    const contentSections: NodeListOf<HTMLDivElement> = document.querySelectorAll('.content');

    function handleTabClick(this: HTMLLIElement) {
        tabElements.forEach(tab => tab.classList.remove('active'));
        contentSections.forEach(content => content.classList.remove('active'));
    
        this.classList.add('active');
    
        const tabId = this.getAttribute('data-tab');
        if (tabId) {
            const targetContent = document.getElementById(tabId);
            if (targetContent) {
                targetContent.classList.add('active');
                if (tabId === 'dashboard') { // Adjust this to your actual dashboard tab ID
                    const groupIdString = localStorage.getItem('currentGroupId');
                    if (groupIdString) {
                        loadPayments(parseInt(groupIdString)); // Load payments when the dashboard is activated
                    }
                }
            }
        }
    }
    tabElements.forEach(tab => {
        tab.addEventListener('click', handleTabClick);
    });

    function getTripName(): void {
        const inputUitje: HTMLInputElement | null = document.getElementById("uitjeName") as HTMLInputElement;
        if (inputUitje !== null) {
            const tripName: string = inputUitje.value.trim();
            if (tripName) {
                try {
                    const newGroup = CreateGroup(tripName);
                    saveGroupToLocalStorage(newGroup);
                    localStorage.setItem("myGroupNameKey", tripName);

                    loadNewField();
                } catch (e) {
                    console.error("Could not save group name.");
                }
            } else {
                alert("No name entered!");
            }
        }
    }

    function loadPayments(groupId: number) {
        const groupsString = localStorage.getItem('groups');
        const groups: Group[] = groupsString ? JSON.parse(groupsString) : [];
        const group = groups.find(g => g.id === groupId);
    
        if (group) {
            // Convert payment dates back to Date objects
            group.payments.forEach(payment => {
                payment.date = new Date(payment.date); // Ensure it's a Date object
            });
    
            renderPaymentSummary(group);
        } else {
            console.error("Group not found.");
        }
    }

    function saveGroup(): void {
        const names = getNames();
        const groupIdString = localStorage.getItem('currentGroupId');
        if (groupIdString) {
            const groupId = parseInt(groupIdString, 10);
        
            const groupsString = localStorage.getItem('groups');
            const groups: Group[] = groupsString ? JSON.parse(groupsString) : [];
            const group = groups.find(g => g.id === groupId);

            if (group) {
                if (group.members.length + names.length >= 2) {
                    names.forEach(name => addMemberToGroup(groupId, name));
                    alert("Group has been saved!");
                } else {
                    alert("Please ensure the group has at least 2 people!");
                }
            }
        }
    }

    function loadNewField(): void {
        window.location.href = "existingTrips.html";
    }

    // Function to add a payment to the group
    // Function to add a payment to the group
    function addPayment(groupId: number, payment: Payment): void {
        const groupsString = localStorage.getItem('groups');
        const groups: Group[] = groupsString ? JSON.parse(groupsString) : [];
        const group = groups.find(g => g.id === groupId);

        if (group) {
            // Ensure the payments array exists
            if (!group.payments) {
                group.payments = []; // Initialize the payments array if it's undefined
            }

            // Add the new payment to the group's payments array
            group.payments.push(payment);

            // Save the updated group back to localStorage
            localStorage.setItem('groups', JSON.stringify(groups));

            // Re-render the payment summary with the updated data
            renderPaymentSummary(group);
        } else {
            console.error("Group not found.");
        }
    }

    // Function to render the payment summary
    function renderPaymentSummary(group: Group) {
        const paymentsList = document.getElementById('paymentsList');
        const totalGroup = document.getElementById('totalGroup');
        const participantSummary = document.getElementById('payerName');
        if (!paymentsList || !totalGroup || !participantSummary) return;
    
        paymentsList.innerHTML = '';
        participantSummary.innerHTML = '';
    
        let totalAmount = 0;
        const memberPayments: Record<string, number> = {}; // To track payments by each member
    
        // Calculate total payments for each member
        group.payments.forEach(payment => {
            const paymentDate = new Date(payment.date);
            
            const paymentItem = document.createElement('p');
            paymentItem.textContent = `${payment.name}: ${formatCurrency(payment.payments)} (${payment.description}) on ${paymentDate.toLocaleDateString()}`;
            paymentsList.appendChild(paymentItem);
    
            totalAmount += payment.payments;
    
            // Initialize the member's payment record if it doesn't exist
            if (!memberPayments[payment.name]) {
                memberPayments[payment.name] = 0;
            }
            memberPayments[payment.name] += payment.payments; // Sum payments for each member
        });
    
        // Display the total for the group
        totalGroup.textContent = formatCurrency(totalAmount);
    
        // Calculate individual balances
        const numberOfMembers = group.members.length; // Get the number of members
        const sharePerMember = totalAmount / numberOfMembers; // Calculate share per member
    
        for (const member of group.members) {
            const amountPaid = memberPayments[member] || 0;
            const balance = sharePerMember - amountPaid; // Positive if owed, negative if needs to pay
    
            // Format the output for each member
            const balanceText = `${member}: Paid ${formatCurrency(amountPaid)} | ${balance >= 0 ? 'Owes' : 'Gets back'} ${formatCurrency(Math.abs(balance))}`;
            
            const balanceItem = document.createElement('p');
            balanceItem.textContent = balanceText;
            participantSummary.appendChild(balanceItem);
        }
    }
}
);
