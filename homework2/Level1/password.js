const fs = require('fs');
const crypto = require('crypto');

fs.writeFile('password.txt', 'kjsk', (err) => {
    if(err) throw err;
    console.log('password.txt만들엇음');
});

fs.readFile(__dirname+ '/password.txt' , (err,data) => {
    if (err) throw err;
crypto.pbkdf2(data,'salt',1,32,'sha512',(err,deriveKey)=> {
    if (err) throw err;
    const hashed = deriveKey.toString('hex');
    console.log('hashed : ', hashed);

    fs.writeFile('hashed.txt', hashed, (err)=>{
        if(err) throw err;
        console.log(hashed);
    });
});
});
