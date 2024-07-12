const {TicketRepo} = require("../repositories/");
const {MAILER} = require('../config')

const ticketRepo = new TicketRepo();

async function sendEmail(mailFrom,mailTo,subject,text){
    try {
        const response = await MAILER.sendMail({
            from: mailFrom,
            to: mailTo,
            subject: subject,
            text: text
        });
        return response;

    } catch (error) {
        throw(error);
    }
}

async function createTicket(data){
    try {
        const response = await ticketRepo.create(data);
        return response;

    } catch (error) {
        throw(error);
    }
}

async function getPendingEmails(){
    try {
        const response = await ticketRepo.getPendingEmails();
        return response;

    } catch (error) {
        throw(error);
    }
}



module.exports = {
    sendEmail,
    createTicket,
    getPendingEmails
}