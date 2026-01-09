import React ,{useState} from "react";
import { View, Text, ScrollView, StyleSheet, FlatList, RefreshControl } from "react-native";

function Login() {
    const name: string[] = ["B10", "B11", "B12", "B13", "B14","B15", "B16", "B17", "B18", "B19", "B20"];
    // [-- Ini untuk menggunakan RefreshControl --]
    const [refreshing,setRefreshing] = useState(false)
    const onRefresh = () => {   
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 3000)}
    return(
        // {-- Ini untuk menggunakan ScrollView --}
        // <View style={styles.container}>
        //     <ScrollView 
        //     showsVerticalScrollIndicator={false}
        //      contentContainerStyle={{gap:16}}
        //       style={{flex: 1}}
        //       refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
        //       >
        //         <View>
        //         {name.map((item, index) => (
        //             <Text key={index} style={styles.username}>{item}</Text>
        //         ))}
        //         </View>
        //     </ScrollView>
        // </View>
        // {-- Ini untuk menggunakan FlatList --}
        <View style={styles.container}>
            <FlatList
            contentContainerStyle={{gap:16}}
            showsVerticalScrollIndicator={true}
            data={name}
            renderItem={({item}) => <View><Text style={styles.username}>{item}</Text></View>}
            keyExtractor={(item, index) => index.toString()}
            />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        display: "flex",
        // borderColor: "black",
        // borderWidth: 2,
    },
    username: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 80,
    },
});

export default Login;