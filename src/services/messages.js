import logger from '../config/loger.js';
import MessagesRepo from '../persistence/repository/messagesRepo.js';

const msgDAO = new MessagesRepo();

export async function getData() {
	try {
		return await msgDAO.readFile();
	} catch (err) {
		console.log(err);
		logger.error(`Could not get messages`);
	}
}

export async function getCompleteData() {
	try {
		return await msgDAO.readCompleteFile();
	} catch (err) {
		console.log(err);
		logger.error(`Could not get messages`);
	}
}

export async function saveData(data) {
	try {
		let arrayJSON = await getCompleteData();
		arrayJSON.unshift(data);
		await msgDAO.writeFile(arrayJSON);
	} catch {
		logger.error(`Could not add message to file.`);
	}
}
