import { getTweet, type Tweet } from 'react-tweet/api'
import { enrichTweet } from 'react-tweet'

import TweetCard from '@/components/TweetCard/tweet-card'

type TweetType = Tweet | undefined

const Page = async () => {
  const tweet1: TweetType = await getTweet('1666900714667364352')
  const enrichedTweet1 = enrichTweet(tweet1 as Tweet)

  const tweet2: TweetType = await getTweet('1862267607274885231')
  const enrichedTweet2 = enrichTweet(tweet2 as Tweet)

  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 grid-cols-3 flex-col gap-3 px-4 py-6 md:px-0">
      <TweetCard tweet={enrichedTweet1} />
      <TweetCard tweet={enrichedTweet2} />
    </main>
  )
}

export default Page

// {
//   "__typename": "Tweet",
//   "lang": "en",
//   "favorite_count": 31,
//   "possibly_sensitive": false,
//   "created_at": "2024-11-28T22:49:31.000Z",
//   "display_text_range": [
//     0,
//     154
//   ],
//   "entities": {
//     "hashtags": [],
//     "urls": [
//       {
//         "display_url": "x.com/i/spaces/1MYxN…",
//         "expanded_url": "https://x.com/i/spaces/1MYxNMyyrdNJw",
//         "indices": [
//           128,
//           151
//         ],
//         "url": "https://t.co/6gI27J44AE"
//       }
//     ],
//     "user_mentions": [
//       {
//         "id_str": "257174286",
//         "indices": [
//           102,
//           111
//         ],
//         "name": "Abdelrahman Awad",
//         "screen_name": "logaretm"
//       },
//       {
//         "id_str": "66996653",
//         "indices": [
//           112,
//           125
//         ],
//         "name": "Medhat Dawoud",
//         "screen_name": "Med7atDawoud"
//       }
//     ],
//     "symbols": []
//   },
//   "id_str": "1862267607274885231",
//   "text": "Set a reminder for my upcoming Space! \n\n“🔥 React Face-Off: Best or Worst Frontend Framework? 🚀 vs 💣”\n\n@logaretm\n@Med7atDawoud \n\nhttps://t.co/6gI27J44AE",
//   "user": {
//     "id_str": "218997318",
//     "name": "Ahmed Ghazey",
//     "profile_image_url_https": "https://pbs.twimg.com/profile_images/1827648111445004288/3pFc91Av_normal.jpg",
//     "screen_name": "AhmedGhazey",
//     "verified": false,
//     "is_blue_verified": true,
//     "profile_image_shape": "Circle"
//   },
//   "edit_control": {
//     "edit_tweet_ids": [
//       "1862267607274885231"
//     ],
//     "editable_until_msecs": "1732837771000",
//     "is_edit_eligible": false,
//     "edits_remaining": "5"
//   },
//   "conversation_count": 10,
//   "news_action_type": "conversation",
//   "card": {
//     "card_platform": {
//       "platform": {
//         "audience": {
//           "name": "production"
//         },
//         "device": {
//           "name": "iPhone",
//           "version": "13"
//         }
//       }
//     },
//     "name": "3691233323:audiospace",
//     "url": "https://t.co/6gI27J44AE",
//     "binding_values": {
//       "narrow_cast_space_type": {
//         "string_value": "0",
//         "type": "STRING"
//       },
//       "id": {
//         "string_value": "1MYxNMyyrdNJw",
//         "type": "STRING"
//       },
//       "card_url": {
//         "scribe_key": "card_url",
//         "string_value": "https://t.co/6gI27J44AE",
//         "type": "STRING"
//       }
//     }
//   },
//   "isEdited": false,
//   "isStaleEdit": false
// }
