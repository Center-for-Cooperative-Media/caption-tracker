import path from 'path'
import {
	ConfigLoader,
	DropboxSession,
	TunerDeviceManager,
	WalterCountertop,
	SrtRecorder,
} from './classes'

const config = ConfigLoader.load({
	sourceConfigPath: path.join(__dirname, '../config/sources.json'),
	dropboxConfigPath: path.join(__dirname, '../config/dropbox.json'),
})

const tunerDeviceManager = new TunerDeviceManager(config.tunerDevices)
const dropbox = new DropboxSession({
	accessToken: config.dropbox.accessToken,
	outDirectory: config.dropbox.transcriptsLocation,
})

config.stations.forEach((station) => {
	const tunerDevice = tunerDeviceManager.reserveTunerDevice()
	if (tunerDevice === null) {
		throw new Error(`Could not start recording ${station.name}: No available tuners`)
	}

	const countertop = new WalterCountertop({
		station,
		tunerDevice,
	})

	const srtRecorder = new SrtRecorder({
		outDirectory: './tmp',
		dropbox,
	})

	countertop.on('data', (payload) => {
		switch (payload.type) {
			case 'SEGMENT.START':
				srtRecorder.startNewRecording(payload)
				break
			case 'TEXT.SRT':
				srtRecorder.processSrtPayload(payload)
				break
			default:
				break
		}
	})

	countertop.start()
})
