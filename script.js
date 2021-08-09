const apiURL = 'http://openlibrary.org/search.json?q=the+lord+of+the+rings';


async function getData() {
    const response = await fetch(apiURL);
    return await response.json();
}



async function getPublishYear(lower, upper) {
    const data = await getData();
    const bookArray = data.docs;
    const newBookArray = [];
    const container = document.querySelector('#container');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    lower = prompt("Enter starting year");
    upper = prompt("Enter ending year");


    for (let i = 0; i < bookArray.length - 1; i++) {
        const book = bookArray[i];
        const publishYear = book.publish_year;
        if (publishYear !== undefined) {
            const modern = function (year) {
                if (!lower || !upper) {
                    alert("Year not selected, please try again");
                    lower = prompt("Enter starting year");
                    upper = prompt("Enter ending year");
                }
                if (lower > upper) {
                    alert("Invalid date range, please try again");
                    lower = prompt("Enter starting year");
                    upper = prompt("Enter ending year");
                }
                else if ((year >= lower) && (year <= upper)) {
                    return true;
                }
            }
            if (publishYear.every(modern)) {
                newBookArray.push(book);
            }


        }

    }

    newBookArray.sort(function (a, b) {
        return a.first_publish_year - b.first_publish_year;
    });

    newBookArray.forEach((element) => {
        const bookData = document.createElement('div');
        let bookTitle = element.title;
        let bookPublishYear = element.first_publish_year;
        bookData.textContent = `${bookTitle}. Year published: ${bookPublishYear}`;
        container.appendChild(bookData);
    });
}









