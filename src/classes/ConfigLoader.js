import { TunerDevice } from './TunerDevice'
import { Station } from './Station'
import {
	loadAndParseJsonFile,
} from '../utils/files'

export class ConfigLoader {
	static load({
		sourceConfigPath = '',
		dropboxConfigPath = '',
	} = {}) {
		const sourceConfig = loadAndParseJsonFile(sourceConfigPath)
		const dropboxConfig = loadAndParseJsonFile(dropboxConfigPath)

		return {
			dropbox: {
				accessToken: dropboxConfig.accessToken,
				transcriptsLocation: dropboxConfig.transcriptsLocation,
			},
			tunerDevices: sourceConfig.tunerDevices.map((tunerDevice) => new TunerDevice(tunerDevice)),
			stations: sourceConfig.stations.map((station) => new Station(station)),
		}
	}
}
