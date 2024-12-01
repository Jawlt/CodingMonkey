type WordContainerProps = {
  word: string;
  selectedLanguage: 'python' | 'javascript' | 'c';
};

const WordContainer = ({ word, selectedLanguage }: WordContainerProps) => {
  return (
    <div className='relative left-0 top-0 break-all whitespace-pre-wrap font-mono text-xl opacity-80 lg:text-2xl'>
      {word}
    </div>
  );
};

export default WordContainer;