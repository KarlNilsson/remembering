import { controller } from './controller.js';
import { view } from './remembering-view.js';
import { model } from './remembering-model.js'

view.initializeView();
model.setStorage(localStorage);
view.setStorage(localStorage);
model.loadStorage();
view.loadStorage();
controller.initialize();
