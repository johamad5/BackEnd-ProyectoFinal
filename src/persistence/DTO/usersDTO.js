export default class UsersDTO {
	constructor({ _id, name, email, age, address, phone, admin }) {
		this.userId = `${_id}`;
		this.user = ` - ${name} - [ ${email} ]`;
		this.age = age;
		this.contactInfo = `${address} - [ ${phone} ]`;
		this.admin = admin;
	}
}

export function transformToDTO(users) {
	if (Array.isArray(users)) {
		return users.map((user) => new UsersDTO(user));
	} else {
		return new UsersDTO(users);
	}
}
