"use client";

export const UserImage = ({ image }: { image?: string | null }) => {
  return (
    <img
      alt="user"
      src={image || "/user.png"}
      className="aspect-square h-8 md:h-10 shrink-0 rounded-full object-cover"
      onError={(e) => {
        e.currentTarget.src = "/user.png";
      }}
    />
  );
};
