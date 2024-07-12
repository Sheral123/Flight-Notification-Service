const CrudRepo = require('./crud-repo');
const { Ticket } = require('../models');
const { where } = require('sequelize');
class TicketRepo extends CrudRepo{
    constructor(){
        super(Ticket);
    }

    async getPendingTickets() {
        const response = await Ticket.findall({
            where: {
                status: 'PENDING'
            }
        });
        return response;
    }
}

module.exports = TicketRepo;  