
const sendSmsApi = async (phone, mensagem) => {
    var request = require('request');
    var options = {
        method: 'POST',
        url: '*******************************',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': '*******************'
        },
        body: JSON.stringify({
            destination_addr: phone,
            message: mensagem,
        })
    };
    request(options, function (error, response) {
        if(error) throw new Error(error);
        console.log(response.body);
    })
}

module.exports = sendSmsApi