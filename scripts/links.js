/* links.js */

const baseURL = "https://drgreenwell.github.io/wdd230/";
const linksURL = "https://drgreenwell.github.io/wdd230/data/links.json";

async function getLinks() {
    try {
      const response = await fetch(linksURL);
      const data = await response.json();
      displayLinks(data.lessons); /* Pass data.lessons instead of data */
    } catch (error) {
      console.error("Error fetching links:", error);
    }
}

function displayLinks(weeks) {
  const activitiesList = document.querySelector('.content-wrapper .card ul');

  weeks.forEach(week => {
    week.links.forEach(link => {
      const listItem = document.createElement('li');
      const anchor = document.createElement('a');

      /* Check if the URL starts with http or https */
      if (link.url.startsWith("http://") || link.url.startsWith("https://")) {
        anchor.href = link.url;
      } else {
        anchor.href = baseURL + link.url;
      }

      anchor.textContent = week.lesson + " - " + link.title;
      listItem.appendChild(anchor);
      activitiesList.appendChild(listItem);
    });
  });
}

getLinks();
