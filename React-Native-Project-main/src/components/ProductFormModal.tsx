import React, { useMemo, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { NewProductInput } from "../types/product";
import { isValidImageUrl } from "../utils/validators";

type Props = {
  visible: boolean;
  onClose: () => void;
  onAdd: (input: NewProductInput) => void;
};

type FormState = {
  name: string;
  price: string;
  imageUrl: string;
  description: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

export default function ProductFormModal({ visible, onClose, onAdd }: Props) {
  const [form, setForm] = useState<FormState>({
    name: "",
    price: "",
    imageUrl: "",
    description: "",
  });
  const [errors, setErrors] = useState<Errors>({});

  const reset = () => {
    setForm({ name: "", price: "", imageUrl: "", description: "" });
    setErrors({});
  };

  const validate = (data: FormState): Errors => {
    const e: Errors = {};
    if (!data.name.trim()) e.name = "Nama produk wajib diisi.";

    if (!data.price.trim()) e.price = "Harga wajib diisi.";
    else {
      const numeric = Number(data.price.replace(/,/g, "."));
      if (Number.isNaN(numeric)) e.price = "Harga harus angka.";
      else if (numeric <= 0) e.price = "Harga harus > 0.";
    }

    if (!data.imageUrl.trim()) e.imageUrl = "URL gambar wajib diisi.";
    else if (!isValidImageUrl(data.imageUrl)) e.imageUrl = "URL tidak valid (http/https).";

    return e;
  };

  const canSubmit = useMemo(() => Object.keys(validate(form)).length === 0, [form]);

  const submit = () => {
    const e = validate(form);
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    const priceNum = Number(form.price.replace(/,/g, "."));
    onAdd({
      name: form.name.trim(),
      price: priceNum,
      imageUrl: form.imageUrl.trim(),
      description: form.description.trim() ? form.description.trim() : undefined,
    });

    reset();
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.overlay}
      >
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>Tambah Produk</Text>
            <Pressable onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeText}>Tutup</Text>
            </Pressable>
          </View>

          <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
            <Text style={styles.label}>Nama Produk *</Text>
            <TextInput
              value={form.name}
              onChangeText={(t) => setForm((p) => ({ ...p, name: t }))}
              placeholder="Contoh: Kaos Polos"
              style={[styles.input, errors.name && styles.inputError]}
              placeholderTextColor="#7d7f8a"
            />
            {errors.name ? <Text style={styles.error}>{errors.name}</Text> : null}

            <Text style={styles.label}>Harga (angka) *</Text>
            <TextInput
              value={form.price}
              onChangeText={(t) => setForm((p) => ({ ...p, price: t }))}
              placeholder="Contoh: 99000"
              keyboardType="numeric"
              style={[styles.input, errors.price && styles.inputError]}
              placeholderTextColor="#7d7f8a"
            />
            {errors.price ? <Text style={styles.error}>{errors.price}</Text> : null}

            <Text style={styles.label}>URL Gambar *</Text>
            <TextInput
              value={form.imageUrl}
              onChangeText={(t) => setForm((p) => ({ ...p, imageUrl: t }))}
              placeholder="https://...."
              autoCapitalize="none"
              style={[styles.input, errors.imageUrl && styles.inputError]}
              placeholderTextColor="#7d7f8a"
            />
            {errors.imageUrl ? (
              <Text style={styles.error}>{errors.imageUrl}</Text>
            ) : (
              <Text style={styles.helper}>Pakai https supaya aman di Android.</Text>
            )}

            <Text style={styles.label}>Deskripsi (opsional)</Text>
            <TextInput
              value={form.description}
              onChangeText={(t) => setForm((p) => ({ ...p, description: t }))}
              placeholder="Deskripsi singkat..."
              multiline
              style={[styles.input, styles.textArea]}
              placeholderTextColor="#7d7f8a"
            />

            <View style={styles.actions}>
              <Pressable
                onPress={() => {
                  reset();
                  onClose();
                }}
                style={({ pressed }) => [styles.secondary, pressed && styles.pressed]}
              >
                <Text style={styles.secondaryText}>Batal</Text>
              </Pressable>

              <Pressable
                onPress={submit}
                style={({ pressed }) => [
                  styles.primary,
                  (!canSubmit || pressed) && styles.primaryDim,
                ]}
              >
                <Text style={styles.primaryText}>Simpan</Text>
              </Pressable>
            </View>

            <Text style={styles.note}>* Submit ditolak jika input belum valid.</Text>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.65)",
    justifyContent: "flex-end",
  },
  card: {
    backgroundColor: "#0f0f12",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 18,
    borderWidth: 1,
    borderColor: "#1f1f25",
    maxHeight: "90%",
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#1f1f25",
  },
  title: { color: "white", fontSize: 16, fontWeight: "800" },
  closeBtn: { paddingHorizontal: 10, paddingVertical: 6 },
  closeText: { color: "#cfcfda", fontWeight: "700" },

  content: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8 },

  label: { color: "#cfcfda", marginTop: 12, marginBottom: 6, fontWeight: "700" },
  input: {
    backgroundColor: "#16161b",
    borderWidth: 1,
    borderColor: "#26262e",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "white",
  },
  textArea: { minHeight: 90, textAlignVertical: "top" },
  inputError: { borderColor: "#ff6b6b" },
  error: { color: "#ff6b6b", marginTop: 6, fontWeight: "600" },
  helper: { color: "#9ea0aa", marginTop: 6 },
  actions: { flexDirection: "row", gap: 10, marginTop: 18 },
  primary: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  primaryDim: { opacity: 0.85 },
  primaryText: { color: "#0b0b0c", fontWeight: "800" },
  secondary: {
    flex: 1,
    backgroundColor: "#1b1b22",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2a2a33",
  },
  secondaryText: { color: "#d7d7de", fontWeight: "800" },
  pressed: { opacity: 0.9 },
  note: { color: "#8f919d", marginTop: 12 },
});
