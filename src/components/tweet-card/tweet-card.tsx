import { TweetCardType } from '@/types/TweetCardType'

import { Card, CardHeader } from '@/components/ui/card'

const TweetCard = ({ tweet, download }: TweetCardType) => {
  if (!tweet) {
    return (
      <Card className="z-50 flex h-fit w-full flex-col overflow-auto rounded-lg shadow-xl dark:bg-zinc-950">
        <CardHeader className="flex flex-row items-center justify-center gap-3 p-3">
          This tweet may have been deleted
        </CardHeader>
      </Card>
    )
  }

  console.log('tweet card', tweet, download)

  return null

  // return (
  //   <div className="z-50 space-y-1">
  //     {!isDeleted && <p className="dark-fit text-xs">Downloaded at {formatDate(downloadAtdAt)}</p>}
  //
  //     <Card className="flex h-fit w-full flex-col overflow-auto rounded-lg shadow-xl dark:bg-zinc-950">
  //       <CardHeader className="flex flex-row justify-between gap-3 p-3">
  //         <TweetCardHeader
  //           tweet={tweet}
  //           isDeleted={isDeleted}
  //         />
  //       </CardHeader>
  //
  //       <CardContent className="px-3 py-1">
  //         <TweetCardContent
  //           entities={tweet.entities}
  //           isDeleted={isDeleted}
  //         />
  //       </CardContent>
  //
  //       <CardFooter className="justify-between px-3 pb-3 pt-3">
  //         <div className={cn('flex gap-1 text-xs text-zinc-400', isDeleted && 'text-zinc-600')}>
  //           <p>{formatDate(createdAt!, false)}</p>
  //           <p>·</p>
  //           <p className="flex items-center gap-0.5">
  //             {formatNumber(tweet?.favorite_count)}
  //             <IoHeartOutline />
  //           </p>
  //         </div>
  //
  //         <div className="z-50 flex items-center gap-2">
  //           {/* Delete button */}
  //           {(isDeleted || (!filename && !isDeleted)) && (
  //             <TweetDelBtn
  //               downloadId={downloadId}
  //               filename={filename}
  //               isDeleted={isDeleted}
  //             />
  //           )}
  //
  //           {/* Play button */}
  //           {filename && !isDeleted && <TweetPlayBtn filename={filename} />}
  //
  //           {/* Download button */}
  //           <TweetDownloadBtn
  //             filename={filename}
  //             tweetUrl={tweet.url}
  //             user={user}
  //             isDeleted={isDeleted}
  //           />
  //
  //           {/* Share button */}
  //           {!isDeleted && filename && (
  //             <TweetShare
  //               downloadId={downloadId}
  //               spaceUrl={tweet.url}
  //               filename={filename!}
  //             />
  //           )}
  //         </div>
  //       </CardFooter>
  //     </Card>
  //   </div>
  // )
}

export default TweetCard
