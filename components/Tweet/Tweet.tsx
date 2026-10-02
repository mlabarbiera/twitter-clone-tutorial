'use client';
import { useState } from 'react';
import styles from './Tweet.module.scss'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';
import { PiSealCheckFill } from 'react-icons/pi';
import { FiMoreHorizontal } from 'react-icons/fi';
import { FaChartBar, FaHeart, FaRegComment, FaRegHeart, FaRetweet, FaShare } from 'react-icons/fa';

interface TweetProps {
    tweetId: string;
    avatarUrl: string;
    name: string;
    handle: string;
    time: string;
    content: string;
    comments: number;
    retweets: number;
    likes: number;
    onDelete: (tweetId: string) => void;
}

export const Tweet = ({ tweetId, avatarUrl, name, handle, time, content, comments, retweets, likes, onDelete }: TweetProps) => {
    const [commentCount, setCommentCount] = useState(comments || 0);
    const [retweetCount, setRetweetCount] = useState(retweets || 0);
    const [likeCount, setLikeCount] = useState(likes || 0);
    const [isLiked, setIsLiked] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const handleMenuToggle = () => setShowMenu(!showMenu);

    const handleLike = async () => {
        const newLikeCount = isLiked ? likeCount - 1 : likeCount + 1;
        setIsLiked(!isLiked);
        setLikeCount(newLikeCount);

        try {
            const tweetRef = doc(db, "tweets", tweetId);
            await updateDoc(tweetRef, { likes: newLikeCount });
        } catch (error) {
            console.error("Error updating like count:", error);
        }
    };

    const handleRetweet = async () => {
        const newRetweetCount = retweetCount + 1;
        setRetweetCount(newRetweetCount);

        try {
            const tweetRef = doc(db, "tweets", tweetId);
            await updateDoc(tweetRef, { retweets: newRetweetCount });
        } catch (error) {
            console.error("Error updating retweet count:", error);
        }
    };

    const handleComment = async () => {
        const newCommentCount = commentCount + 1;
        setCommentCount(newCommentCount);

        try {
            const tweetRef = doc(db, "tweets", tweetId);
            await updateDoc(tweetRef, { comments: newCommentCount });
        } catch (error) {
            console.error("Error updating comment count:", error);
        }
    };

    const handleDelete = async () => {
        try {
            const tweetRef = doc(db, "tweets", tweetId);
            await deleteDoc(tweetRef);
            onDelete(tweetId);
        } catch (error) {
            console.error("Error deleting tweet:", error);
        }
    };

    return (
        <div className={styles.tweet}>
            <img src={avatarUrl} alt={`${name}'s avatar`} className={styles.avatar} />
            <div className={styles.tweetContent}>
                <div className={styles.header}>
                    <span className={styles.name}>{name}</span>
                    <span className={styles.handle}>@{handle} <PiSealCheckFill className={styles.verifiedIcon} /></span>
                    <span className={styles.time}> - {time}</span>
                    <FiMoreHorizontal className={styles.moreIcon} onClick={handleMenuToggle} />
                </div>
                {showMenu && (
                    <div className={styles.menu}>
                        <div onClick={handleDelete} className={styles.menuItem}>
                            Delete Tweet
                        </div>
                        <div className={styles.menuItem}>Unpin from profile</div>
                        <div className={styles.menuItem}>Add/remove from highlights</div>
                        <div className={styles.menuItem}>Add/remove @{handle} from Lists</div>
                        <div className={styles.menuItem}>Change who can reply</div>
                        <div className={styles.menuItem}>View post engagements</div>
                        <div className={styles.menuItem}>Embed post</div>
                        <div className={styles.menuItem}>View post analytics</div>
                        <div className={styles.menuItem}>Request Community Note</div>
                    </div>
                )}
                <div className={styles.body}>
                    <p>{content}</p>
                </div>
                <div className={styles.actions}>
                    <div className={styles.action} onClick={handleComment}>
                        <FaRegComment className={styles.icon} />
                        <span>{commentCount}</span>
                    </div>
                    <div className={styles.action} onClick={handleRetweet}>
                        <FaRetweet className={styles.icon} />
                        <span>{retweetCount}</span>
                    </div>
                    <div className={styles.action} onClick={handleLike}>
                        {isLiked ? (
                            <FaHeart className={`${styles.icon} ${styles.liked}`} />
                        ) : (
                            <FaRegHeart className={styles.icon} />
                        )}
                        <span>{likeCount}</span>
                    </div>
                    <div className={styles.action}>
                        <FaChartBar className={styles.icon} />
                        <span>
                            {Math.floor(Math.random() * 5000000 + 1000).toLocaleString()}
                        </span>{" "}
                    </div>
                    <div className={styles.action}>
                        <FaShare className={styles.icon} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tweet;