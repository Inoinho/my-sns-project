import Chance from 'chance';
import {UserProfile} from '../types/user';

const chance = new Chance();

export const makeRandomUser = (): UserProfile => ({
  id: chance.unique(chance.integer, 1, {min: 0, max: 100000})[0],
  name: chance.name(),
  email: chance.email(),
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${chance.word()}`, // 랜덤 아바타 서비스
  bio: chance.paragraph({sentences: 2}),
  isGoldMember: chance.bool(),
  postImage: `https://picsum.photos/seed/${chance.guid()}/600/400`,
});
