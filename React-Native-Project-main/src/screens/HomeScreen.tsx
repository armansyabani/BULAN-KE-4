import React, { useState } from "react";
import { SafeAreaView, View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { initialProducts } from "../data/initialProducts";
import { NewProductInput, Product } from "../types/product";
import ProductCard from "../components/ProductCard";
import ProductFormModal from "../components/ProductFormModal";

export default function HomeScreen() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [modalVisible, setModalVisible] = useState(false);

  const addProduct = (input: NewProductInput) => {
    const newProduct: Product = {
      id: `p_${Date.now()}`,
      ...input,
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Mini E-Commerce</Text>
          <Text style={styles.headerSubtitle}>Total produk: {products.length}</Text>
        </View>

        <Pressable
          style={({ pressed }) => [styles.addButton, pressed && styles.addButtonPressed]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>+ Tambah</Text>
        </Pressable>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard item={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <ProductFormModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={addProduct}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0b0b0c" },
  header: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { color: "white", fontSize: 20, fontWeight: "700" },
  headerSubtitle: { color: "#b9b9c0", marginTop: 4 },
  addButton: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
  addButtonPressed: { opacity: 0.85 },
  addButtonText: { color: "#0b0b0c", fontWeight: "700" },
  listContent: { paddingHorizontal: 16, paddingBottom: 24 },
});
