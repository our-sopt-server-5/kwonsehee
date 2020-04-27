let isMomHappy = true;
let phone = {
    brand: 'Samsung',
    color:'black'
};

var willIGetNewPhone = new Promise((resolve, reject) => {
    if(isMomHappy === true) {
    var data = JSON.stringify(phone);
    resolve(data);
   }
    else {
        reject(new Error('mom is not happy'));
    }
});

willIGetNewPhone.then(function(data) { 
    console.log(data);
});





