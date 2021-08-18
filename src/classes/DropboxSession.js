import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'
import { Dropbox } from 'dropbox'

export class DropboxSession {
	constructor({
		accessToken = '',
		outDirectory = '',
	} = {}) {
		this.outDirectory = outDirectory
		this.dbx = new Dropbox({
			accessToken,
			fetch,
		})
	}

	async upload(filePath) {
		const fileName = path.basename(filePath)
		const outPath = `${this.outDirectory}/${fileName}`
		try {
			process.stdout.write(`Uploading to dropbox: ${filePath} => ${outPath}\n`)
			await this.dbx.filesUpload({
				path: outPath,
				contents: fs.readFileSync(filePath),
			})
		} catch (e) {
			process.stdout.write(`${e.toString()}\n`)
		}
	}
}
