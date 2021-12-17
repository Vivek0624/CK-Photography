let loader = document.getElementById('preloader');
window.addEventListener('load', function () {
  loader.style.display = 'none';
});

///////////////////////////////////////////////////////////////////////////////////////////////

// FIREBASE
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyBo-RIFxLVZe520iShTZjZNsiu30tSBL_Q',
  authDomain: 'ck-photography-a5795.firebaseapp.com',
  databaseURL: 'https://ck-photography-a5795-default-rtdb.firebaseio.com',
  projectId: 'ck-photography-a5795',
  storageBucket: 'ck-photography-a5795.appspot.com',
  messagingSenderId: '686211116138',
  appId: '1:686211116138:web:7ed17574b2a225d530ae13',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//     --------------------------------------------------------------------------
// Reference contactInfo collections
var contactInfo = firebase.database().ref('Information');

//     --------------------------------------------------------------------------

//  -------- THIS IS MAIN PART ---------
// Listen for a Submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

//  -------- THIS IS ALSO MAIN PART ---------
function submitForm(e) {
  e.preventDefault();

  // Get input Values
  let name = document.getElementById('name').value;
  let last = document.getElementById('last').value;
  let email = document.getElementById('email').value;
  let phone = document.getElementById('phone').value;
  let message = document.getElementById('message').value;

  // IMPORTANT CONSOLE LOG ====
  // console.log(name, last, email, phone, message);

  //  Save message
  saveContactInfo(name, last, email, phone, message);

  // Reset Form
  document.getElementById('contactForm').reset();

  sendEmail(name, last, email, phone, message);

  // Show alert
  document.querySelector('.alert').style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout(function () {
    document.querySelector('.alert').style.display = 'none';
  }, 3000);
}

// Save infos to Firebase
function saveContactInfo(name, last, email, phone, message) {
  let newContactInfo = contactInfo.push();
  newContactInfo.set({
    name: name,
    last: last,
    email: email,
    phone: phone,
    message: message,
  });

  // Retriving Data
  retriveInfos();
}

// Retrive Infos
function retriveInfos() {
  let ref = firebase.database().ref('Information');
  // Not gonna work becz .ref("__") should be same when Reference collections
  // let ref = firebase.database().ref("infos"); (X)
  ref.on('value', gotData);
}

function gotData(data) {
  let info = data.val();
  let keys = Object.keys(info);

  for (let i = 0; i < keys.length; i++) {
    let infoData = keys[i];
    let name = info[infoData].name;
    let last = info[infoData].last;
    let email = info[infoData].email;
    let phone = info[infoData].phone;
    let message = info[infoData].message;
    console.log(name, last, email, phone, message);

    //   let infosResults = document.querySelector('.infosResults');

    //   infosResults.innerHTML += `<div>
    //   <p><strong>Name: </strong>${name} <br/>
    //   <a><strong>Company: </strong>${last}</a> <br/>
    //   <a><strong>Email: </strong>${email}</a> <br/>
    //   <a><strong>Phone Number: </strong>${phone}</a> <br/>
    //   <a><strong>Message: </strong>${message}</a> <br/>
    // </p>
    // </div>`;
  }
  // console.log(data);
}

retriveInfos();

// function errData(err) {
//   console.log("Error!");
//   console.log(err);
// }
// console.log(gotData());

// Sending Emails
function sendEmail(name, company, email, phone, message) {
  Email.send({
    Host: 'smtp.gmail.com',
    Username: 'vivek.gundu28@gmail.com',
    Password: 'atpbpuenyotreona',
    To: 'vivek.gundu28@gmail.com',
    From: 'vivek.gundu28@gmail.com',
    Subject: `${name} send you a message`,
    Body: `Name: ${name} <br/> Company: ${company} <br/> Email: ${email} <br/> Phone: ${phone} <br/> Message: ${message}`,
  }).then((message) => alert('Mail sent successfully!'));
}

//////////////////////////////////////////////////////////////////////////////////////////////

//////////////////// SCROLLING ANIMATION
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#features');

btnScrollTo.addEventListener('click', function (e) {
  e.preventDefault();
  const s1coords = section1.getBoundingClientRect();

  section1.scrollIntoView({ behavior: 'smooth' });
});
