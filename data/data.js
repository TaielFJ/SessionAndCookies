const fs = require('fs');
const path = require('path');

module.exports = {
    users: JSON.parse(fs.readFileSync(path.join(__dirname, 'user.json'), 'utf-8')),
    writeUsers: (data) => {
        fs.writeFileSync(path.join(__dirname, 'user.json'), JSON.stringify(data));
    }
}