let list = [];


let listFromStorage = localStorage.getItem("list"); 
if (listFromStorage) {
    list = JSON.parse(listFromStorage);
    for (let i = 0;  i < list.length; i++) {
        let currentItem = list[i];

        let color = "";
        // Set the color depending on which category was chosen
        if( currentItem.category === 'fruit') {
            color = 'bg-rose-100';
        }
        else if(currentItem.category === 'dairy') {
            color = 'bg-lime-100'
        }
        else if(currentItem.category === 'grain') {
            color = 'bg-yellow-100'
        }
        else if(currentItem.category === 'meat') {
            color = 'bg-purple-100'
        }

        // Create html string template
        let htmlString = `
            <li class="border-b border-gray-200 border-solid py-2.5">
                <span>➡️</span>
                ${currentItem.name}
                <span class="rounded-full text-sm px-3 text-gray-600 py-1 ${color}">${currentItem.category}</span>
            </li>
        `;

        // Add the html string into the parent
        document.querySelector("#list-items").innerHTML += htmlString;

    }
}


// Initial
document.querySelector("#form").addEventListener("click", function(e) {
    e.preventDefault();
    add();
});

document.querySelector("#list-items").addEventListener("click", function(e) {
    if (e.target.tagName === "SPAN") {
        console.log("clicked on emoji");
        let listItem = e.target.parentNode;

        // removing the element from the list
        console.log(listItem);
        console.log(listItem.parentNode);
        let children = listItem.parentNode.children;
        console.log(children);
        let childrenArray = Array.from(children);
        let index = childrenArray.indexOf(listItem);
        list.splice(index, 1);
        console.log(list);

        let jsonString = JSON.stringify(list);

        localStorage.setItem("list", jsonString);

        // removing the element from the HTML
        listItem.remove();
    
    }
});

function isValidated() {
    console.log("Running isValidated function!");

    let isValid = false;
    let item = document.querySelector("#item").value.trim();
    let category = document.querySelector("#category").value.trim();

    if( item.length <= 0 && category.length <= 0 ) {
        document.querySelector("#item").classList.add("border-rose-600");
        document.querySelector("#category").classList.add("border-rose-600");
    } 
    else if( item.length <= 0) {
        document.querySelector("#item").classList.add("border-rose-600");
        document.querySelector("#category").classList.remove("border-rose-600");
    }
    else if( category.length <= 0) {
        document.querySelector("#category").classList.add("border-rose-600");
        document.querySelector("#item").classList.remove("border-rose-600");
    }
    else {
        document.querySelector("#item").classList.remove("border-rose-600");
        document.querySelector("#category").classList.remove("border-rose-600");
        isValid = true;
    }
    return isValid;
}

function add() {
    console.log("Running add function!");

    if (isValidated()) {
        // Get the user input
        let item = document.querySelector("#item").value.trim();
        let category = document.querySelector("#category").value.trim();
        let color = "";

        // Set the color depending on which category was chosen
        if( category === 'Google Fonts') {
            color = 'bg-blue-100';
        }
        else if(category === 'Unsplash') {
            color = 'bg-green-100'
        }
        else if(category === 'Hero Icons') {
            color = 'bg-pink-100'
        }
        else if(category === 'Color Space') {
            color = 'bg-gray-100'
        }

        let newItem = {
            name: item,
            category: category,
        };

        list.push(newItem);

        let jsonString = JSON.stringify(list);

        localStorage.setItem("list", jsonString);

        // Create html string template
        let htmlString = `
            <li class="border-b border-gray-200 border-solid py-2.5">
                <span>➡️</span>
                ${item}
                <span class="rounded-full text-sm px-3 text-gray-600 py-1 ${color}">${category}</span>
            </li>
        `;

        // Add the html string into the parent
        document.querySelector("#list-items").innerHTML += htmlString;

        // Clear the inputs
        document.querySelector("#item").value = "";
        document.querySelector("#category").value = "";

    }
    else {
        console.log("Invalid inputs");
    }
};
 listFromStorage.remove();