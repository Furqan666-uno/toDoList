const inputBox = document.getElementById('inputBox');
const list = document.getElementsByClassName('to-do-list')[0]; // listContainer
const button = document.querySelector('button');

// Function to add a new task
function addTask() 
{
    if (inputBox.value === '') 
    { // Check if input is empty
        alert('You must write something first');
    } 
    else 
    {
        let li = document.createElement('li');
        li.innerHTML = ` 
            <i class="fa-regular fa-circle"></i> 
            <span>${inputBox.value}</span>
        `;

        let span = document.createElement('span');
        span.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        li.appendChild(span);
        list.appendChild(li);
    }

    inputBox.value = ''; // Clear the input box after adding a task
    saveData();
}

// Event listener for clicks inside the task list
list.addEventListener('click', (e) => 
{
    // Toggle checked state if clicking on the 'li' (task) itself
    if (e.target.tagName === 'LI') 
    {
        const li = e.target;
        const icon = li.querySelector('i'); // to get the circle icon inside the li

        // If task is not checked
        if (!li.classList.contains('checked')) 
        {
            icon.classList.remove('fa-regular', 'fa-circle'); // Remove the un-checked circle icon
            icon.classList.add('fa-solid', 'fa-circle-check'); // Add the checked circle icon
            li.classList.add('checked');
        } 
        else 
        { // If task is already checked, uncheck it
            icon.classList.remove('fa-solid', 'fa-circle-check'); // Remove the checked circle icon
            icon.classList.add('fa-regular', 'fa-circle'); // Add the un-checked circle icon
            li.classList.remove('checked');
        }
        saveData();
    }

    // Remove task if the 'X' icon is clicked
    else if (e.target.tagName === 'I' && e.target.classList.contains('fa-xmark')) {
        e.target.closest('li').remove(); // Find and remove the closest 'li' ancestor, to make sure only clicked i tag is removed 
    }
});

// to save the current HTML content of list.innerHTML to the localStorage
function saveData() 
{
    localStorage.setItem('data', list.innerHTML);// here, key: data & value: list.innerHTML
}

// to retrieve the saved HTML from localStorage and set it back to the list.innerHTML when the page is refreshed
function showTask()
{
    list.innerHTML= localStorage.getItem('data');
}
showTask();

// Event listener for adding new task on button click
button.addEventListener('click', addTask);
