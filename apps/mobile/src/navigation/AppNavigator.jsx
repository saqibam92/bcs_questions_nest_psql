// src/navigation/AppNavigator.jsx
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ExamListScreen from "../screens/ExamListScreen";
import QuestionDetailScreen from "../screens/QuestionDetailScreen";
import ExamScreen from "../screens/ExamScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#007bff",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="ExamList"
        component={ExamListScreen}
        options={{ title: "BCS Exams" }}
      />
      <Stack.Screen
        name="QuestionDetail"
        component={QuestionDetailScreen}
        options={{ title: "Question Details" }}
      />
      <Stack.Screen
        name="Exam"
        component={ExamScreen}
        options={{ title: "Exam" }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
