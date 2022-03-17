import {useContext} from 'react';
import {TranslatorContext} from '../providers/TranslatorProvider';

const useTranslator = () => {
  const {translate} = useContext(TranslatorContext);
  return {translate};
};

export default useTranslator;
