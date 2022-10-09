import { gql } from '@apollo/client'

export const VOICE_GET_CARDS_FOR_DAY = gql`
query GetVoiceCardsFromYesterday($day: Int!, $language: Language) {
	cardsForDay: voiceCardsForDay(day: $day, language: $language) {
		name
		image
		backgroundImage
		type
		cardCode
		regionRefs
		rarity
		language
	}
}
`