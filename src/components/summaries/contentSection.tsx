import { containerVariants, itemVariants } from "@/utils/constants";
import { MotionDiv } from "../common/motionWrapper";

const parsePoint = (point: string) => {
    const isNumbered = /^\d+\./.test(point);
    const isMainPoint = /^[-•*]/.test(point);

    const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]/u;
    const hasEmoji = emojiRegex.test(point);
    const isEmpty = !point.trim();

    return { isNumbered, isMainPoint, hasEmoji, isEmpty };
}

const parseEmojiPoint = (content:string) => {
    const cleanContent = content.replace(/^[-]\s*/, '').trim();
    const matches = cleanContent.match(/^(\p{Emoji}+)(.+)$/u);
    if(!matches) return null;

    const [_, emoji, text] = matches;
    return {
        emoji: emoji.trim(),
        text: text.trim()
    }
}

const EmojiPoint = ({point, index}: {point: string; index:number}) => {
    const { emoji, text } = parseEmojiPoint(point) || { emoji: '', text: '' };
    return (
        <MotionDiv variants={itemVariants} key={`point-${index}`}
            className="group relative bg-linear-to-br from-gray-200/[0.08] to-gray-400/[0.03] p-4
            rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all"
        >
            <div className=" inset-0 bg-linear-to-r from-gray-500/10 to-transparent
                group-hover:opacity-100 transition-opacity rounded-2xl">
                    <div className="p-2 relative flex items-start gap-3">
                        <span className="text-lg lg:text-xl shrink-0 pt-1">{emoji}</span>
                        <p className="text-lg lg:text-xl text-gray-700 leading-relaxed">{text}</p>
                    </div>
            </div>
        </MotionDiv>
    );
}

const RegularPoint = ({point, index}: {point: string; index:number}) => {
    return (
        <MotionDiv variants={itemVariants} className="group relative bg-linear-to-br from-gray-200/[0.08] to-gray-400/[0.03] p-4
            rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all"
            key={`point-${index}`}>
            <div className="inset-0 bg-linear-to-r from-gray-500/10 to-transparent
                group-hover:opacity-100 transition-opacity rounded-2xl">
                    <p className="p-2 text-gray-700 text-lg lg:text-xl leading-relaxed">{point}</p>
            </div>
        </MotionDiv>
    )
}

const ContentSection = ({title, points}: {
    title?: string;
    points: string[];
}) => {
  return (
    <MotionDiv variants={containerVariants} 
        key={points.join('')}
        initial="hidden"
        animate={"visible"}
        exit={"exit"}
        className="space-y-4"
    >
      {points.map((point,index) => {
        const { isMainPoint, hasEmoji, isEmpty } = parsePoint(point);
        
        if(isEmpty) return null;

        if(hasEmoji || isMainPoint){
            return (
                <EmojiPoint key={`point-${index}`} point={point} index={index}/>
            );
        }   

        return <RegularPoint key={`point-${index}`} point={point} index={index}/>
      })}
    </MotionDiv>
  );
}

export default ContentSection;