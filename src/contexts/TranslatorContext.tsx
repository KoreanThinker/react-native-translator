import React, {createContext, useCallback, useContext, useState} from 'react';
import {View} from 'react-native';
import Translator, {LanguageCode, SourceLanguageCode, TranslatorType} from '..';
import {TranslatorProps} from '../components/Translator';

type Translate = <T extends TranslatorType = 'google'>(
  from: SourceLanguageCode<T>,
  to: LanguageCode<T>,
  value: string,
  option?: {
    type?: T;
    timeout?: number;
  },
) => Promise<string>;
interface TranslatorContextType {
  translate: Translate;
}
interface Task extends TranslatorProps<TranslatorType> {
  active: boolean;
}

const TranslatorContext = createContext<TranslatorContextType>({} as any);

export const useTranslator = () => {
  const {translate} = useContext(TranslatorContext);
  return {translate};
};

export function TranslatorProvider({children}: {children: React.ReactNode}) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const translate: Translate = useCallback(
    async (_from, _to, _value, option) => {
      return new Promise<string>((resolve, reject) => {
        setTasks(prev => {
          const timeout = option?.timeout ?? 5000;
          const currentIndex = prev.length;

          function inactive() {
            setTasks(_prev => {
              const copyTasks = [..._prev];
              copyTasks[currentIndex].active = false;
              return copyTasks;
            });
          }

          setTimeout(() => {
            inactive();
            reject('translate timeout');
          }, timeout);

          function onTranslated(result: string) {
            inactive();
            resolve(result);
          }

          return [
            ...prev,
            {
              active: true,
              from: _from,
              to: _to,
              value: _value,
              type: option?.type ?? 'google',
              onTranslated,
            },
          ];
        });
      });
    },
    [],
  );

  // TODO clean up all tasks when every tasks are inactived, to use throttle or debounce

  return (
    <TranslatorContext.Provider value={{translate}}>
      <View style={{width: 0, height: 0}}>
        {tasks.map((task, index) => (
          <TranslatorWrapper {...task} key={index} />
        ))}
      </View>
      {children}
    </TranslatorContext.Provider>
  );
}

function TranslatorWrapper({active, ...translatorProps}: Task) {
  if (!active) {
    return null;
  }
  return <Translator {...translatorProps} />;
}
