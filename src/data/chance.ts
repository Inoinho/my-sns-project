import Chance from 'chance';

const chance = new Chance();

export const randomUUID = () => chance.guid();
export const randomName = () => chance.name();
export const randomEmail = () => chance.email();
export const randomId = () => chance.fbid();
export const randomJobTitle = () => chance.profession();
export const randomCompanyName = () => chance.company();
export const randomSentence = (words: number = 5) => chance.sentence({words});
export const randomTitleText = (words: number = 3) => chance.sentence({words});
export const randomParagraphs = (sentences: number = 3) =>
  chance.paragraph({sentences});
