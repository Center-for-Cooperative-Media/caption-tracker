import { getDayOffsetByCode } from '../utils/time'

export class Station {
	constructor({
		name = '',
		channel = '',
		programs = [],
	} = {}) {
		this.name = name
		this.channel = channel
		this.programs = programs
	}

	getProgramSegments() {
		return this.programs.flatMap((program) => {
			const baseSegments = [
				{
					offset: program.startMs,
					data: program.data,
				},
				{
					offset: program.startMs + program.durationMs,
					data: null,
				},
			]
			return program.schedule.flatMap((dayCode) => baseSegments
				.map((segment) => ({
					offset: segment.offset + getDayOffsetByCode(dayCode),
					data: segment.data,
				})))
		})
	}
}
