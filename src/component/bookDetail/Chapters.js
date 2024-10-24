import {View, Text, ScrollView} from 'react-native';
import React from 'react';

const Chapters = props => {
  const RenderParts = () => {
    return props.map((part, index) => (
      <IndividualChapter
        key={index}
        chapterId={part.idParts}
        chapterTitle={part.title}
        chapterDate="2021-09-19"
        chapterNumber={part.chapter}
      />
    ));
  };
  return (
    <ScrollView>
      <RenderParts />
    </ScrollView>
  );
};

export default Chapters;
