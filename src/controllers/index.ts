import { ClientService } from "../services/clients.services";
import { ContactService } from "../services/contacts.services";
import { SessionService } from "../services/session.services";
import { ClientController } from "./clients.controllers";
import { ContactController } from "./contacts.controllers";
import { SessionController } from "./session.controllers";

const clientService = new ClientService()
const clientController = new ClientController(clientService)
const contactService = new ContactService()
const contactController = new ContactController(contactService)
const sessionService = new SessionService()
const sessionController = new SessionController(sessionService)

export {clientController, contactController, sessionController}