// person array for convert JSON practice
// const persons = [
//     {
//         name: 'Hr',
//         fevColor: 'black',
//         age: 19,
//         value: (x = 2, y = 4) => x + y // not be store in server
//     },
//     {
//         name: 'Md',
//         fevColor: 'blue',
//         age: 21
//     },
//     {
//         name: 'Km',
//         fevColor: ['red', 'green', 'blue', 'white'],
//         age: 20
//     }
// ];

// // make person array to JSON
// const strToJSON = JSON.stringify(persons);// convert JSON from string
// // console.log(strToJSON); // print JSON formate data in console log

// const JSONtoStr = JSON.parse(strToJSON); // convert string from JSON
// // console.log(JSONtoStr); 


// get data in json placeholder 
fetch('https://jsonplaceholder.typicode.com/users') // catch data in json placeholder with API
    .then(response => response.json())
    .then(json => display(json)) // promise call function

const display = users => {
    // map users and find users name, and throw loop for add li for every element 
    users.map(user => user.name).forEach(name => {
        let li = document.createElement('li');//create li 
        li.innerText = name; // set name in li with text
        document.getElementById('parent').appendChild(li); // get child or put li in ul body
    });
};


// create post function
getId('post-submit').addEventListener('click', () => {
    const postTitle = getId('post-title').value;
    const postContent = getId('post-content').value;
    const postData = {
        title: postTitle,
        body: postContent
    };
    postDataToServer(postData);
    clear();
});

//onload clear
function clear() {
    getId('post-title').value = '';
    getId('post-content').value = '';
    getId('display-post-title').innerText = '';
    getId('display-post-content').innerText = '';
}

//random user for fun who am i
function userFun() {
    fetch('https://randomuser.me/api/')
        .then(res => res.json())
        .then(data => {
            const user = data.results[0];// catch user

            const userName = user.name;// catch user name object 
            const userFullName = `${userName.title} ${userName.first} ${userName.last}`;
            getId('user-name').innerText = userFullName;//display user name

            const userEmail = user.email;//catch user email
            getId('user-email').innerText = userEmail;// display user email
            getId('user-email').setAttribute('href', ` mailto:${userEmail}`);
            getId('user-email').setAttribute('target', '_blank');

            const userPhoto = user.picture.large;//catch user picture
            getId('user-picture').src = userPhoto;// display user picture
        })

    setTimeout(userFun, 1000 * 10);
}
userFun();// call user fun api for first run

// send data in server with JSON placeholder api
function postDataToServer(postData) {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
            'Content-type': 'application/json; charset = UTF-8',
        },
    })
        .then(response => response.json())
        .then(data => {
            if (data.title && data.body) {
                getId('display-post-title').innerText = data.title;
                getId('display-post-content').innerText = data.body;
            }else{
                getId('display-post-title').innerText = 'first write a post';
            }
        })
}
/// get activity data with api from bored website
// get show data in api section
function activityApiData() {
    fetch('http://www.boredapi.com/api/activity?minprice=0&maxprice=0.1')
        .then(res => res.json())
        .then(data => {
            getId('activity').innerText = data.activity + '!';
        })
    setTimeout(activityApiData, 1000 * 10)
}
activityApiData();// call activity api fun for first run

// get id 
function getId(id) { return document.getElementById(id) };
