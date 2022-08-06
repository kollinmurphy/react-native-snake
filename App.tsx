import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Game from './components/Game';
import { LayoutDataProvider } from './hooks/useLayoutData';
import { SnakeProvider } from './hooks/useSnake';
import Palette from './styles/palette';

export default function App() {
  return (
    <SafeAreaProvider>
      <LayoutDataProvider>
        <SnakeProvider>
          <StatusBar style='light' backgroundColor={Palette.primaryBackground} />
          <SafeAreaView style={{ flex: 1 }}>
            <Game />
          </SafeAreaView>
        </SnakeProvider>
      </LayoutDataProvider>
    </SafeAreaProvider>
  );
}
