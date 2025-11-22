// src/components/Option.jsx
import React from "react";
import { Text, View, StyleSheet } from "react-native";

const Option = ({ text, isCorrect, isSelected, showResult }) => {
  const getOptionStyle = () => {
    if (showResult) {
      if (isCorrect) {
        return [styles.optionContainer, styles.correct];
      }
      if (isSelected && !isCorrect) {
        return [styles.optionContainer, styles.incorrect];
      }
    }
    return isSelected
      ? [styles.optionContainer, styles.selected]
      : styles.optionContainer;
  };

  return (
    <View style={getOptionStyle()}>
      <Text style={styles.optionText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  optionContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
  },
  selected: {
    borderColor: "#007bff",
    backgroundColor: "#e7f3ff",
  },
  correct: {
    borderColor: "#28a745",
    backgroundColor: "#d4edda",
  },
  incorrect: {
    borderColor: "#dc3545",
    backgroundColor: "#f8d7da",
  },
});

export default Option;
