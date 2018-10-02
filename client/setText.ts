export default class johnny {
	public setText() {
		const currDate: string = Date.now().toString();
		document.getElementById('text').innerHTML = currDate;
	}
}