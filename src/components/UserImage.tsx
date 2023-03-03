"use client";

export const UserImage = ({
  image,
  className = "h-8 md:h-10",
}: {
  image?: string | null;
  className?: string;
}) => {
  return (
    <img
      alt="user"
      src={image || "/user.png"}
      className={`aspect-square shrink-0 rounded-full object-cover ${className}`}
      onError={(e) => {
        e.currentTarget.src = "/user.png";
      }}
    />
  );
};
