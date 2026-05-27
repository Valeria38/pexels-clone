"use client";
import HeartIcon from "@heroicons/react/24/solid/HeartIcon";
import { useState } from "react";
import Button from "../Button";
import { toggleLikeAction } from "@/lib/actions";

interface ILikeButtonProps {
  photoId: number;
  isLiked: boolean;
  guestId?: string;
}

const LikeButton = ({ photoId, isLiked, guestId }: ILikeButtonProps) => {
  const [liked, setLiked] = useState(isLiked);

  const toggleLike = async () => {
    const nextState = !liked;
    setLiked(nextState);

    try {
      await toggleLikeAction(photoId, nextState, guestId);
    } catch (error) {
      setLiked(!nextState);
      console.error("Failed to toggle like", error);
    }
  };

  return (
    <Button
      onClick={toggleLike}
      color="gray"
      className="md:px-3"
      aria-label="like-photo"
    >
      <HeartIcon
        role="img"
        className={`size-6 ${liked ? "text-red-500" : "text-white stroke-gray-400 stroke-2"
          }`}
      />
    </Button>
  );
};

export default LikeButton;
