document.addEventListener("DOMContentLoaded", function() {
    const membersContainer = document.getElementById("members-container");
    const gridButton = document.getElementById("grid-button");
    const listButton = document.getElementById("list-button");

    // Fetch member data from members.json
    fetch("data/members.json")
        .then(response => response.json())
        .then(data => {
            // Function to generate HTML for a single member
            function generateMemberHTML(member) {
                return `
                    <div class="member">
                        <img src="images/${member.image}" alt="${member.name}">
                        <h3>${member.name}</h3>
                        <p>${member.address}</p>
                        <p>${member.phone}</p>
                        <p><a href="${member.website}" target="_blank">Website</a></p>
                        <p>Membership Level: ${member.membership_level}</p>
                        <p>${member.additional_info}</p>
                    </div>
                `;
            }

            // Function to render members as grid
            function renderGrid() {
                membersContainer.innerHTML = "";
                data.forEach(member => {
                    const memberHTML = generateMemberHTML(member);
                    membersContainer.insertAdjacentHTML("beforeend", memberHTML);
                });
                membersContainer.classList.remove("list-view");
            }

            // Function to render members as list
            function renderList() {
                membersContainer.innerHTML = "";
                data.forEach(member => {
                    const memberHTML = generateMemberHTML(member);
                    membersContainer.insertAdjacentHTML("beforeend", `<div class="member-list">${memberHTML}</div>`);
                });
                membersContainer.classList.add("list-view");
            }

            // Initial rendering as grid
            renderGrid();

            // Toggle between grid and list view
            gridButton.addEventListener("click", renderGrid);
            listButton.addEventListener("click", renderList);
        })
        .catch(error => console.error("Error fetching member data:", error));
});