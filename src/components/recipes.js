import { View, Text, Pressable, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

export default function Recipe({ categories, foods }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Parent Component Layout */}
      <View testID="recipesDisplay" style={{ flex: 1 }}>
        <FlatList
          data={foods}
          numColumns={2}
          // 💡 Updated keyExtractor to safely fall back to the index if id is missing
          keyExtractor={(item, index) => (item && item.id ? item.id.toString() : index.toString())}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.row}
          renderItem={({ item, index }) => (
            <ArticleCard item={item} index={index} navigation={navigation} />
          )}
        />
      </View>
    </View>
  );
}

const ArticleCard = ({ item, index, navigation }) => {
  return (
    <View
      style={[styles.cardContainer, { paddingLeft: index % 2 === 0 ? 0 : 10, paddingRight: index % 2 === 0 ? 10 : 0 }]} 
      testID="articleDisplay"
    >
      <TouchableOpacity
        onPress={() => navigation.navigate("RecipeDetail", { ...item })}
        style={styles.touchableArea}
      >
        {/* 1. Recipe Thumbnail Image */}
        <Image 
          source={{ uri: item.recipeImage }} 
          style={styles.articleImage} // Synced with stylesheet
        />

        {/* 2. Recipe Name / Title */}
        <Text style={styles.articleText} numberOfLines={1}> {/* Synced with stylesheet */}
          {item.recipeName}
        </Text>

        {/* 3. Recipe Description / Instructions */}
        <Text style={styles.articleDescription} numberOfLines={2}> {/* Synced with stylesheet */}
          {item.recipeInstructions}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(4), 
    marginTop: hp(2),
    flex: 1,
  },
  title: {
    fontSize: hp(3),
    fontWeight: "600", 
    color: "#52525B", 
    marginBottom: hp(1.5),
  },
  loading: {
    marginTop: hp(20),
  },
  cardContainer: {
    flex: 1, 
    marginBottom: hp(1.5),
  },
  touchableArea: {
    width: "100%",
  },
  articleImage: {
    width: "100%",
    height: hp(18), // 💡 Added explicitly so your image displays!
    borderRadius: 20, // Clean rounded look
    backgroundColor: "rgba(0, 0, 0, 0.05)", 
  },
  articleText: {
    fontSize: hp(1.5),
    fontWeight: "600", 
    color: "#52525B", 
    marginLeft: wp(2),
    marginTop: hp(0.5),
  },
  articleDescription: {
    fontSize: hp(1.2),
    color: "#6B7280", 
    marginLeft: wp(2),
    marginTop: hp(0.5),
  },
  row: {
    justifyContent: "space-between", 
  },
});