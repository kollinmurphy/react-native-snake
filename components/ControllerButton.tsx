import { Pressable, StyleSheet } from "react-native";
import Spacing from "../styles/spacing";
import { AntDesign } from '@expo/vector-icons'; 
import Palette from "../styles/palette";
import useSnake from "../hooks/useSnake";
import { Direction } from "../logic/types";
import { useCallback } from "react";

export interface ControllerButtonProps {
  type: Direction;
}

const ControllerButton = ({ type } : ControllerButtonProps) => {
  const snake = useSnake()

  const handlePress = useCallback(() => {
    snake.handleDirectionPressed(type)
  }, [type])

  return (
    <Pressable
      onTouchStart={handlePress}
      style={({ pressed }) => [styles.container, pressed ? styles.pressed : null]}
    >
      <AntDesign name={type} size={48} color='white' />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: '50%',
    height: '100%',
    backgroundColor: Palette.button,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Spacing.baseSpacing,
    borderRadius: Spacing.borderRadius,
    borderWidth: 1,
    borderColor: Palette.primaryBackground,
  },
  pressed: {
    backgroundColor: Palette.buttonPressed,
    borderColor: Palette.button,
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 72,
    backgroundColor: 'red',
  },
})

export default ControllerButton
