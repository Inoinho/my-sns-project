import {UserProfile} from '../types/user';
import {motion, HTMLMotionProps} from 'framer-motion';

export function UserCard({user, onDelete, onSwap, ...rest}: UserCardProps) {
  return (
    <motion.div
      {...rest}
      layout
      initial={{opacity: 0, scale: 0.9}}
      animate={{opacity: 1, scale: 1}}
      exit={{opacity: 0, scale: 0.5, transition: {duration: 0.2}}}
      transition={{
        layout: {type: 'spring', stiffness: 300, damping: 30},
        opacity: {duration: 0.2},
      }}
      className={`w-full overflow-hidden rounded-xl border transition-all ${
        user.isGoldMember
          ? 'border-yellow-400 bg-yellow-50 shadow-lg dark:bg-yellow-900/20'
          : 'border-gray-200 bg-white shadow-sm dark:bg-slate-800'
      }`}
    >
      <div className="flex items-center gap-3 p-3">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-12 h-12 border border-gray-200 rounded-full"
        />
        <strong className="flex-1 truncate dark:text-white">
          {user.name} {user.isGoldMember && '👑'}
        </strong>
        <button
          className="text-xs text-blue-600 hover:underline"
          onClick={(event) => {
            event.preventDefault();
            onSwap(user.id);
          }}
        >
          변경
        </button>
      </div>

      <img
        src={user.postImage}
        alt="post"
        className="object-cover w-full aspect-video"
      />

      <div className="p-4">
        <div className="mb-2 text-2xl transition-transform cursor-pointer hover:scale-110 w-fit">
          ❤️
        </div>
        <p className="mb-1 text-xs text-gray-500">{user.email}</p>
        <p className="text-sm text-gray-700 line-clamp-2 dark:text-gray-300">
          {user.bio}
        </p>
        <button
          className="w-full py-2 mt-4 text-sm text-red-500 transition-colors border border-red-200 rounded-lg hover:bg-red-50"
          onClick={(event) => {
            event.preventDefault();
            onDelete(user.id);
          }}
        >
          삭제
        </button>
      </div>
    </motion.div>
  );
}

export interface UserCardProps extends HTMLMotionProps<'div'> {
  user: UserProfile;
  onDelete: (id: number) => void;
  onSwap: (id: number) => void;
}
