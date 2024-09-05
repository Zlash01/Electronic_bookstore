import {View, Text} from 'react-native';
import React from 'react';
import Auth from './src/component/auth/Login';
import {NavigationContainer} from '@react-navigation/native';
import AuthStackScreen from './src/router/index.js';
import BigStoryCard from './src/component/home/BigStoryCard.tsx';
import Navigation from './src/router/index.js';

const App = () => {
  return <Navigation />;
};

// const App = () => {
//   return <AuthStackScreen />;
// };

// const App = () => {
//   const dummyData = {
//     title: 'The Combat Baker And Automation Waitress',
//     idBooks: 123,
//     description: `The former soldier of the Principality of Wiltia moves to a rural town to open a bakery. While he has no problem baking delicious bread, this battle-scarred veteran discovers that his intimidating demeanor is scaring off potential customers. Just when he's ready to give up, Sven walked into his shop to ask for a job of a waitress. Could hiring her save his bakery? Just who is this beautiful girl? Is she even human?! `,
//     imageLink: 'https://i.postimg.cc/8ckPPDky/image-1.png',
//     author: 'SOW',
//   };

//   return (
//     <BigStoryCard
//       title={dummyData.title}
//       idBooks={dummyData.idBooks}
//       description={dummyData.description}
//       imageLink={dummyData.imageLink}
//       author={dummyData.author}
//     />
//   );
// };

export default App;
