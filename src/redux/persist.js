import DataStore from 'nedb';
import { ipcRenderer } from 'electron';
import path from 'path';

export let neDB;

export const connect = () => {
    neDB = new DataStore({
        filename: path.join(
            ipcRenderer.sendSync('getPath', 'appData'),
            'capital',
            'capital.db'
        ),
        autoload: true
    });
};

export const database = () => {
    return neDB || {};
};
