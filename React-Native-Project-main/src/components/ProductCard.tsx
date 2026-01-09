import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Product } from "../types/product";
import { formatIDR } from "../utils/format";

const PLACEHOLDER_IMG = "https://placehold.co/160x160/png?text=No+Image";

export default function ProductCard({ item }: { item: Product }) {
  const [failed, setFailed] = useState(false);
  const uri = failed ? PLACEHOLDER_IMG : item.imageUrl;

  return (
    <View style={styles.card}>
      <Image
        source={{ uri }}
        style={styles.img}
        resizeMode="cover"
        onError={() => setFailed(true)}
      />
      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.price}>{formatIDR(item.price)}</Text>
        <Text style={styles.desc} numberOfLines={2}>
          {item.description?.trim() ? item.description : "—"}
        </Text>
      </View>
    </View>
  );
}
 
const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: "#151518",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#222228",
  },
  img: { width: 80, height: 80, borderRadius: 14, backgroundColor: "#222" },
  body: { flex: 1, justifyContent: "center" },
  title: { color: "white", fontSize: 16, fontWeight: "700" },
  price: { color: "#d7d7de", marginTop: 4, fontWeight: "600" },
  desc: { color: "#a9a9b2", marginTop: 6, lineHeight: 18 },
});
