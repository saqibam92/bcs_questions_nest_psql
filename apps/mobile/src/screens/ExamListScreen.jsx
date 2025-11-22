// src/screens/ExamListScreen.jsx
import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { getExams } from "../services/api";

const ExamListScreen = ({ navigation }) => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await getExams();
        setExams(response.data.data);
      } catch (err) {
        setError("Failed to fetch exams.");
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.centered} />;
  }

  if (error) {
    return <Text style={styles.centered}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={exams}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.examCard}
            onPress={() => navigation.navigate("Exam", { examId: item._id })}
          >
            <Text style={styles.examName}>{item.exam_name}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  list: {
    padding: 10,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  examCard: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    // shadowColor: "#000",
    // shadowOpacity: 0.1,
    // shadowRadius: 5,
    // elevation: 3,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  examName: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ExamListScreen;
