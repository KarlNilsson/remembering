import { controller } from './controller.js';
import { view } from './remembering-view.js';
import { model } from './remembering-model.js';

view.initializeView();
model.initialize(localStorage);
view.setStorage(localStorage);
view.loadStorage();
controller.initialize();
