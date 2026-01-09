import React from "react";
import {
  View,
  Text,
  SectionList,
  StyleSheet,
} from "react-native";

interface Item {
  id: string;
  name: string;
}

interface Section {
  title: string;
  data: Item[];
}

export default function ContactList() {
  const sections: Section[] = [
    {
      title: "A",
      data: [
        { id: "1", name: "Andi" },
        { id: "2", name: "Ayu" },
      ],
    },
    {
      title: "B",
      data: [
        { id: "3", name: "Budi" },
        { id: "4", name: "Bagas" },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.name}</Text>
        )}
        renderSectionHeader={({ section }) => (
          <Text style={styles.header}>{section.title}</Text>
        )}
        stickySectionHeadersEnabled={true}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#f4f4f4",},
    item: {
    fontSize: 18,
    paddingVertical: 8,
  },
  })