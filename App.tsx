import React from 'react';
import Navigation from './src/router/index.js';
import EditCard from './src/component/write/Util/EditCard.js';

const App = () => {
  return <EditCard />;
};

// const App = () => {
//   return <Navigation />;
// };

// const App = () => {
//   return <AuthStackScreen />;
// };

// const App = () => {
//   const dummyData = [
//     {
//       title: 'Test Waitress',
//       idBooks: 123,
//       description: `The former soldier of the Principality of Wiltia moves to a rural town to open a bakery. While he has no problem baking delicious bread, this battle-scarred veteran discovers that his intimidating demeanor is scaring off potential customers. Just when he's ready to give up, Sven walked into his shop to ask for a job of a waitress. Could hiring her save his bakery? Just who is this beautiful girl? Is she even human?! `,
//       imageLink: 'https://i.postimg.cc/8ckPPDky/image-1.png',
//       author: 'SOW',
//     },
//     {
//       title: 'Test Waitress',
//       idBooks: 123,
//       description: `2The former soldier of the Principality of Wiltia moves to a rural town to open a bakery. While he has no problem baking delicious bread, this battle-scarred veteran discovers that his intimidating demeanor is scaring off potential customers. Just when he's ready to give up, Sven walked into his shop to ask for a job of a waitress. Could hiring her save his bakery? Just who is this beautiful girl? Is she even human?! `,
//       imageLink: 'https://i.postimg.cc/8ckPPDky/image-1.png',
//       author: 'SOW',
//     },
//     {
//       title: 'Test Waitress',
//       idBooks: 123,
//       description: `3The former soldier of the Principality of Wiltia moves to a rural town to open a bakery. While he has no problem baking delicious bread, this battle-scarred veteran discovers that his intimidating demeanor is scaring off potential customers. Just when he's ready to give up, Sven walked into his shop to ask for a job of a waitress. Could hiring her save his bakery? Just who is this beautiful girl? Is she even human?! `,
//       imageLink: 'https://i.postimg.cc/8ckPPDky/image-1.png',
//       author: 'SOW',
//     },
//     {
//       title: 'Test Waitress',
//       idBooks: 123,
//       description: `4The former soldier of the Principality of Wiltia moves to a rural town to open a bakery. While he has no problem baking delicious bread, this battle-scarred veteran discovers that his intimidating demeanor is scaring off potential customers. Just when he's ready to give up, Sven walked into his shop to ask for a job of a waitress. Could hiring her save his bakery? Just who is this beautiful girl? Is she even human?! `,
//       imageLink: 'https://i.postimg.cc/8ckPPDky/image-1.png',
//       author: 'SOW',
//     },
//     {
//       title: 'Test Waitress',
//       idBooks: 123,
//       description: `5The former soldier of the Principality of Wiltia moves to a rural town to open a bakery. While he has no problem baking delicious bread, this battle-scarred veteran discovers that his intimidating demeanor is scaring off potential customers. Just when he's ready to give up, Sven walked into his shop to ask for a job of a waitress. Could hiring her save his bakery? Just who is this beautiful girl? Is she even human?! `,
//       imageLink: 'https://i.postimg.cc/8ckPPDky/image-1.png',
//       author: 'SOW',
//     },
//     {
//       title: 'Test Waitress',
//       idBooks: 123,
//       description: `6The former soldier of the Principality of Wiltia moves to a rural town to open a bakery. While he has no problem baking delicious bread, this battle-scarred veteran discovers that his intimidating demeanor is scaring off potential customers. Just when he's ready to give up, Sven walked into his shop to ask for a job of a waitress. Could hiring her save his bakery? Just who is this beautiful girl? Is she even human?! `,
//       imageLink: 'https://i.postimg.cc/8ckPPDky/image-1.png',
//       author: 'SOW',
//     },
//   ];

//   const continueData = {
//     title: 'Test Waitress',
//     idBooks: 123,
//     description: `The former soldier of the Principality of Wiltia moves to a rural town to open a bakery. While he has no problem baking delicious bread, this battle-scarred veteran discovers that his intimidating demeanor is scaring off potential customers. Just when he's ready to give up, Sven walked into his shop to ask for a job of a waitress. Could hiring her save his bakery? Just who is this beautiful girl? Is she even human?! `,
//     imageLink: 'https://i.postimg.cc/8ckPPDky/image-1.png',
//     author: 'SOW',
//   };
//   return <ContinueCard data={continueData} />;
// };

// const App = () => {
//   return <BookDetail idBooks={1} />;
// };

// const App = () => {
//   return (
//     <IndividualChapter
//       chapterId={1}
//       chapterNumber={1}
//       chapterTitle={'A slient hill'}
//       chapterDate={'12/10/2003'}
//     />
//   );
// };

// const App = () => {
//   return (
//     <ReviewCard
//       Userid={1}
//       Username={'John Doe'}
//       UserImage={'https://i.postimg.cc/jq1v1hhR/image.png'}
//       Review={
//         'Generating random paragraphs can be an excellent way for writers to get their creative flow going at the beginning of the day. The writer has no idea what topic the random paragraph will be about when it appears. This forces the writer to use creativity to complete one of three common writing challenges. The writer can use the paragraph as the first one of a short story and build upon it. A second option is to use the random paragraph somewhere in a short story they create. The third option is to have the random paragraph be the ending paragraph in a short story. No matter which of these challenges is undertaken, the writer is forced to use creativity to incorporate the paragraph into their writing.'
//       }
//       ReviewDate={'2023-10-01'}
//       ReviewVote={10}
//       ReviewVoteUp={5}
//     />
//   );
// };

export default App;
