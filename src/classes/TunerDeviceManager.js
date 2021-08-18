export class TunerDeviceManager {
	constructor(tunerDevices = []) {
		this.tunerDevices = tunerDevices
	}

	reserveTunerDevice() {
		const availableTunerDevices = this.tunerDevices.filter(
			(tunerDevice) => tunerDevice.hasAvailableTuner(),
		)
		if (availableTunerDevices.length === 0) {
			return null
		}
		const tunerDevice = availableTunerDevices[0]
		tunerDevice.allocateTuner()
		return tunerDevice
	}
}
