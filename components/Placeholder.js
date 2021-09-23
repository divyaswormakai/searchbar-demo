import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  Animated,
  UIManager,
} from "react-native";

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const Placeholder = ({ placeholders }) => {
  const [placeholder, setPlaceholder] = useState(placeholders[0]);

  const Sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  // animation
  const opacity = useState(new Animated.Value(1))[0];
  const position = useState(new Animated.Value(0))[0];

  const fadeIn = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(position, {
        toValue: 0,
        duration: 500,
        useNativeDriver:true
      }),

    ]).start();
  };

  const fadeOut = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(position, {
        toValue: -1,
        duration: 500,
        useNativeDriver:true
      }),
    ]).start(()=>{
      position.setValue(1)
    });
    
  };

  useEffect(() => {
    var index = 0;
    const changePlaceholder = () => {
      let cancel=false;
      fadeOut();
      
      var newIndex = (index + 1) % placeholders.length;
      index++;
      Sleep(500).then(()=>{
        if(cancel) return;
        setPlaceholder(placeholders[newIndex]);
        fadeIn();
      });
      return ()=> {cancel=true}
    };
    const changePlaceholderEvery2s = setInterval(changePlaceholder, 4000);
    return () => clearInterval(changePlaceholderEvery2s);
  }, []);

  return (
    <>
      <Animated.View
        style={[
          {
            transform: [
              {
                translateY: position.interpolate({
                  inputRange: [0,1],
                  outputRange: [0,10]
                }),
              },
            ],
            position: "absolute",
            left: 20,
            opacity,
          },
        ]}
      >
        <Text style={styles.placeHolder}>{placeholder}</Text>
      </Animated.View>
    </>
  );
};

export default Placeholder;

const styles = StyleSheet.create({
  placeHolder: {
    fontSize: 16,
    color: "#777",
    paddingLeft:5
  },
});
