import './app.scss';

export class AppComponent implements ng.IComponentOptions {
	template = require('./app.template.html');
	controller = AppController;

	public static factory(): AppComponent {
		return new AppComponent();
	}
}

class AppController {
	public text: string;

	public click() {
		this.text = Date.now().toString();
	}
}