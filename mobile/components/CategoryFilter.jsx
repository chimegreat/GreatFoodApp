import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { Image } from "expo-image"
import { homeStyles } from '../assets/styles/home.styles'

const CategoryFilter = ({categories, selectedCategory, onSelectCategory}) => {
  return (
    <View style={homeStyles.categoryFilterContainer} >
    <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={homeStyles.categoryFilterScrollContent}
            >
            {categories.map( (category) => {
                const isSelected = selectedCategory === category.name;
                return (
                    <TouchableOpacity
                        key={category.id}
                        style={[homeStyles.categoryButton, isSelected && homeStyles.selectedCategory]}
                        onPress={() => onSelectCategory(category.name)}
                        activeOpacity={0.7}
                        >
                            <Image
                                source={{uri : category.image}}
                                style={[homeStyles.categoryImage,isSelected && homeStyles.selectedCategoryImage]}
                                contentFit='cover'
                                transition={300}
                                />
                                <Text 
                                    style={[homeStyles.categoryText, isSelected && homeStyles.selectedCategoryText]}>
                                        {category.name}
                                    </Text>
                        </TouchableOpacity>
                )
            })}

    </ScrollView>
    </View>
  )
}

export default CategoryFilter