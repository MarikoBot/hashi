"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileManager = void 0;
const fs = require("fs");
const path = require("path");
const _1 = require("./");
/**
 * The class that manages the files included into this project, and also those at the root of the package user.
 */
class FileManager {
    /**
     * The client instance.
     */
    #client;
    /**
     * Get the client instance.
     * @returns The client instance.
     */
    get client() {
        return this.#client;
    }
    /**
     * The constructor to instance the FileManager class. Client can be useful to pass.
     * @param client The client instance.
     */
    constructor(client) {
        this.setClient(client);
    }
    /**
     * Set the client instance.
     * @param client The client instance.
     * @returns The class instance.
     */
    setClient(client) {
        if (client instanceof _1.HashiClient)
            this.#client = client;
        return this;
    }
    /**
     * Get, store and returns an array of data included into a directory.
     * @param absPathStr The absolute path to look-up for.
     * @param rmPathStr The recursive path to look-up for.
     * @param selfResearch Options if the program needs to search for the file into its own folders.
     * @returns An array of values.
     */
    read(absPathStr, rmPathStr, selfResearch) {
        let files = [];
        if (fs.existsSync(`${absPathStr}`))
            files = fs.readdirSync(`${absPathStr}`).map((f) => [f, rmPathStr]);
        if (selfResearch && fs.existsSync(`${selfResearch.absPathStrSelf}`) && process.env.ENVPATH !== 'lab')
            files = files.concat(fs
                .readdirSync(`${selfResearch.absPathStrSelf}`)
                .map((f) => [f, selfResearch.rmPathStrSelf]));
        const arrayOfData = [];
        let i = -1;
        while (++i < files.length) {
            if (files[i][0] === 'index.js')
                continue;
            arrayOfData.push([
                files[i][0].replace('.js', ''),
                require(path.join(__dirname, `${files[i][1]}/${files[i][0]}`)),
            ]);
        }
        return arrayOfData;
    }
    /**
     * The absolute directory path based on the environment.
     * @returns The path.
     */
    static get ABSPATH() {
        return {
            lab: 'lib/',
            prod: 'lib/',
        }[process.env.ENVPATH];
    }
    /**
     * The backward directory path based on the environment.
     * @returns The path.
     */
    static get RMPATH() {
        return {
            lab: '../../lib/',
            prod: '../../../../../lib/',
        }[process.env.ENVPATH];
    }
}
exports.FileManager = FileManager;
