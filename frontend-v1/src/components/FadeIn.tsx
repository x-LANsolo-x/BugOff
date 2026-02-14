/**
 * ChefMentor X – FadeIn Animation Wrapper
 *
 * Wraps children with a staggered fade + slide-up entrance.
 * Usage:
 *   <FadeIn delay={200}>
 *     <Text>Content fades in after 200ms</Text>
 *   </FadeIn>
 */

import React, { useRef, useEffect } from 'react';
import { Animated, ViewStyle } from 'react-native';

interface FadeInProps {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    slideDistance?: number;
    style?: ViewStyle;
}

export default function FadeIn({
    children,
    delay = 0,
    duration = 400,
    slideDistance = 20,
    style,
}: FadeInProps) {
    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(slideDistance)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1,
                duration,
                delay,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: 0,
                duration,
                delay,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <Animated.View
            style={[
                { opacity, transform: [{ translateY }] },
                style,
            ]}
        >
            {children}
        </Animated.View>
    );
}
