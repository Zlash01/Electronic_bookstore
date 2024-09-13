import {View, Text} from 'react-native';
import React from 'react';
import Auth from './src/component/auth/Login';
import {NavigationContainer} from '@react-navigation/native';
import AuthStackScreen from './src/router/index.js';
import Navigation from './src/router/index.js';
import BookDetail from './src/component/bookDetail/BookDetail.tsx';

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

const App = () => {
  return <BookDetail idBooks={1} />;
};

export default App;
