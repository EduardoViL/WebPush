const PUBLIC_VAPID_KEY = 'BEO8ShYxdx_CRFQGKD6GzZ7ODj6i1xxrOJTGyso9GsWUyJ8KTKHCh7mSDox17wd6O688Nbor2MmJIah_aeMbLuA';

const subscription = async () => {

    //Service Worker
    console.log("Registering a Service worker");
    const register = await navigator.serviceWorker.register('/worker.js', {
        scope: '/'
    });
    console.log('new Service Worker');

    // Listen Push Notification
    console.log("Listening Push Notifications");
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: (PUBLIC_VAPID_KEY)
    });

    // Send Notification
    await fetch('/subscription', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            "Content-Type": "application/json"
        }
    });
    console.log("Subscribed!");
};

function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, "+")
        .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    
    return outputArray;
};

const form = document.querySelector('#myform');
const message = document.querySelector('#message');
const queja = document.querySelector('#queja');
console.log(message.value)
if (form) {
    

    $("#myform").on("submit", function(event) {
        $.ajax({
          type: 'POST',
          url: 'http://localhost/prodheg/Database.php',
          data: $( this ).serialize(),
          success: function(data) {
            console.log(data)
          }
        });
      }); 
    

    

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        fetch('/new-message', {
            method: 'POST',
            body: JSON.stringify({ message: [message.value, ' ', queja.value] }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        form.reset();
    });
};
// Service Worker Support
subscription();