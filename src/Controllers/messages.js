import { getData, saveData } from '../services/messages.js';

class MsgController {
	async save(data) {
		await saveData(data);
	}

	async getAll() {
		return await getData();
	}
}

export default MsgController;
