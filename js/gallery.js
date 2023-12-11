// Function used to search for plants in the gallery section
function gallerySearch() {
    const input = document.getElementById("plantSearch");
    const filter = input.value.toUpperCase();
    const ul = document.getElementById("searchList");
    const li = ul.getElementsByTagName("li");

    for (let item of li) { // If an item of the list contains the letters entered, item is displayed
        item.style.display = item.textContent.includes(filter) ? "block" : "";
        item.addEventListener('click', ev => {
            for (item of li) {
                item.style.display = "";
                input.value = ""
            }
        });
        if (input.value.length == 0) {
            item.style.display = "";
        }
    }
};

// Function to get JSON data and build gallery items
function buildGallery() {
    fetch('js/gallery.json')
    .then(response => response.json())
    .then(data => {
    // Loop over each item in the data array and create a new gallery item for each item
    const galleryItems = data.map(item => {

        //Create item for the gallery search list
        const listItem = document.createElement('li');
        const listItemLink = document.createElement('a');
        listItemLink.href = "#" + item.id;
        listItemLink.classList.add('searchlist-item');
        listItemLink.textContent = item.name;
        listItem.appendChild(listItemLink);
        searchList.appendChild(listItem);
        
        // Create the gallery item
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('gallery-item');
        galleryItem.id = item.id;
        
        // Create item title
        const titleElement = document.createElement('h3');
        titleElement.textContent = item.name;
        
        // Create item photo
        const galleryPhoto = document.createElement('img');
        galleryPhoto.classList.add('gallery-photo');
        galleryPhoto.src = item.img;
        galleryPhoto.alt = item.id;
        
        // Create item index container
        const indexContainer = document.createElement('div');
        indexContainer.classList.add('index-container');

        // Create item sun rating container
        const ratingContainerOne = document.createElement('div');
        ratingContainerOne.classList.add('rating-container');
        const sunRating = document.createElement('img');
        sunRating.src = item.sun;
        sunRating.alt = "sun rating";
        ratingContainerOne.appendChild(sunRating);
        indexContainer.appendChild(ratingContainerOne)
        
        // Create item water rating container
        const ratingContainerTwo = document.createElement('div');
        ratingContainerTwo.classList.add('rating-container');
        const waterdropRating = document.createElement('img');
        waterdropRating.src = item.water;
        waterdropRating.alt = "water rating";
        ratingContainerTwo.appendChild(waterdropRating);
        indexContainer.appendChild(ratingContainerTwo)
        
        // Create item text container
        const textContainer = document.createElement('div');
        textContainer.classList.add('text-container');
        const textElement = document.createElement('p');
        textElement.textContent = item.text;
        textContainer.appendChild(textElement);
        
        // Append items to gallery item as children
        galleryItem.appendChild(titleElement);
        galleryItem.appendChild(galleryPhoto)
        galleryItem.appendChild(indexContainer);
        galleryItem.appendChild(textElement);
        
        // Return finished gallery item
        return galleryItem;
    });
    
    // Append each gallery item to the #gallery container
    const galleryElement = document.getElementById('gallery');
    galleryItems.forEach(galleryItem => galleryElement.appendChild(galleryItem));
})
.catch(error => console.error(error));
}

(() => {

    // Search bar event listener to apply search filter when a user uses the search input
    const searchBar = document.getElementById("plantSearch");
    searchBar.addEventListener('keyup', ev => {
        gallerySearch()
    });
    
    // Event listener to open seach bar when search button is clicked
    const searchBtn = document.querySelector('.openbtn');
    searchBtn.addEventListener('click', ev => {
        searchTab.classList.toggle('hide');
        openSearch.classList.toggle('hide');
    });

    // Event listener to close seach bar when close search button is clicked
    const hideSearchBtn = document.querySelector('.closebtn');
    hideSearchBtn.addEventListener('click', ev => {
        plantSearch.value = "";
        gallerySearch()
        searchTab.classList.toggle('hide');
        openSearch.classList.toggle('hide');
    });

    buildGallery()

})()