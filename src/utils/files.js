import fs from 'fs'
import { getPayloadStartTime } from './payloads'

export function loadAndParseJsonFile(path) {
	const rawData = fs.readFileSync(path)
	const data = JSON.parse(rawData)
	return data
}

export function isEmptyFile(path) {
	const stats = fs.statSync(path)
	return stats.size === 0
}

export function generateSegmentFileName(segmentPayload) {
	const segmentStartTime = getPayloadStartTime(segmentPayload)
	const segmentData = JSON.parse(segmentPayload.data.toString('utf8'))
	return `${segmentData.title}_caption_${segmentStartTime.format('YY-MM-DD-HH-mm-ss')}.txt`
}
