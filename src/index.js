import fs from 'fs'
import dayjs from 'dayjs'
import { dataTypes } from '@tvkitchen/base-constants'
import { Countertop } from '@tvkitchen/countertop'
import { VideoHttpIngestionAppliance } from '@tvkitchen/appliance-video-http-ingestion'
import { VideoCaptionExtractorAppliance } from '@tvkitchen/appliance-video-caption-extractor'
import { VideoSegmentGeneratorAppliance } from '@tvkitchen/appliance-video-segment-generator'
import { CaptionSrtGeneratorAppliance } from '@tvkitchen/appliance-caption-srt-generator'

const sources = [
	{
		station: 'WCAU-TV',
		url: 'http://192.168.1.94:5004/auto/v10.1',
	}
]

sources.forEach(source => {
	const {
		station,
		url,
	} = source
	const countertop = new Countertop()
	countertop.addAppliance(VideoHttpIngestionAppliance, { url })
	countertop.addAppliance(VideoCaptionExtractorAppliance)
	const origin = new Date();
	origin.setHours(0,0,0,0); // Midnight of the current day
	countertop.addAppliance(VideoSegmentGeneratorAppliance, {
		interval: 1800000, // 30 minutes
		startingAt: origin.toISOString(),
	})
	countertop.addAppliance(CaptionSrtGeneratorAppliance, { includeCounter: false })

	let srtWriteStream = null

	countertop.on('data',
		(payload) => {
			switch (payload.type) {
			case dataTypes.TEXT.ATOM:
				process.stdout.write(payload.data)
				break
			case 'SEGMENT.START':
				const segmentStartTime = dayjs(payload.origin).add(payload.position)
				srtWriteStream = fs.createWriteStream(
					`srts/${station}-${segmentStartTime.format('YYYYMMDDHHmmss')}.srt`,
					{flags:'a'},
				)
				break
			case 'TEXT.SRT':
				if (srtWriteStream) {
					srtWriteStream.write(payload.data)
					srtWriteStream.write('\n')
				}
				break
			default:
				break
			}
		})

	countertop.start()
})
