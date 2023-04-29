import logger from '../config/loger.js';
import { getAllInfoUserById } from '../services/users.js';

const renderHome = async (req, res) => {
	const { url, method } = req;
	logger.info(`Request received by the server. Route ${method} - ${url}`);

	let _id = req.session.passport?.user;
	let user = await getAllInfoUserById(_id);
	if (user?.name === undefined) {
		res.render('pages/home.ejs', { title: 'CENTRO DE MENSAJES' });
	} else {
		res.render('pages/homeAUTH.ejs', {
			title: 'CENTRO DE MENSAJES',
			name: user.name,
		});
	}
};

export default renderHome;
