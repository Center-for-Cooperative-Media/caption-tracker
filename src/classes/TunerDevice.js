export class TunerDevice {
	constructor({
		url = '',
		tunerCount = 1,
	} = {}) {
		this.url = url
		this.tunerCount = tunerCount
		this.allocatedTuners = 0
	}

	allocateTuner() {
		this.allocatedTuners += 1
	}

	deallocateTuner() {
		this.allocatedTuners -= 1
	}

	hasAvailableTuner() {
		return this.allocatedTuners < this.tunerCount
	}
}
